import React, { useState, useEffect } from 'react';

interface BreathingGuideProps {
  onComplete?: () => void;
}

export const BreathingGuide: React.FC<BreathingGuideProps> = ({ onComplete }) => {
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'4-6' | 'box'>('4-6');
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  // Phases for 4-6 (Inhale 4s, Exhale 6s)
  const phases46 = [
    { name: 'Inhale', duration: 4, instruction: 'Breathe in deeply through your nose' },
    { name: 'Exhale', duration: 6, instruction: 'Gently release through parted lips' },
  ];

  // Phases for Box (Inhale 4s, Hold 4s, Exhale 4s, Hold 4s)
  const phasesBox = [
    { name: 'Inhale', duration: 4, instruction: 'Draw in calm, clean air' },
    { name: 'Hold', duration: 4, instruction: 'Rest gently at the top' },
    { name: 'Exhale', duration: 4, instruction: 'Release all muscle tension' },
    { name: 'Hold', duration: 4, instruction: 'Stay empty and still' },
  ];

  const currentPhases = mode === '4-6' ? phases46 : phasesBox;
  const currentPhase = currentPhases[phaseIndex];

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          const nextIndex = (phaseIndex + 1) % currentPhases.length;
          setPhaseIndex(nextIndex);
          if (nextIndex === 0) {
            setCyclesCompleted((c) => {
              const updated = c + 1;
              if (updated >= 4 && onComplete) {
                onComplete();
              }
              return updated;
            });
          }
          return currentPhases[nextIndex].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phaseIndex, currentPhases, onComplete]);

  const handleStart = () => {
    setIsActive(true);
    setPhaseIndex(0);
    setTimeLeft(currentPhases[0].duration);
    setCyclesCompleted(0);
  };

  const handleStop = () => {
    setIsActive(false);
    setPhaseIndex(0);
    setTimeLeft(currentPhases[0].duration);
  };

  // Concentric circle scale calculation
  const isExpanding = currentPhase.name === 'Inhale';
  const isHolding = currentPhase.name === 'Hold';

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#bec8cb]/40 shadow-[0_4px_20px_rgba(8,104,120,0.06)] text-center relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#a9edff]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 relative z-10">
        <div className="text-left">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006474]">air</span>
            <h3 className="font-headline font-bold text-lg text-[#191c1c]">Grounding Breath Pacer</h3>
          </div>
          <p className="text-xs text-[#3f484b]">Vagus nerve activation to soothe acute exam or placement tension</p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1 bg-[#f3f4f4] p-1 rounded-full text-xs font-medium">
          <button
            onClick={() => {
              setMode('4-6');
              handleStop();
            }}
            className={`px-3 py-1 rounded-full transition-colors ${
              mode === '4-6' ? 'bg-[#006474] text-white shadow-sm' : 'text-[#3f484b] hover:text-[#006474]'
            }`}
          >
            4-6 Relax
          </button>
          <button
            onClick={() => {
              setMode('box');
              handleStop();
            }}
            className={`px-3 py-1 rounded-full transition-colors ${
              mode === 'box' ? 'bg-[#006474] text-white shadow-sm' : 'text-[#3f484b] hover:text-[#006474]'
            }`}
          >
            Box (4-4-4-4)
          </button>
        </div>
      </div>

      {/* Pulsing Concentric Visualizer */}
      <div className="relative w-56 h-56 sm:w-64 sm:h-64 mx-auto my-4 flex items-center justify-center">
        {/* Outer Ring */}
        <div
          className={`absolute rounded-full border border-[#006474]/20 transition-all duration-1000 ${
            isActive && isExpanding ? 'w-56 h-56 sm:w-64 sm:h-64 bg-[#a9edff]/20' : 'w-44 h-44 sm:w-48 sm:h-48 bg-[#cbead6]/20'
          }`}
        />

        {/* Middle Ring */}
        <div
          className={`absolute rounded-full border border-[#2d7d8e]/30 transition-all duration-1000 ${
            isActive && isExpanding
              ? 'w-44 h-44 sm:w-48 sm:h-48 bg-[#2d7d8e]/20'
              : 'w-32 h-32 sm:w-36 sm:h-36 bg-[#496455]/15'
          }`}
        />

        {/* Core Bubble */}
        <div
          className={`relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center text-white transition-all duration-1000 shadow-lg ${
            !isActive
              ? 'bg-[#006474]'
              : isExpanding
              ? 'bg-[#006474] scale-110'
              : isHolding
              ? 'bg-[#2d7d8e] scale-105'
              : 'bg-[#496455] scale-90'
          }`}
        >
          {isActive ? (
            <>
              <span className="font-headline font-semibold text-xs uppercase tracking-wider opacity-90">
                {currentPhase.name}
              </span>
              <span className="font-headline font-bold text-3xl sm:text-4xl my-0.5">{timeLeft}</span>
              <span className="text-[10px] opacity-75">seconds</span>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-[28px]">spa</span>
              <span className="text-xs font-semibold mt-1">Ready</span>
            </div>
          )}
        </div>
      </div>

      {/* Subtitle instructions */}
      <div className="min-h-[44px] flex flex-col items-center justify-center relative z-10">
        {isActive ? (
          <p className="text-sm font-medium text-[#006474] animate-fade-in">
            {currentPhase.instruction}
          </p>
        ) : (
          <p className="text-xs sm:text-sm text-[#6f797c]">
            Take 2 minutes to settle your nervous system before starting study or tasks.
          </p>
        )}
      </div>

      {/* Control Buttons */}
      <div className="mt-4 flex items-center justify-center gap-3 relative z-10">
        {!isActive ? (
          <button
            onClick={handleStart}
            className="px-6 py-2.5 bg-[#006474] hover:bg-[#004e5b] text-white rounded-full font-semibold text-sm shadow-sm active:scale-95 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">play_arrow</span>
            <span>Begin Breathing</span>
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="px-6 py-2.5 bg-[#f3f4f4] hover:bg-[#e7e8e8] text-[#191c1c] rounded-full font-semibold text-sm active:scale-95 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">stop</span>
            <span>Stop ({cyclesCompleted} cycles)</span>
          </button>
        )}
      </div>
    </div>
  );
};
