import React, { useState, useEffect } from 'react';
import { ActiveTab, ActivityItem, ChatMessage, GoalItem, QuizResult, Subject } from './types';
import { SUBJECTS } from './data/subjects';
import {
  getStoredTheme,
  setStoredTheme,
  getStoredSelectedSubject,
  setStoredSelectedSubject,
  getStoredGoals,
  setStoredGoals,
  getStoredStudyTime,
  setStoredStudyTime,
  getStoredStreak,
  setStoredStreak,
  getStoredQuizHistory,
  saveQuizResult,
  getStoredWeeklyMinutes,
  addStudyMinutesToWeekly,
  getStoredSubjectProgress,
  updateStoredSubjectProgress,
  getStoredCardStatus,
  saveCardStatus,
  getStoredActivities,
  addActivity,
  getStoredChatMessages,
  setStoredChatMessages,
} from './utils/storage';

import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { SubjectLibrary } from './components/SubjectLibrary';
import { StudyAssistant } from './components/StudyAssistant';
import { FlashcardsSection } from './components/FlashcardsSection';
import { QuizSection } from './components/QuizSection';
import { FocusTimer } from './components/FocusTimer';
import { ProgressSection } from './components/ProgressSection';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { DeveloperSection } from './components/DeveloperSection';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ToastContainer, ToastMessage } from './components/Toast';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => getStoredTheme());

  // Navigation tab
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  // Subjects & Selected Subject
  const [subjects] = useState<Subject[]>(SUBJECTS);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(() => getStoredSelectedSubject());

  // Goals & Activities
  const [goals, setGoals] = useState<GoalItem[]>(() => getStoredGoals());
  const [activities, setActivities] = useState<ActivityItem[]>(() => getStoredActivities());

  // Study time & Streak
  const [studyTimeMinutes, setStudyTimeMinutes] = useState<number>(() => getStoredStudyTime());
  const [studyStreakDays, setStudyStreakDays] = useState<number>(() => getStoredStreak());

  // Subject Progress & Card status
  const [subjectProgressMap, setSubjectProgressMap] = useState<Record<string, number>>(() => getStoredSubjectProgress());
  const [cardStatusMap, setCardStatusMap] = useState<Record<string, { known: boolean; needReview: boolean }>>(() => getStoredCardStatus());

  // Quizzes & Weekly Study
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>(() => getStoredQuizHistory());
  const [weeklyMinutes, setWeeklyMinutes] = useState<Record<string, number>>(() => getStoredWeeklyMinutes());

  // Chat messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => getStoredChatMessages());

  // Ephemeral toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Apply dark mode class to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setStoredTheme(theme);
  }, [theme]);

  // Sync selected subject to localStorage
  useEffect(() => {
    setStoredSelectedSubject(selectedSubjectId);
  }, [selectedSubjectId]);

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    const newToast: ToastMessage = {
      id: 'toast-' + Date.now() + Math.random().toString(36).substring(2, 6),
      text,
      type,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Find active subject
  const currentSubject = subjects.find((s) => s.id === selectedSubjectId) || subjects[0];
  const currentSubjectProgress = subjectProgressMap[currentSubject.id] ?? currentSubject.progress;

  // Goals handler
  const handleToggleGoal = (id: string) => {
    setGoals((prev) => {
      const updated = prev.map((g) => {
        if (g.id === id) {
          const nextCompleted = !g.completed;
          if (nextCompleted) {
            showToast('Goal completed ✓', 'success');
            const newActs = addActivity({
              title: 'Finished study goal',
              type: 'goal',
              detail: `Checked off: ${g.text}`,
            });
            setActivities(newActs);
          }
          return { ...g, completed: nextCompleted };
        }
        return g;
      });
      setStoredGoals(updated);
      return updated;
    });
  };

  const handleAddGoal = (text: string) => {
    const newGoal: GoalItem = {
      id: 'goal-' + Date.now(),
      text,
      completed: false,
    };
    setGoals((prev) => {
      const updated = [...prev, newGoal];
      setStoredGoals(updated);
      return updated;
    });
    showToast('New study goal added', 'info');
  };

  // Quiz completion handler
  const handleQuizCompleted = (result: QuizResult) => {
    const updatedHistory = saveQuizResult(result);
    setQuizHistory(updatedHistory);

    // Boost subject progress by 5-10%
    const newProgress = updateStoredSubjectProgress(result.subjectId, 8);
    setSubjectProgressMap((prev) => ({ ...prev, [result.subjectId]: newProgress }));

    // Add activity
    const newActs = addActivity({
      title: 'Completed quiz',
      type: 'quiz',
      detail: `Scored ${result.percentage}% on ${result.subjectName} Practice Quiz`,
    });
    setActivities(newActs);

    showToast(`Quiz completed! Score: ${result.percentage}%`, 'success');
  };

  // Focus Timer completed session handler
  const handleSessionCompleted = (durationMinutes: number) => {
    const newTime = studyTimeMinutes + durationMinutes;
    setStudyTimeMinutes(newTime);
    setStoredStudyTime(newTime);

    // Update weekly chart
    addStudyMinutesToWeekly(durationMinutes);
    setWeeklyMinutes(getStoredWeeklyMinutes());

    // Update streak if needed
    setStoredStreak(studyStreakDays);

    // Add activity
    const newActs = addActivity({
      title: 'Completed focus session',
      type: 'timer',
      detail: `Finished ${durationMinutes} minutes of focused study`,
    });
    setActivities(newActs);

    showToast('Focus session complete! 🎉 Study time updated', 'success');
  };

  // Flashcards marking handler
  const handleMarkCard = (cardId: string, status: { known: boolean; needReview: boolean }) => {
    saveCardStatus(cardId, status);
    setCardStatusMap((prev) => ({ ...prev, [cardId]: status }));

    if (status.known) {
      // Slightly boost subject progress
      const newProg = updateStoredSubjectProgress(currentSubject.id, 2);
      setSubjectProgressMap((prev) => ({ ...prev, [currentSubject.id]: newProg }));
      showToast('Card marked as Known ✓', 'success');
    } else {
      showToast('Card marked for Review', 'info');
    }
  };

  // Chat message send handler
  const handleSendMessage = (userText: string, assistantResponse: string) => {
    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: userText,
      timestamp: 'Just now',
      subjectName: currentSubject.name,
    };

    const botMsg: ChatMessage = {
      id: 'msg-' + (Date.now() + 1),
      sender: 'assistant',
      text: assistantResponse,
      timestamp: 'Just now',
      subjectName: currentSubject.name,
    };

    const updated = [...chatMessages, userMsg, botMsg];
    setChatMessages(updated);
    setStoredChatMessages(updated);
  };

  const handleClearChat = () => {
    const initial: ChatMessage[] = [
      {
        id: 'msg-init',
        sender: 'assistant',
        text: `Chat reset. What would you like to review in ${currentSubject.name}?`,
        timestamp: 'Just now',
      },
    ];
    setChatMessages(initial);
    setStoredChatMessages(initial);
    showToast('Chat history cleared', 'info');
  };

  // Calculate stats for dashboard
  const completedGoalsCount = goals.filter((g) => g.completed).length;
  const avgQuizScore =
    quizHistory.length > 0
      ? Math.round(quizHistory.reduce((acc, q) => acc + q.percentage, 0) / quizHistory.length)
      : 86;

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-[#F9F7F7] dark:bg-[#0b1a2e] text-[#112D4E] dark:text-[#F9F7F7] transition-colors duration-200">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        streakDays={studyStreakDays}
      />

      {/* Main Content Area with safe bottom spacing for mobile bottom navigation */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 pb-24 md:pb-8 min-w-0">
        {activeTab === 'dashboard' && (
          <Dashboard
            currentSubject={currentSubject}
            currentSubjectProgress={currentSubjectProgress}
            goals={goals}
            onToggleGoal={handleToggleGoal}
            onAddGoal={handleAddGoal}
            activities={activities}
            studyTimeMinutes={studyTimeMinutes}
            tasksCompleted={completedGoalsCount + 4}
            quizScoreAverage={avgQuizScore}
            studyStreakDays={studyStreakDays}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'chat' && (
          <StudyAssistant
            currentSubject={currentSubject}
            messages={chatMessages}
            onSendMessage={handleSendMessage}
            onClearChat={handleClearChat}
          />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsSection
            subjects={subjects}
            currentSubject={currentSubject}
            onSelectSubject={setSelectedSubjectId}
            cardStatusMap={cardStatusMap}
            onMarkCard={handleMarkCard}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizSection
            subjects={subjects}
            currentSubject={currentSubject}
            onSelectSubject={setSelectedSubjectId}
            onQuizCompleted={handleQuizCompleted}
            onNavigateToCards={() => setActiveTab('flashcards')}
          />
        )}

        {activeTab === 'timer' && (
          <FocusTimer onSessionCompleted={handleSessionCompleted} />
        )}

        {activeTab === 'progress' && (
          <ProgressSection
            weeklyMinutes={weeklyMinutes}
            quizHistory={quizHistory}
            streakDays={studyStreakDays}
            subjects={subjects}
            subjectProgressMap={subjectProgressMap}
            onSelectSubject={(id) => {
              setSelectedSubjectId(id);
              setActiveTab('flashcards');
            }}
            onNavigateToQuiz={() => setActiveTab('quiz')}
          />
        )}

        {activeTab === 'library' && (
          <SubjectLibrary
            subjects={subjects}
            selectedSubjectId={selectedSubjectId}
            subjectProgressMap={subjectProgressMap}
            onSelectSubject={setSelectedSubjectId}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'features' && (
          <FeaturesSection onNavigateTab={setActiveTab} />
        )}

        {activeTab === 'how-it-works' && (
          <HowItWorksSection onNavigateTab={setActiveTab} />
        )}

        {activeTab === 'about' && <AboutSection />}

        {activeTab === 'contact' && <ContactSection />}

        {activeTab === 'developer' && <DeveloperSection />}
      </main>

      {/* Footer */}
      <Footer onNavigateTab={setActiveTab} />

      {/* Mobile Bottom Navigation Dock (Phones) */}
      <MobileBottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Floating Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
