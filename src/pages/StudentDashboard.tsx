import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { StudentNavbar } from '@/components/StudentNavbar';
import { JournalEditor } from '@/components/JournalEditor';
import { AIChat } from '@/components/AIChat';
import { StudentStats } from '@/components/StudentStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Emotion } from '@/components/EmotionPicker';
import { Calendar, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface JournalEntry {
  id: string;
  date: string;
  content: string;
  emotion: Emotion;
}

export const StudentDashboard: React.FC = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock data - will be connected to MongoDB later
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: '2024-01-15',
      content: language === 'ja' 
        ? '今日は数学のテストがあった。思ったより難しかったけど、頑張った！'
        : 'Had a math test today. It was harder than I expected, but I did my best!',
      emotion: 'anxious',
    },
    {
      id: '2',
      date: '2024-01-14',
      content: language === 'ja'
        ? '友達と放課後にカフェに行った。楽しかった！'
        : 'Went to a cafe with friends after school. Had so much fun!',
      emotion: 'happy',
    },
  ]);

  const handleSaveJournal = async (entry: { content: string; emotion: Emotion }) => {
    setIsLoading(true);
    try {
      // Placeholder - will save to MongoDB later
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        content: entry.content,
        emotion: entry.emotion,
      };
      setJournalEntries((prev) => [newEntry, ...prev]);
      toast.success(t('journalSaved'));
    } catch (error) {
      toast.error(t('errorOccurred'));
    } finally {
      setIsLoading(false);
    }
  };

  const getEmotionEmoji = (emotion: Emotion) => {
    const emojis: Record<Emotion, string> = {
      happy: '😊',
      sad: '😢',
      excited: '🎉',
      anxious: '😰',
      calm: '😌',
      tired: '😴',
      frustrated: '😤',
      grateful: '🙏',
    };
    return emojis[emotion];
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'journal':
        return (
          <div className="space-y-6">
            <JournalEditor onSave={handleSaveJournal} isLoading={isLoading} />
            <AIChat />
          </div>
        );
      case 'history':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              {t('myJournals')}
            </h2>
            {journalEntries.map((entry) => (
              <Card key={entry.id} variant="elevated" className="animate-fade-in">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{getEmotionEmoji(entry.emotion)}</div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-2">
                        {new Date(entry.date).toLocaleDateString(language === 'ja' ? 'ja-JP' : 'en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-foreground">{entry.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      case 'profile':
        return (
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>{t('profile')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-3xl">👤</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{user?.fullName}</h3>
                  <p className="text-muted-foreground">ID: {user?.studentId}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return (
          <div className="space-y-6">
            {/* Welcome Message */}
            <div className="text-center py-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {language === 'ja' 
                  ? `おかえり、${user?.fullName?.split(' ')[0] || ''}さん！` 
                  : `Welcome back, ${user?.fullName?.split(' ')[0] || ''}!`}
              </h2>
              <p className="text-muted-foreground">
                {language === 'ja' 
                  ? '今日も素敵な一日を過ごしましょう'
                  : "Let's make today a great day"}
              </p>
            </div>

            {/* Stats */}
            <StudentStats streak={5} totalEntries={journalEntries.length} />

            {/* Quick Journal */}
            <JournalEditor onSave={handleSaveJournal} isLoading={isLoading} />

            {/* AI Chat */}
            <AIChat />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <StudentNavbar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="pt-20 md:pt-24 pb-24 md:pb-8 px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          {renderContent()}
        </div>
      </main>

      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-full h-64 gradient-hero opacity-50" />
      </div>
    </div>
  );
};

export default StudentDashboard;
