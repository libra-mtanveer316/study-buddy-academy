import React from 'react';
import { Info, BookOpen, GraduationCap, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div id="about-view" className="space-y-6 animate-in fade-in duration-300">
      {/* Main Header */}
      <div className="bg-white dark:bg-[#112D4E] rounded-2xl border border-[#DBE2EF] dark:border-[#1c3e66] p-5 sm:p-6 shadow-xs transition-colors">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-[#3F72AF] dark:text-[#DBE2EF] text-xs font-semibold uppercase tracking-wider mb-1">
            <Info className="w-4 h-4 text-[#3F72AF]" />
            <span>Project Overview</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#112D4E] dark:text-white tracking-tight">
            About Study Buddy Academy
          </h2>
          <p className="text-xs sm:text-sm text-[#112D4E]/70 dark:text-[#DBE2EF]/80 mt-1">
            An educational web application created to consolidate study habits and curriculum practice into a single unified browser platform.
          </p>
        </div>
      </div>

      {/* Purpose & Curriculum Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#112D4E] rounded-2xl border border-[#DBE2EF] dark:border-[#1c3e66] p-4 sm:p-6 shadow-xs space-y-4 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-[#DBE2EF]/60 text-[#3F72AF] dark:bg-[#1c3e66] dark:text-[#DBE2EF] border border-[#DBE2EF] dark:border-[#244b7a] flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-[#112D4E] dark:text-white">
            Designed for Real Student Needs
          </h3>
          <p className="text-xs sm:text-sm text-[#112D4E]/75 dark:text-[#DBE2EF]/80 leading-relaxed">
            Study Buddy Academy is a student-focused project designed to bring <strong>learning</strong>, <strong>practice</strong>, <strong>productivity</strong>, and <strong>progress tracking</strong> into one simple application.
          </p>
          <p className="text-xs sm:text-sm text-[#112D4E]/75 dark:text-[#DBE2EF]/80 leading-relaxed">
            Rather than jumping between disconnected websites for flashcards, countdown timers, quiz drills, and notes, Study Buddy Academy provides an integrated study environment that works directly in your web browser.
          </p>
        </div>

        <div className="bg-white dark:bg-[#112D4E] rounded-2xl border border-[#DBE2EF] dark:border-[#1c3e66] p-4 sm:p-6 shadow-xs space-y-4 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-[#DBE2EF]/60 text-[#3F72AF] dark:bg-[#1c3e66] dark:text-[#DBE2EF] border border-[#DBE2EF] dark:border-[#244b7a] flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-[#112D4E] dark:text-white">
            Comprehensive Curriculum Subjects
          </h3>
          <p className="text-xs sm:text-sm text-[#112D4E]/75 dark:text-[#DBE2EF]/80 leading-relaxed">
            The platform covers essential computer science and technology domains taught across modern diplomas and degree tracks:
          </p>
          <ul className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-2 text-xs font-medium text-[#112D4E]/85 dark:text-[#DBE2EF] pt-1">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
              <span>Programming & Web</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
              <span>Data & Analytics</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
              <span>AI & Robotics</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
              <span>Machine Learning</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
              <span>Cyber Security</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
              <span>Computer Networking</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
              <span>Digital Marketing</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
              <span>Cloud Computing</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Practical Architecture Note (Secondary background #DBE2EF) */}
      <div className="bg-[#DBE2EF]/40 dark:bg-[#0e243e] rounded-2xl border border-[#DBE2EF] dark:border-[#1c3e66] p-5 sm:p-6 text-xs sm:text-sm text-[#112D4E]/80 dark:text-[#DBE2EF]/80 leading-relaxed transition-colors">
        <h2 className="text-base sm:text-lg font-bold text-[#112D4E] dark:text-white mb-2">
          Browser-Native Architecture
        </h2>
        <p className="text-[#112D4E]/75 dark:text-[#DBE2EF]/80">
          Study Buddy uses client-side state and browser LocalStorage to save your learning progress. Goals, flashcard statuses, quiz results, and focus sessions are stored directly in your browser.
        </p>
      </div>
    </div>
  );
};
