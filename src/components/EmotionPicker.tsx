import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type Emotion = 'happy' | 'sad' | 'excited' | 'anxious' | 'calm' | 'tired' | 'frustrated' | 'grateful';

interface EmotionPickerProps {
  selected: Emotion | null;
  onSelect: (emotion: Emotion) => void;
}

const emotions: { id: Emotion; emoji: string; color: string }[] = [
  { id: 'happy', emoji: '😊', color: 'bg-golden/20 border-golden hover:bg-golden/30' },
  { id: 'sad', emoji: '😢', color: 'bg-sky/20 border-sky hover:bg-sky/30' },
  { id: 'excited', emoji: '🎉', color: 'bg-peach/20 border-peach hover:bg-peach/30' },
  { id: 'anxious', emoji: '😰', color: 'bg-lavender/20 border-lavender hover:bg-lavender/30' },
  { id: 'calm', emoji: '😌', color: 'bg-mint/20 border-mint hover:bg-mint/30' },
  { id: 'tired', emoji: '😴', color: 'bg-muted border-border hover:bg-muted/80' },
  { id: 'frustrated', emoji: '😤', color: 'bg-destructive/20 border-destructive/50 hover:bg-destructive/30' },
  { id: 'grateful', emoji: '🙏', color: 'bg-sakura/20 border-sakura hover:bg-sakura/30' },
];

export const EmotionPicker: React.FC<EmotionPickerProps> = ({ selected, onSelect }) => {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-4 gap-3">
      {emotions.map((emotion) => (
        <button
          key={emotion.id}
          onClick={() => onSelect(emotion.id)}
          className={cn(
            "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-300",
            emotion.color,
            selected === emotion.id && "ring-2 ring-primary ring-offset-2 scale-105"
          )}
        >
          <span className="text-2xl">{emotion.emoji}</span>
          <span className="text-xs font-medium text-foreground">
            {t(emotion.id)}
          </span>
        </button>
      ))}
    </div>
  );
};
