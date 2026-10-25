import React, { useState } from 'react';
import { CbtStrategy } from '../types';

interface CbtInteractiveCardProps {
  strategy: CbtStrategy;
}

export const CbtInteractiveCard: React.FC<CbtInteractiveCardProps> = ({ strategy }) => {
  const [activeTab, setActiveTab] = useState<'reframer' | 'practice'>('reframer');
  const [userThought, setUserThought] = useState('');
  const [customReframe, setCustomReframe] = useState<string | null>(null);

  const handleCustomReframe = () => {
    if (!userThought.trim()) return;

    // Intelligent CBT template reframe
    const trimmed = userThought.trim();
    let reframeText = "";

    if (trimmed.toLowerCase().includes('fail') || trimmed.toLowerCase().includes('ruin')) {
      reframeText = `This is a high-pressure moment, but failing a test or project does not define my intelligence or future. I can review what went wrong, adapt my study plan, and try again.`;
    } else if (trimmed.toLowerCase().includes('never') || trimmed.toLowerCase().includes('always')) {
      reframeText = `Using words like 'never' or 'always' makes the challenge feel permanent. The reality is that this difficulty is temporary, and with practice my understanding will grow.`;
    } else if (trimmed.toLowerCase().includes('everyone') || trimmed.toLowerCase().includes('better than me')) {
      reframeText = `I am comparing my internal struggle to everyone else's external facade. My progress is unique, and learning engineering is a marathon, not a race against peers.`;
    } else {
      reframeText = `While it is understandable to feel stressed about this, I am magnifying the worst-case scenario. Even if things don't go according to plan, I have the resilience and support to navigate it.`;
    }

    setCustomReframe(reframeText);
  };

  return (
    <section className="bg-white border border-[#bec8cb]/40 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-[0_4px_16px_rgba(8,104,120,0.05)] transition-all">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#cbead6] text-[#006474] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">psychology</span>
          </div>
          <div>
            <h2 className="font-headline font-bold text-lg sm:text-xl text-[#191c1c] tracking-tight">
              {strategy.title}
            </h2>
            <span className="text-xs text-[#496455] font-medium">Cognitive Behavioral Therapy (CBT)</span>
          </div>
        </div>

        {/* Practice Toggle */}
        {strategy.practiceExamples && strategy.practiceExamples.length > 0 && (
          <div className="flex bg-[#f3f4f4] p-0.5 rounded-full text-xs">
            <button
              onClick={() => setActiveTab('reframer')}
              className={`px-3 py-1 rounded-full transition-colors ${
                activeTab === 'reframer' ? 'bg-[#006474] text-white shadow-xs font-semibold' : 'text-[#3f484b]'
              }`}
            >
              Core Example
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`px-3 py-1 rounded-full transition-colors ${
                activeTab === 'practice' ? 'bg-[#006474] text-white shadow-xs font-semibold' : 'text-[#3f484b]'
              }`}
            >
              Campus Case
            </button>
          </div>
        )}
      </div>

      <p className="text-sm sm:text-base text-[#3f484b] mb-5 leading-relaxed">
        {strategy.explanation}
      </p>

      {/* Main Content */}
      {activeTab === 'reframer' ? (
        <div className="space-y-3 bg-[#f8f9f9] p-4 sm:p-5 rounded-2xl border border-[#bec8cb]/30">
          {/* Negative Thought */}
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[#ba1a1a] mt-0.5 shrink-0 text-[20px]">cancel</span>
            <div className="flex-1">
              <span className="text-[11px] font-bold text-[#6f797c] uppercase tracking-wider block mb-0.5">
                Automatic Negative Thought ({strategy.distortionType})
              </span>
              <p className="text-sm sm:text-base text-[#191c1c] font-medium italic">
                {strategy.negativeThought}
              </p>
            </div>
          </div>

          <div className="h-px w-full bg-[#bec8cb]/30 my-2" />

          {/* Reframed Thought */}
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[#006474] mt-0.5 shrink-0 text-[20px] fill-1">check_circle</span>
            <div className="flex-1">
              <span className="text-[11px] font-bold text-[#006474] uppercase tracking-wider block mb-0.5">
                Evidence-Grounded Reframed Thought
              </span>
              <p className="text-sm sm:text-base text-[#191c1c] font-semibold">
                {strategy.reframedThought}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {strategy.practiceExamples?.map((ex, idx) => (
            <div key={idx} className="bg-[#f8f9f9] p-4 rounded-xl border border-[#bec8cb]/30 space-y-2">
              <span className="text-xs font-bold text-[#006474] uppercase tracking-wide block">
                Scenario: {ex.situation}
              </span>
              <div className="text-xs text-[#ba1a1a] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">cancel</span>
                <span>Negative: "{ex.negative}"</span>
              </div>
              <div className="text-xs text-[#006474] font-medium flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] fill-1">check_circle</span>
                <span>Reframed: "{ex.reframed}"</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Interactive 'Try your own thought' Accordion */}
      <div className="mt-5 pt-4 border-t border-[#bec8cb]/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-[#006474] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">edit</span>
            Try Reframing a Thought Right Now
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={userThought}
            onChange={(e) => setUserThought(e.target.value)}
            placeholder="e.g. I didn't understand the algorithm today, I'm falling behind..."
            className="flex-1 bg-[#f3f4f4] border border-[#bec8cb]/50 focus:border-[#006474] focus:bg-white rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#191c1c] placeholder:text-[#6f797c] outline-none transition-all"
          />
          <button
            onClick={handleCustomReframe}
            disabled={!userThought.trim()}
            className="px-4 py-2 bg-[#006474] hover:bg-[#004e5b] disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-xs active:scale-95 transition-all whitespace-nowrap"
          >
            Reframe
          </button>
        </div>

        {customReframe && (
          <div className="mt-3 p-3.5 bg-[#cbead6]/40 border border-[#cbead6] rounded-xl text-xs sm:text-sm text-[#052014] animate-fade-in flex items-start gap-2">
            <span className="material-symbols-outlined text-[#006474] text-[18px] shrink-0 mt-0.5 fill-1">auto_awesome</span>
            <div>
              <span className="font-semibold block mb-0.5 text-[#006474]">Healthy Perspective:</span>
              <p className="leading-relaxed">{customReframe}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
