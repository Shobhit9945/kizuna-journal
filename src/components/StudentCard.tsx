import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, ChevronRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StudentCardProps {
  student: {
    id: string;
    fullName: string;
    studentId: string;
    lastActive?: string;
    moodTrend?: 'up' | 'down' | 'stable';
    recentMood?: string;
  };
  onViewReport: (studentId: string) => void;
}

export const StudentCard: React.FC<StudentCardProps> = ({ student, onViewReport }) => {
  const { t } = useLanguage();

  const getTrendIcon = () => {
    switch (student.moodTrend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-mint" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getMoodEmoji = () => {
    switch (student.recentMood) {
      case 'happy': return '😊';
      case 'sad': return '😢';
      case 'excited': return '🎉';
      case 'anxious': return '😰';
      case 'calm': return '😌';
      case 'tired': return '😴';
      case 'frustrated': return '😤';
      case 'grateful': return '🙏';
      default: return '—';
    }
  };

  return (
    <Card variant="elevated" className="group hover:shadow-glow transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">
              {student.fullName}
            </h3>
            <p className="text-sm text-muted-foreground">
              ID: {student.studentId}
            </p>
            {student.lastActive && (
              <p className="text-xs text-muted-foreground mt-1">
                {t('lastActive')}: {student.lastActive}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="text-center">
              <div className="text-2xl">{getMoodEmoji()}</div>
              <div className="flex items-center justify-center mt-1">
                {getTrendIcon()}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onViewReport(student.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
