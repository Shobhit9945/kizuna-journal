export type UserRole = 'student' | 'teacher';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
  studentId?: string;
}

export interface AuthSession {
  token: string;
  userId: string;
}
