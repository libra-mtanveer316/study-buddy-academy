import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Layers,
  HelpCircle,
  Timer
} from 'lucide-react';
import { ActiveTab } from '../types';

interface MobileBottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onTabChange,
}) => {
  const bottomNavTabs: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'library', label: 'Subjects', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'flashcards', label: 'Cards', icon: <Layers className="w-5 h-5" /> },
    { id: 'quiz', label: 'Quiz', icon: <HelpCircle className="w-5 h-5" /> },
    { id: 'timer', label: 'Timer', icon: <Timer className="w-5 h-5" /> },
  ];

  return (
    <nav
      id="mobile-bottom-navigation"
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#F9F7F7]/95 dark:bg-[#112D4E]/95 backdrop-blur-md border-t border-[#DBE2EF] dark:border-[#1c3e66] shadow-xl px-2 py-1.5 transition-colors"
    >
      <div className="grid grid-cols-5 items-center max-w-md mx-auto">
        {bottomNavTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`mobile-dock-${tab.id}`}
              type="button"
              onClick={() => {
                onTabChange(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer select-none active:scale-[0.93] ${
                isActive
                  ? 'text-[#3F72AF] dark:text-[#DBE2EF] font-bold'
                  : 'text-[#112D4E]/70 dark:text-[#DBE2EF]/70 hover:text-[#112D4E] dark:hover:text-white font-medium'
              }`}
            >
              <div
                className={`p-1 rounded-lg transition-transform ${
                  isActive
                    ? 'bg-[#DBE2EF] dark:bg-[#3F72AF]/30 scale-110'
                    : 'bg-transparent'
                }`}
              >
                {tab.icon}
              </div>
              <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
