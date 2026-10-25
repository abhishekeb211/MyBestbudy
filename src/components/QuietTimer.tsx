import React, { useState, useEffect } from 'react';

interface QuietTimerProps {
  onComplete: () => void;
  onCancel: () => void;
}

export const QuietTimer: React.FC<QuietTimerProps> = ({ onComplete, onCancel }) => {
  const [selectedMinutes, setSelectedMinutes] = useState(10);
  const [secondsRemaining, setSecondsRemaining] = useState(10 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          setCompleted(true);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, onComplete]);

  const handleSelectMinutes = (mins: number) => {
    setSelectedMinutes(mins);
    setSecondsRemaining(mins * 60);
    setIsRunning(false);
    setCompleted(false);
  };

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const totalSeconds = selectedMinutes * 60;
  const progressPercent = ((totalSeconds - secondsRemaining) / totalSeconds) * 100;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#bec8cb]/40 shadow-[0_4px_24px_rgba(8,104,120,0.06)] text-center max-w-lg mx-auto">
      {/* Title */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="material-symbols-outlined text-[#006474]">bedtime_off</span>
        <h3 className="font-headline font-bold text-xl text-[#191c1c]">Quiet Quest (Screen-Free Break)</h3>
      </div>
      <p className="text-xs sm:text-sm text-[#3f484b] mb-6 max-w-sm mx-auto">
        Voluntarily put your phone aside to reset cognitive fatigue. No surveillance, 100% self-directed.
      </p>

      {/* Preset Buttons */}
      {!isRunning && !completed && (
        <div className="flex justify-center gap-2 mb-6">
          {[5, 10, 15, 20].map((mins) => (
            <button
              key={mins}
              onClick={() => handleSelectMinutes(mins)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedMinutes === mins
                  ? 'bg-[#006474] text-white shadow-sm'
                  : 'bg-[#f3f4f4] text-[#3f484b] hover:bg-[#e7e8e8]'
              }`}
            >
              {mins} Mins
            </button>
          ))}
        </div>
      )}

      {/* Timer Circle */}
      <div className="relative w-48 h-48 mx-auto my-6 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="44"
            className="stroke-[#f3f4f4]"
            strokeWidth="6"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r="44"
            className="stroke-[#006474] transition-all duration-1000 ease-linear"
            strokeWidth="6"
            strokeDasharray={276.46}
            strokeDashoffset={276.46 - (276.46 * progressPercent) / 100}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-headline font-extrabold text-3xl sm:text-4xl text-[#191c1c] tracking-tight">
            {formattedTime}
          </span>
          <span className="text-[11px] font-medium text-[#496455] uppercase tracking-wider mt-1">
            {isRunning ? 'Resting Eyes & Mind' : completed ? 'Quest Completed' : 'Selected Break'}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        {!isRunning && !completed && (
          <button
            onClick={() => setIsRunning(true)}
            className="px-6 py-2.5 bg-[#006474] hover:bg-[#004e5b] text-white font-semibold text-sm rounded-full shadow-sm active:scale-95 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">play_arrow</span>
            <span>Start Quiet Quest</span>
          </button>
        )}

        {isRunning && (
          <button
            onClick={() => setIsRunning(false)}
            className="px-6 py-2.5 bg-[#f3f4f4] hover:bg-[#e7e8e8] text-[#ba1a1a] font-semibold text-sm rounded-full active:scale-95 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">pause</span>
            <span>Pause</span>
          </button>
        )}

        {completed && (
          <div className="p-3 bg-[#cbead6] text-[#052014] rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 justify-center">
            <span className="material-symbols-outlined fill-1 text-[#006474]">check_circle</span>
            <span>Quiet Quest Verified & Logged! Great job giving your mind space.</span>
          </div>
        )}

        <button
          onClick={onCancel}
          className="px-4 py-2 text-xs text-[#6f797c] hover:text-[#191c1c] rounded-full transition-colors"
        >
          Close
        </button>
      </div>

      <div className="mt-6 text-[11px] text-[#6f797c] flex items-center justify-center gap-1.5 border-t border-[#bec8cb]/30 pt-3">
        <span className="material-symbols-outlined text-[14px]">verified</span>
        <span>Self-reported quiet session. No camera or background telemetry.</span>
      </div>
    </div>
  );
};
