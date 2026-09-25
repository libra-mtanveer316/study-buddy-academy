import React, { useState, useEffect, useCallback } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Trophy,
  Layers,
  Sparkles,
  Award
} from 'lucide-react';
import { QuizQuestion, QuizResult, Subject } from '../types';

interface QuizSectionProps {
  subjects: Subject[];
  currentSubject: Subject;
  onSelectSubject: (id: string) => void;
  onQuizCompleted: (result: QuizResult) => void;
  onNavigateToCards: () => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  subjects,
  currentSubject,
  onSelectSubject,
  onQuizCompleted,
  onNavigateToCards,
}) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const questions: QuizQuestion[] = currentSubject.quiz && currentSubject.quiz.length > 0
    ? currentSubject.quiz
    : [
        {
          id: 'def-q',
          question: `Which field best characterizes ${currentSubject.name}?`,
          options: [
            currentSubject.category,
            'Mechanical Agriculture',
            'Ancient History',
            'Gastronomy'
          ],
          correctIndex: 0,
          explanation: `${currentSubject.name} belongs to the ${currentSubject.category} academic track.`
        }
      ];

  const totalQuestions = questions.length;
  const currentQ = questions[currentQuestionIdx] || questions[0];

  const handleSelectOption = useCallback((idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
    setIsAnswerSubmitted(true);

    const isCorrect = idx === currentQ.correctIndex;
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);
    setUserAnswers((prev) => [...prev, idx]);
  }, [currentQ.correctIndex, isAnswerSubmitted, score]);

  const handleNext = useCallback(() => {
    if (currentQuestionIdx + 1 < totalQuestions) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsCompleted(true);
      const finalScore = score;
      const percentage = Math.round((finalScore / totalQuestions) * 100);
      const result: QuizResult = {
        id: 'quiz-' + Date.now(),
        subjectId: currentSubject.id,
        subjectName: currentSubject.name,
        score: finalScore,
        total: totalQuestions,
        percentage,
        date: 'Just now'
      };
      onQuizCompleted(result);
    }
  }, [currentQuestionIdx, currentSubject.id, currentSubject.name, onQuizCompleted, score, totalQuestions]);

  const handleRetry = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsCompleted(false);
    setUserAnswers([]);
  };

  // Keyboard navigation: 1-4 for answers, Enter for next
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      if (!isAnswerSubmitted) {
        if (e.key >= '1' && e.key <= '4') {
          const optIdx = parseInt(e.key, 10) - 1;
          if (optIdx < currentQ.options.length) {
            handleSelectOption(optIdx);
          }
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQ.options.length, handleNext, handleSelectOption, isAnswerSubmitted]);

  const progressPercentage = Math.round(((currentQuestionIdx + (isAnswerSubmitted ? 1 : 0)) / totalQuestions) * 100);

  return (
    <div id="quiz-view" className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="bg-white dark:bg-[#112D4E] rounded-2xl border border-[#DBE2EF] dark:border-[#1c3e66] p-4 sm:p-7 shadow-xs transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#3F72AF] dark:text-[#DBE2EF] text-xs font-bold uppercase tracking-wider mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>Subject Practice Assessment</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#112D4E] dark:text-white tracking-tight">
              Test Your Knowledge
            </h2>
            <p className="text-xs sm:text-sm text-[#112D4E]/70 dark:text-[#DBE2EF]/80 mt-1">
              Subject-based questions with instant explanations and automatic score recording.
            </p>
          </div>

          {/* Subject Switcher Select Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="quiz-subject-select" className="text-xs font-semibold text-[#112D4E]/80 dark:text-[#DBE2EF]/80 whitespace-nowrap">
              Subject:
            </label>
            <select
              id="quiz-subject-select"
              value={currentSubject.id}
              onChange={(e) => {
                onSelectSubject(e.target.value);
                handleRetry();
              }}
              className="px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-[#DBE2EF] dark:border-[#1c3e66] bg-[#F9F7F7] dark:bg-[#0e243e] text-[#112D4E] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3F72AF] max-w-xs transition-all shadow-2xs cursor-pointer"
            >
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name} ({sub.quiz.length} Qs)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Progress bar */}
        {!isCompleted && (
          <div className="pt-4 mt-5 border-t border-[#DBE2EF] dark:border-[#1c3e66] space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#112D4E]/70 dark:text-[#DBE2EF]/80">
              <span className="tabular-nums">Question {currentQuestionIdx + 1} of {totalQuestions}</span>
              <span className="font-bold text-[#3F72AF] dark:text-[#558bc9] tabular-nums font-mono">
                Current Score: {score} / {totalQuestions}
              </span>
            </div>
            <div className="w-full h-2 bg-[#DBE2EF]/60 dark:bg-[#1c3e66] rounded-full overflow-hidden border border-[#DBE2EF] dark:border-[#244b7a]">
              <div
                className="h-full bg-gradient-to-r from-[#3F72AF] to-[#112D4E] dark:from-[#3F72AF] dark:to-[#558bc9] rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Main Quiz Area */}
      <div className="max-w-2xl mx-auto">
        {!isCompleted ? (
          <div
            id={`quiz-question-card-${currentQ.id}`}
            className="bg-white dark:bg-[#112D4E] rounded-2xl border border-[#DBE2EF] dark:border-[#1c3e66] p-5 sm:p-8 shadow-xs space-y-5 sm:space-y-6 transition-colors"
          >
            {/* Question Label & Text */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#112D4E]/60 dark:text-[#DBE2EF]/70 tabular-nums">
                  Question {currentQuestionIdx + 1} of {totalQuestions}
                </span>
                <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#DBE2EF]/60 text-[#3F72AF] dark:bg-[#1c3e66] dark:text-[#DBE2EF] border border-[#DBE2EF] dark:border-[#244b7a]">
                  {currentSubject.name}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#112D4E] dark:text-white leading-snug">
                {currentQ.question}
              </h3>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((optionText, optIdx) => {
                const isChosen = selectedOption === optIdx;
                const isCorrect = optIdx === currentQ.correctIndex;
                const showSuccess = isAnswerSubmitted && isCorrect;
                const showFailure = isAnswerSubmitted && isChosen && !isCorrect;

                const letter = String.fromCharCode(65 + optIdx);

                let btnStyles = 'bg-white dark:bg-[#0e243e] border-[#DBE2EF] dark:border-[#1c3e66] text-[#112D4E] dark:text-[#DBE2EF] hover:border-[#3F72AF] dark:hover:border-[#3F72AF] hover:bg-[#DBE2EF]/25 dark:hover:bg-[#173a63] shadow-2xs hover:shadow-xs';

                if (showSuccess) {
                  btnStyles = 'bg-emerald-50 dark:bg-emerald-950/40 border-[#16A34A] text-emerald-900 dark:text-emerald-100 ring-2 ring-[#16A34A]/50';
                } else if (showFailure) {
                  btnStyles = 'bg-rose-50 dark:bg-rose-950/40 border-[#DC2626] text-rose-900 dark:text-rose-100 ring-2 ring-[#DC2626]/50';
                } else if (isAnswerSubmitted && isChosen) {
                  btnStyles = 'border-[#DBE2EF] dark:border-[#1c3e66] text-[#112D4E]/50 dark:text-[#DBE2EF]/60';
                }

                return (
                  <button
                    key={optIdx}
                    type="button"
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full flex items-start sm:items-center gap-2.5 sm:gap-3.5 p-3 sm:p-4 rounded-xl border text-left font-medium text-xs sm:text-sm transition-all duration-150 disabled:cursor-default cursor-pointer min-h-[48px] ${btnStyles}`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors mt-0.5 sm:mt-0 ${
                        showSuccess
                          ? 'bg-[#16A34A] text-white shadow-xs'
                          : showFailure
                          ? 'bg-[#DC2626] text-white shadow-xs'
                          : 'bg-[#F9F7F7] dark:bg-[#112D4E] border border-[#DBE2EF] dark:border-[#1c3e66] text-[#112D4E] dark:text-white shadow-2xs'
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="flex-1 leading-snug break-words">{optionText}</span>
                    {showSuccess && <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5 sm:mt-0" />}
                    {showFailure && <XCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5 sm:mt-0" />}
                  </button>
                );
              })}
            </div>

            {/* Answer Feedback & Explanation Box */}
            {isAnswerSubmitted && (
              <div
                className={`p-4 rounded-xl border text-xs sm:text-sm animate-in fade-in duration-200 space-y-1.5 ${
                  selectedOption === currentQ.correctIndex
                    ? 'bg-emerald-50/90 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
                    : 'bg-rose-50/90 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100'
                }`}
              >
                <div className="flex items-center gap-2 font-bold">
                  {selectedOption === currentQ.correctIndex ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                      <span>Correct! Well done.</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-[#DC2626]" />
                      <span>Incorrect answer.</span>
                    </>
                  )}
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
                  <strong className="text-[#112D4E] dark:text-slate-100">Explanation:</strong> {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Next Question / Finish Button */}
            {isAnswerSubmitted && (
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  id="btn-next-quiz-q"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3F72AF] hover:bg-[#315d91] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm transition-all shadow-xs cursor-pointer min-h-[44px]"
                >
                  <span>
                    {currentQuestionIdx + 1 === totalQuestions ? 'Finish Quiz' : 'Next Question'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Quiz Completion Screen */
          (() => {
            const finalPercentage = Math.round((score / totalQuestions) * 100);
            const isPassed = finalPercentage >= 60;

            return (
              <div
                id="quiz-completion-card"
                className={`relative overflow-hidden bg-white dark:bg-[#112D4E] rounded-2xl border p-4 sm:p-8 lg:p-10 shadow-md text-center space-y-6 animate-in zoom-in-95 duration-300 transition-colors ${
                  isPassed
                    ? 'border-emerald-200 dark:border-emerald-800/60 ring-1 ring-emerald-500/20'
                    : 'border-amber-200 dark:border-amber-800/60 ring-1 ring-amber-500/20'
                }`}
              >
                {/* Subtle Confetti Particles Effect for Pass Results */}
                {isPassed && (
                  <div
                    className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none"
                    aria-hidden="true"
                  >
                    {/* Varied confetti particles fluttering down */}
                    <span className="absolute top-0 left-[8%] w-2 h-2 rounded-full bg-[#3F72AF] animate-confetti-particle opacity-80" style={{ animationDelay: '0.1s', animationDuration: '2.5s' }} />
                    <span className="absolute top-0 left-[20%] w-2.5 h-1.5 rounded-sm bg-emerald-500 animate-confetti-particle opacity-80" style={{ animationDelay: '0.5s', animationDuration: '3.1s' }} />
                    <span className="absolute top-0 left-[35%] w-2 h-2 rounded-full bg-amber-400 animate-confetti-particle opacity-80" style={{ animationDelay: '0.2s', animationDuration: '2.7s' }} />
                    <span className="absolute top-0 left-[48%] w-3 h-1.5 rounded-sm bg-indigo-500 animate-confetti-particle opacity-80" style={{ animationDelay: '0.8s', animationDuration: '3.3s' }} />
                    <span className="absolute top-0 left-[62%] w-2 h-2 rounded-full bg-rose-400 animate-confetti-particle opacity-80" style={{ animationDelay: '0.3s', animationDuration: '2.9s' }} />
                    <span className="absolute top-0 left-[75%] w-2.5 h-1.5 rounded-sm bg-[#3F72AF] animate-confetti-particle opacity-80" style={{ animationDelay: '0.6s', animationDuration: '2.8s' }} />
                    <span className="absolute top-0 left-[88%] w-2 h-2 rounded-full bg-emerald-400 animate-confetti-particle opacity-80" style={{ animationDelay: '0.4s', animationDuration: '3.0s' }} />
                    <span className="absolute top-0 left-[93%] w-1.5 h-1.5 rounded-full bg-amber-500 animate-confetti-particle opacity-80" style={{ animationDelay: '0.9s', animationDuration: '2.6s' }} />
                  </div>
                )}

                {/* Animated Badge & Heading */}
                <div className="relative z-10 space-y-4">
                  {isPassed ? (
                    /* PASSING STATE */
                    <>
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-600 dark:text-emerald-300 mx-auto flex items-center justify-center shadow-xs animate-subtle-glow">
                        <div className="relative">
                          <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500 fill-amber-400" />
                          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 absolute -top-2 -right-2 animate-pulse" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Passed (60% Passing Standard Met)</span>
                        </div>
                        <h3 className="text-xl sm:text-3xl font-extrabold text-[#112D4E] dark:text-white tracking-tight">
                          🎉 Congratulations! 🎉
                        </h3>
                        <p className="text-sm sm:text-base font-medium text-emerald-700 dark:text-emerald-300">
                          Great job! You passed the quiz.
                        </p>
                        <p className="text-xs sm:text-sm text-[#112D4E]/70 dark:text-[#DBE2EF]/80 max-w-md mx-auto break-words">
                          You demonstrated solid understanding in <strong className="text-[#112D4E] dark:text-white">{currentSubject.name}</strong>. Keep up the high momentum!
                        </p>
                      </div>
                    </>
                  ) : (
                    /* NOT PASSING STATE */
                    <>
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 text-amber-600 dark:text-amber-300 mx-auto flex items-center justify-center shadow-xs animate-gentle-bounce">
                        <span className="text-3xl sm:text-4xl select-none" role="img" aria-label="Hard luck sad face">
                          😔
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-700">
                          <span>Needs Practice (Passing mark: 60%)</span>
                        </div>
                        <h3 className="text-xl sm:text-3xl font-extrabold text-[#112D4E] dark:text-white tracking-tight">
                          😔 Hard Luck!
                        </h3>
                        <p className="text-sm sm:text-base font-medium text-amber-700 dark:text-amber-300">
                          Don’t worry, keep practicing and try again!
                        </p>
                        <p className="text-xs sm:text-sm text-[#112D4E]/70 dark:text-[#DBE2EF]/80 max-w-md mx-auto break-words">
                          Learning is an iterative journey. Review your subject flashcards and take another attempt to boost your score.
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/* Results Grid */}
                <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-lg mx-auto">
                  <div className="p-2.5 sm:p-3.5 bg-[#F9F7F7] dark:bg-[#0e243e] rounded-xl border border-[#DBE2EF] dark:border-[#1c3e66]">
                    <span className="text-[10px] min-[360px]:text-[11px] font-semibold text-[#112D4E]/70 dark:text-[#DBE2EF]/70 block leading-tight">
                      Score
                    </span>
                    <span className="text-base sm:text-lg font-bold text-[#112D4E] dark:text-white tabular-nums font-mono">
                      {score} / {totalQuestions}
                    </span>
                  </div>
                  <div className="p-2.5 sm:p-3.5 bg-[#F9F7F7] dark:bg-[#0e243e] rounded-xl border border-[#DBE2EF] dark:border-[#1c3e66]">
                    <span className="text-[10px] min-[360px]:text-[11px] font-semibold text-[#112D4E]/70 dark:text-[#DBE2EF]/70 block leading-tight">
                      Percentage
                    </span>
                    <span
                      className={`text-base sm:text-lg font-bold tabular-nums font-mono ${
                        isPassed
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      {finalPercentage}%
                    </span>
                  </div>
                  <div className="p-2.5 sm:p-3.5 bg-[#F9F7F7] dark:bg-[#0e243e] rounded-xl border border-[#DBE2EF] dark:border-[#1c3e66]">
                    <span className="text-[10px] min-[360px]:text-[11px] font-semibold text-[#112D4E]/70 dark:text-[#DBE2EF]/70 block leading-tight">
                      Correct
                    </span>
                    <span className="text-base sm:text-lg font-bold text-[#16A34A] dark:text-emerald-400 tabular-nums font-mono">
                      {score}
                    </span>
                  </div>
                  <div className="p-2.5 sm:p-3.5 bg-[#F9F7F7] dark:bg-[#0e243e] rounded-xl border border-[#DBE2EF] dark:border-[#1c3e66]">
                    <span className="text-[10px] min-[360px]:text-[11px] font-semibold text-[#112D4E]/70 dark:text-[#DBE2EF]/70 block leading-tight">
                      Incorrect
                    </span>
                    <span className="text-base sm:text-lg font-bold text-[#DC2626] dark:text-rose-400 tabular-nums font-mono">
                      {totalQuestions - score}
                    </span>
                  </div>
                </div>

                {/* Helpful study tip note */}
                <div className="relative z-10 max-w-md mx-auto text-xs bg-[#DBE2EF]/30 dark:bg-[#1c3e66]/40 border border-[#DBE2EF] dark:border-[#1c3e66] p-3 rounded-xl text-[#112D4E]/80 dark:text-[#DBE2EF]/90 break-words leading-relaxed">
                  {isPassed ? (
                    <p>
                      🎯 <strong>Academic Record Saved:</strong> Your progress in {currentSubject.name} has been updated in the Analytics dashboard.
                    </p>
                  ) : (
                    <p>
                      💡 <strong>Study Strategy:</strong> Tap <em>Review Flashcards</em> below to test active recall before retrying this quiz!
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 pt-2 w-full max-w-md mx-auto">
                  <button
                    type="button"
                    id="btn-retry-quiz"
                    onClick={handleRetry}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-xs sm:text-sm transition-all shadow-xs hover:shadow-md active:scale-[0.98] cursor-pointer min-h-[44px] ${
                      isPassed
                        ? 'bg-[#3F72AF] hover:bg-[#315d91]'
                        : 'bg-[#3F72AF] hover:bg-[#315d91] ring-2 ring-[#3F72AF]/30'
                    }`}
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>{isPassed ? 'Practice Again' : 'Try Again'}</span>
                  </button>

                  <button
                    type="button"
                    id="btn-quiz-review-cards"
                    onClick={onNavigateToCards}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#DBE2EF] dark:border-[#1c3e66] bg-white dark:bg-[#112D4E] text-[#112D4E] dark:text-[#DBE2EF] hover:bg-[#DBE2EF]/50 dark:hover:bg-[#1c3e66] active:scale-[0.98] font-semibold text-xs sm:text-sm transition-all shadow-xs cursor-pointer min-h-[44px]"
                  >
                    <Layers className="w-4 h-4 text-[#3F72AF]" />
                    <span>Review Flashcards</span>
                  </button>
                </div>
              </div>
            );
          })()
        )}
      </div>
    </div>
  );
};
