import { AuthSession, AuthUser, UserRole } from '@/types/auth';

const API_BASE_URL =
  'mongodb+srv://shobhit:shobhit21@kizuna.mfwaudu.mongodb.net/?appName=kizuna';
const LOCAL_SESSION_KEY = 'kizuna-journal-session';

const parseJson = <T>(value: string | null, fallback: T): T => {
  try {
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
};

const persistSession = (session: AuthSession | null, user: AuthUser | null) => {
  if (!session || !user) {
    localStorage.removeItem(LOCAL_SESSION_KEY);
    return;
  }
  localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify({ session, user }));
};

const loadSession = (): { session: AuthSession | null; user: AuthUser | null } => {
  const stored = parseJson<{ session: AuthSession; user: AuthUser } | null>(
    localStorage.getItem(LOCAL_SESSION_KEY),
    null
  );
  return stored ? stored : { session: null, user: null };
};

const handleApiResponse = async (response: Response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data?.message || data?.error || 'Unable to reach MongoDB API';
    throw new Error(message);
  }
  return data;
};

const normalizeUser = (data: any, fallbackId?: string): AuthUser => ({
  id: data?.id || data?._id || data?.userId || fallbackId || crypto.randomUUID(),
  email: data?.email || '',
  role: (data?.role as UserRole) || 'student',
  fullName: data?.fullName || data?.full_name || data?.name || '',
  studentId: data?.studentId || data?.student_id,
});

export const mongoService = {
  async getSession(): Promise<{ session: AuthSession | null; user: AuthUser | null }> {
    const { session, user } = loadSession();
    return { session, user };
  },

  async signUp(
    email: string,
    password: string,
    role: UserRole,
    fullName: string,
    studentId?: string
  ): Promise<{ user: AuthUser; session: AuthSession }> {
    if (!API_BASE_URL) {
      throw new Error('Missing MongoDB API URL. Set VITE_MONGODB_API_URL to enable sign up.');
    }

    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        role,
        fullName,
        full_name: fullName,
        name: fullName,
        studentId: studentId ?? null,
        student_id: studentId ?? null,
      }),
    });

    const data = await handleApiResponse(response);
    const user = normalizeUser(data.user || data, data.id);
    const session: AuthSession = { token: data.token || data.accessToken || crypto.randomUUID(), userId: user.id };
    persistSession(session, user);
    return { user, session };
  },

  async signIn(email: string, password: string): Promise<{ user: AuthUser; session: AuthSession }> {
    if (!API_BASE_URL) {
      throw new Error('Missing MongoDB API URL. Set VITE_MONGODB_API_URL to enable sign in.');
    }

    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await handleApiResponse(response);
    const user = normalizeUser(data.user || data, data.id);
    const session: AuthSession = { token: data.token || data.accessToken || crypto.randomUUID(), userId: user.id };
    persistSession(session, user);
    return { user, session };
  },

  async signOut() {
    if (API_BASE_URL) {
      await fetch(`${API_BASE_URL}/auth/signout`, { method: 'POST' }).catch(() => undefined);
    }
    persistSession(null, null);
  },
};
