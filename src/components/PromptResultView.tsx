import React, { useState } from 'react';
import { QuestionnaireAnswers, SavedPrompt } from '../types';

interface PromptResultViewProps {
  answers: QuestionnaireAnswers;
  onEditResponses: () => void;
  onOpenChatWithPrompt: (promptText: string) => void;
  onSavePrompt: (prompt: SavedPrompt) => void;
  onClose: () => void;
}

export const PromptResultView: React.FC<PromptResultViewProps> = ({
  answers,
  onEditResponses,
  onOpenChatWithPrompt,
  onSavePrompt,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  // Generate evidence-informed prompt from answers
  const generatePromptText = () => {
    const symptomsStr = answers.symptoms.join(', ');
    const triggersStr = answers.triggers.join(', ');

    return `You are an evidence-informed mental health support AI. I am an engineering student at PCCOE.

I am currently experiencing ${answers.issueTitle} related to ${triggersStr || 'upcoming exams and project deadlines'}. Over the last two weeks, I have been experiencing ${symptomsStr} with a frequency of "${answers.frequency}". My subjective impact rating is ${answers.impactScore}/10.

When this occurs, my recurring thoughts are:
"${answers.thoughts}"

My primary goal for this conversation is to find practical time-management techniques, gentle CBT/REBT thought reframing, and simple grounding exercises to help manage acute stress moments in my engineering studies.

Please provide compassionate, actionable advice structured in short, easy-to-read steps. Avoid clinical diagnoses.`;
  };

  const [promptText, setPromptText] = useState(generatePromptText());

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSave = () => {
    onSavePrompt({
      id: `prompt-${Date.now()}`,
      issueTitle: answers.issueTitle,
      content: promptText,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      tags: [answers.issueTitle, ...answers.symptoms.slice(0, 2)],
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleRegenerate = () => {
    // Generate alternate variation
    const regenerated = `You are a warm, supportive student wellness companion. I study engineering at PCCOE.

I am currently struggling with ${answers.issueTitle}. My main triggers include ${answers.triggers.join(' and ')}, and I have been dealing with ${answers.symptoms.join(', ')} (${answers.frequency.toLowerCase()}).

An example of what weighs on my mind:
"${answers.thoughts}"

Please guide me through:
1. One gentle thought reframe using CBT or REBT principles to reduce immediate pressure.
2. Two realistic, bite-sized study or self-care actions I can complete in under 15 minutes today.
3. A calming reminder suited for a stressed engineering student.`;
    setPromptText(regenerated);
  };

  const openChatGPT = () => {
    const url = `https://chatgpt.com/?q=${encodeURIComponent(promptText)}`;
    window.open(url, '_blank');
  };

  const openGemini = () => {
    const url = `https://gemini.google.com/app`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-fade-in pb-28 md:pb-12 space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white text-[#3f484b] hover:text-[#006474] text-xs sm:text-sm font-semibold transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to Explore</span>
        </button>
        <span className="text-xs font-semibold text-[#006474] bg-[#cbead6] px-3 py-1 rounded-full">
          Prompt Ready
        </span>
      </div>

      {/* Header Section */}
      <div className="space-y-1.5">
        <h1 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-[#191c1c] tracking-tight">
          Your Personalized Support Prompt
        </h1>
        <p className="text-sm sm:text-base text-[#3f484b] leading-relaxed">
          This prompt summarizes your responses to help you have a structured conversation with Best Buddy AI, ChatGPT, or Gemini. Copy and paste it or chat right inside the app.
        </p>
      </div>

      {/* Master Prompt Viewer Card (Document Style) */}
      <section className="relative bg-white border border-[#bec8cb]/50 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xs overflow-hidden">
        {/* Decorative soft background glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#a9edff]/30 rounded-full blur-2xl pointer-events-none" />

        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2 text-[#006474] font-headline font-bold text-xs sm:text-sm">
            <span className="material-symbols-outlined text-[20px] fill-1">description</span>
            <span>Generated Prompt ({answers.issueTitle})</span>
          </div>

          <button
            onClick={handleCopy}
            aria-label="Copy to clipboard"
            className="text-[#6f797c] hover:text-[#006474] p-1.5 rounded-lg hover:bg-[#f3f4f4] transition-colors flex items-center gap-1 text-xs font-medium"
            title="Copy to clipboard"
          >
            <span className="material-symbols-outlined text-[18px]">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

        {/* Inner Document Frame */}
        <div className="bg-[#f8f9f9] border border-[#bec8cb]/30 rounded-2xl p-4 sm:p-5">
          <p className="text-xs sm:text-sm text-[#191c1c] whitespace-pre-wrap leading-relaxed font-normal selection:bg-[#cbead6]">
            {promptText}
          </p>
        </div>
      </section>

      {/* Primary Action Buttons */}
      <section className="space-y-3">
        {/* Built-in Chat CTA */}
        <div className="bg-gradient-to-r from-[#006474] to-[#2d7d8e] text-white p-5 rounded-2xl sm:rounded-3xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 font-headline font-bold text-base sm:text-lg">
              <span className="material-symbols-outlined text-[20px] fill-1 text-[#a9edff]">psychology</span>
              <span>Chat with Best Buddy AI Right Now</span>
            </div>
            <p className="text-xs sm:text-sm text-white/90">
              Start an instant, confidential support session using this prompt inside PCCOE Wellness.
            </p>
          </div>
          <button
            onClick={() => onOpenChatWithPrompt(promptText)}
            className="w-full sm:w-auto px-5 py-2.5 bg-white text-[#006474] hover:bg-[#cbead6] font-headline font-bold text-xs sm:text-sm rounded-full shadow-sm active:scale-95 transition-all whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Start Chat</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        {/* Copy & Save Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 bg-[#006474] hover:bg-[#004e5b] text-white py-3 px-4 rounded-full font-semibold text-xs sm:text-sm shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Prompt'}</span>
          </button>

          <button
            onClick={handleSave}
            className="w-full flex items-center justify-center gap-2 bg-[#cbead6] hover:bg-[#afcebb] text-[#052014] py-3 px-4 rounded-full font-semibold text-xs sm:text-sm active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] fill-1">
              {saved ? 'check' : 'bookmark_add'}
            </span>
            <span>{saved ? 'Saved to Your Profile!' : 'Save to Profile'}</span>
          </button>
        </div>

        {/* External AI Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={openChatGPT}
            className="w-full flex items-center justify-center gap-2 bg-white border border-[#bec8cb]/60 text-[#191c1c] py-2.5 px-3 rounded-full font-medium text-xs sm:text-sm hover:bg-[#f3f4f4] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">forum</span>
            <span>Open ChatGPT</span>
          </button>

          <button
            onClick={openGemini}
            className="w-full flex items-center justify-center gap-2 bg-white border border-[#bec8cb]/60 text-[#191c1c] py-2.5 px-3 rounded-full font-medium text-xs sm:text-sm hover:bg-[#f3f4f4] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">psychology</span>
            <span>Open Gemini</span>
          </button>
        </div>
      </section>

      {/* Secondary Actions */}
      <section className="flex flex-col sm:flex-row items-center justify-center gap-6 border-t border-[#bec8cb]/30 pt-4 mt-4">
        <button
          onClick={onEditResponses}
          className="flex items-center gap-1.5 text-[#006474] font-semibold text-xs sm:text-sm hover:underline"
        >
          <span className="material-symbols-outlined text-[18px]">edit_note</span>
          <span>Edit Responses</span>
        </button>

        <button
          onClick={handleRegenerate}
          className="flex items-center gap-1.5 text-[#3f484b] hover:text-[#191c1c] font-semibold text-xs sm:text-sm hover:underline"
        >
          <span className="material-symbols-outlined text-[18px]">refresh</span>
          <span>Regenerate Variation</span>
        </button>
      </section>
    </div>
  );
};
