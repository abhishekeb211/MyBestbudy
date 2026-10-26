import React, { useState } from 'react';
import { Issue, QuestionnaireAnswers } from '../types';

interface QuestionnaireViewProps {
  issue: Issue;
  onClose: () => void;
  onComplete: (answers: QuestionnaireAnswers) => void;
}

export const QuestionnaireView: React.FC<QuestionnaireViewProps> = ({
  issue,
  onClose,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // Form State
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(['Procrastination']);
  const [frequency, setFrequency] = useState<string>('Often');
  const [thoughts, setThoughts] = useState<string>('');
  const [impactScore, setImpactScore] = useState<number>(6);
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([
    'Upcoming Deadlines',
    'Exam Periods',
  ]);

  const defaultSymptoms = [
    { label: 'Procrastination', icon: 'pending_actions', desc: 'Delaying important study or tasks' },
    { label: 'Difficulty Concentrating', icon: 'psychology_alt', desc: 'Losing focus during lectures or code' },
    { label: 'Worrying about Exams', icon: 'assignment_late', desc: 'Fear of bad results or low SGPA' },
    { label: 'Trouble Sleeping', icon: 'bedtime_off', desc: 'Racing thoughts preventing deep rest' },
    { label: 'Feeling Overwhelmed', icon: 'sentiment_stressed', desc: 'Too many simultaneous deadlines' },
    { label: 'Physical Tension & Fatigue', icon: 'vital_signs', desc: 'Headaches, tight jaw, low stamina' },
  ];

  const frequencyOptions = [
    { value: 'Rarely', label: 'Rarely (once every few weeks)' },
    { value: 'Sometimes', label: 'Sometimes (1-2 days a week)' },
    { value: 'Often', label: 'Often (several days a week)' },
    { value: 'Almost Always', label: 'Almost Always (daily occurrence)' },
  ];

  const defaultTriggers = [
    'Upcoming Deadlines',
    'Exam Periods',
    'Family Expectations',
    'Comparing with Peers',
    'Placement Uncertainty',
    'Difficult Lab Submissions',
    'Lack of Sleep',
  ];

  const toggleSymptom = (item: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item]
    );
  };

  const toggleTrigger = (item: string) => {
    setSelectedTriggers((prev) =>
      prev.includes(item) ? prev.filter((t) => t !== item) : [...prev, item]
    );
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Complete questionnaire
      onComplete({
        issueId: issue.id,
        issueTitle: issue.title,
        symptoms: selectedSymptoms.length > 0 ? selectedSymptoms : ['Stress & tension'],
        frequency,
        thoughts: thoughts.trim() || 'I often worry that I am falling behind in coursework and not meeting expectations.',
        impactScore,
        triggers: selectedTriggers.length > 0 ? selectedTriggers : ['Academic deadlines'],
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const progressPercent = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full px-4 py-5 animate-fade-in pb-24">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#006474] fill-1 text-[22px]">spa</span>
          <span className="font-headline font-bold text-base sm:text-lg text-[#006474]">PCCOE Wellness</span>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full hover:bg-white text-[#6f797c] hover:text-[#191c1c] flex items-center justify-center transition-colors"
          aria-label="Close questionnaire"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2 mb-6">
        <div className="flex justify-between items-center text-xs font-semibold text-[#6f797c]">
          <span>Step {currentStep} of {totalSteps}</span>
          <span className="text-[#006474]">{issue.title}</span>
        </div>
        <div className="h-2 w-full bg-[#e1e3e3] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#006474] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Hero Heading */}
      <div className="text-center space-y-1.5 mb-8">
        <h1 className="font-headline font-bold text-2xl sm:text-3xl text-[#191c1c] tracking-tight">
          Let's craft a personalised prompt for you
        </h1>
        <p className="text-xs sm:text-sm text-[#3f484b] max-w-md mx-auto">
          We will ask you a few questions and your prompt will be ready. You can then start chatting directly with Best Buddy AI or export it to Gemini/ChatGPT.
        </p>
      </div>

      {/* Questionnaire Form Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#bec8cb]/40 shadow-[0_4px_24px_rgba(8,104,120,0.06)] space-y-6">
        {/* Step 1: Symptoms */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h2 className="font-headline font-bold text-lg sm:text-xl text-[#191c1c]">
                What are you experiencing?
              </h2>
              <p className="text-xs sm:text-sm text-[#6f797c] mt-0.5">
                Select all that apply to you recently.
              </p>
            </div>

            <div className="space-y-2.5">
              {defaultSymptoms.map((symptom) => {
                const isChecked = selectedSymptoms.includes(symptom.label);
                return (
                  <button
                    key={symptom.label}
                    type="button"
                    onClick={() => toggleSymptom(symptom.label)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all active:scale-[0.99] cursor-pointer ${
                      isChecked
                        ? 'border-[#006474] bg-[#cbead6]/30 text-[#006474]'
                        : 'border-[#bec8cb]/50 bg-[#f8f9f9] text-[#191c1c] hover:bg-[#f3f4f4]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                          isChecked ? 'bg-[#006474] text-white' : 'bg-[#e7e8e8] text-[#6f797c]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">{symptom.icon}</span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#191c1c]">{symptom.label}</div>
                        <div className="text-xs text-[#6f797c]">{symptom.desc}</div>
                      </div>
                    </div>
                    <span
                      className={`material-symbols-outlined text-[20px] ${
                        isChecked ? 'text-[#006474] fill-1' : 'text-[#bec8cb]'
                      }`}
                    >
                      {isChecked ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Frequency */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h2 className="font-headline font-bold text-lg sm:text-xl text-[#191c1c]">
                How often does this happen?
              </h2>
              <p className="text-xs sm:text-sm text-[#6f797c] mt-0.5">
                Choose the frequency that best matches your past two weeks.
              </p>
            </div>

            <div className="space-y-2.5">
              {frequencyOptions.map((opt) => {
                const isSelected = frequency === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFrequency(opt.value)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all active:scale-[0.99] cursor-pointer ${
                      isSelected
                        ? 'border-[#006474] bg-[#cbead6]/30 text-[#006474]'
                        : 'border-[#bec8cb]/50 bg-[#f8f9f9] text-[#191c1c] hover:bg-[#f3f4f4]'
                    }`}
                  >
                    <span className="text-sm font-semibold text-[#191c1c]">{opt.label}</span>
                    <span
                      className={`material-symbols-outlined text-[20px] ${
                        isSelected ? 'text-[#006474] fill-1' : 'text-[#bec8cb]'
                      }`}
                    >
                      {isSelected ? 'radio_button_checked' : 'radio_button_unchecked'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Thoughts */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h2 className="font-headline font-bold text-lg sm:text-xl text-[#191c1c]">
                What thoughts usually occur?
              </h2>
              <p className="text-xs sm:text-sm text-[#6f797c] mt-0.5">
                Feel free to share openly. This is stored only on your device and remains completely private.
              </p>
            </div>

            <textarea
              value={thoughts}
              onChange={(e) => setThoughts(e.target.value)}
              rows={5}
              placeholder="e.g. I feel like I'm falling behind in subjects, my batchmates seem to know everything effortlessly, and I'm anxious about upcoming lab submissions or placements..."
              className="w-full p-4 rounded-2xl border border-[#bec8cb]/60 bg-[#f8f9f9] focus:bg-white focus:border-[#006474] text-sm text-[#191c1c] placeholder:text-[#6f797c] outline-none transition-all resize-none shadow-inner"
            />

            {/* Quick Helper Prompts */}
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#6f797c]">Or tap a common thought:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'I am afraid I will fail my in-sem exam',
                  'Placement prep is overwhelming me',
                  'I feel like an imposter among my peers',
                ].map((quick) => (
                  <button
                    key={quick}
                    type="button"
                    onClick={() => setThoughts(quick)}
                    className="text-xs bg-[#f3f4f4] hover:bg-[#e7e8e8] text-[#3f484b] px-3 py-1.5 rounded-full transition-colors"
                  >
                    "{quick}"
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Impact Slider */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="font-headline font-bold text-lg sm:text-xl text-[#191c1c]">
                How much does this affect your academics & daily life?
              </h2>
              <p className="text-xs sm:text-sm text-[#6f797c] mt-0.5">
                Rate the overall interference on a scale from 1 (mild) to 10 (severe).
              </p>
            </div>

            <div className="py-6 px-2 space-y-6">
              {/* Giant Value Badge */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#006474] text-white flex items-center justify-center font-headline font-bold text-2xl shadow-md">
                  {impactScore}
                </div>
                <span className="text-xs font-semibold text-[#496455] uppercase tracking-wider mt-2">
                  {impactScore <= 3
                    ? 'Mild / Manageable'
                    : impactScore <= 6
                    ? 'Moderate / Distracting'
                    : 'Significant / Overwhelming'}
                </span>
              </div>

              {/* Slider Input */}
              <input
                type="range"
                min="1"
                max="10"
                value={impactScore}
                onChange={(e) => setImpactScore(parseInt(e.target.value, 10))}
                className="w-full h-3 bg-[#e1e3e3] rounded-lg appearance-none cursor-pointer accent-[#006474]"
              />

              <div className="flex justify-between items-center text-xs font-semibold text-[#6f797c]">
                <span>1 (Mild interference)</span>
                <span>5 (Moderate)</span>
                <span>10 (Severe distress)</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Triggers */}
        {currentStep === 5 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h2 className="font-headline font-bold text-lg sm:text-xl text-[#191c1c]">
                What usually triggers this?
              </h2>
              <p className="text-xs sm:text-sm text-[#6f797c] mt-0.5">
                Select situations that seem to kick off stress or worry.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {defaultTriggers.map((trig) => {
                const isSelected = selectedTriggers.includes(trig);
                return (
                  <button
                    key={trig}
                    type="button"
                    onClick={() => toggleTrigger(trig)}
                    className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all active:scale-95 cursor-pointer ${
                      isSelected
                        ? 'bg-[#006474] text-white shadow-xs'
                        : 'bg-[#f3f4f4] text-[#3f484b] hover:bg-[#e7e8e8] border border-[#bec8cb]/40'
                    }`}
                  >
                    {trig}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-[#bec8cb]/30">
          <button
            type="button"
            onClick={handleBack}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-[#3f484b] hover:bg-[#f3f4f4] transition-colors ${
              currentStep === 1 ? 'invisible' : 'visible'
            }`}
          >
            Back
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2.5 bg-[#006474] hover:bg-[#004e5b] text-white font-headline font-bold text-xs sm:text-sm rounded-full shadow-sm active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>{currentStep === totalSteps ? 'Finish & Generate' : 'Continue'}</span>
            <span className="material-symbols-outlined text-[18px]">
              {currentStep === totalSteps ? 'check' : 'arrow_forward'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
