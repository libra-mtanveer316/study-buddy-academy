export type SubjectCategory =
  | 'Programming & Web'
  | 'Data & Analytics'
  | 'Artificial Intelligence'
  | 'Cybersecurity & Networking'
  | 'Digital Skills';

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  topic?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Subject {
  id: string;
  name: string;
  category: SubjectCategory;
  description: string;
  icon: string; // Lucide icon name string identifier
  progress: number;
  lessonsCount: number;
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
  suggestedPrompts: string[];
}

export interface GoalItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface ActivityItem {
  id: string;
  title: string;
  type: 'quiz' | 'flashcard' | 'timer' | 'goal' | 'subject';
  timestamp: string;
  detail: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  subjectName?: string;
}

export interface QuizResult {
  id: string;
  subjectId: string;
  subjectName: string;
  score: number;
  total: number;
  percentage: number;
  date: string;
}

export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

export interface TimerSettings {
  focus: number; // in seconds (default 25 * 60 = 1500)
  shortBreak: number; // in seconds (5 * 60 = 300)
  longBreak: number; // in seconds (15 * 60 = 900)
}

export type ActiveTab =
  | 'dashboard'
  | 'chat'
  | 'flashcards'
  | 'quiz'
  | 'timer'
  | 'progress'
  | 'library'
  | 'features'
  | 'how-it-works'
  | 'about'
  | 'developer'
  | 'contact';

export interface UserStats {
  studyTimeMinutes: number;
  tasksCompleted: number;
  quizScoreAverage: number;
  studyStreakDays: number;
}
