const ZAI_API_URL = 'https://api.z.ai/api/paas/v4/chat/completions';
const ZAI_API_KEY = '3346461ebc1a45aa86f21363b9284b6e.Qc0zucUoL66uZ5vA';

const ZAI_MODEL = 'glm-4.5-flash';
const MAX_TOKENS = 4096;
const TEMPERATURE = 0.4;
const RETRIES = 2;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  language: string;
  journalContext?: string;
}

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
    const systemPrompt =
      request.language === 'ja'
        ? `あなたは思いやりのあるジャーナルアシスタントです。ユーザーが共有する内容を丁寧に振り返り、短い提案や共感を返してください。日記の文脈: ${request.journalContext ?? 'なし'}`
        : `You are a compassionate journaling assistant. Reflect succinctly on what the user shares, offering empathy and short, gentle suggestions. Journal context: ${request.journalContext ?? 'none provided'}.`;

    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...request.messages,
    ];

    for (let attempt = 0; attempt <= RETRIES; attempt++) {
      try {
        const response = await fetch(ZAI_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ZAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: ZAI_MODEL,
            messages,
            thinking: { type: 'enabled' },
            stream: false,
            max_tokens: MAX_TOKENS,
            temperature: TEMPERATURE,
          }),
        });

        const data = await handleApiResponse(response);
        return data.reply || data.content || data.message || 'I am here to help.';
      } catch (error) {
        if (attempt === RETRIES) {
          throw error;
        }
      }
    }

    throw new Error('Unable to reach Z.AI API after retries.');
  },
};
