const ZAI_API_URL = 'https://api.z.ai/api/paas/v4/chat/completions';
const ZAI_API_KEY = '3346461ebc1a45aa86f21363b9284b6e.Qc0zucUoL66uZ5vA';
const RETRY_COUNT = 3;

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
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
    if (!ZAI_API_URL || !ZAI_API_KEY) {
      return FALLBACK_MESSAGE;
    }

    const systemPrompt = [
      'You are a journaling assistant helping users reflect concisely and kindly.',
      `Respond in ${request.language === 'ja' ? 'Japanese' : 'English'} unless the user requests otherwise.`,
      request.journalContext
        ? `Use this journal context if it helps you give a better answer: ${request.journalContext}`
        : null,
    ]
      .filter(Boolean)
      .join(' ');

    const chatMessages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      ...request.messages,
    ];

    let lastError: unknown;

    for (let attempt = 0; attempt < RETRY_COUNT; attempt++) {
      try {
        const response = await fetch(ZAI_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ZAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'glm-4.5-flash',
            messages: chatMessages,
            thinking: { type: 'enabled' },
            stream: false,
            max_tokens: 4096,
            temperature: 0.4,
          }),
        });

        const data = await handleApiResponse(response);
        return (
          data?.choices?.[0]?.message?.content ||
          data?.reply ||
          data?.content ||
          data?.message ||
          FALLBACK_MESSAGE
        );
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError instanceof Error ? lastError : new Error('Unable to reach Z.AI API');
  },
};
