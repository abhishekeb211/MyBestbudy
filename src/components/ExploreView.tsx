import React, { useState } from 'react';
import { ISSUES_DATA } from '../data/issuesData';
import { Issue, IssueCategory } from '../types';

interface ExploreViewProps {
  onSelectIssue: (issue: Issue) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({ onSelectIssue }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<IssueCategory>('All Topics');

  const categories: IssueCategory[] = [
    'All Topics',
    'Academic',
    'Emotional',
    'Social',
    'Career',
    'Safety',
  ];

  const filteredIssues = ISSUES_DATA.filter((issue) => {
    const matchesCategory =
      selectedCategory === 'All Topics' || issue.category === selectedCategory;
    const matchesSearch =
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full px-4 py-5 space-y-6 animate-fade-in pb-24">
      {/* Header & Intro */}
      <section className="space-y-1">
        <h1 className="font-headline font-bold text-2xl text-[#191c1c] tracking-tight">
          Explore Issues
        </h1>
        <p className="text-xs text-[#3f484b]">
          Find evidence-informed resources and take mindful steps towards well-being.
        </p>
      </section>

      {/* Educational Disclaimer Banner */}
      <div className="bg-[#f3f4f4] border border-[#bec8cb]/60 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-xs">
        <span className="material-symbols-outlined text-[#496455] shrink-0 mt-0.5 text-[22px]">info</span>
        <p className="text-xs sm:text-sm text-[#3f484b] leading-relaxed">
          <strong className="font-semibold text-[#191c1c]">Note:</strong> The information provided here is for educational purposes and self-reflection. You may be experiencing these feelings, but this is non-diagnostic. If you feel overwhelmed, please reach out for professional support or use the red GET HELP button.
        </p>
      </div>

      {/* Search & Category Filter Section */}
      <section className="space-y-4">
        {/* Search Bar */}
        <div className="relative w-full max-w-3xl">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#6f797c] text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for issues, feelings, or resources (e.g., viva, exam, loneliness)..."
            className="w-full bg-white border border-[#bec8cb]/50 focus:border-[#006474] focus:ring-2 focus:ring-[#2d7d8e]/20 rounded-full py-3.5 pl-12 pr-4 text-sm sm:text-base text-[#191c1c] placeholder:text-[#6f797c] shadow-xs transition-all outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6f797c] hover:text-[#191c1c] text-xs font-semibold px-2 py-1 rounded-full bg-[#f3f4f4]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Horizontal Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all active:scale-95 duration-150 ${
                  isSelected
                    ? 'bg-[#496455] text-white shadow-xs'
                    : 'bg-white text-[#3f484b] hover:bg-[#e7e8e8] border border-[#bec8cb]/40'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Issues Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIssues.map((issue) => (
          <article
            key={issue.id}
            className="bg-white rounded-2xl sm:rounded-3xl border border-[#bec8cb]/40 overflow-hidden flex flex-col hover:shadow-md hover:border-[#006474]/40 transition-all duration-300 group cursor-pointer"
            onClick={() => onSelectIssue(issue)}
          >
            {/* Visual Cover Header */}
            <div className="h-36 w-full relative overflow-hidden bg-gradient-to-r from-[#2d7d8e]/20 to-[#cbead6]/40">
              <img
                src={issue.image}
                alt={issue.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  // Resilient zero-broken image fallback
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-40" />
            </div>

            {/* Content Body */}
            <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${issue.badgeBg} ${issue.badgeText} flex items-center justify-center shrink-0`}>
                    <span className="material-symbols-outlined text-[22px]">{issue.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-lg sm:text-xl text-[#191c1c] tracking-tight group-hover:text-[#006474] transition-colors">
                      {issue.title}
                    </h3>
                    <span className="text-[11px] font-semibold text-[#496455] uppercase tracking-wider">
                      {issue.category}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#3f484b] leading-relaxed line-clamp-3">
                  {issue.shortDescription}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectIssue(issue);
                  }}
                  className="w-full text-center font-semibold text-xs sm:text-sm text-white bg-[#006474] hover:bg-[#004e5b] rounded-xl py-2.5 px-4 transition-all shadow-xs active:scale-95 duration-150 flex items-center justify-center gap-2"
                >
                  <span>Start Support</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </article>
        ))}

        {filteredIssues.length === 0 && (
          <div className="col-span-full py-12 text-center space-y-3 bg-white rounded-3xl border border-[#bec8cb]/30 p-8">
            <span className="material-symbols-outlined text-[40px] text-[#6f797c]">search_off</span>
            <h4 className="font-headline font-bold text-lg text-[#191c1c]">No matching issues found</h4>
            <p className="text-sm text-[#3f484b] max-w-md mx-auto">
              Try searching for terms like "exam", "placement", "viva", or click "All Topics" to see all available support guides.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Topics');
              }}
              className="px-4 py-2 bg-[#006474] text-white rounded-full text-xs font-semibold shadow-xs"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
