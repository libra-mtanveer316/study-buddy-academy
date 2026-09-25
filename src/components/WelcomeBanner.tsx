import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, BookOpen, Clock } from 'lucide-react';

interface WelcomeBannerProps {
  onExploreSubjects: () => void;
  onStartFocusTimer: () => void;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  onExploreSubjects,
  onStartFocusTimer
}) => {
  const fullSubtitle = "Ready to make progress today?";
  const [displayedSubtitle, setDisplayedSubtitle] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(0);

  const highlights = [
    'Learn smarter',
    'Practice better',
    'Stay consistent',
    'Track your progress'
  ];

  // Typing effect for subtitle
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayedSubtitle(fullSubtitle.slice(0, index));
      if (index >= fullSubtitle.length) {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // Rotating highlight pill
  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % highlights.length);
    }, 2800);

    return () => clearInterval(rotationInterval);
  }, [highlights.length]);

  return (
    <section
      id="welcome-banner-section"
      className="relative overflow-hidden bg-gradient-to-br from-[#DBE2EF]/60 via-[#F9F7F7] to-[#DBE2EF]/40 dark:from-[#112D4E] dark:via-[#0e243e] dark:to-[#173a63] rounded-2xl border border-[#DBE2EF] dark:border-[#1c3e66] p-5 sm:p-7 lg:p-8 shadow-xs transition-all duration-300"
    >
      {/* Subtle decorative background glow shapes */}
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#3F72AF]/10 dark:bg-[#3F72AF]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 right-36 w-48 h-48 rounded-full bg-[#112D4E]/10 dark:bg-[#3F72AF]/10 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          {/* Rotating Highlight Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-white/95 dark:bg-[#112D4E] text-[#3F72AF] dark:text-[#DBE2EF] border border-[#DBE2EF] dark:border-[#1c3e66] shadow-xs backdrop-blur-xs">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3F72AF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3F72AF]" />
            </span>
            <span className="text-[#112D4E]/70 dark:text-[#DBE2EF]/70 font-normal">Focus:</span>
            <span
              id="rotating-highlight-text"
              className="font-semibold text-[#3F72AF] dark:text-[#DBE2EF] transition-all duration-300"
            >
              {highlights[highlightIndex]}
            </span>
          </div>

          {/* Welcome Greeting with #112D4E and #3F72AF highlights */}
          <h1
            id="welcome-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#112D4E] dark:text-white tracking-tight leading-tight"
          >
            Welcome to <span className="text-[#3F72AF] dark:text-[#558bc9]">Study Buddy</span>{' '}
            <span className="text-[#112D4E] dark:text-[#DBE2EF]">Academy</span> 👋
          </h1>

          {/* Typing Reveal Subtitle */}
          <p
            id="welcome-subtitle"
            className="text-sm sm:text-base font-medium text-[#112D4E]/80 dark:text-[#DBE2EF]/90 min-h-[1.5rem]"
          >
            {displayedSubtitle}
            {displayedSubtitle.length < fullSubtitle.length && (
              <span className="inline-block w-1.5 h-4 ml-0.5 bg-[#3F72AF] dark:bg-[#558bc9] animate-pulse" />
            )}
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
          <button
            type="button"
            id="btn-banner-explore-subjects"
            onClick={onExploreSubjects}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#3F72AF] hover:bg-[#315d91] active:scale-[0.98] shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-[#3F72AF]/50 cursor-pointer min-h-[44px]"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explore Subjects</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            type="button"
            id="btn-banner-start-timer"
            onClick={onStartFocusTimer}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#3F72AF] dark:text-[#DBE2EF] bg-white dark:bg-[#112D4E] hover:bg-[#DBE2EF]/60 dark:hover:bg-[#1c3e66] active:scale-[0.98] border border-[#3F72AF] dark:border-[#3F72AF] transition-all focus:outline-none focus:ring-2 focus:ring-[#3F72AF]/50 cursor-pointer shadow-xs min-h-[44px]"
          >
            <Clock className="w-4 h-4" />
            <span>Focus Timer</span>
          </button>
        </div>
      </div>
    </section>
  );
};
