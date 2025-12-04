import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LanguageToggle } from '@/components/LanguageToggle';
import { GraduationCap, BookUser, Eye, EyeOff, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type AuthMode = 'login' | 'signup';

export const Auth: React.FC = () => {
  const { t } = useLanguage();
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  
  const [mode, setMode] = useState<AuthMode>('login');
  const [role, setRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'signup') {
        if (password !== confirmPassword) {
          toast.error('Passwords do not match');
          return;
        }
        const { error } = await signUp(email, password, role, fullName, role === 'student' ? studentId : undefined);
        if (error) {
          toast.error(error);
        } else {
          toast.success(t('signupSuccess'));
          navigate('/');
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          toast.error(error);
        } else {
          toast.success(t('loginSuccess'));
          navigate('/');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-gradient">{t('appName')}</span>
        </div>
        <LanguageToggle />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <Card variant="glass" className="w-full max-w-md animate-slide-up">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">
              {mode === 'login' ? t('welcomeBack') : t('createAccount')}
            </CardTitle>
            <CardDescription>{t('tagline')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-300",
                  role === 'student'
                    ? "border-primary bg-primary/10 shadow-soft"
                    : "border-border hover:border-primary/30"
                )}
              >
                <GraduationCap className={cn(
                  "h-8 w-8",
                  role === 'student' ? "text-primary" : "text-muted-foreground"
                )} />
                <span className={cn(
                  "text-sm font-medium",
                  role === 'student' ? "text-primary" : "text-muted-foreground"
                )}>
                  {t('iAmStudent')}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setRole('teacher')}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-300",
                  role === 'teacher'
                    ? "border-lavender bg-lavender/10 shadow-soft"
                    : "border-border hover:border-lavender/30"
                )}
              >
                <BookUser className={cn(
                  "h-8 w-8",
                  role === 'teacher' ? "text-lavender" : "text-muted-foreground"
                )} />
                <span className={cn(
                  "text-sm font-medium",
                  role === 'teacher' ? "text-lavender" : "text-muted-foreground"
                )}>
                  {t('iAmTeacher')}
                </span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">{t('fullName')}</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="田中 太郎"
                    required
                    className="rounded-xl"
                  />
                </div>
              )}

              {mode === 'signup' && role === 'student' && (
                <div className="space-y-2">
                  <Label htmlFor="studentId">{t('studentId')}</Label>
                  <Input
                    id="studentId"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="STU-2024-001"
                    required
                    className="rounded-xl"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t('password')}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="rounded-xl pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {mode === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t('confirmPassword')}</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="rounded-xl"
                  />
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                variant={role === 'student' ? 'gradient' : 'lavender'}
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? t('loading') : mode === 'login' ? t('login') : t('signUp')}
              </Button>
            </form>

            {/* Toggle Mode */}
            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                {mode === 'login' ? t('dontHaveAccount') : t('alreadyHaveAccount')}
              </span>{' '}
              <button
                type="button"
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-primary font-medium hover:underline"
              >
                {mode === 'login' ? t('signUp') : t('login')}
              </button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Decorative Elements */}
      <div className="fixed top-20 left-10 w-20 h-20 bg-sakura/20 rounded-full blur-2xl animate-float" />
      <div className="fixed top-40 right-20 w-32 h-32 bg-sky/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="fixed bottom-40 left-20 w-24 h-24 bg-lavender/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
    </div>
  );
};

export default Auth;
