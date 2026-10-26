import React from 'react';
import { NavTab } from '../types';

interface BottomNavBarProps {
  activeTab: NavTab;
  onNavigate: (tab: NavTab) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onNavigate }) => {
  const tabs: Array<{ id: NavTab; label: string; icon: string }> = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'explore', label: 'Explore', icon: 'search' },
    { id: 'chat', label: 'Buddy AI', icon: 'psychology' },
    { id: 'journal', label: 'Journal', icon: 'edit_note' },
    { id: 'progress', label: 'Progress', icon: 'insights' },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 bg-[#ffffff]/95 backdrop-blur-md border-t border-x border-[#bec8cb]/30 shadow-[0_-4px_16px_rgba(8,104,120,0.08)]">
      <div className="grid grid-cols-6 items-center h-16 px-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center py-1 transition-all active:scale-90 duration-150 rounded-xl ${
                isActive
                  ? 'text-[#006474]'
                  : 'text-[#6f797c] hover:text-[#006474]'
              }`}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                  isActive ? 'bg-[#cbead6]' : 'bg-transparent'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] ${isActive ? 'fill-1' : ''}`}
                >
                  {tab.icon}
                </span>
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? 'font-semibold' : 'font-medium'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
