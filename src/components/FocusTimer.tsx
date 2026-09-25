import React, { useState, useEffect, useRef } from 'react';
import {
  Timer as TimerIcon,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { TimerMode } from '../types';

interface FocusTimerProps {
  onSessionCompleted: (durationMinutes: number) => void;
}

export const FocusTimer: React.FC<FocusTimerProps> = ({ onSessionCompleted }) => {
  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const initialTimes: Record<TimerMode, number> = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  const timerRef = useRef<number | null>(null);

  // Play gentle web audio chime upon timer completion
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch {
      // Audio context may be restricted before user gesture
    }
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            setIsCompleted(true);
            playChime();

            if (mode === 'focus') {
              onSessionCompleted(25);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode, onSessionCompleted, soundEnabled]);

  const switchMode = (newMode: TimerMode) => {
    setIsRunning(false);
    setIsCompleted(false);
    setMode(newMode);
    setTimeLeft(initialTimes[newMode]);
  };

  const handleTogglePlay = () => {
    if (isCompleted) {
      setIsCompleted(false);
      setTimeLeft(initialTimes[mode]);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsCompleted(false);
    setTimeLeft(initialTimes[mode]);
  };

  // Format MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Calculate progress percentage
  const totalSeconds = initialTimes[mode];
  const progressFraction = (totalSeconds - timeLeft) / totalSeconds;
  const strokeDashoffset = 565 - 565 * progressFraction;

  // Determine State label
  let stateMessage = 'Session paused';
  if (isRunning) {
    stateMessage = mode === 'focus' ? 'Focus session in progress' : 'Break in progress';
  } else if (isCompleted) {
    stateMessage = 'Focus session complete! 🎉';
  } else if (timeLeft === initialTimes[mode]) {
    stateMessage = 'Ready to begin';
  }

  return (
    <div id="focus-timer-view" className="space-y-6 animate-in fade-in duration-300">
      {/* Header section */}
      <div className="bg-white dark:bg-[#112D4E] rounded-2xl border border-[#DBE2EF] dark:border-[#1c3e66] p-6 sm:p-7 shadow-xs transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#3F72AF] dark:text-[#DBE2EF] text-xs font-bold uppercase tracking-wider mb-1">
              <TimerIcon className="w-4 h-4" />
              <span>Pomodoro Method</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#112D4E] dark:text-white tracking-tight">
              Focus Timer
            </h2>
            <p className="text-xs sm:text-sm text-[#112D4E]/70 dark:text-[#DBE2EF]/80 mt-1">
              Stay focused. Study smarter. Build lasting academic consistency.
            </p>
          </div>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="self-start sm:self-center inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#DBE2EF] dark:border-[#1c3e66] bg-[#F9F7F7] dark:bg-[#0e243e] text-xs font-semibold text-[#112D4E] dark:text-[#DBE2EF] hover:bg-[#DBE2EF]/50 dark:hover:bg-[#1c3e66] active:scale-[0.97] transition-all shadow-2xs cursor-pointer min-h-[44px]"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-[#3F72AF] dark:text-[#DBE2EF]" />
                <span>Chime On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span>Chime Off</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Timer Display Card */}
      <div className="max-w-md mx-auto bg-white dark:bg-[#112D4E] rounded-2xl border border-[#DBE2EF] dark:border-[#1c3e66] p-6 sm:p-8 shadow-xs text-center space-y-6 transition-all hover:shadow-md">
        {/* Mode Selector Tabs */}
        <div className="flex items-center justify-center p-1 bg-[#F9F7F7] dark:bg-[#0e243e] border border-[#DBE2EF] dark:border-[#1c3e66] rounded-xl max-w-xs mx-auto shadow-inner">
          <button
            type="button"
            id="timer-mode-focus"
            onClick={() => switchMode('focus')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              mode === 'focus'
                ? 'bg-[#3F72AF] text-white shadow-xs'
                : 'text-[#112D4E]/70 dark:text-[#DBE2EF]/80 hover:text-[#112D4E] dark:hover:text-white'
            }`}
          >
            Focus (25m)
          </button>
          <button
            type="button"
            id="timer-mode-short"
            onClick={() => switchMode('shortBreak')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              mode === 'shortBreak'
                ? 'bg-[#16A34A] text-white shadow-xs'
                : 'text-[#112D4E]/70 dark:text-[#DBE2EF]/80 hover:text-[#112D4E] dark:hover:text-white'
            }`}
          >
            Break (5m)
          </button>
          <button
            type="button"
            id="timer-mode-long"
            onClick={() => switchMode('longBreak')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              mode === 'longBreak'
                ? 'bg-[#112D4E] text-white dark:bg-[#1c3e66] shadow-xs'
                : 'text-[#112D4E]/70 dark:text-[#DBE2EF]/80 hover:text-[#112D4E] dark:hover:text-white'
            }`}
          >
            Long (15m)
          </button>
        </div>

        {/* Circular Clock Display */}
        <div className="relative w-52 h-52 sm:w-64 sm:h-64 mx-auto flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90 drop-shadow-xs" viewBox="0 0 200 200">
            {/* Background ring */}
            <circle
              cx="100"
              cy="100"
              r="90"
              className="text-[#DBE2EF]/60 dark:text-[#1c3e66]"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Animated progress ring */}
            <circle
              cx="100"
              cy="100"
              r="90"
              className={`transition-all duration-500 ease-linear ${
                mode === 'focus'
                  ? 'text-[#3F72AF] dark:text-[#558bc9]'
                  : 'text-[#16A34A] dark:text-emerald-400'
              }`}
              strokeWidth="8"
              strokeDasharray="565"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>

          {/* Centered Timer Readout */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <span
              id="timer-clock-digits"
              className="text-4xl sm:text-5xl font-mono font-extrabold tracking-tight text-[#112D4E] dark:text-white tabular-nums select-none"
            >
              {formattedTime}
            </span>
            <span
              id="timer-state-label"
              className={`text-xs font-semibold mt-2.5 px-3 py-1 rounded-full transition-colors shadow-2xs ${
                isCompleted
                  ? 'bg-emerald-50 dark:bg-emerald-950 text-[#16A34A] dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                  : isRunning
                  ? 'bg-[#DBE2EF]/80 dark:bg-[#1c3e66] text-[#3F72AF] dark:text-[#DBE2EF] border border-[#DBE2EF] dark:border-[#244b7a]'
                  : 'text-[#112D4E]/70 dark:text-[#DBE2EF]/70 bg-[#F9F7F7] dark:bg-[#0e243e] border border-[#DBE2EF] dark:border-[#1c3e66]'
              }`}
            >
              {stateMessage}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            id="btn-timer-reset"
            onClick={handleReset}
            className="p-3.5 rounded-xl border border-[#DBE2EF] dark:border-[#1c3e66] bg-[#F9F7F7] dark:bg-[#0e243e] text-[#112D4E] dark:text-[#DBE2EF] hover:bg-[#DBE2EF]/50 dark:hover:bg-[#1c3e66] active:scale-[0.95] transition-all shadow-2xs cursor-pointer min-h-[44px]"
            title="Reset timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            type="button"
            id="btn-timer-toggle"
            onClick={handleTogglePlay}
            className={`inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-white font-semibold text-sm shadow-sm hover:shadow-md active:scale-[0.97] transition-all cursor-pointer min-h-[44px] ${
              isRunning
                ? 'bg-[#F59E0B] hover:bg-amber-600'
                : 'bg-[#3F72AF] hover:bg-[#315d91]'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-white" />
                <span>Start Session</span>
              </>
            )}
          </button>
        </div>

        {/* Technique Helper Tip */}
        <div className="pt-4 border-t border-[#DBE2EF] dark:border-[#1c3e66] text-xs text-[#112D4E]/75 dark:text-[#DBE2EF]/80 text-left space-y-1.5 bg-[#F9F7F7] dark:bg-[#0e243e] p-4 rounded-xl border">
          <p className="font-bold text-[#112D4E] dark:text-white flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#3F72AF] dark:text-[#DBE2EF]" />
            <span>How to use the Pomodoro Focus Technique:</span>
          </p>
          <ul className="list-disc pl-4 space-y-1 text-[11px] leading-relaxed">
            <li>Choose a subject concept to review.</li>
            <li>Eliminate distractions and start a 25-minute focus session.</li>
            <li>When the chime rings, take a 5-minute break away from screens.</li>
            <li>Your completed minutes are automatically saved to your weekly study graph!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
