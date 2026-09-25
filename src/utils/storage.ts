import { ActivityItem, ChatMessage, GoalItem, QuizResult } from '../types';

const STORAGE_KEYS = {
  THEME: 'studybuddy_theme',
  SELECTED_SUBJECT: 'studybuddy_selected_subject',
  GOALS: 'studybuddy_goals',
  STUDY_TIME: 'studybuddy_study_time_minutes',
  STREAK: 'studybuddy_streak_days',
  QUIZ_HISTORY: 'studybuddy_quiz_history',
  WEEKLY_STUDY: 'studybuddy_weekly_study',
  SUBJECT_PROGRESS: 'studybuddy_subject_progress',
  CARD_STATUS: 'studybuddy_card_status',
  ACTIVITIES: 'studybuddy_activities',
  CHAT_MESSAGES: 'studybuddy_chat_messages',
} as const;

export const DEFAULT_GOALS: GoalItem[] = [
  { id: 'g-1', text: 'Complete Python lesson', completed: true },
  { id: 'g-2', text: 'Review flashcards', completed: true },
  { id: 'g-3', text: 'Take a practice quiz', completed: false },
  { id: 'g-4', text: 'Study for 30 minutes', completed: false },
];

export const DEFAULT_WEEKLY_MINUTES: Record<string, number> = {
  Monday: 45,
  Tuesday: 60,
  Wednesday: 35,
  Thursday: 50,
  Friday: 40,
  Saturday: 90,
  Sunday: 65,
};

export const DEFAULT_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'Completed focus session',
    type: 'timer',
    timestamp: '25 mins ago',
    detail: 'Completed 25 minutes of deep Python revision'
  },
  {
    id: 'act-2',
    title: 'Completed quiz',
    type: 'quiz',
    timestamp: '1 hour ago',
    detail: 'Scored 88% on Python Fundamentals Quiz'
  },
  {
    id: 'act-3',
    title: 'Reviewed flashcards',
    type: 'flashcard',
    timestamp: '3 hours ago',
    detail: 'Mastered 8 cards in Computer Networking'
  },
  {
    id: 'act-4',
    title: 'Finished study goal',
    type: 'goal',
    timestamp: 'Yesterday',
    detail: 'Checked off: Review flashcards'
  }
];

export function getStoredTheme(): 'light' | 'dark' {
  try {
    const val = localStorage.getItem(STORAGE_KEYS.THEME);
    if (val === 'dark' || val === 'light') return val;
    return 'light';
  } catch {
    return 'light';
  }
}

export function setStoredTheme(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (e) {
    console.warn('Failed to save theme in localStorage', e);
  }
}

export function getStoredSelectedSubject(): string {
  try {
    const val = localStorage.getItem(STORAGE_KEYS.SELECTED_SUBJECT);
    if (val === 'robotics') return 'artificial-intelligence';
    return val && typeof val === 'string' ? val : 'python-programming';
  } catch {
    return 'python-programming';
  }
}

export function setStoredSelectedSubject(id: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SELECTED_SUBJECT, id);
  } catch (e) {
    console.warn('Failed to save selected subject', e);
  }
}

export function getStoredGoals(): GoalItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.GOALS);
    if (!data) return DEFAULT_GOALS;
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_GOALS;
  } catch {
    return DEFAULT_GOALS;
  }
}

export function setStoredGoals(goals: GoalItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
  } catch (e) {
    console.warn('Failed to save goals', e);
  }
}

export function getStoredStudyTime(): number {
  try {
    const val = localStorage.getItem(STORAGE_KEYS.STUDY_TIME);
    if (!val) return 155; // 2h 35m default
    const num = parseInt(val, 10);
    return isNaN(num) || num < 0 ? 155 : num;
  } catch {
    return 155;
  }
}

export function setStoredStudyTime(minutes: number): void {
  try {
    localStorage.setItem(STORAGE_KEYS.STUDY_TIME, String(Math.max(0, minutes)));
  } catch (e) {
    console.warn('Failed to save study time', e);
  }
}

export function getStoredStreak(): number {
  try {
    const val = localStorage.getItem(STORAGE_KEYS.STREAK);
    if (!val) return 7; // 7 days default
    const num = parseInt(val, 10);
    return isNaN(num) || num < 1 ? 7 : num;
  } catch {
    return 7;
  }
}

export function setStoredStreak(days: number): void {
  try {
    localStorage.setItem(STORAGE_KEYS.STREAK, String(Math.max(1, days)));
  } catch (e) {
    console.warn('Failed to save streak', e);
  }
}

export function getStoredQuizHistory(): QuizResult[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY);
    if (!data) {
      return [
        {
          id: 'init-q1',
          subjectId: 'python-programming',
          subjectName: 'Python Programming',
          score: 4,
          total: 4,
          percentage: 100,
          date: 'Yesterday'
        },
        {
          id: 'init-q2',
          subjectId: 'computer-networking',
          subjectName: 'Computer Networking',
          score: 3,
          total: 4,
          percentage: 75,
          date: '2 days ago'
        },
        {
          id: 'init-q3',
          subjectId: 'artificial-intelligence',
          subjectName: 'Artificial Intelligence & Robotics',
          score: 4,
          total: 5,
          percentage: 80,
          date: '3 days ago'
        }
      ];
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveQuizResult(result: QuizResult): QuizResult[] {
  try {
    const existing = getStoredQuizHistory();
    const updated = [result, ...existing].slice(0, 20);
    localStorage.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.warn('Failed to save quiz result', e);
    return [];
  }
}

export function getStoredWeeklyMinutes(): Record<string, number> {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.WEEKLY_STUDY);
    if (!data) return DEFAULT_WEEKLY_MINUTES;
    const parsed = JSON.parse(data);
    return typeof parsed === 'object' && parsed !== null ? parsed : DEFAULT_WEEKLY_MINUTES;
  } catch {
    return DEFAULT_WEEKLY_MINUTES;
  }
}

export function addStudyMinutesToWeekly(minutes: number): void {
  try {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[new Date().getDay()];
    const current = getStoredWeeklyMinutes();
    current[currentDay] = (current[currentDay] || 0) + minutes;
    localStorage.setItem(STORAGE_KEYS.WEEKLY_STUDY, JSON.stringify(current));
  } catch (e) {
    console.warn('Failed to update weekly minutes', e);
  }
}

export function getStoredSubjectProgress(): Record<string, number> {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SUBJECT_PROGRESS);
    if (!data) return {};
    const parsed = JSON.parse(data);
    return typeof parsed === 'object' && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

export function updateStoredSubjectProgress(subjectId: string, delta: number): number {
  try {
    const current = getStoredSubjectProgress();
    const prev = current[subjectId] !== undefined ? current[subjectId] : 60;
    const updated = Math.min(100, Math.max(0, prev + delta));
    current[subjectId] = updated;
    localStorage.setItem(STORAGE_KEYS.SUBJECT_PROGRESS, JSON.stringify(current));
    return updated;
  } catch {
    return 60;
  }
}

export function getStoredCardStatus(): Record<string, { known: boolean; needReview: boolean }> {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CARD_STATUS);
    if (!data) return {};
    const parsed = JSON.parse(data);
    return typeof parsed === 'object' && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

export function saveCardStatus(cardId: string, status: { known: boolean; needReview: boolean }): void {
  try {
    const current = getStoredCardStatus();
    current[cardId] = status;
    localStorage.setItem(STORAGE_KEYS.CARD_STATUS, JSON.stringify(current));
  } catch (e) {
    console.warn('Failed to save card status', e);
  }
}

export function getStoredActivities(): ActivityItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
    if (!data) return DEFAULT_ACTIVITIES;
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_ACTIVITIES;
  } catch {
    return DEFAULT_ACTIVITIES;
  }
}

export function addActivity(activity: Omit<ActivityItem, 'id' | 'timestamp'>): ActivityItem[] {
  try {
    const existing = getStoredActivities();
    const newItem: ActivityItem = {
      ...activity,
      id: 'act-' + Date.now(),
      timestamp: 'Just now'
    };
    const updated = [newItem, ...existing].slice(0, 15);
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.warn('Failed to add activity', e);
    return DEFAULT_ACTIVITIES;
  }
}

export function getStoredChatMessages(): ChatMessage[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CHAT_MESSAGES);
    if (!data) {
      return [
        {
          id: 'chat-welcome',
          sender: 'assistant',
          text: `Hello! I'm your Study Buddy Academy Assistant 👋\n\nI can help you review concepts, explain code, clarify Cloud Computing, Data Structures & Algorithms, and guide your studies across Programming, Cloud, Data, AI & Robotics, Networking, and Cybersecurity.\n\nWhat would you like to learn or review today?`,
          timestamp: 'Just now'
        }
      ];
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [];
  } catch {
    return [];
  }
}

export function setStoredChatMessages(messages: ChatMessage[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CHAT_MESSAGES, JSON.stringify(messages.slice(-30)));
  } catch (e) {
    console.warn('Failed to save chat messages', e);
  }
}
