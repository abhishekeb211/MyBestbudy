import React from 'react';
import { NavTab } from '../types';

interface TopAppBarProps {
  activeTab: NavTab;
  onNavigate: (tab: NavTab) => void;
  onOpenCrisis: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({ activeTab, onNavigate, onOpenCrisis }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#f8f9f9]/90 backdrop-blur-md border-b border-[#bec8cb]/30 w-full transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-full bg-[#cbead6] text-[#006474] flex items-center justify-center transition-transform group-hover:scale-105">
            <span className="material-symbols-outlined fill-1 text-[22px]">spa</span>
          </div>
          <div>
            <span className="font-headline font-bold text-lg text-[#006474] tracking-tight whitespace-nowrap block">
              PCCOE Wellness
            </span>
            <span className="text-[10px] font-medium text-[#496455] tracking-wider uppercase hidden sm:block">
              My Best Buddy
            </span>
          </div>
        </button>

        {/* Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'home'
                ? 'bg-[#cbead6] text-[#006474] font-semibold'
                : 'text-[#3f484b] hover:text-[#006474] hover:bg-[#f3f4f4]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('explore')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'explore'
                ? 'bg-[#cbead6] text-[#006474] font-semibold'
                : 'text-[#3f484b] hover:text-[#006474] hover:bg-[#f3f4f4]'
            }`}
          >
            Explore Issues
          </button>
          <button
            onClick={() => onNavigate('chat')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'chat'
                ? 'bg-[#cbead6] text-[#006474] font-semibold'
                : 'text-[#3f484b] hover:text-[#006474] hover:bg-[#f3f4f4]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">psychology</span>
            Buddy AI
          </button>
          <button
            onClick={() => onNavigate('journal')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'journal'
                ? 'bg-[#cbead6] text-[#006474] font-semibold'
                : 'text-[#3f484b] hover:text-[#006474] hover:bg-[#f3f4f4]'
            }`}
          >
            Journal
          </button>
          <button
            onClick={() => onNavigate('progress')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'progress'
                ? 'bg-[#cbead6] text-[#006474] font-semibold'
                : 'text-[#3f484b] hover:text-[#006474] hover:bg-[#f3f4f4]'
            }`}
          >
            Progress
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-[#cbead6] text-[#006474] font-semibold'
                : 'text-[#3f484b] hover:text-[#006474] hover:bg-[#f3f4f4]'
            }`}
          >
            Profile
          </button>
        </nav>

        {/* Action Zone: Crisis Get Help Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCrisis}
            className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-[#ba1a1a] text-white rounded-full text-xs sm:text-sm font-semibold tracking-wide shadow-sm hover:bg-[#93000a] active:scale-95 transition-all duration-150 whitespace-nowrap"
            aria-label="Immediate Crisis Support"
          >
            <span className="material-symbols-outlined text-[16px] sm:text-[18px] fill-1">phone</span>
            <span>GET HELP</span>
          </button>
        </div>
      </div>
    </header>
  );
};
