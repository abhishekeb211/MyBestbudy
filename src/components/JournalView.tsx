import React, { useState } from 'react';
import { JournalEntry } from '../types';

interface JournalViewProps {
  entries: JournalEntry[];
  onAddEntry: (entry: Omit<JournalEntry, 'id'>) => void;
  onDeleteEntry: (id: string) => void;
}

export const JournalView: React.FC<JournalViewProps> = ({
  entries,
  onAddEntry,
  onDeleteEntry,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [situation, setSituation] = useState('');
  const [negativeThought, setNegativeThought] = useState('');
  const [distortion, setDistortion] = useState('Catastrophizing');
  const [reframedThought, setReframedThought] = useState('');
  const [moodBefore, setMoodBefore] = useState(2);
  const [moodAfter, setMoodAfter] = useState(4);

  const distortions = [
    'Catastrophizing (Expecting worst case)',
    'All-or-Nothing (Black & white thinking)',
    'Mind Reading (Assuming others judge me)',
    'Emotional Reasoning (Feeling equals reality)',
    'Rigid Demands ("I MUST" / "I SHOULD")',
    'Personalization (Blaming self for everything)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!negativeThought.trim() || !reframedThought.trim()) return;

    onAddEntry({
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      title: title.trim() || 'CBT Thought Record',
      situation: situation.trim() || 'Engineering studies',
      negativeThought: negativeThought.trim(),
      distortion,
      reframedThought: reframedThought.trim(),
      moodBefore,
      moodAfter,
    });

    // Reset
    setTitle('');
    setSituation('');
    setNegativeThought('');
    setReframedThought('');
    setIsCreating(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 animate-fade-in pb-28 md:pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline font-bold text-2xl sm:text-4xl text-[#191c1c] tracking-tight">
            Reflective Journal
          </h1>
          <p className="text-xs sm:text-sm text-[#3f484b] mt-0.5">
            CBT Thought Records: Challenge automatic assumptions and find mental equilibrium.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-5 py-2.5 bg-[#006474] hover:bg-[#004e5b] text-white text-xs sm:text-sm font-semibold rounded-full shadow-xs active:scale-95 transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">
            {isCreating ? 'close' : 'add'}
          </span>
          <span>{isCreating ? 'Cancel' : 'New Thought Record'}</span>
        </button>
      </div>

      {/* Thought Record Creator Form */}
      {isCreating && (
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[#bec8cb]/50 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5 animate-fade-in"
        >
          <div className="flex items-center gap-2 text-[#006474] font-headline font-bold text-base">
            <span className="material-symbols-outlined fill-1">edit_note</span>
            <span>New CBT Thought Record</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#6f797c] uppercase tracking-wider mb-1">
                Title / Context
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Lab submission anxiety"
                className="w-full bg-[#f8f9f9] border border-[#bec8cb]/50 focus:bg-white focus:border-[#006474] rounded-xl px-3.5 py-2 text-xs sm:text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6f797c] uppercase tracking-wider mb-1">
                Trigger / Situation
              </label>
              <input
                type="text"
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                placeholder="e.g. Tough code bug before 11 PM deadline"
                className="w-full bg-[#f8f9f9] border border-[#bec8cb]/50 focus:bg-white focus:border-[#006474] rounded-xl px-3.5 py-2 text-xs sm:text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#ba1a1a] uppercase tracking-wider mb-1">
              Automatic Negative Thought
            </label>
            <textarea
              value={negativeThought}
              onChange={(e) => setNegativeThought(e.target.value)}
              rows={2}
              required
              placeholder="What immediate harsh thought jumped into your mind? (e.g. I am going to fail and get zero marks)"
              className="w-full bg-[#ffdad6]/20 border border-[#ffdad6] focus:bg-white focus:border-[#ba1a1a] rounded-xl p-3 text-xs sm:text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#6f797c] uppercase tracking-wider mb-1">
              Recognized Cognitive Distortion
            </label>
            <select
              value={distortion}
              onChange={(e) => setDistortion(e.target.value)}
              className="w-full bg-[#f8f9f9] border border-[#bec8cb]/50 rounded-xl px-3.5 py-2 text-xs sm:text-sm outline-none"
            >
              {distortions.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#006474] uppercase tracking-wider mb-1">
              Balanced Reframed Thought (Evidence-Based)
            </label>
            <textarea
              value={reframedThought}
              onChange={(e) => setReframedThought(e.target.value)}
              rows={2}
              required
              placeholder="What is a more compassionate, factual way to view this? (e.g. Submitting 80% working code with notes is far better than giving up)"
              className="w-full bg-[#cbead6]/30 border border-[#cbead6] focus:bg-white focus:border-[#006474] rounded-xl p-3 text-xs sm:text-sm outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <span className="text-xs text-[#6f797c] block mb-1 font-medium">Mood Before (1-5): {moodBefore}</span>
              <input
                type="range"
                min="1"
                max="5"
                value={moodBefore}
                onChange={(e) => setMoodBefore(parseInt(e.target.value, 10))}
                className="w-full accent-[#ba1a1a]"
              />
            </div>
            <div>
              <span className="text-xs text-[#006474] block mb-1 font-medium">Mood After Reframe (1-5): {moodAfter}</span>
              <input
                type="range"
                min="1"
                max="5"
                value={moodAfter}
                onChange={(e) => setMoodAfter(parseInt(e.target.value, 10))}
                className="w-full accent-[#006474]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-[#bec8cb]/30">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 text-xs text-[#6f797c] hover:text-[#191c1c]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#006474] hover:bg-[#004e5b] text-white text-xs sm:text-sm font-semibold rounded-full shadow-xs active:scale-95"
            >
              Save Record
            </button>
          </div>
        </form>
      )}

      {/* Entries List */}
      <div className="space-y-4">
        {entries.map((entry) => (
          <article
            key={entry.id}
            className="bg-white border border-[#bec8cb]/40 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#6f797c] font-medium block">{entry.date}</span>
                <h3 className="font-headline font-bold text-base sm:text-lg text-[#191c1c]">{entry.title}</h3>
              </div>
              <button
                onClick={() => onDeleteEntry(entry.id)}
                className="text-[#6f797c] hover:text-[#ba1a1a] p-1.5 rounded-lg hover:bg-[#f3f4f4] transition-colors"
                title="Delete entry"
              >
                <span className="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </div>

            <div className="space-y-2 text-xs sm:text-sm">
              <div className="p-3 bg-[#ffdad6]/25 rounded-xl border border-[#ffdad6]/60">
                <span className="font-bold text-[#ba1a1a] uppercase text-[10px] tracking-wider block mb-0.5">
                  Distortion: {entry.distortion}
                </span>
                <p className="italic text-[#191c1c]">"{entry.negativeThought}"</p>
              </div>

              <div className="p-3 bg-[#cbead6]/40 rounded-xl border border-[#cbead6]">
                <span className="font-bold text-[#006474] uppercase text-[10px] tracking-wider block mb-0.5">
                  Reframed Perspective
                </span>
                <p className="font-medium text-[#052014]">"{entry.reframedThought}"</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#6f797c] pt-2 border-t border-[#bec8cb]/20">
              <span>Context: {entry.situation}</span>
              <div className="flex items-center gap-1.5 font-medium">
                <span>Shift:</span>
                <span className="text-[#ba1a1a]">{entry.moodBefore}/5</span>
                <span>→</span>
                <span className="text-[#006474] font-bold">{entry.moodAfter}/5</span>
              </div>
            </div>
          </article>
        ))}

        {entries.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-[#bec8cb]/30 p-8 space-y-3">
            <span className="material-symbols-outlined text-[40px] text-[#6f797c]">edit_note</span>
            <h4 className="font-headline font-bold text-lg text-[#191c1c]">No Journal Records Yet</h4>
            <p className="text-xs sm:text-sm text-[#3f484b] max-w-sm mx-auto">
              Whenever you catch yourself spiraling into "what ifs" or self-criticism, tap "New Thought Record" to practice evidence-based CBT reframing.
            </p>
            <button
              onClick={() => setIsCreating(true)}
              className="px-5 py-2 bg-[#006474] text-white text-xs font-semibold rounded-full shadow-xs"
            >
              Create First Record
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
