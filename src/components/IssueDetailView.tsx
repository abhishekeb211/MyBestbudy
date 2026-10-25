import React from 'react';
import { Issue } from '../types';
import { CbtInteractiveCard } from './CbtInteractiveCard';

interface IssueDetailViewProps {
  issue: Issue;
  onBack: () => void;
  onStartQuestionnaire: (issue: Issue) => void;
}

export const IssueDetailView: React.FC<IssueDetailViewProps> = ({
  issue,
  onBack,
  onStartQuestionnaire,
}) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-8 animate-fade-in pb-28 md:pb-12">
      {/* Top Header / Back Nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white text-[#3f484b] hover:text-[#006474] border border-transparent hover:border-[#bec8cb]/40 transition-all active:scale-95 text-xs sm:text-sm font-semibold"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          <span>Back to Issues</span>
        </button>
        <span className="text-xs font-semibold text-[#496455] uppercase tracking-wider bg-[#cbead6] px-3 py-1 rounded-full">
          {issue.category}
        </span>
      </div>

      {/* Hero Section */}
      <section className="space-y-4">
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm h-52 sm:h-72 relative bg-[#f3f4f4] border border-[#bec8cb]/30">
          <img
            src={issue.heroImage || issue.image}
            alt={issue.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-5 sm:p-7">
            <h1 className="font-headline font-bold text-2xl sm:text-4xl text-white tracking-tight drop-shadow-sm">
              {issue.title}
            </h1>
          </div>
        </div>

        <p className="text-base sm:text-lg text-[#3f484b] leading-relaxed">
          {issue.fullDescription}
        </p>
      </section>

      {/* CBT Intervention Card */}
      <CbtInteractiveCard strategy={issue.cbtStrategy} />

      {/* REBT Intervention Card */}
      <section className="bg-white border border-[#bec8cb]/40 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-[0_4px_16px_rgba(8,104,120,0.05)] space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-[#a66142] text-white flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">balance</span>
          </div>
          <div>
            <h2 className="font-headline font-bold text-lg sm:text-xl text-[#191c1c] tracking-tight">
              {issue.rebtInsight.title}
            </h2>
            <span className="text-xs text-[#88492c] font-medium">Rational Emotive Behavior Therapy (REBT)</span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-[#3f484b] leading-relaxed">
          {issue.rebtInsight.explanation}
        </p>

        {/* The Demand vs The Preference Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="bg-[#ffdad6]/40 border border-[#ffdad6] rounded-2xl p-4 sm:p-5">
            <span className="text-[11px] font-bold text-[#ba1a1a] uppercase tracking-wider block mb-1">
              The Rigid Demand
            </span>
            <p className="text-sm sm:text-base text-[#191c1c] font-medium">
              {issue.rebtInsight.demand}
            </p>
          </div>

          <div className="bg-[#cbead6]/50 border border-[#cbead6] rounded-2xl p-4 sm:p-5">
            <span className="text-[11px] font-bold text-[#052014] uppercase tracking-wider block mb-1">
              The Flexible Preference
            </span>
            <p className="text-sm sm:text-base text-[#191c1c] font-medium">
              {issue.rebtInsight.preference}
            </p>
          </div>
        </div>

        {/* ABC Model Context */}
        <div className="bg-[#f8f9f9] p-4 rounded-xl border border-[#bec8cb]/30 text-xs text-[#3f484b] space-y-1">
          <span className="font-semibold text-[#191c1c] block">Albert Ellis's ABC Formulation:</span>
          <div><strong className="text-[#006474]">A (Event):</strong> {issue.rebtInsight.beliefModel.activatingEvent}</div>
          <div><strong className="text-[#ba1a1a]">B (Belief):</strong> {issue.rebtInsight.beliefModel.irrationalBelief}</div>
          <div><strong className="text-[#496455]">C (Dispute):</strong> {issue.rebtInsight.beliefModel.effectiveDispute}</div>
        </div>
      </section>

      {/* Practical Grounding Steps Checklist */}
      <section className="bg-white border border-[#bec8cb]/40 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-[0_4px_16px_rgba(8,104,120,0.05)] space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#f3f4f4] text-[#006474] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">checklist</span>
          </div>
          <h2 className="font-headline font-bold text-lg sm:text-xl text-[#191c1c] tracking-tight">
            Practical Micro-Actions for Today
          </h2>
        </div>

        <ul className="space-y-2.5">
          {issue.copingSteps.map((step, idx) => (
            <li key={idx} className="flex items-start gap-3 p-3 bg-[#f8f9f9] rounded-xl text-xs sm:text-sm text-[#191c1c]">
              <span className="w-5 h-5 rounded-full bg-[#006474] text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Custom AI Prompt Generator CTA Card */}
      <section className="bg-gradient-to-br from-[#2d7d8e] to-[#006474] rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        {/* Soft decorative glow */}
        <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[22px] fill-1 text-[#a9edff]">auto_awesome</span>
              <h2 className="font-headline font-bold text-xl sm:text-2xl text-white">
                Generate Your AI Support Prompt
              </h2>
            </div>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-xl">
              Ready to talk? Answer 5 short questions to craft a structured, compassionate support prompt for our built-in Best Buddy AI or external LLMs.
            </p>
          </div>

          <button
            onClick={() => onStartQuestionnaire(issue)}
            className="w-full md:w-auto bg-white hover:bg-[#f3f4f4] text-[#006474] px-6 py-3.5 rounded-full font-headline font-bold text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px] text-[#006474]">magic_button</span>
            <span>Generate Prompt</span>
          </button>
        </div>
      </section>

      {/* Footer Safe Indicator */}
      <div className="pt-4 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs text-[#6f797c]">
          <span className="material-symbols-outlined text-[16px]">lock</span>
          <span>End-to-End Encrypted & Private · No Diagnostic Profiling</span>
        </div>
      </div>
    </div>
  );
};
