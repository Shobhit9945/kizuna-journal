import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Flame, BookOpen, TrendingUp } from 'lucide-react';

interface StudentStatsProps {
  streak: number;
  totalEntries: number;
}

export const StudentStats: React.FC<StudentStatsProps> = ({ streak, totalEntries }) => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: Flame,
      value: streak,
      label: t('streakDays'),
      color: 'text-peach bg-peach-light',
      iconColor: 'text-peach',
    },
    {
      icon: BookOpen,
      value: totalEntries,
      label: t('totalEntries'),
      color: 'text-sky bg-sky-light',
      iconColor: 'text-sky',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} variant="elevated" className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
