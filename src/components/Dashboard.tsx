import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Circle,
  Plus,
  Clock,
  Award,
  Zap,
  Layers,
  HelpCircle,
  Sparkles,
  Flame,
  Check
} from 'lucide-react';
import { ActiveTab, ActivityItem, GoalItem, Subject } from '../types';
import { WelcomeBanner } from './WelcomeBanner';
import { StatCards } from './StatCards';

interface DashboardProps {
  currentSubject: Subject;
  currentSubjectProgress: number;
  goals: GoalItem[];
  onToggleGoal: (id: string) => void;
  onAddGoal: (text: string) => void;
  activities: ActivityItem[];
  studyTimeMinutes: number;
  tasksCompleted: number;
  quizScoreAverage: number;
  studyStreakDays: number;
  onNavigateTab: (tab: ActiveTab) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  currentSubject,
  currentSubjectProgress,
  goals,
  onToggleGoal,
  onAddGoal,
  activities,
  studyTimeMinutes,
  tasksCompleted,
  quizScoreAverage,
  studyStreakDays,
  onNavigateTab,
}) => {
  const [newGoalInput, setNewGoalInput] = useState('');
  const [isAddingGoal, setIsAddingGoal] = useState(false);

  const handleAddGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalInput.trim()) return;
    onAddGoal(newGoalInput.trim());
    setNewGoalInput('');
    setIsAddingGoal(false);
  };

  const completedGoalsCount = goals.filter((g) => g.completed).length;
  const goalProgressPercent = goals.length > 0 ? Math.round((completedGoalsCount / goals.length) * 100) : 100;

  return (
    <div id="dashboard-view" className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner (Hero) */}
      <WelcomeBanner
        onExploreSubjects={() => onNavigateTab('library')}
        onStartFocusTimer={() => onNavigateTab('timer')}
      />

      {/* Animated Count-Up Statistics */}
      <StatCards
        studyTimeMinutes={studyTimeMinutes}
        tasksCompleted={tasksCompleted}
        quizScoreAverage={quizScoreAverage}
        studyStreakDays={studyStreakDays}
      />

      {/* Middle Grid: Continue Learning + Quick Practice Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Learning Card */}
        <div
          id="continue-learning-card"
          className="lg:col-span-2 bg-white dark:bg-[#112D4E] rounded-2xl border border-[#DBE2EF] dark:border-[#1c3e66] p-4 sm:p-7 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-200"
        >
          <div>
            <div className="flex items-center justify-between gap-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3F72AF] dark:text-[#DBE2EF] bg-[#DBE2EF]/60 dark:bg-[#1c3e66] px-2.5 py-1 rounded-md border border-[#DBE2EF] dark:border-[#244b7a]">
                Continue Learning
              </span>
              <span className="text-xs text-[#112D4E]/80 dark:text-[#DBE2EF]/80 font-medium px-2 py-0.5 rounded-md bg-[#F9F7F7] dark:bg-[#0e243e] border border-[#DBE2EF] dark:border-[#1c3e66]">
                {currentSubject.category}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-[#112D4E] dark:text-white tracking-tight mb-2">
              {currentSubject.name}
            </h2>
            <p className="text-sm text-[#112D4E]/75 dark:text-[#DBE2EF]/80 mb-6 leading-relaxed">
              {currentSubject.description}
            </p>

            {/* Animated Progress Bar */}
            <div className="space-y-2 mb-6 p-4 rounded-xl bg-[#F9F7F7] dark:bg-[#0e243e] border border-[#DBE2EF] dark:border-[#1c3e66]">
              <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                <span className="text-[#112D4E] dark:text-[#DBE2EF]">Subject Mastery</span>
                <span className="text-[#3F72AF] dark:text-[#558bc9] font-bold tabular-nums font-mono text-sm">
                  {currentSubjectProgress}%
                </span>
              </div>
              <div
                role="progressbar"
                aria-valuenow={currentSubjectProgress}
                aria-valuemin={0}
                aria-valuemax={100}
                className="w-full h-3 bg-[#DBE2EF]/60 dark:bg-[#1c3e66] rounded-full overflow-hidden p-0.5 border border-[#DBE2EF] dark:border-[#244b7a]"
              >
                <div
                  className="h-full bg-gradient-to-r from-[#3F72AF] to-[#112D4E] dark:from-[#3F72AF] dark:to-[#558bc9] rounded-full transition-all duration-1000 ease-out shadow-xs"
                  style={{ width: `${currentSubjectProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#DBE2EF]/80 dark:border-[#1c3e66]">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                id="btn-continue-flashcards"
                onClick={() => onNavigateTab('flashcards')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#112D4E] dark:text-[#DBE2EF] bg-[#DBE2EF]/50 dark:bg-[#1c3e66] hover:bg-[#DBE2EF] dark:hover:bg-[#244b7a] transition-colors border border-[#DBE2EF] dark:border-[#244b7a] cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-[#3F72AF] dark:text-[#DBE2EF]" />
                <span>{currentSubject.flashcards.length} Flashcards</span>
              </button>
              <button
                type="button"
                id="btn-continue-quiz"
                onClick={() => onNavigateTab('quiz')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#112D4E] dark:text-[#DBE2EF] bg-[#DBE2EF]/50 dark:bg-[#1c3e66] hover:bg-[#DBE2EF] dark:hover:bg-[#244b7a] transition-colors border border-[#DBE2EF] dark:border-[#244b7a] cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#3F72AF] dark:text-[#DBE2EF]" />
                <span>Practice Quiz</span>
              </button>
            </div>

            <button
              type="button"
              id="btn-continue-studying"
              onClick={() => onNavigateTab('flashcards')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-[#3F72AF] hover:bg-[#315d91] active:scale-[0.98] transition-all shadow-xs cursor-pointer min-h-[40px]"
            >
              <span>Continue Studying</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Study Assistant Prompt Card */}
        <div
          id="dashboard-assistant-card"
          className="bg-gradient-to-br from-[#DBE2EF]/60 to-[#F9F7F7] dark:from-[#112D4E] dark:to-[#0e243e] rounded-2xl border border-[#DBE2EF] dark:border-[#1c3e66] p-4 sm:p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-200"
        >
          <div>
            <div className="flex items-center gap-2 text-[#3F72AF] dark:text-[#DBE2EF] text-xs font-bold uppercase tracking-wider mb-2">
              <Zap className="w-4 h-4 text-[#3F72AF] dark:text-[#DBE2EF]" />
              <span>Study Assistant</span>
            </div>
            <h3 className="text-lg font-bold text-[#112D4E] dark:text-white mb-1.5">
              Have a Concept Question?
            </h3>
            <p className="text-xs sm:text-sm text-[#112D4E]/75 dark:text-[#DBE2EF]/80 mb-4 leading-relaxed">
              Instant explanations on AI & Robotics, Algorithms, Python, Networking, and Databases.
            </p>

            <div className="space-y-2">
              {currentSubject.suggestedPrompts.slice(0, 2).map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onNavigateTab('chat')}
                  className="w-full text-left p-3 rounded-xl text-xs font-medium text-[#112D4E] dark:text-[#DBE2EF] bg-white/95 dark:bg-[#112D4E] border border-[#DBE2EF] dark:border-[#1c3e66] hover:border-[#3F72AF] dark:hover:border-[#3F72AF] transition-all flex items-center justify-between group shadow-2xs cursor-pointer"
                >
                  <span className="pr-2 font-medium line-clamp-2 break-words leading-snug">{prompt}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#3F72AF] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            id="btn-open-assistant-chat"
            onClick={() => onNavigateTab('chat')}
            className="mt-5 w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-[#3F72AF] dark:text-[#DBE2EF] bg-white dark:bg-[#112D4E] border border-[#3F72AF] dark:border-[#3F72AF] hover:bg-[#DBE2EF]/60 dark:hover:bg-[#1c3e66] active:scale-[0.98] transition-all text-center shadow-xs cursor-pointer min-h-[44px]"
          >
            Open Study Assistant →
          </button>
        </div>
      </div>

      {/* Bottom Grid: Today's Goals + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Goals Section */}
        <div
          id="todays-goals-card"
          className="bg-white dark:bg-[#112D4E] rounded-2xl border border-[#DBE2EF] dark:border-[#1c3e66] p-4 sm:p-6 shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#112D4E] dark:text-white">
                  Today's Goals
                </h3>
                <p className="text-xs text-[#112D4E]/70 dark:text-[#DBE2EF]/70">
                  {completedGoalsCount} of {goals.length} tasks completed ({goalProgressPercent}%)
                </p>
              </div>
              <button
                type="button"
                id="btn-toggle-add-goal"
                onClick={() => setIsAddingGoal(!isAddingGoal)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#3F72AF] dark:text-[#DBE2EF] bg-[#DBE2EF]/60 dark:bg-[#1c3e66] hover:bg-[#DBE2EF] dark:hover:bg-[#244b7a] active:scale-[0.97] transition-all cursor-pointer border border-[#DBE2EF] dark:border-[#244b7a]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Goal</span>
              </button>
            </div>

            {/* Goal completion progress bar */}
            <div className="w-full h-1.5 bg-[#DBE2EF]/50 dark:bg-[#1c3e66] rounded-full overflow-hidden mb-4 border border-[#DBE2EF]/60 dark:border-[#244b7a]">
              <div
                className="h-full bg-[#16A34A] rounded-full transition-all duration-500"
                style={{ width: `${goalProgressPercent}%` }}
              />
            </div>

            {/* Add Goal Input Form */}
            {isAddingGoal && (
              <form onSubmit={handleAddGoalSubmit} className="mb-4 flex flex-wrap sm:flex-nowrap items-center gap-2 animate-in fade-in duration-200">
                <input
                  type="text"
                  value={newGoalInput}
                  onChange={(e) => setNewGoalInput(e.target.value)}
                  placeholder="e.g., Review 10 AI & Robotics flashcards"
                  className="flex-1 min-w-[200px] px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#DBE2EF] dark:border-[#1c3e66] bg-[#F9F7F7] dark:bg-[#0e243e] text-[#112D4E] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3F72AF] transition-all"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#3F72AF] text-white rounded-xl text-xs font-semibold hover:bg-[#315d91] active:scale-[0.97] transition-all cursor-pointer shadow-xs min-h-[38px]"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingGoal(false)}
                  className="px-3 py-2 text-[#112D4E]/70 hover:text-[#112D4E] dark:hover:text-white text-xs font-medium cursor-pointer min-h-[38px]"
                >
                  Cancel
                </button>
              </form>
            )}

            {/* Checklist Items */}
            <div className="space-y-2.5">
              {goals.map((goal) => (
                <button
                  key={goal.id}
                  id={`goal-item-${goal.id}`}
                  type="button"
                  onClick={() => onToggleGoal(goal.id)}
                  className={`w-full flex items-start gap-3 p-3 sm:p-3.5 rounded-xl border text-left transition-all duration-200 group cursor-pointer ${
                    goal.completed
                      ? 'bg-[#F9F7F7] dark:bg-[#0e243e] border-[#DBE2EF] dark:border-[#1c3e66] text-[#112D4E]/50 dark:text-[#DBE2EF]/50 line-through'
                      : 'bg-white dark:bg-[#0e243e]/70 border-[#DBE2EF] dark:border-[#1c3e66] text-[#112D4E] dark:text-[#DBE2EF] hover:border-[#3F72AF] dark:hover:border-[#3F72AF] shadow-2xs hover:shadow-xs'
                  }`}
                >
                  <span className="shrink-0 mt-0.5">
                    {goal.completed ? (
                      <div className="w-5 h-5 rounded-md bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 dark:text-slate-500 group-hover:text-[#3F72AF] transition-colors" />
                    )}
                  </span>
                  <span className="text-xs sm:text-sm font-medium flex-1 break-words">
                    {goal.text}
                  </span>
                  {goal.completed && (
                    <span className="text-[11px] font-semibold text-[#16A34A] shrink-0 not-italic no-underline ml-1">
                      Done ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div
          id="recent-activity-card"
          className="bg-white dark:bg-[#112D4E] rounded-2xl border border-[#DBE2EF] dark:border-[#1c3e66] p-4 sm:p-6 shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#112D4E] dark:text-white">
                  Recent Activity
                </h3>
                <p className="text-xs text-[#112D4E]/70 dark:text-[#DBE2EF]/70">
                  Live log of completed sessions and goals
                </p>
              </div>
              <span className="text-xs font-semibold text-[#112D4E]/80 dark:text-[#DBE2EF]/80 px-2 py-0.5 rounded-md bg-[#F9F7F7] dark:bg-[#0e243e] border border-[#DBE2EF] dark:border-[#1c3e66]">
                {activities.length} entries
              </span>
            </div>

            <div className="space-y-3">
              {activities.length === 0 ? (
                <p className="text-xs text-[#112D4E]/60 dark:text-[#DBE2EF]/60 italic py-6 text-center">
                  No recent activity recorded yet. Complete a quiz or timer session to see entries!
                </p>
              ) : (
                activities.slice(0, 4).map((activity) => (
                  <div
                    key={activity.id}
                    id={`activity-${activity.id}`}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F9F7F7] dark:bg-[#0e243e] border border-[#DBE2EF] dark:border-[#1c3e66] hover:border-[#3F72AF] transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-white dark:bg-[#112D4E] border border-[#DBE2EF] dark:border-[#1c3e66] shrink-0 mt-0.5 shadow-2xs">
                      {activity.type === 'timer' && (
                        <Clock className="w-4 h-4 text-[#3F72AF] dark:text-[#DBE2EF]" />
                      )}
                      {activity.type === 'quiz' && (
                        <Award className="w-4 h-4 text-[#16A34A]" />
                      )}
                      {activity.type === 'flashcard' && (
                        <Layers className="w-4 h-4 text-[#3F72AF] dark:text-[#DBE2EF]" />
                      )}
                      {activity.type === 'goal' && (
                        <CheckCircle2 className="w-4 h-4 text-[#F59E0B]" />
                      )}
                      {activity.type === 'subject' && (
                        <BookOpen className="w-4 h-4 text-[#3F72AF] dark:text-[#DBE2EF]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col min-[420px]:flex-row min-[420px]:items-center justify-between gap-1">
                        <p className="text-xs sm:text-sm font-semibold text-[#112D4E] dark:text-white break-words">
                          {activity.title}
                        </p>
                        <span className="text-[10px] min-[420px]:text-[11px] text-[#112D4E]/60 dark:text-[#DBE2EF]/60 shrink-0 font-mono font-medium">
                          {activity.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-[#112D4E]/70 dark:text-[#DBE2EF]/70 break-words mt-0.5 leading-relaxed">
                        {activity.detail}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
