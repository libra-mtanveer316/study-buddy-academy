import React from 'react';
import {
  User,
  GraduationCap,
  ExternalLink,
  Github,
  Linkedin,
  Award
} from 'lucide-react';

export const DeveloperSection: React.FC = () => {
  const handleProfileClick = () => {
    window.open('https://www.linkedin.com/in/muhammad-tanveer16039/', '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="developer-view" className="space-y-6 animate-in fade-in duration-300">
      {/* Profile Section Header */}
      <div className="bg-white dark:bg-[#112D4E] rounded-2xl border border-[#DBE2EF] dark:border-[#1c3e66] p-5 sm:p-6 shadow-xs transition-colors">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-[#3F72AF] dark:text-[#DBE2EF] text-xs font-semibold uppercase tracking-wider mb-1">
            <User className="w-4 h-4" />
            <span>Developer Profile</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#112D4E] dark:text-white tracking-tight">
            Developer Information
          </h2>
          <p className="text-xs sm:text-sm text-[#112D4E]/70 dark:text-[#DBE2EF]/80 mt-1">
            Study Buddy Academy — Designed and developed by Muhammad Tanveer.
          </p>
        </div>
      </div>

      {/* Developer Profile Card */}
      <div
        id="developer-profile-card"
        onClick={handleProfileClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleProfileClick();
          }
        }}
        className="max-w-2xl mx-auto bg-white dark:bg-[#112D4E] rounded-2xl border border-[#DBE2EF] dark:border-[#1c3e66] hover:border-[#3F72AF] dark:hover:border-[#3F72AF] p-4 sm:p-8 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-6 select-none focus:outline-none focus:ring-2 focus:ring-[#3F72AF]"
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          {/* Avatar initial container */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#112D4E] via-[#3F72AF] to-[#558bc9] text-white flex items-center justify-center text-2xl font-bold shadow-xs shrink-0 border border-[#3F72AF]/40">
            MT
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#DBE2EF]/60 text-[#3F72AF] dark:bg-[#1c3e66] dark:text-[#DBE2EF] border border-[#DBE2EF] dark:border-[#244b7a] mb-1">
              <Award className="w-3.5 h-3.5 text-[#3F72AF]" />
              <span>Aptech Academy Student</span>
            </div>
            <h3 className="text-2xl font-bold text-[#112D4E] dark:text-white tracking-tight">
              Muhammad Tanveer
            </h3>
            <p className="text-sm font-medium text-[#112D4E]/85 dark:text-[#DBE2EF] flex items-center justify-center sm:justify-start gap-1.5">
              <GraduationCap className="w-4 h-4 text-[#3F72AF] dark:text-[#DBE2EF] shrink-0" />
              <span>BS Computer Science Student</span>
            </p>
            <p className="text-xs sm:text-sm text-[#112D4E]/70 dark:text-[#DBE2EF]/70">
              Dawood University of Engineering & Technology (DUET)
            </p>
          </div>
        </div>

        {/* Project Statement */}
        <div className="p-4 rounded-xl bg-[#F9F7F7] dark:bg-[#0e243e] border border-[#DBE2EF] dark:border-[#1c3e66] text-xs sm:text-sm text-[#112D4E]/75 dark:text-[#DBE2EF]/80 leading-relaxed">
          <p>
            Study Buddy Academy is an educational web platform built to provide students with active recall flashcards, self-assessing quizzes, Pomodoro focus tracking, and a curriculum assistant in a fast, browser-native environment.
          </p>
        </div>

        {/* Action Buttons: Primary LinkedIn & Secondary GitHub */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          {/* Primary Button */}
          <a
            id="dev-linkedin-btn"
            href="https://www.linkedin.com/in/muhammad-tanveer16039/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#3F72AF] hover:bg-[#315d91] active:scale-[0.98] shadow-xs transition-colors min-h-[44px]"
          >
            <Linkedin className="w-4 h-4" />
            <span>View LinkedIn Profile</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>

          {/* Secondary Button */}
          <a
            id="dev-github-btn"
            href="https://github.com/libra-mtanveer316"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#112D4E] dark:text-[#DBE2EF] bg-[#DBE2EF]/60 hover:bg-[#DBE2EF] dark:bg-[#1c3e66] dark:hover:bg-[#244b7a] border border-[#DBE2EF] dark:border-[#244b7a] transition-colors shadow-2xs min-h-[44px]"
          >
            <Github className="w-4 h-4" />
            <span>View GitHub</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        </div>

        {/* Technical Architecture Specs */}
        <div className="pt-4 border-t border-[#DBE2EF] dark:border-[#1c3e66] text-[11px] text-[#112D4E]/60 dark:text-[#DBE2EF]/60 flex flex-wrap items-center justify-between gap-2">
          <span>Stack: React 19 • TypeScript • Vite • Tailwind CSS</span>
          <span>Storage: Browser LocalStorage</span>
          <span>Platform: Study Buddy Academy</span>
        </div>
      </div>
    </div>
  );
};
