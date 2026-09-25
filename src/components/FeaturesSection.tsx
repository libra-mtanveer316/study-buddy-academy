import React from 'react';
import {
  Sparkles,
  Layers,
  HelpCircle,
  Timer,
  BarChart3,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { ActiveTab } from '../types';

interface FeaturesSectionProps {
  onNavigateTab: (tab: ActiveTab) => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onNavigateTab }) => {
  const features = [
    {
      id: 'feat-assistant',
      title: 'AI Study Assistant',
      description: 'Get simple explanations and study help using the built-in educational assistant.',
      icon: <Sparkles className="w-5 h-5 text-[#3F72AF] dark:text-[#DBE2EF]" />,
      tab: 'chat' as ActiveTab,
      btnText: 'Try Assistant',
    },
    {
      id: 'feat-flashcards',
      title: 'Smart Flashcards',
      description: 'Review important concepts and mark cards as known or needing review.',
      icon: <Layers className="w-5 h-5 text-[#3F72AF] dark:text-[#DBE2EF]" />,
      tab: 'flashcards' as ActiveTab,
      btnText: 'Open Flashcards',
    },
    {
      id: 'feat-quiz',
      title: 'Practice Quizzes',
      description: 'Test your knowledge with subject-based quizzes.',
      icon: <HelpCircle className="w-5 h-5 text-[#3F72AF] dark:text-[#DBE2EF]" />,
      tab: 'quiz' as ActiveTab,
      btnText: 'Start Quiz',
    },
    {
      id: 'feat-timer',
      title: 'Focus Timer',
      description: 'Use focused study sessions to build better study habits.',
      icon: <Timer className="w-5 h-5 text-[#3F72AF] dark:text-[#DBE2EF]" />,
      tab: 'timer' as ActiveTab,
      btnText: 'Start Timer',
    },
    {
      id: 'feat-progress',
      title: 'Progress Tracking',
      description: 'Track study time, quiz results, streaks, and subject progress.',
      icon: <BarChart3 className="w-5 h-5 text-[#16A34A] dark:text-emerald-400" />,
      tab: 'progress' as ActiveTab,
      btnText: 'View Progress',
    },
    {
      id: 'feat-library',
      title: 'Subject Library',
      description: 'Browse subjects and quickly start learning.',
      icon: <BookOpen className="w-5 h-5 text-[#3F72AF] dark:text-[#DBE2EF]" />,
      tab: 'library' as ActiveTab,
      btnText: 'Browse Subjects',
    },
  ];

  return (
    <div id="features-view" className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-[#112D4E] rounded-2xl border border-[#DBE2EF] dark:border-[#1c3e66] p-5 sm:p-6 shadow-xs transition-colors">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-[#3F72AF] dark:text-[#DBE2EF] text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-[#3F72AF]" />
            <span>Core Capabilities</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#112D4E] dark:text-white tracking-tight">
            Study Buddy Academy Key Features
          </h2>
          <p className="text-xs sm:text-sm text-[#112D4E]/70 dark:text-[#DBE2EF]/80 mt-1">
            Designed for computer science and IT students to review material, test knowledge, stay focused, and maintain a consistent learning streak.
          </p>
        </div>
      </div>

      {/* Grid of 6 features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((item) => (
          <div
            key={item.id}
            id={item.id}
            className="bg-white dark:bg-[#112D4E] rounded-2xl border border-[#DBE2EF] dark:border-[#1c3e66] p-6 shadow-xs flex flex-col justify-between hover:border-[#3F72AF] hover:shadow-md transition-all duration-200"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#DBE2EF]/60 dark:bg-[#1c3e66] border border-[#DBE2EF] dark:border-[#244b7a] flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-[#112D4E] dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#112D4E]/75 dark:text-[#DBE2EF]/80 leading-relaxed mb-6">
                {item.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigateTab(item.tab)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3F72AF] dark:text-[#DBE2EF] hover:text-[#112D4E] dark:hover:text-white group pt-3 border-t border-[#DBE2EF] dark:border-[#1c3e66] transition-colors cursor-pointer"
            >
              <span>{item.btnText}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
