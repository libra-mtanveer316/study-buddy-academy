import React from 'react';
import { BookOpen, Layers, BarChart3, ArrowRight, Workflow } from 'lucide-react';
import { ActiveTab } from '../types';

interface HowItWorksSectionProps {
  onNavigateTab: (tab: ActiveTab) => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onNavigateTab }) => {
  const steps = [
    {
      number: '1',
      title: 'Choose',
      description: 'Choose a subject from the Subject Library.',
      detail: 'Select from subjects across Programming, Data & Analytics, AI & Robotics, Computer Networking, Cybersecurity, and Digital Skills.',
      icon: <BookOpen className="w-6 h-6 text-[#3F72AF] dark:text-[#DBE2EF]" />,
      actionText: 'Browse Subject Library',
      tab: 'library' as ActiveTab,
    },
    {
      number: '2',
      title: 'Practice',
      description: 'Use flashcards, quizzes, and the Study Buddy Academy Assistant.',
      detail: 'Review concepts with 3D flip flashcards, take self-graded practice quizzes, or ask educational questions to the curriculum assistant.',
      icon: <Layers className="w-6 h-6 text-[#3F72AF] dark:text-[#DBE2EF]" />,
      actionText: 'Start Flashcard Practice',
      tab: 'flashcards' as ActiveTab,
    },
    {
      number: '3',
      title: 'Track',
      description: 'Track study sessions, quiz results, and subject progress.',
      detail: 'Run Pomodoro focus sessions to automatically log weekly study hours, observe your quiz accuracy, and maintain your study streak.',
      icon: <BarChart3 className="w-6 h-6 text-[#16A34A] dark:text-emerald-400" />,
      actionText: 'Inspect Study Analytics',
      tab: 'progress' as ActiveTab,
    },
  ];

  return (
    <div id="how-it-works-view" className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-[#112D4E] rounded-2xl border border-[#DBE2EF] dark:border-[#1c3e66] p-5 sm:p-6 shadow-xs transition-colors">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-[#3F72AF] dark:text-[#DBE2EF] text-xs font-semibold uppercase tracking-wider mb-1">
            <Workflow className="w-4 h-4 text-[#3F72AF]" />
            <span>Structured Learning Cycle</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#112D4E] dark:text-white tracking-tight">
            How It Works
          </h2>
          <p className="text-xs sm:text-sm text-[#112D4E]/70 dark:text-[#DBE2EF]/80 mt-1">
            A practical, three-step methodology built on proven active recall and Pomodoro focus habits.
          </p>
        </div>
      </div>

      {/* 3 Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step) => (
          <div
            key={step.number}
            id={`step-card-${step.number}`}
            className="bg-white dark:bg-[#112D4E] rounded-2xl border border-[#DBE2EF] dark:border-[#1c3e66] p-6 shadow-xs flex flex-col justify-between relative hover:border-[#3F72AF] hover:shadow-md transition-all duration-200"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#DBE2EF]/60 dark:bg-[#1c3e66] border border-[#DBE2EF] dark:border-[#244b7a] flex items-center justify-center">
                  {step.icon}
                </div>
                <span className="text-3xl font-black text-[#DBE2EF] dark:text-[#1c3e66] font-mono select-none">
                  0{step.number}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#112D4E] dark:text-white mb-1">
                {step.number}. {step.title}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#3F72AF] dark:text-[#DBE2EF] mb-2">
                {step.description}
              </p>
              <p className="text-xs sm:text-sm text-[#112D4E]/75 dark:text-[#DBE2EF]/80 leading-relaxed mb-6">
                {step.detail}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigateTab(step.tab)}
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold text-[#112D4E] dark:text-[#DBE2EF] bg-[#DBE2EF]/60 dark:bg-[#1c3e66] hover:bg-[#DBE2EF] dark:hover:bg-[#244b7a] border border-[#DBE2EF] dark:border-[#244b7a] transition-colors shadow-2xs cursor-pointer"
            >
              <span>{step.actionText}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#3F72AF] dark:text-[#DBE2EF]" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
