import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus } from 'lucide-react';
import { toast } from 'sonner';

interface AddStudentDialogProps {
  onAddStudent: (studentId: string) => Promise<void>;
}

export const AddStudentDialog: React.FC<AddStudentDialogProps> = ({ onAddStudent }) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId.trim()) return;

    setIsLoading(true);
    try {
      await onAddStudent(studentId.trim());
      toast.success(t('studentAdded'));
      setStudentId('');
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message || t('errorOccurred'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="gradient" className="gap-2">
          <UserPlus className="h-4 w-4" />
          {t('addStudent')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('addStudent')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="studentId">{t('enterStudentId')}</Label>
            <Input
              id="studentId"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="例: STU-2024-001"
              className="rounded-xl"
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              {t('cancel')}
            </Button>
            <Button type="submit" disabled={!studentId.trim() || isLoading}>
              {isLoading ? t('loading') : t('addStudent')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
