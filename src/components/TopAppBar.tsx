import React from 'react';
import { NavTab } from '../types';

interface TopAppBarProps {
  activeTab: NavTab;
  onNavigate: (tab: NavTab) => void;
  onOpenCrisis: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({ onNavigate, onOpenCrisis }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#f8f9f9]/95 backdrop-blur-md border-b border-[#bec8cb]/30 w-full">
      <div className="px-4 h-14 flex items-center justify-between">
        {/* Brand Zone */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-left group focus:outline-none cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-[#cbead6] text-[#006474] flex items-center justify-center transition-transform group-hover:scale-105 shrink-0">
            <span className="material-symbols-outlined fill-1 text-[20px]">spa</span>
          </div>
          <div>
            <span className="font-headline font-bold text-base text-[#006474] tracking-tight whitespace-nowrap block leading-tight">
              PCCOE Wellness
            </span>
            <span className="text-[9px] font-semibold text-[#496455] tracking-wider uppercase block">
              My Best Buddy
            </span>
          </div>
        </button>

        {/* Action Zone: Crisis Get Help Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCrisis}
            className="flex items-center gap-1 px-3 py-1.5 bg-[#ba1a1a] text-white rounded-full text-xs font-semibold tracking-wide shadow-xs hover:bg-[#93000a] active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            aria-label="Immediate Crisis Support"
          >
            <span className="material-symbols-outlined text-[15px] fill-1">emergency</span>
            <span>GET HELP</span>
          </button>
        </div>
      </div>
    </header>
  );
};
