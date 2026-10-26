import React, { useState, useMemo } from 'react';
import { Badge, JournalEntry, MoodLog, Quest, SavedPrompt } from '../types';
import { BadgeDetailModal } from './BadgeDetailModal';

interface ProgressViewProps {
  quests: Quest[];
  moodHistory: MoodLog[];
  journalEntries?: JournalEntry[];
  savedPrompts?: SavedPrompt[];
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  quests,
  moodHistory,
  journalEntries = [],
  savedPrompts = [],
}) => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [badgeFilter, setBadgeFilter] = useState<'all' | 'earned' | 'in_progress'>('all');

  const completedQuestsCount = quests.filter((q) => q.completed).length;
  const pauseQuestsCount = quests.filter(
    (q) => q.completed && (q.type === 'pause' || q.type === 'reflect')
  ).length;

  // Compute live badges
  const badges: Badge[] = useMemo(() => {
    const list: Badge[] = [
      {
        id: 'badge-consistency-champ',
        title: 'Consistency Champ',
        description: 'Record 5 daily mood check-ins to build mindful emotional awareness.',
        category: 'mood',
        icon: 'calendar_month',
        targetCount: 5,
        currentCount: Math.min(5, moodHistory.length),
        isUnlocked: moodHistory.length >= 5,
        benefitTip: 'Consistently logging how you feel gives you distance from acute stress and prevents panic from accumulating.',
      },
      {
        id: 'badge-reframer-3',
        title: 'Reframer',
        description: 'Complete 3 CBT & REBT cognitive reframing entries in your journal.',
        category: 'journal',
        icon: 'psychology',
        targetCount: 3,
        currentCount: Math.min(3, journalEntries.length),
        isUnlocked: journalEntries.length >= 3,
        benefitTip: 'Challenging rigid demands ("I must get placed immediately") creates flexible, resilient mindsets.',
      },
      {
        id: 'badge-quest-pioneer',
        title: 'Quest Pioneer',
        description: 'Complete 3 daily QuestMind wellness and somatic micro-habits.',
        category: 'quest',
        icon: 'explore',
        targetCount: 3,
        currentCount: Math.min(3, completedQuestsCount),
        isUnlocked: completedQuestsCount >= 3,
        benefitTip: 'Physical micro-movements and sensory breaks discharge cognitive tension built during long coding sessions.',
      },
      {
        id: 'badge-zen-breather',
        title: 'Zen Breather',
        description: 'Complete a Pause or Reflect mindfulness quest without screens.',
        category: 'mindfulness',
        icon: 'air',
        targetCount: 1,
        currentCount: Math.min(1, pauseQuestsCount),
        isUnlocked: pauseQuestsCount >= 1,
        benefitTip: 'Conscious 4-6 breathing physically slows your heart rate and signals safety to your nervous system.',
      },
      {
        id: 'badge-first-step',
        title: 'First Step Forward',
        description: 'Log your very first mood check-in or journal reframing.',
        category: 'mindfulness',
        icon: 'spa',
        targetCount: 1,
        currentCount: Math.min(1, moodHistory.length + journalEntries.length),
        isUnlocked: moodHistory.length + journalEntries.length >= 1,
        benefitTip: 'Self-compassion begins with simply taking 30 seconds to acknowledge where your mind is today.',
      },
      {
        id: 'badge-prompt-artisan',
        title: 'Prompt Artisan',
        description: 'Save 2 structured AI prompts for academic and placement reassurance.',
        category: 'prompt',
        icon: 'draw',
        targetCount: 2,
        currentCount: Math.min(2, savedPrompts.length),
        isUnlocked: savedPrompts.length >= 2,
        benefitTip: 'Well-structured prompts help AI act as an evidence-informed sounding board rather than a generic chatbot.',
      },
      {
        id: 'badge-mood-explorer',
        title: 'Mood Explorer',
        description: 'Record 10 mood check-ins across your semester journey.',
        category: 'mood',
        icon: 'insights',
        targetCount: 10,
        currentCount: Math.min(10, moodHistory.length),
        isUnlocked: moodHistory.length >= 10,
        benefitTip: 'Longitudinal self-tracking illuminates which campus routines boost your energy and which drain you.',
      },
      {
        id: 'badge-master-reframer',
        title: 'Master Reframer',
        description: 'Complete 10 cognitive reframing entries to disarm automatic negative thoughts.',
        category: 'journal',
        icon: 'auto_fix_high',
        targetCount: 10,
        currentCount: Math.min(10, journalEntries.length),
        isUnlocked: journalEntries.length >= 10,
        benefitTip: 'Deep cognitive practice transforms your inner dialogue from self-criticism to steady self-coaching.',
      },
      {
        id: 'badge-mindful-champion',
        title: 'Mindful Champion',
        description: 'Complete 6 daily wellness quests across Move, Pause, and Think modules.',
        category: 'quest',
        icon: 'workspace_premium',
        targetCount: 6,
        currentCount: Math.min(6, completedQuestsCount),
        isUnlocked: completedQuestsCount >= 6,
        benefitTip: 'Holistic wellness balances movement, sensory quiet, and constructive cognitive thought.',
      },
    ];

    return list;
  }, [moodHistory, journalEntries, completedQuestsCount, pauseQuestsCount, savedPrompts]);

  const earnedCount = badges.filter((b) => b.isUnlocked).length;

  const filteredBadges = useMemo(() => {
    if (badgeFilter === 'earned') return badges.filter((b) => b.isUnlocked);
    if (badgeFilter === 'in_progress') return badges.filter((b) => !b.isUnlocked);
    return badges;
  }, [badges, badgeFilter]);

  return (
    <div className="w-full px-4 py-5 space-y-6 animate-fade-in pb-24">
      {/* Title */}
      <div>
        <h1 className="font-headline font-bold text-2xl text-[#191c1c] tracking-tight">
          Wellness Growth
        </h1>
        <p className="text-xs text-[#3f484b] mt-0.5 leading-relaxed">
          QuestMind cumulative progression: No streak penalties. Every mindful moment counts forever.
        </p>
      </div>

      {/* Cumulative Mindful Garden Card */}
      <section className="bg-gradient-to-br from-white to-[#f8f9f9] border border-[#bec8cb]/50 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#496455] uppercase tracking-wider bg-[#cbead6] px-2 py-0.5 rounded-full">
              Growth Matrix
            </span>
            <h2 className="font-headline font-bold text-lg text-[#191c1c] mt-1">
              Mindful Bloom Garden
            </h2>
          </div>

          <div className="text-right">
            <span className="text-xl font-headline font-extrabold text-[#006474] tabular-nums">
              {completedQuestsCount * 12 + 48}
            </span>
            <span className="text-[10px] text-[#6f797c] font-medium block">Growth Particles</span>
          </div>
        </div>

        {/* Visual Garden Matrix */}
        <div className="relative bg-[#f3fcff] border border-[#2d7d8e]/20 rounded-xl p-3 overflow-hidden flex items-center justify-center">
          <div className="grid grid-cols-6 gap-2 w-full max-w-xs mx-auto">
            {Array.from({ length: 18 }).map((_, i) => {
              const isEarned = i < completedQuestsCount + 8;
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-xl flex items-center justify-center transition-all ${
                    isEarned
                      ? 'bg-white shadow-2xs border border-[#cbead6] text-[#006474] scale-100'
                      : 'bg-[#e7e8e8]/50 text-[#bec8cb] border border-dashed border-[#bec8cb]/60 scale-90'
                  }`}
                  title={isEarned ? 'Active Bloom Particle' : 'Future Seed'}
                >
                  <span className={`material-symbols-outlined text-[18px] ${isEarned ? 'fill-1' : ''}`}>
                    {i % 4 === 0 ? 'spa' : i % 4 === 1 ? 'psychology' : i % 4 === 2 ? 'bedtime_off' : 'favorite'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-[11px] text-[#496455] bg-[#cbead6]/30 p-2.5 rounded-xl border border-[#cbead6]/80 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#006474] text-[16px] shrink-0">favorite</span>
          <span className="leading-snug">
            <strong>Zero-shame philosophy:</strong> Taking a break is healthy. Your particles and milestones will never drain or reset.
          </span>
        </div>
      </section>

      {/* NEW: Milestone Badges Section */}
      <section className="bg-white border border-[#bec8cb]/40 rounded-2xl p-5 shadow-xs space-y-4">
        {/* Header & Filter Controls */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#cbead6] text-[#006474] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px] fill-1">military_tech</span>
              </div>
              <div>
                <h3 className="font-headline font-bold text-base text-[#191c1c]">
                  Earned Badges
                </h3>
                <p className="text-[11px] text-[#6f797c]">
                  {earnedCount} of {badges.length} Unlocked
                </p>
              </div>
            </div>

            {/* Overall Unlocked Ratio */}
            <div className="text-right">
              <span className="font-headline font-bold text-sm text-[#006474] tabular-nums">
                {Math.round((earnedCount / badges.length) * 100)}%
              </span>
              <span className="text-[10px] text-[#6f797c] block">Complete</span>
            </div>
          </div>

          {/* Overall Badge Progress Bar */}
          <div className="w-full h-1.5 bg-[#e7e8e8] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#006474] rounded-full transition-all duration-500"
              style={{ width: `${(earnedCount / badges.length) * 100}%` }}
            />
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#f3f4f4] rounded-xl text-xs">
            <button
              onClick={() => setBadgeFilter('all')}
              className={`flex-1 py-1.5 text-center font-medium rounded-lg transition-all cursor-pointer ${
                badgeFilter === 'all'
                  ? 'bg-white text-[#006474] font-semibold shadow-2xs'
                  : 'text-[#6f797c] hover:text-[#191c1c]'
              }`}
            >
              All ({badges.length})
            </button>
            <button
              onClick={() => setBadgeFilter('earned')}
              className={`flex-1 py-1.5 text-center font-medium rounded-lg transition-all cursor-pointer ${
                badgeFilter === 'earned'
                  ? 'bg-white text-[#006474] font-semibold shadow-2xs'
                  : 'text-[#6f797c] hover:text-[#191c1c]'
              }`}
            >
              Earned ({earnedCount})
            </button>
            <button
              onClick={() => setBadgeFilter('in_progress')}
              className={`flex-1 py-1.5 text-center font-medium rounded-lg transition-all cursor-pointer ${
                badgeFilter === 'in_progress'
                  ? 'bg-white text-[#006474] font-semibold shadow-2xs'
                  : 'text-[#6f797c] hover:text-[#191c1c]'
              }`}
            >
              In Progress ({badges.length - earnedCount})
            </button>
          </div>
        </div>

        {/* Visual Badge Grid */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          {filteredBadges.map((badge) => {
            const percent = Math.min(100, Math.round((badge.currentCount / badge.targetCount) * 100));

            return (
              <button
                key={badge.id}
                onClick={() => setSelectedBadge(badge)}
                className={`text-left p-3.5 rounded-2xl border transition-all active:scale-[0.98] cursor-pointer flex flex-col justify-between min-h-[148px] ${
                  badge.isUnlocked
                    ? 'bg-gradient-to-b from-[#f3fcff] to-white border-[#2d7d8e]/30 shadow-2xs hover:border-[#006474]'
                    : 'bg-[#f8f9f9] border-[#bec8cb]/35 hover:border-[#bec8cb]'
                }`}
              >
                {/* Top Row: Icon and Status Tag */}
                <div className="flex items-start justify-between gap-2">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      badge.isUnlocked
                        ? 'bg-[#006474] text-white shadow-xs'
                        : 'bg-[#e7e8e8] text-[#6f797c]'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[20px] ${
                        badge.isUnlocked ? 'fill-1' : ''
                      }`}
                    >
                      {badge.icon}
                    </span>
                  </div>

                  {badge.isUnlocked ? (
                    <span className="text-[10px] font-bold text-[#006474] bg-[#cbead6] px-2 py-0.5 rounded-full flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[12px] fill-1">check</span>
                      Earned
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium text-[#6f797c] bg-[#e7e8e8] px-2 py-0.5 rounded-full">
                      {badge.currentCount}/{badge.targetCount}
                    </span>
                  )}
                </div>

                {/* Middle: Title & Brief Description */}
                <div className="my-2">
                  <h4
                    className={`font-headline font-bold text-xs leading-snug line-clamp-1 ${
                      badge.isUnlocked ? 'text-[#191c1c]' : 'text-[#3f484b]'
                    }`}
                  >
                    {badge.title}
                  </h4>
                  <p className="text-[11px] text-[#6f797c] line-clamp-2 mt-0.5 leading-tight">
                    {badge.description}
                  </p>
                </div>

                {/* Bottom: Progress Bar */}
                <div className="space-y-1 mt-auto">
                  <div className="w-full h-1.5 bg-[#e7e8e8] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        badge.isUnlocked ? 'bg-[#006474]' : 'bg-[#2d7d8e]'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-[#6f797c] tabular-nums">
                    <span>{badge.isUnlocked ? 'Unlocked' : `${percent}%`}</span>
                    <span className="text-[9px] text-[#2d7d8e]">Tap for lore</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Mood History Trajectory */}
      <section className="bg-white border border-[#bec8cb]/40 rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006474] text-[20px]">insights</span>
            <h3 className="font-headline font-bold text-base text-[#191c1c]">
              Recent Mood Check-ins
            </h3>
          </div>
          <span className="text-[11px] text-[#6f797c] tabular-nums">
            {moodHistory.length} logs recorded
          </span>
        </div>

        {moodHistory.length > 0 ? (
          <div className="grid grid-cols-4 gap-2 pt-1">
            {moodHistory.slice(-4).map((log) => (
              <div
                key={log.id}
                className="bg-[#f8f9f9] border border-[#bec8cb]/30 rounded-xl p-2.5 text-center flex flex-col items-center gap-1"
              >
                <span className="text-[9px] text-[#6f797c] font-medium">{log.date}</span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    log.rating >= 4
                      ? 'bg-[#cbead6] text-[#006474]'
                      : log.rating === 3
                      ? 'bg-[#f3f4f4] text-[#496455]'
                      : 'bg-[#ffdad6] text-[#ba1a1a]'
                  }`}
                >
                  <span className="font-headline font-bold text-xs">{log.rating}</span>
                </div>
                <span className="text-[9px] text-[#3f484b] font-medium truncate w-full">
                  {log.note || (log.rating >= 4 ? 'Good' : log.rating === 3 ? 'Steady' : 'Low')}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 bg-[#f8f9f9] rounded-xl text-center text-xs text-[#6f797c]">
            Log your mood on the Home tab to see your emotional trajectory here.
          </div>
        )}
      </section>

      {/* 3 QuestMind Pillars in Mobile Stack */}
      <section className="space-y-2.5">
        <h4 className="font-headline font-bold text-xs text-[#6f797c] uppercase tracking-wider px-1">
          QuestMind Principles
        </h4>
        <div className="bg-white p-3.5 rounded-xl border border-[#bec8cb]/40 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#cbead6] text-[#006474] flex items-center justify-center shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[18px]">directions_walk</span>
          </div>
          <div>
            <div className="text-xs font-bold text-[#191c1c]">MOVE Pillar</div>
            <div className="text-[11px] text-[#3f484b] leading-relaxed">
              Gentle somatic movement to discharge mental cortisol between study blocks.
            </div>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-[#bec8cb]/40 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#f3fcff] text-[#006474] border border-[#2d7d8e]/20 flex items-center justify-center shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[18px]">bedtime_off</span>
          </div>
          <div>
            <div className="text-xs font-bold text-[#191c1c]">PAUSE Pillar</div>
            <div className="text-[11px] text-[#3f484b] leading-relaxed">
              Voluntary screen-free quiet moments. Reclaiming sensory autonomy without guilt.
            </div>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-[#bec8cb]/40 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#cbead6] text-[#4f6a5b] flex items-center justify-center shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[18px]">psychology</span>
          </div>
          <div>
            <div className="text-xs font-bold text-[#191c1c]">THINK Pillar</div>
            <div className="text-[11px] text-[#3f484b] leading-relaxed">
              CBT & REBT thought reframing: Turning rigid demands into self-compassionate preferences.
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Badge Modal */}
      <BadgeDetailModal
        badge={selectedBadge}
        onClose={() => setSelectedBadge(null)}
      />
    </div>
  );
};
