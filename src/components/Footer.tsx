import React from 'react';
import studyBuddyLogo from '../assets/images/study_buddy_logo_1790332834397.jpg';
import { Github, Linkedin } from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterProps {
  onNavigateTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  return (
    <footer
      id="main-footer"
      className="mt-16 border-t border-[#1c3e66] bg-[#112D4E] text-white transition-colors pb-24 md:pb-0"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Top Section: Brand, Navigation Links & Student Badge */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          {/* Brand & Subtitle */}
          <div className="flex items-center gap-3">
            <img
              src={studyBuddyLogo}
              alt="Study Buddy Academy Logo"
              width="36"
              height="36"
              className="w-9 h-9 rounded-xl object-contain aspect-square shadow-xs shrink-0 border border-[#3F72AF]/40"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center justify-center md:justify-start gap-1.5 sm:gap-2 whitespace-nowrap">
                <span className="font-bold text-xs min-[360px]:text-sm sm:text-base text-white tracking-tight whitespace-nowrap">
                  Study Buddy
                </span>
                <span className="inline-flex items-center px-1.5 min-[360px]:px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] min-[360px]:text-[10px] sm:text-xs font-semibold bg-[#2DD4BF] text-white tracking-normal whitespace-nowrap shrink-0 hover:bg-[#20c2ad] transition-colors">
                  Academy
                </span>
              </div>
              <p className="text-xs text-[#DBE2EF]/80 mt-0.5">
                Learn smarter. Stay consistent.
              </p>
            </div>
          </div>

          {/* Quick Links Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-5 gap-y-2 text-xs sm:text-sm font-medium text-[#DBE2EF]">
            <button
              type="button"
              onClick={() => onNavigateTab('dashboard')}
              className="py-1 px-1 hover:text-white hover:underline transition-colors cursor-pointer"
            >
              Dashboard
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('chat')}
              className="py-1 px-1 hover:text-white hover:underline transition-colors cursor-pointer"
            >
              AI Assistant
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('flashcards')}
              className="py-1 px-1 hover:text-white hover:underline transition-colors cursor-pointer"
            >
              Flashcards
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('quiz')}
              className="py-1 px-1 hover:text-white hover:underline transition-colors cursor-pointer"
            >
              Quizzes
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('timer')}
              className="py-1 px-1 hover:text-white hover:underline transition-colors cursor-pointer"
            >
              Focus Timer
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('progress')}
              className="py-1 px-1 hover:text-white hover:underline transition-colors cursor-pointer"
            >
              Progress
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('contact')}
              className="py-1 px-1 hover:text-white hover:underline transition-colors cursor-pointer"
            >
              Contact Us
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('developer')}
              className="py-1 px-1 hover:text-white hover:underline transition-colors cursor-pointer"
            >
              Developer
            </button>
          </div>

          {/* Social / Author note */}
          <div className="flex items-center justify-center gap-3 text-xs text-[#DBE2EF]">
            <span className="font-medium">Aptech Academy Student</span>
            <div className="flex items-center gap-1.5">
              <a
                href="https://www.linkedin.com/in/muhammad-tanveer16039"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Developer LinkedIn"
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#1c3e66] text-[#DBE2EF] hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/libra-mtanveer316"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Developer GitHub"
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#1c3e66] text-[#DBE2EF] hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Developer Credit & Copyright (100% visible, fully responsive, zero text cutoff) */}
        <div className="mt-8 pt-6 border-t border-[#1c3e66] text-center space-y-2 flex flex-col items-center justify-center w-full">
          <p className="text-center text-xs sm:text-sm text-[#DBE2EF]/90 leading-relaxed max-w-3xl mx-auto break-words px-2">
            Developed by Muhammad Tanveer • BS Computer Science, Dawood University of Engineering & Technology
          </p>
          <p className="text-white font-medium text-xs sm:text-sm leading-normal text-center sm:whitespace-nowrap break-words px-2">
            © 2026 Study Buddy Academy
          </p>
        </div>
      </div>
    </footer>
  );
};
