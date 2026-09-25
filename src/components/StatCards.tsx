import React, { useEffect, useState } from 'react';
import { Clock, CheckSquare, Trophy, Flame } from 'lucide-react';

interface StatCardsProps {
  studyTimeMinutes: number;
  tasksCompleted: number;
  quizScoreAverage: number;
  studyStreakDays: number;
}

export const StatCards: React.FC<StatCardsProps> = ({
  studyTimeMinutes,
  tasksCompleted,
  quizScoreAverage,
  studyStreakDays,
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 900; // ms

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setAnimatedProgress(progress);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const animId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animId);
  }, [studyTimeMinutes, tasksCompleted, quizScoreAverage, studyStreakDays]);

  // Format animated study time
  const currentMinutes = Math.round(studyTimeMinutes * animatedProgress);
  const hours = Math.floor(currentMinutes / 60);
  const remainingMins = currentMinutes % 60;
  const formattedStudyTime = `${hours}h ${remainingMins}m`;

  const currentTasks = Math.round(tasksCompleted * animatedProgress);
  const currentScore = Math.round(quizScoreAverage * animatedProgress);
  const currentStreak = Math.round(studyStreakDays * animatedProgress);

  const stats = [
    {
      id: 'stat-study-time',
      label: 'Study Time',
      value: formattedStudyTime,
      subtext: 'Today + weekly total',
      icon: <Clock className="w-5 h-5 text-[#3F72AF] dark:text-[#DBE2EF]" />,
      accentBg: 'bg-[#DBE2EF]/60 dark:bg-[#1c3e66] border border-[#DBE2EF] dark:border-[#244b7a]',
      accentBorder: 'hover:border-[#3F72AF]',
    },
    {
      id: 'stat-tasks-completed',
      label: 'Tasks Completed',
      value: `${currentTasks}`,
      subtext: 'Daily goals checked',
      icon: <CheckSquare className="w-5 h-5 text-[#3F72AF] dark:text-[#DBE2EF]" />,
      accentBg: 'bg-[#DBE2EF]/60 dark:bg-[#1c3e66] border border-[#DBE2EF] dark:border-[#244b7a]',
      accentBorder: 'hover:border-[#3F72AF]',
    },
    {
      id: 'stat-quiz-score',
      label: 'Quiz Score',
      value: `${currentScore}%`,
      subtext: 'Average assessment score',
      icon: <Trophy className="w-5 h-5 text-[#16A34A] dark:text-emerald-400" />,
      accentBg: 'bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/40',
      accentBorder: 'hover:border-emerald-300 dark:hover:border-emerald-700',
    },
    {
      id: 'stat-study-streak',
      label: 'Study Streak',
      value: `${currentStreak} days`,
      subtext: 'Consecutive study days',
      icon: <Flame className="w-5 h-5 text-[#F59E0B] dark:text-amber-400 animate-pulse" />,
      accentBg: 'bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900/40',
      accentBorder: 'hover:border-amber-300 dark:hover:border-amber-700',
    },
  ];

  return (
    <section id="dashboard-statistics-section" aria-label="Study Statistics">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5">
        {stats.map((item) => (
          <div
            key={item.id}
            id={item.id}
            className={`group bg-white dark:bg-[#112D4E] rounded-2xl border border-[#DBE2EF] dark:border-[#1c3e66] p-3 sm:p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${item.accentBorder} flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between gap-1.5 mb-2.5">
                <span className="text-[11px] min-[360px]:text-xs sm:text-sm font-semibold text-[#112D4E]/80 dark:text-[#DBE2EF]/80 tracking-tight leading-snug">
                  {item.label}
                </span>
                <div className={`p-1.5 sm:p-2 rounded-xl transition-transform group-hover:scale-105 shrink-0 ${item.accentBg}`}>
                  {item.icon}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-[#112D4E] dark:text-white tracking-tight tabular-nums font-mono leading-none">
                  {item.value}
                </div>
                <p className="text-[10px] min-[360px]:text-[11px] sm:text-xs text-[#112D4E]/70 dark:text-[#DBE2EF]/75 font-medium leading-snug break-words mt-1">
                  {item.subtext}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
