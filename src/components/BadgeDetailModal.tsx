import React from 'react';
import { Badge } from '../types';

interface BadgeDetailModalProps {
  badge: Badge | null;
  onClose: () => void;
}

export const BadgeDetailModal: React.FC<BadgeDetailModalProps> = ({ badge, onClose }) => {
  if (!badge) return null;

  const progressPercent = Math.min(100, Math.round((badge.currentCount / badge.targetCount) * 100));

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white text-[#191c1c] w-full max-w-sm rounded-3xl shadow-2xl border border-[#bec8cb]/50 overflow-hidden p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Bar */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-[#6f797c] uppercase tracking-wider">
            {badge.category} Milestone
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f3f4f4] hover:bg-[#e7e8e8] text-[#6f797c] flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
            aria-label="Close badge modal"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Center Insignia */}
        <div className="flex flex-col items-center text-center space-y-3 pt-1">
          <div className="relative">
            <div
              className={`w-20 h-20 rounded-3xl flex items-center justify-center transition-all ${
                badge.isUnlocked
                  ? 'bg-gradient-to-tr from-[#006474] to-[#2d7d8e] text-white shadow-lg shadow-[#006474]/25 ring-4 ring-[#cbead6]'
                  : 'bg-[#f3f4f4] text-[#bec8cb] border-2 border-dashed border-[#bec8cb]'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[40px] ${
                  badge.isUnlocked ? 'fill-1' : ''
                }`}
              >
                {badge.icon}
              </span>
            </div>

            {badge.isUnlocked && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#cbead6] text-[#006474] flex items-center justify-center border-2 border-white shadow-xs">
                <span className="material-symbols-outlined text-[14px] fill-1 font-bold">check</span>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-headline font-bold text-xl text-[#191c1c]">
              {badge.title}
            </h3>
            <p className="text-xs text-[#3f484b] mt-1 leading-relaxed px-2">
              {badge.description}
            </p>
          </div>
        </div>

        {/* Progress Metric Section */}
        <div className="bg-[#f8f9f9] border border-[#bec8cb]/40 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-[#3f484b]">
              {badge.isUnlocked ? 'Status' : 'Progress'}
            </span>
            <span
              className={`tabular-nums ${
                badge.isUnlocked ? 'text-[#006474]' : 'text-[#6f797c]'
              }`}
            >
              {badge.isUnlocked
                ? 'Unlocked ✨'
                : `${badge.currentCount} / ${badge.targetCount} (${progressPercent}%)`}
            </span>
          </div>

          <div className="w-full h-2 bg-[#e7e8e8] rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                badge.isUnlocked ? 'bg-[#006474]' : 'bg-[#2d7d8e]'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {badge.isUnlocked ? (
            <p className="text-[11px] text-[#496455] font-medium pt-0.5">
              Awarded for mindful practice. Your growth particles and milestones remain safe forever with zero streak reset penalties.
            </p>
          ) : (
            <p className="text-[11px] text-[#6f797c] pt-0.5">
              {badge.targetCount - badge.currentCount} more needed to unlock this badge.
            </p>
          )}
        </div>

        {/* Wellbeing Lore / Benefit */}
        <div className="p-3.5 bg-[#f3fcff] border border-[#2d7d8e]/25 rounded-2xl flex items-start gap-3">
          <span className="material-symbols-outlined text-[#006474] text-[18px] shrink-0 mt-0.5">
            spa
          </span>
          <div className="text-xs text-[#006474] leading-relaxed">
            <strong className="block font-semibold mb-0.5">Mindful Impact</strong>
            {badge.benefitTip}
          </div>
        </div>

        {/* Bottom Dismiss Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-[#006474] hover:bg-[#004e5b] text-white rounded-xl font-headline font-semibold text-xs tracking-wide shadow-xs active:scale-[0.98] transition-all cursor-pointer"
        >
          {badge.isUnlocked ? 'Great, keep going!' : 'Understood'}
        </button>
      </div>
    </div>
  );
};
