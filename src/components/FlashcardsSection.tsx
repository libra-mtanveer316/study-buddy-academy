import React, { useState, useEffect, useCallback } from 'react';
import {
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Check,
  Bookmark,
  Layers,
  Sparkles,
  Keyboard
} from 'lucide-react';
import { Flashcard, Subject } from '../types';

interface FlashcardsSectionProps {
  subjects: Subject[];
  currentSubject: Subject;
  onSelectSubject: (id: string) => void;
  cardStatusMap: Record<string, { known: boolean; needReview: boolean }>;
  onMarkCard: (cardId: string, status: { known: boolean; needReview: boolean }) => void;
}

export const FlashcardsSection: React.FC<FlashcardsSectionProps> = ({
  subjects,
  currentSubject,
  onSelectSubject,
  cardStatusMap,
  onMarkCard,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const cards = currentSubject.flashcards && currentSubject.flashcards.length > 0
    ? currentSubject.flashcards
    : [
        {
          id: 'fb-def',
          question: `What is the core principle of ${currentSubject.name}?`,
          answer: currentSubject.description
        }
      ];

  const currentCard = cards[Math.min(currentIndex, cards.length - 1)] || cards[0];
  const currentStatus = cardStatusMap[currentCard.id] || { known: false, needReview: false };

  // Calculate statistics for this subject
  const totalCards = cards.length;
  const knownCount = cards.filter((c) => cardStatusMap[c.id]?.known).length;
  const reviewCount = cards.filter((c) => cardStatusMap[c.id]?.needReview).length;

  const handleNext = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  }, [cards.length]);

  const handlePrev = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  }, [cards.length]);

  const handleMarkKnown = useCallback(() => {
    onMarkCard(currentCard.id, { known: true, needReview: false });
    handleNext();
  }, [currentCard.id, handleNext, onMarkCard]);

  const handleMarkReview = useCallback(() => {
    onMarkCard(currentCard.id, { known: false, needReview: true });
    handleNext();
  }, [currentCard.id, handleNext, onMarkCard]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <div id="flashcards-view" className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header & Subject Selector */}
      <div className="bg-white dark:bg-[#112D4E] rounded-2xl border border-[#DBE2EF] dark:border-[#1c3e66] p-4 sm:p-7 shadow-xs transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#3F72AF] dark:text-[#DBE2EF] text-xs font-bold uppercase tracking-wider mb-1">
              <Layers className="w-4 h-4" />
              <span>Active Recall Study</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#112D4E] dark:text-white tracking-tight">
              Interactive Flashcards
            </h2>
            <p className="text-xs sm:text-sm text-[#112D4E]/70 dark:text-[#DBE2EF]/80 mt-1">
              Reinforce knowledge through spaced repetition. Flip cards to reveal explanations.
            </p>
          </div>

          {/* Subject Switcher Select Dropdown */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto">
            <label htmlFor="flashcard-subject-select" className="text-xs font-semibold text-[#112D4E]/80 dark:text-[#DBE2EF]/80 whitespace-nowrap">
              Subject:
            </label>
            <select
              id="flashcard-subject-select"
              value={currentSubject.id}
              onChange={(e) => {
                onSelectSubject(e.target.value);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className="w-full sm:w-auto px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-[#DBE2EF] dark:border-[#1c3e66] bg-[#F9F7F7] dark:bg-[#0e243e] text-[#112D4E] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3F72AF] max-w-full sm:max-w-xs transition-all shadow-2xs cursor-pointer"
            >
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name} ({sub.flashcards.length} cards)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Counter and Mastery Indicators */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-5 border-t border-[#DBE2EF] dark:border-[#1c3e66] text-xs">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[#112D4E] dark:text-slate-200 tabular-nums">
              Card {currentIndex + 1} of {totalCards}
            </span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className="text-[#16A34A] dark:text-emerald-400 font-semibold tabular-nums">
              {knownCount} Known
            </span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className="text-[#F59E0B] dark:text-amber-400 font-semibold tabular-nums">
              {reviewCount} Need Review
            </span>
          </div>

          <div className="text-[#112D4E]/70 dark:text-[#DBE2EF]/80 font-medium">
            Category: <strong className="text-[#112D4E] dark:text-white font-semibold">{currentSubject.category}</strong>
          </div>
        </div>
      </div>

      {/* 3D Flipping Flashcard Container */}
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Progress bar above card */}
        <div className="w-full h-1.5 bg-[#DBE2EF]/60 dark:bg-[#1c3e66] rounded-full overflow-hidden border border-[#DBE2EF] dark:border-[#244b7a]">
          <div
            className="h-full bg-gradient-to-r from-[#3F72AF] to-[#112D4E] dark:from-[#3F72AF] dark:to-[#558bc9] rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
          />
        </div>

        <div
          id={`flashcard-${currentCard.id}`}
          onClick={() => setIsFlipped(!isFlipped)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault();
              setIsFlipped(!isFlipped);
            }
          }}
          className="perspective-1000 w-full h-72 sm:h-80 md:h-96 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#3F72AF] rounded-2xl select-none group"
        >
          <div
            className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* FRONT OF CARD (Question) */}
            <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-white dark:bg-[#112D4E] border border-[#DBE2EF] dark:border-[#1c3e66] p-5 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[#3F72AF]/70 transition-all">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#DBE2EF]/60 text-[#3F72AF] dark:bg-[#1c3e66] dark:text-[#DBE2EF] border border-[#DBE2EF] dark:border-[#244b7a]">
                  {currentSubject.name}
                </span>
                <span className="text-xs font-mono text-[#112D4E]/60 dark:text-[#DBE2EF]/70 tabular-nums font-medium">
                  {currentIndex + 1} / {totalCards}
                </span>
              </div>

              <div className="text-center my-auto px-2 sm:px-4">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#112D4E]/60 dark:text-[#DBE2EF]/70 block mb-2 sm:mb-3">
                  Question
                </span>
                <h3 className="text-base sm:text-xl md:text-2xl font-bold text-[#112D4E] dark:text-white tracking-tight leading-snug">
                  {currentCard.question}
                </h3>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-[#112D4E]/70 dark:text-[#DBE2EF]/80 group-hover:text-[#3F72AF] transition-colors">
                <RotateCw className="w-3.5 h-3.5 text-[#3F72AF]" />
                <span>Tap or press space to flip</span>
              </div>
            </div>

            {/* BACK OF CARD (Answer) */}
            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl bg-gradient-to-br from-[#DBE2EF]/60 to-[#F9F7F7] dark:from-[#112D4E] dark:to-[#0e243e] text-[#112D4E] dark:text-slate-100 border-2 border-[#3F72AF] p-5 sm:p-8 flex flex-col justify-between shadow-lg">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#3F72AF] text-white shadow-xs">
                  Answer Explanation
                </span>
                <span className="text-xs font-mono text-[#112D4E]/60 dark:text-[#DBE2EF]/70 tabular-nums font-medium">
                  {currentIndex + 1} / {totalCards}
                </span>
              </div>

              <div className="text-center my-auto px-2 sm:px-4 overflow-y-auto max-h-44 sm:max-h-56">
                <p className="text-xs sm:text-base md:text-lg font-medium text-[#112D4E] dark:text-slate-200 leading-relaxed">
                  {currentCard.answer}
                </p>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-[#3F72AF] dark:text-[#DBE2EF]">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Tap to flip back</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 w-full">
          {/* Navigation Controls */}
          <div className="flex items-center justify-between sm:justify-start gap-2 w-full sm:w-auto">
            <button
              type="button"
              id="btn-prev-card"
              onClick={handlePrev}
              className="p-2.5 rounded-xl border border-[#DBE2EF] dark:border-[#1c3e66] bg-white dark:bg-[#112D4E] text-[#112D4E] dark:text-[#DBE2EF] hover:bg-[#DBE2EF]/50 dark:hover:bg-[#1c3e66] active:scale-[0.97] transition-all shadow-2xs cursor-pointer min-h-[44px]"
              title="Previous card (Left Arrow)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              id="btn-flip-card"
              onClick={() => setIsFlipped(!isFlipped)}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-[#DBE2EF] dark:border-[#1c3e66] bg-white dark:bg-[#112D4E] text-xs sm:text-sm font-semibold text-[#112D4E] dark:text-[#DBE2EF] hover:bg-[#DBE2EF]/50 dark:hover:bg-[#1c3e66] active:scale-[0.97] transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer min-h-[44px]"
            >
              <RotateCw className="w-4 h-4 text-[#3F72AF]" />
              <span>Flip Card</span>
            </button>

            <button
              type="button"
              id="btn-next-card"
              onClick={handleNext}
              className="p-2.5 rounded-xl border border-[#DBE2EF] dark:border-[#1c3e66] bg-white dark:bg-[#112D4E] text-[#112D4E] dark:text-[#DBE2EF] hover:bg-[#DBE2EF]/50 dark:hover:bg-[#1c3e66] active:scale-[0.97] transition-all shadow-2xs cursor-pointer min-h-[44px]"
              title="Next card (Right Arrow)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Known & Review Actions */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              id="btn-mark-review"
              onClick={handleMarkReview}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer shadow-xs active:scale-[0.97] min-h-[44px] ${
                currentStatus.needReview
                  ? 'bg-[#F59E0B] text-white border-[#F59E0B]'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-[#F59E0B] dark:text-amber-300 border-amber-200 dark:border-amber-800/60 hover:bg-amber-100 dark:hover:bg-amber-900/50'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Need Review</span>
            </button>

            <button
              type="button"
              id="btn-mark-known"
              onClick={handleMarkKnown}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer shadow-xs active:scale-[0.97] min-h-[44px] ${
                currentStatus.known
                  ? 'bg-[#16A34A] text-white border-[#16A34A]'
                  : 'bg-emerald-50 dark:bg-emerald-950/40 text-[#16A34A] dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/50'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>Known</span>
            </button>
          </div>
        </div>

        {/* Keyboard Shortcut Hints */}
        <div className="flex items-center justify-center gap-3 text-[11px] text-[#112D4E]/60 dark:text-[#DBE2EF]/60 pt-1">
          <span className="flex items-center gap-1">
            <Keyboard className="w-3.5 h-3.5 text-[#3F72AF]" />
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-[#112D4E] border border-[#DBE2EF] dark:border-[#1c3e66] font-mono text-[10px]">Space</kbd> Flip
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-[#112D4E] border border-[#DBE2EF] dark:border-[#1c3e66] font-mono text-[10px]">←</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-[#112D4E] border border-[#DBE2EF] dark:border-[#1c3e66] font-mono text-[10px]">→</kbd> Navigate
          </span>
        </div>
      </div>
    </div>
  );
};
