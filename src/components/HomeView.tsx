import React, { useState } from 'react';
import { Issue, MoodLog, Quest, StudentProfile } from '../types';
import { ISSUES_DATA, RECOMMENDED_ARTICLES } from '../data/issuesData';
import { BreathingGuide } from './BreathingGuide';
import { QuietTimer } from './QuietTimer';

interface HomeViewProps {
  profile: StudentProfile;
  quests: Quest[];
  onCompleteQuest: (questId: string) => void;
  onNavigateToExplore: () => void;
  onNavigateToChat: () => void;
  onSelectIssue: (issue: Issue) => void;
  onLogMood: (rating: number, label: string) => void;
  recentMood?: MoodLog;
}

export const HomeView: React.FC<HomeViewProps> = ({
  profile,
  quests,
  onCompleteQuest,
  onNavigateToExplore,
  onNavigateToChat,
  onSelectIssue,
  onLogMood,
  recentMood,
}) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(recentMood?.rating || null);
  const [showQuietTimer, setShowQuietTimer] = useState(false);
  const [activeArticleModal, setActiveArticleModal] = useState<typeof RECOMMENDED_ARTICLES[0] | null>(null);

  // Time-aware greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const moodOptions = [
    { rating: 1, icon: 'sentiment_very_dissatisfied', label: 'Very Low', feedback: 'Sending you gentle warmth. You do not have to struggle in silence.' },
    { rating: 2, icon: 'sentiment_dissatisfied', label: 'Low', feedback: 'Tough days happen. Be extra compassionate with yourself today.' },
    { rating: 3, icon: 'sentiment_neutral', label: 'Okay', feedback: 'Steady and grounded. A good day to practice one micro-habit.' },
    { rating: 4, icon: 'sentiment_satisfied', label: 'Good', feedback: 'Glad your energy is feeling lighter! Keep this momentum.' },
    { rating: 5, icon: 'sentiment_very_satisfied', label: 'Great', feedback: 'Wonderful! Celebrate your peace and share a kind word with someone.' },
  ];

  const handleMoodSelect = (rating: number, label: string) => {
    setSelectedMood(rating);
    onLogMood(rating, label);
  };

  const selectedMoodData = moodOptions.find((m) => m.rating === selectedMood);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 animate-fade-in pb-28 md:pb-12">
      {/* Greeting Section */}
      <section className="space-y-1">
        <h1 className="font-headline font-bold text-2xl sm:text-4xl text-[#191c1c] tracking-tight">
          {getGreeting()}, {profile.name || 'Arjun'}.
        </h1>
        <p className="text-sm sm:text-base text-[#3f484b]">
          We're glad you're here. Let's take a quiet moment for yourself.
        </p>
      </section>

      {/* Mood Check-in Card (From Image 11 & 12) */}
      <section className="bg-white border border-[#bec8cb]/40 rounded-3xl p-6 sm:p-8 flex flex-col items-center gap-6 shadow-[0_4px_16px_rgba(8,104,120,0.05)]">
        <h2 className="font-headline font-bold text-lg sm:text-2xl text-[#191c1c] text-center tracking-tight">
          How are you feeling today?
        </h2>

        <div className="flex justify-between items-center w-full max-w-md gap-2 sm:gap-4">
          {moodOptions.map((item) => {
            const isSelected = selectedMood === item.rating;
            return (
              <button
                key={item.rating}
                onClick={() => handleMoodSelect(item.rating, item.label)}
                className="flex flex-col items-center gap-1.5 hover:scale-110 active:scale-95 transition-all duration-200 group cursor-pointer focus:outline-none"
                aria-label={item.label}
              >
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-[#006474] text-white shadow-md'
                      : 'bg-[#f3f4f4] text-[#3f484b] group-hover:bg-[#cbead6] group-hover:text-[#006474]'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[28px] sm:text-[32px] ${
                      isSelected ? 'fill-1' : ''
                    }`}
                  >
                    {item.icon}
                  </span>
                </div>
                <span className={`text-[10px] sm:text-xs font-medium ${isSelected ? 'text-[#006474] font-bold' : 'text-[#6f797c]'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {selectedMoodData && (
          <div className="p-3.5 bg-[#cbead6]/40 border border-[#cbead6] rounded-2xl text-xs sm:text-sm text-[#052014] text-center max-w-md animate-fade-in">
            {selectedMoodData.feedback}
          </div>
        )}
      </section>

      {/* AI Buddy Immediate Quick-Entry Banner */}
      <section className="bg-gradient-to-r from-[#2d7d8e] to-[#006474] rounded-3xl p-6 text-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
            <span className="material-symbols-outlined text-[28px]">psychology</span>
          </div>
          <div>
            <h3 className="font-headline font-bold text-lg sm:text-xl leading-tight">
              Talk to Best Buddy AI
            </h3>
            <p className="text-xs sm:text-sm text-white/90 mt-0.5">
              Confidential, CBT-guided support tailored for engineering students.
            </p>
          </div>
        </div>
        <button
          onClick={onNavigateToChat}
          className="w-full md:w-auto px-5 py-2.5 bg-white text-[#006474] hover:bg-[#cbead6] rounded-full font-headline font-bold text-xs sm:text-sm shadow-sm active:scale-95 transition-all whitespace-nowrap cursor-pointer"
        >
          Open Chat
        </button>
      </section>

      {/* Bento Grid: Grounding Breath & Daily Quests */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Breathing Guide */}
        <BreathingGuide />

        {/* QuestMind 90-Second Habit Loop (Move, Pause, Think, Connect, Reflect) */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#bec8cb]/40 shadow-[0_4px_16px_rgba(8,104,120,0.05)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006474]">flag</span>
                <h3 className="font-headline font-bold text-lg sm:text-xl text-[#191c1c]">
                  Today's Mindful Micro-Quests
                </h3>
              </div>
              <span className="text-[11px] font-bold text-[#496455] uppercase tracking-wider bg-[#cbead6] px-2.5 py-0.5 rounded-full">
                QuestMind
              </span>
            </div>
            <p className="text-xs text-[#3f484b] mb-4">
              90-second actionable practices. No streak penalties, just cumulative personal growth.
            </p>

            <div className="space-y-3">
              {quests.map((q) => (
                <div
                  key={q.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    q.completed
                      ? 'bg-[#f3f4f4] border-[#bec8cb]/30 opacity-75'
                      : 'bg-[#f8f9f9] border-[#bec8cb]/50 hover:border-[#006474]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onCompleteQuest(q.id)}
                      className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
                        q.completed ? 'bg-[#006474] border-[#006474] text-white' : 'border-[#6f797c] hover:border-[#006474]'
                      }`}
                    >
                      {q.completed && <span className="material-symbols-outlined text-[16px]">check</span>}
                    </button>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-[#191c1c] flex items-center gap-2">
                        <span>{q.title}</span>
                        <span className="text-[10px] text-[#6f797c] bg-white px-2 py-0.5 rounded-md border border-[#bec8cb]/30">
                          {q.duration}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#6f797c] line-clamp-1">{q.description}</div>
                    </div>
                  </div>

                  {q.type === 'pause' && !q.completed && (
                    <button
                      onClick={() => setShowQuietTimer(true)}
                      className="px-3 py-1 bg-[#006474] text-white text-[11px] font-semibold rounded-full hover:bg-[#004e5b] whitespace-nowrap active:scale-95"
                    >
                      Timer
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#bec8cb]/30 flex items-center justify-between text-xs text-[#6f797c]">
            <span>Take breaks whenever you feel strained</span>
            <button
              onClick={onNavigateToExplore}
              className="text-[#006474] font-semibold hover:underline flex items-center gap-1"
            >
              <span>Explore All Issues</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Recommended Articles Section (From Image 11 & 12) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-headline font-bold text-xl sm:text-2xl text-[#191c1c] tracking-tight">
            Campus Wellness Reads
          </h2>
          <button
            onClick={onNavigateToExplore}
            className="text-xs sm:text-sm font-semibold text-[#006474] hover:underline"
          >
            Browse all topics
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RECOMMENDED_ARTICLES.map((article) => (
            <article
              key={article.id}
              onClick={() => setActiveArticleModal(article)}
              className="bg-white border border-[#bec8cb]/40 rounded-3xl overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 group cursor-pointer"
            >
              <div className="h-44 w-full bg-[#f3f4f4] relative overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#006474] text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {article.tag}
                </div>
              </div>

              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-3">
                <div className="space-y-1.5">
                  <div className="text-[11px] text-[#6f797c] font-medium">{article.readTime}</div>
                  <h3 className="font-headline font-bold text-lg sm:text-xl text-[#191c1c] group-hover:text-[#006474] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3f484b] leading-relaxed line-clamp-2">
                    {article.description}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-[#006474] pt-1">
                  <span>Read full guide</span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Featured Quick Issues Strip */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#bec8cb]/40 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline font-bold text-lg sm:text-xl text-[#191c1c]">
              Quick Support Categories
            </h3>
            <p className="text-xs text-[#3f484b]">Direct access to CBT strategies for common student concerns</p>
          </div>
          <button
            onClick={onNavigateToExplore}
            className="text-xs font-semibold text-[#006474] hover:underline"
          >
            View all
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {ISSUES_DATA.slice(0, 6).map((iss) => (
            <button
              key={iss.id}
              onClick={() => onSelectIssue(iss)}
              className="p-3.5 rounded-2xl bg-[#f8f9f9] hover:bg-[#cbead6]/40 border border-[#bec8cb]/30 text-center flex flex-col items-center gap-2 transition-all active:scale-95 group cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-full ${iss.badgeBg} ${iss.badgeText} flex items-center justify-center shrink-0`}>
                <span className="material-symbols-outlined text-[20px]">{iss.icon}</span>
              </div>
              <span className="text-xs font-semibold text-[#191c1c] group-hover:text-[#006474] line-clamp-1">
                {iss.title}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Privacy Guarantee Footer */}
      <div className="flex items-center justify-center gap-1.5 text-xs text-[#6f797c] pt-4">
        <span className="material-symbols-outlined text-[16px]">lock</span>
        <span>Your data is private and secure · Stored locally on this device.</span>
      </div>

      {/* Quiet Timer Modal */}
      {showQuietTimer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <QuietTimer
            onComplete={() => {
              const pauseQuest = quests.find((q) => q.type === 'pause');
              if (pauseQuest) onCompleteQuest(pauseQuest.id);
            }}
            onCancel={() => setShowQuietTimer(false)}
          />
        </div>
      )}

      {/* Article Reader Modal */}
      {activeArticleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl border border-[#bec8cb]/50">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[11px] font-bold text-[#006474] uppercase tracking-wider bg-[#cbead6] px-2.5 py-0.5 rounded-full">
                  {activeArticleModal.tag}
                </span>
                <h3 className="font-headline font-bold text-xl sm:text-2xl text-[#191c1c] mt-2">
                  {activeArticleModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveArticleModal(null)}
                className="w-8 h-8 rounded-full hover:bg-[#f3f4f4] flex items-center justify-center text-[#6f797c]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="text-xs sm:text-sm text-[#3f484b] whitespace-pre-wrap leading-relaxed py-2">
              {activeArticleModal.content}
            </div>

            <div className="pt-4 border-t border-[#bec8cb]/30 flex justify-end">
              <button
                onClick={() => setActiveArticleModal(null)}
                className="px-5 py-2 bg-[#006474] text-white text-xs font-semibold rounded-full"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
