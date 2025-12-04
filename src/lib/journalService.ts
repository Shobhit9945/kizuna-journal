import { Emotion } from '@/components/EmotionPicker';
import { AuthUser } from '@/types/auth';

const API_BASE_URL = import.meta.env.VITE_MONGODB_API_URL;

export interface JournalEntry {
  id: string;
  userId: string;
  date: string;
  content: string;
  emotion: Emotion;
}

interface CreateEntryInput {
  content: string;
  emotion: Emotion;
  date?: string;
}

const handleApiResponse = async (response: Response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data?.message || data?.error || 'Unable to reach MongoDB API';
    throw new Error(message);
  }
  return data;
};

export const journalService = {
  async list(user: AuthUser): Promise<JournalEntry[]> {
    if (!API_BASE_URL) {
      throw new Error('Missing MongoDB API URL. Set VITE_MONGODB_API_URL to load journals.');
    }

    const response = await fetch(`${API_BASE_URL}/journals?userId=${encodeURIComponent(user.id)}`);
    const data = await handleApiResponse(response);
    if (Array.isArray(data)) {
      return data.map((entry) => ({
        id: entry.id || entry._id || crypto.randomUUID(),
        userId: entry.userId || user.id,
        date: entry.date || new Date().toISOString(),
        content: entry.content || '',
        emotion: (entry.emotion as Emotion) || 'calm',
      }));
    }

    return [];
  },

  async create(user: AuthUser, input: CreateEntryInput): Promise<JournalEntry> {
    const payload = {
      userId: user.id,
      date: input.date || new Date().toISOString(),
      content: input.content,
      emotion: input.emotion,
    };

    if (!API_BASE_URL) {
      throw new Error('Missing MongoDB API URL. Set VITE_MONGODB_API_URL to save journals.');
    }

    const response = await fetch(`${API_BASE_URL}/journals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await handleApiResponse(response);
    return {
      id: data.id || data._id || crypto.randomUUID(),
      userId: data.userId || user.id,
      date: data.date || payload.date,
      content: data.content || payload.content,
      emotion: (data.emotion as Emotion) || payload.emotion,
    };
  },
};
