import React from 'react';
import { MoodLog, Quest } from '../types';

interface ProgressViewProps {
  quests: Quest[];
  moodHistory: MoodLog[];
}

export const ProgressView: React.FC<ProgressViewProps> = ({ quests, moodHistory }) => {
  const completedCount = quests.filter((q) => q.completed).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 animate-fade-in pb-28 md:pb-12">
      {/* Title */}
      <div>
        <h1 className="font-headline font-bold text-2xl sm:text-4xl text-[#191c1c] tracking-tight">
          Wellness Growth & Habits
        </h1>
        <p className="text-xs sm:text-sm text-[#3f484b] mt-0.5">
          QuestMind cumulative progression: No streak loss penalties. Every mindful moment counts forever.
        </p>
      </div>

      {/* Cumulative Mindful Garden / Particle Matrix Card */}
      <section className="bg-gradient-to-br from-white to-[#f8f9f9] border border-[#bec8cb]/50 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold text-[#496455] uppercase tracking-wider bg-[#cbead6] px-2.5 py-0.5 rounded-full">
              Cumulative Growth
            </span>
            <h2 className="font-headline font-bold text-xl sm:text-2xl text-[#191c1c] mt-1.5">
              Your Mindful Bloom Garden
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-2xl font-headline font-extrabold text-[#006474]">
              {completedCount * 12 + 48}
            </span>
            <span className="text-xs text-[#6f797c] font-medium">Growth Particles</span>
          </div>
        </div>

        {/* Visual Garden Matrix */}
        <div className="relative bg-[#f3fcff] border border-[#2d7d8e]/20 rounded-2xl p-6 overflow-hidden min-h-[160px] flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-lg mx-auto">
            {Array.from({ length: 18 }).map((_, i) => {
              const isEarned = i < completedCount + 8;
              return (
                <div
                  key={i}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                    isEarned
                      ? 'bg-white shadow-xs border border-[#cbead6] text-[#006474] scale-100 hover:scale-110'
                      : 'bg-[#e7e8e8]/50 text-[#bec8cb] border border-dashed border-[#bec8cb]/60 scale-90'
                  }`}
                  title={isEarned ? 'Active Bloom Particle' : 'Future Seed'}
                >
                  <span className={`material-symbols-outlined text-[22px] ${isEarned ? 'fill-1' : ''}`}>
                    {i % 4 === 0 ? 'spa' : i % 4 === 1 ? 'psychology' : i % 4 === 2 ? 'bedtime_off' : 'favorite'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-xs text-[#496455] bg-[#cbead6]/30 p-3 rounded-xl border border-[#cbead6] flex items-center gap-2">
          <span className="material-symbols-outlined text-[#006474] text-[18px]">favorite</span>
          <span>
            <strong>Zero-shame philosophy:</strong> Taking a break from this app is healthy! Your particles will never drain or reset.
          </span>
        </div>
      </section>

      {/* Mood History Trajectory */}
      <section className="bg-white border border-[#bec8cb]/40 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006474]">insights</span>
            <h3 className="font-headline font-bold text-lg sm:text-xl text-[#191c1c]">
              Recent Mood Check-ins
            </h3>
          </div>
          <span className="text-xs text-[#6f797c]">{moodHistory.length} logs recorded</span>
        </div>

        {moodHistory.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5 pt-2">
            {moodHistory.slice(-7).map((log) => (
              <div
                key={log.id}
                className="bg-[#f8f9f9] border border-[#bec8cb]/30 rounded-2xl p-3 text-center flex flex-col items-center gap-1.5"
              >
                <span className="text-[10px] text-[#6f797c] font-medium">{log.date}</span>
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    log.rating >= 4
                      ? 'bg-[#cbead6] text-[#006474]'
                      : log.rating === 3
                      ? 'bg-[#f3f4f4] text-[#496455]'
                      : 'bg-[#ffdad6] text-[#ba1a1a]'
                  }`}
                >
                  <span className="font-headline font-bold text-sm">{log.rating}</span>
                </div>
                <span className="text-[10px] text-[#3f484b] font-medium line-clamp-1">
                  {log.note || (log.rating >= 4 ? 'Good' : log.rating === 3 ? 'Steady' : 'Low')}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 bg-[#f8f9f9] rounded-2xl text-center text-xs text-[#6f797c]">
            Log your mood on the Home tab to see your emotional trajectory here.
          </div>
        )}
      </section>

      {/* 5 QuestMind Pillars Breakdown */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#bec8cb]/40 space-y-2">
          <div className="flex items-center gap-2 text-[#006474]">
            <span className="material-symbols-outlined text-[20px]">directions_walk</span>
            <span className="font-headline font-bold text-sm">MOVE Module</span>
          </div>
          <p className="text-xs text-[#3f484b]">
            Accessible physical breaks. Walking or gentle stretching to discharge mental cortisol.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#bec8cb]/40 space-y-2">
          <div className="flex items-center gap-2 text-[#006474]">
            <span className="material-symbols-outlined text-[20px]">bedtime_off</span>
            <span className="font-headline font-bold text-sm">PAUSE Module</span>
          </div>
          <p className="text-xs text-[#3f484b]">
            Voluntary screen-free quiet quests. Reclaiming sensory autonomy without surveillance.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#bec8cb]/40 space-y-2">
          <div className="flex items-center gap-2 text-[#006474]">
            <span className="material-symbols-outlined text-[20px]">psychology</span>
            <span className="font-headline font-bold text-sm">THINK Module</span>
          </div>
          <p className="text-xs text-[#3f484b]">
            CBT and REBT daily drops: Turning rigid demands into flexible, self-compassionate preferences.
          </p>
        </div>
      </section>
    </div>
  );
};
