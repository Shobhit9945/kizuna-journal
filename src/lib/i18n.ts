export type Language = 'en' | 'ja';

export const translations = {
  en: {
    // Common
    appName: 'KokoroNote',
    tagline: 'Your Daily Reflection Journey',
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    submit: 'Submit',
    back: 'Back',
    next: 'Next',
    done: 'Done',
    
    // Auth
    login: 'Login',
    logout: 'Logout',
    signUp: 'Sign Up',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    studentId: 'Student ID',
    fullName: 'Full Name',
    iAmStudent: 'I am a Student',
    iAmTeacher: 'I am a Teacher',
    welcomeBack: 'Welcome Back!',
    createAccount: 'Create Account',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: "Don't have an account?",
    loginAsStudent: 'Login as Student',
    loginAsTeacher: 'Login as Teacher',
    
    // Student Dashboard
    todaysJournal: "Today's Journal",
    howAreYouFeeling: 'How are you feeling today?',
    startWriting: 'Start writing...',
    whatHappenedToday: 'What happened today?',
    myJournals: 'My Journals',
    streakDays: 'Day Streak',
    totalEntries: 'Total Entries',
    weeklyMood: 'Weekly Mood',
    
    // AI Chat
    aiAssistant: 'AI Assistant',
    askMeAnything: 'Ask me anything about your day...',
    thinkingMessage: 'Thinking...',
    
    // Emotions
    happy: 'Happy',
    sad: 'Sad',
    excited: 'Excited',
    anxious: 'Anxious',
    calm: 'Calm',
    tired: 'Tired',
    frustrated: 'Frustrated',
    grateful: 'Grateful',
    
    // Teacher Dashboard
    myStudents: 'My Students',
    addStudent: 'Add Student',
    studentReports: 'Student Reports',
    emotionalTrends: 'Emotional Trends',
    recentActivity: 'Recent Activity',
    noStudentsYet: 'No students added yet',
    enterStudentId: 'Enter Student ID',
    studentAdded: 'Student added successfully!',
    viewReport: 'View Report',
    lastActive: 'Last Active',
    moodOverview: 'Mood Overview',
    interests: 'Interests',
    concerns: 'Concerns',
    
    // Navigation
    home: 'Home',
    journal: 'Journal',
    history: 'History',
    profile: 'Profile',
    settings: 'Settings',
    students: 'Students',
    reports: 'Reports',
    
    // Messages
    journalSaved: 'Journal saved successfully!',
    errorOccurred: 'An error occurred. Please try again.',
    loginSuccess: 'Welcome back!',
    signupSuccess: 'Account created successfully!',
  },
  ja: {
    // Common
    appName: 'ココロノート',
    tagline: '毎日の振り返りの旅',
    loading: '読み込み中...',
    save: '保存',
    cancel: 'キャンセル',
    submit: '送信',
    back: '戻る',
    next: '次へ',
    done: '完了',
    
    // Auth
    login: 'ログイン',
    logout: 'ログアウト',
    signUp: '新規登録',
    email: 'メールアドレス',
    password: 'パスワード',
    confirmPassword: 'パスワード確認',
    studentId: '学生ID',
    fullName: '氏名',
    iAmStudent: '生徒です',
    iAmTeacher: '先生です',
    welcomeBack: 'おかえりなさい！',
    createAccount: 'アカウント作成',
    alreadyHaveAccount: 'すでにアカウントをお持ちですか？',
    dontHaveAccount: 'アカウントをお持ちではありませんか？',
    loginAsStudent: '生徒としてログイン',
    loginAsTeacher: '先生としてログイン',
    
    // Student Dashboard
    todaysJournal: '今日の日記',
    howAreYouFeeling: '今日の気分は？',
    startWriting: '書き始めましょう...',
    whatHappenedToday: '今日は何があった？',
    myJournals: '私の日記',
    streakDays: '日連続',
    totalEntries: '総記録数',
    weeklyMood: '週間の気分',
    
    // AI Chat
    aiAssistant: 'AIアシスタント',
    askMeAnything: '今日のことについて何でも聞いてね...',
    thinkingMessage: '考え中...',
    
    // Emotions
    happy: '嬉しい',
    sad: '悲しい',
    excited: 'ワクワク',
    anxious: '不安',
    calm: '穏やか',
    tired: '疲れた',
    frustrated: 'イライラ',
    grateful: '感謝',
    
    // Teacher Dashboard
    myStudents: '担当生徒',
    addStudent: '生徒を追加',
    studentReports: '生徒レポート',
    emotionalTrends: '感情の傾向',
    recentActivity: '最近の活動',
    noStudentsYet: 'まだ生徒が追加されていません',
    enterStudentId: '学生IDを入力',
    studentAdded: '生徒を追加しました！',
    viewReport: 'レポートを見る',
    lastActive: '最終活動',
    moodOverview: '気分の概要',
    interests: '興味・関心',
    concerns: '心配事',
    
    // Navigation
    home: 'ホーム',
    journal: '日記',
    history: '履歴',
    profile: 'プロフィール',
    settings: '設定',
    students: '生徒',
    reports: 'レポート',
    
    // Messages
    journalSaved: '日記を保存しました！',
    errorOccurred: 'エラーが発生しました。もう一度お試しください。',
    loginSuccess: 'おかえりなさい！',
    signupSuccess: 'アカウントを作成しました！',
  },
};

export type TranslationKey = keyof typeof translations.en;

export const useTranslation = (lang: Language) => {
  const t = (key: TranslationKey): string => {
    return translations[lang][key] || translations.en[key] || key;
  };
  
  return { t, lang };
};
