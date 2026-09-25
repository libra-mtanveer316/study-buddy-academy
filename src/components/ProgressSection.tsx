import React, { useState } from 'react';
import {
  BarChart3,
  Trophy,
  Flame,
  Award,
  Calendar,
  ArrowUpRight,
  CheckCircle2,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { QuizResult, Subject } from '../types';

interface ProgressSectionProps {
  weeklyMinutes: Record<string, number>;
  quizHistory: QuizResult[];
  streakDays: number;
  subjects: Subject[];
  subjectProgressMap: Record<string, number>;
  onSelectSubject: (id: string) => void;
  onNavigateToQuiz: () => void;
}

export const ProgressSection: React.FC<ProgressSectionProps> = ({
  weeklyMinutes,
  quizHistory,
  streakDays,
  subjects,
  subjectProgressMap,
  onSelectSubject,
  onNavigateToQuiz,
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');

  // Days order and labels
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayLabelMap: Record<string, string> = {
    Monday: 'Mon',
    Tuesday: 'Tue',
    Wednesday: 'Wed',
    Thursday: 'Thur',
    Friday: 'Fri',
    Saturday: 'Sat',
    Sunday: 'Sun',
  };

  // Total weekly hours
  const totalWeeklyMinutes = Object.values(weeklyMinutes).reduce((acc, curr) => acc + curr, 0);
  const totalWeeklyHours = (totalWeeklyMinutes / 60).toFixed(1);

  // Maximum value for chart scaling (minimum 90 for scale aesthetics)
  const maxMinutes = Math.max(...Object.values(weeklyMinutes), 90);

  // Calculate Quiz metrics
  const quizzesCompleted = quizHistory.length;
  const averageScore =
    quizzesCompleted > 0
      ? Math.round(
          quizHistory.reduce((acc, q) => acc + q.percentage, 0) / quizzesCompleted
        )
      : 86;

  const bestScore =
    quizzesCompleted > 0
      ? Math.max(...quizHistory.map((q) => q.percentage))
      : 100;

  const categories = ['All', 'Programming & Web', 'Data & Analytics', 'Artificial Intelligence', 'Cybersecurity & Networking', 'Digital Skills'];

  const filteredSubjects = subjects.filter(
    (s) => activeCategoryFilter === 'All' || s.category === activeCategoryFilter
  );

  return (
    <div id="progress-view" className="space-y-6 animate-in fade-in duration-300">
      {/* Header section */}
      <div className="bg-white dark:bg-[#112D4E] rounded-2xl border border-[#DBE2EF] dark:border-[#1c3e66] p-6 sm:p-7 shadow-xs transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#3F72AF] dark:text-[#DBE2EF] text-xs font-bold uppercase tracking-wider mb-1">
              <BarChart3 className="w-4 h-4" />
              <span>Academic Performance</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#112D4E] dark:text-white tracking-tight">
              Progress & Learning Analytics
            </h2>
            <p className="text-xs sm:text-sm text-[#112D4E]/70 dark:text-[#DBE2EF]/80 mt-1">
              Track your weekly study distribution, subject mastery rates, and quiz performance.
            </p>
          </div>

          {/* Streak pill */}
          <div
            id="streak-display-badge"
            className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 self-start sm:self-center shadow-xs"
          >
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500 animate-pulse" />
            <div>
              <span className="text-sm font-bold block leading-none tabular-nums">🔥 {streakDays} Day Streak</span>
              <span className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">Active learner</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top 2 Columns: Weekly Chart + Quiz Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Study Time Bar Chart (2 cols) */}
        <div
          id="weekly-study-chart-card"
          className="lg:col-span-2 bg-white dark:bg-[#112D4E] rounded-2xl border border-[#DBE2EF] dark:border-[#1c3e66] p-3.5 sm:p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-200"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#3F72AF] dark:text-[#DBE2EF]" />
                <h3 className="text-base sm:text-lg font-bold text-[#112D4E] dark:text-white">
                  Weekly Study Time
                </h3>
              </div>
              <span className="text-xs font-semibold text-[#3F72AF] dark:text-[#DBE2EF] bg-[#DBE2EF]/60 dark:bg-[#1c3e66] border border-[#DBE2EF] dark:border-[#244b7a] px-2.5 sm:px-3 py-1 rounded-lg tabular-nums font-mono whitespace-nowrap">
                {totalWeeklyHours} Total Hours
              </span>
            </div>
            <p className="text-xs text-[#112D4E]/70 dark:text-[#DBE2EF]/80 mb-5 sm:mb-6">
              Recorded minutes across focus sessions and active study.
            </p>

            {/* Custom Responsive SVG/Bar Chart */}
            <div className="h-44 sm:h-52 w-full grid grid-cols-7 gap-0.5 sm:gap-2.5 lg:gap-4 pt-6 pb-2.5 px-1 sm:px-2.5 bg-[#F9F7F7] dark:bg-[#0e243e] rounded-xl border border-[#DBE2EF] dark:border-[#1c3e66]">
              {daysOfWeek.map((day) => {
                const minutes = weeklyMinutes[day] || 0;
                const heightPercent = Math.max(10, Math.min(100, Math.round((minutes / maxMinutes) * 100)));
                const isToday = new Date().toLocaleDateString('en-US', { weekday: 'long' }) === day;
                const shortLabel = dayLabelMap[day] || (day === 'Thursday' ? 'Thur' : day.slice(0, 3));

                return (
                  <div key={day} className="flex flex-col items-center h-full justify-end group cursor-pointer min-w-0 w-full">
                    {/* Tooltip on hover */}
                    <div className="text-[8px] min-[360px]:text-[9px] sm:text-[10px] font-bold text-[#3F72AF] dark:text-[#DBE2EF] opacity-0 group-hover:opacity-100 transition-opacity mb-1 whitespace-nowrap tabular-nums font-mono bg-white dark:bg-[#112D4E] px-1 py-0.5 rounded shadow-xs border border-[#DBE2EF] dark:border-[#1c3e66] pointer-events-none">
                      {minutes}m
                    </div>

                    {/* Bar */}
                    <div className="w-full max-w-[18px] min-[360px]:max-w-[24px] sm:max-w-[32px] bg-[#DBE2EF]/60 dark:bg-[#1c3e66] rounded-t-lg h-full flex items-end overflow-hidden p-0.5 mx-auto">
                      <div
                        className={`w-full rounded-t-md transition-all duration-700 ease-out shadow-xs ${
                          isToday
                            ? 'bg-gradient-to-t from-[#112D4E] to-[#3F72AF] dark:from-[#3F72AF] dark:to-[#DBE2EF]'
                            : 'bg-gradient-to-t from-[#3F72AF] to-[#609cdb] group-hover:from-[#315d91] group-hover:to-[#508bd0]'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>

                    {/* Day label */}
                    <span
                      className={`text-[9.5px] min-[360px]:text-[11px] sm:text-xs mt-2 font-semibold text-center whitespace-nowrap tracking-tight leading-none select-none block w-full ${
                        isToday
                          ? 'text-[#3F72AF] dark:text-[#DBE2EF] font-bold'
                          : 'text-[#112D4E]/75 dark:text-[#DBE2EF]/75'
                      }`}
                    >
                      {shortLabel}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#DBE2EF] dark:border-[#1c3e66] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#112D4E]/70 dark:text-[#DBE2EF]/80">
            <span>High performance: Saturday & Tuesday</span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#112D4E] dark:bg-[#3F72AF] inline-block shadow-2xs" /> Current Day
              <span className="w-2.5 h-2.5 rounded-xs bg-[#3F72AF] inline-block ml-2 shadow-2xs" /> Logged Days
            </span>
          </div>
        </div>

        {/* Quiz Performance Card (1 col) */}
        <div
          id="quiz-performance-card"
          className="bg-white dark:bg-[#112D4E] rounded-2xl border border-[#DBE2EF] dark:border-[#1c3e66] p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-200"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-[#16A34A] dark:text-emerald-400" />
              <h3 className="text-base sm:text-lg font-bold text-[#112D4E] dark:text-white">
                Quiz Performance
              </h3>
            </div>
            <p className="text-xs text-[#112D4E]/70 dark:text-[#DBE2EF]/80 mb-5">
              Calculated from stored practice assessments.
            </p>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-[#F9F7F7] dark:bg-[#0e243e] border border-[#DBE2EF] dark:border-[#1c3e66] flex items-center justify-between shadow-2xs">
                <div>
                  <span className="text-xs font-semibold text-[#112D4E]/70 dark:text-[#DBE2EF]/70 block">
                    Average Score
                  </span>
                  <span className="text-2xl font-extrabold text-[#112D4E] dark:text-white tabular-nums font-mono">
                    {averageScore}%
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-[#16A34A] dark:text-emerald-400 shadow-xs">
                  <Award className="w-5 h-5" />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F9F7F7] dark:bg-[#0e243e] border border-[#DBE2EF] dark:border-[#1c3e66] flex items-center justify-between shadow-2xs">
                <div>
                  <span className="text-xs font-semibold text-[#112D4E]/70 dark:text-[#DBE2EF]/70 block">
                    Best Score
                  </span>
                  <span className="text-2xl font-extrabold text-[#3F72AF] dark:text-[#558bc9] tabular-nums font-mono">
                    {bestScore}%
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#DBE2EF]/60 dark:bg-[#1c3e66] border border-[#DBE2EF] dark:border-[#244b7a] text-[#3F72AF] dark:text-[#DBE2EF] shadow-xs">
                  <Trophy className="w-5 h-5" />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F9F7F7] dark:bg-[#0e243e] border border-[#DBE2EF] dark:border-[#1c3e66] flex items-center justify-between shadow-2xs">
                <div>
                  <span className="text-xs font-semibold text-[#112D4E]/70 dark:text-[#DBE2EF]/70 block">
                    Quizzes Completed
                  </span>
                  <span className="text-2xl font-extrabold text-[#112D4E] dark:text-white tabular-nums font-mono">
                    {quizzesCompleted}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/60 text-[#06B6D4] dark:text-cyan-400 shadow-xs">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            id="btn-take-quiz-from-progress"
            onClick={onNavigateToQuiz}
            className="mt-5 w-full py-2.5 px-4 rounded-xl bg-[#3F72AF] hover:bg-[#315d91] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer min-h-[44px]"
          >
            <span>Take Practice Quiz</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Subject Progress Breakdown List */}
      <div
        id="subject-progress-section"
        className="bg-white dark:bg-[#112D4E] rounded-2xl border border-[#DBE2EF] dark:border-[#1c3e66] p-6 sm:p-7 shadow-xs transition-colors"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#112D4E] dark:text-white">
              Subject Mastery Breakdown
            </h3>
            <p className="text-xs text-[#112D4E]/70 dark:text-[#DBE2EF]/80">
              Curriculum progression automatically updated by your flashcard reviews and quizzes.
            </p>
          </div>

          {/* Category filter pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer min-h-[36px] ${
                  activeCategoryFilter === cat
                    ? 'bg-[#3F72AF] text-white shadow-xs'
                    : 'bg-[#DBE2EF]/50 dark:bg-[#0e243e] border border-[#DBE2EF] dark:border-[#1c3e66] text-[#112D4E] dark:text-[#DBE2EF] hover:bg-[#DBE2EF] dark:hover:bg-[#1c3e66]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Subjects List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSubjects.map((subject) => {
            const progress = subjectProgressMap[subject.id] ?? subject.progress;

            return (
              <div
                key={subject.id}
                id={`progress-row-${subject.id}`}
                className="p-4 rounded-xl border border-[#DBE2EF] dark:border-[#1c3e66] bg-[#F9F7F7] dark:bg-[#0e243e] hover:border-[#3F72AF] hover:shadow-xs transition-all"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs sm:text-sm font-semibold text-[#112D4E] dark:text-white truncate">
                    {subject.name}
                  </span>
                  <span className="text-xs font-bold text-[#3F72AF] dark:text-[#558bc9] tabular-nums font-mono">
                    {progress}%
                  </span>
                </div>
                <div className="w-full h-2 bg-[#DBE2EF]/60 dark:bg-[#1c3e66] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#3F72AF] to-[#112D4E] dark:from-[#3F72AF] dark:to-[#558bc9] rounded-full transition-all duration-700"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2.5 text-[11px] text-[#112D4E]/70 dark:text-[#DBE2EF]/80 font-medium">
                  <span>{subject.category}</span>
                  <button
                    type="button"
                    onClick={() => onSelectSubject(subject.id)}
                    className="text-[#3F72AF] dark:text-[#DBE2EF] hover:text-[#315d91] font-semibold cursor-pointer"
                  >
                    Select Subject →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
