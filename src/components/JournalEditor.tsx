import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { EmotionPicker, Emotion } from '@/components/EmotionPicker';
import { Send, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface JournalEditorProps {
  onSave: (entry: { content: string; emotion: Emotion }) => void;
  isLoading?: boolean;
}

export const JournalEditor: React.FC<JournalEditorProps> = ({ onSave, isLoading }) => {
  const { t } = useLanguage();
  const [content, setContent] = useState('');
  const [emotion, setEmotion] = useState<Emotion | null>(null);

  const handleSubmit = () => {
    if (content.trim() && emotion) {
      onSave({ content: content.trim(), emotion });
      setContent('');
      setEmotion(null);
    }
  };

  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card variant="elevated" className="animate-slide-up">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            {t('todaysJournal')}
          </CardTitle>
          <span className="text-sm text-muted-foreground">{today}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-3 block">
            {t('howAreYouFeeling')}
          </label>
          <EmotionPicker selected={emotion} onSelect={setEmotion} />
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground mb-3 block">
            {t('whatHappenedToday')}
          </label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t('startWriting')}
            className="min-h-[180px] resize-none rounded-xl border-2 border-border focus:border-primary/50 transition-colors text-base"
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!content.trim() || !emotion || isLoading}
          className="w-full"
          variant="gradient"
          size="lg"
        >
          {isLoading ? (
            <span className="animate-pulse">{t('loading')}</span>
          ) : (
            <>
              <Send className="h-4 w-4" />
              {t('save')}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
