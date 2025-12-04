const ZAI_API_URL = "https://api.z.ai/api/paas/v4/chat/completions";
const ZAI_API_KEY = "3346461ebc1a45aa86f21363b9284b6e.Qc0zucUoL66uZ5vA";

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  language: string;
  journalContext?: string;
}

const FALLBACK_MESSAGE =
  'AI responses will be available once a Z.AI API key is configured. This is a placeholder answer.';

const handleApiResponse = async (response: Response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data?.message || data?.error || 'Unable to reach Z.AI API';
    throw new Error(message);
  }
  return data;
};

export const zaiClient = {
  async chat(request: ChatRequest): Promise<string> {
    if (ZAI_API_URL && ZAI_API_KEY) {
      const response = await fetch(ZAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ZAI_API_KEY}`,
        },
        body: JSON.stringify(request),
      });

      const data = await handleApiResponse(response);
      return data.reply || data.content || data.message || FALLBACK_MESSAGE;
    }

    return FALLBACK_MESSAGE;
  },
};
