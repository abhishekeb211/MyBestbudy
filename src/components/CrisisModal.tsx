import React, { useState, useEffect } from 'react';
import { StudentProfile } from '../types';

interface CrisisModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
}

export const CrisisModal: React.FC<CrisisModalProps> = ({ isOpen, onClose, profile }) => {
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Exhale'>('Inhale');
  const [breathCount, setBreathCount] = useState(4);

  // Simple 4s Inhale / 6s Exhale timer
  useEffect(() => {
    if (!breathingActive) return;

    let seconds = breathPhase === 'Inhale' ? 4 : 6;
    setBreathCount(seconds);

    const interval = setInterval(() => {
      setBreathCount((prev) => {
        if (prev <= 1) {
          setBreathPhase((p) => (p === 'Inhale' ? 'Exhale' : 'Inhale'));
          return breathPhase === 'Inhale' ? 6 : 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [breathingActive, breathPhase]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-[#f8f9f9] text-[#191c1c] w-full max-w-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-[#bec8cb]/50 overflow-hidden my-4 sm:my-8">
        {/* Modal Header */}
        <div className="bg-white px-5 py-4 border-b border-[#bec8cb]/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ba1a1a] fill-1 text-[22px]">emergency</span>
            <span className="font-headline font-bold text-[#006474] text-base sm:text-lg">PCCOE Wellness Safety Hub</span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-[#f3f4f4] text-[#6f797c] hover:text-[#191c1c] flex items-center justify-center transition-colors"
            aria-label="Close crisis support"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        <div className="p-5 sm:p-7 space-y-6">
          {/* Badge & Intro */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-[#ffdad6] text-[#93000a] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px] fill-1">emergency</span>
              <span>CRISIS SUPPORT</span>
            </div>
            <h2 className="font-headline font-bold text-2xl sm:text-3xl text-[#191c1c] tracking-tight">
              Get Immediate Support
            </h2>
            <p className="text-sm sm:text-base text-[#3f484b] leading-relaxed">
              If you or someone around you is in immediate distress, please reach out to one of these verified resources now. You don't have to carry this alone.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-3">
            {/* 1. National Emergency 112 */}
            <a
              href="tel:112"
              className="w-full bg-[#ba1a1a] hover:bg-[#93000a] text-white rounded-xl p-4 flex items-center justify-between shadow-md active:scale-[0.98] transition-all group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
                  <span className="material-symbols-outlined fill-1 text-[26px]">call</span>
                </div>
                <div className="text-left">
                  <div className="font-headline font-bold text-base sm:text-lg leading-tight">Call Emergency Services</div>
                  <div className="text-xs text-white/90 mt-0.5">Police, Ambulance, Distress (Dial 112)</div>
                </div>
              </div>
              <span className="material-symbols-outlined opacity-75 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                arrow_forward_ios
              </span>
            </a>

            {/* 2. National Helpline Tele-MANAS */}
            <a
              href="tel:14416"
              className="w-full bg-[#a66142] hover:bg-[#88492c] text-white rounded-xl p-4 flex items-center justify-between shadow-sm active:scale-[0.98] transition-all group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
                  <span className="material-symbols-outlined fill-1 text-[26px]">support_agent</span>
                </div>
                <div className="text-left">
                  <div className="font-headline font-bold text-base sm:text-lg leading-tight">National Mental Health Helpline</div>
                  <div className="text-xs text-white/90 mt-0.5">Tele-MANAS (Govt of India): 14416 or 1800-891-4416</div>
                </div>
              </div>
              <span className="material-symbols-outlined opacity-75 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                arrow_forward_ios
              </span>
            </a>

            {/* 3. PCCOE Campus Counselor */}
            <div className="w-full bg-[#006474] text-white rounded-xl p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
                  <span className="material-symbols-outlined fill-1 text-[26px]">psychology</span>
                </div>
                <div className="text-left">
                  <div className="font-headline font-bold text-base sm:text-lg leading-tight">Contact PCCOE Counselor</div>
                  <div className="text-xs text-white/90 mt-0.5">Campus Wellbeing Team · Room 204, Main Admin Bldg</div>
                </div>
              </div>
              <a
                href="tel:+912027653168"
                className="px-3.5 py-1.5 bg-white text-[#006474] hover:bg-[#cbead6] font-semibold text-xs rounded-full shadow-sm active:scale-95 transition-all"
              >
                Call
              </a>
            </div>

            {/* 4. Trusted Contact */}
            <div className="bg-white rounded-xl p-4 border border-[#bec8cb]/50 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-[#cbead6] text-[#4f6a5b] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined fill-1 text-[24px]">favorite</span>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#6f797c] uppercase tracking-wider">
                    Trusted Contact ({profile.trustedContactRelation})
                  </div>
                  <div className="font-semibold text-base text-[#191c1c]">{profile.trustedContactName}</div>
                  <div className="text-xs text-[#6f797c]">{profile.trustedContactPhone}</div>
                </div>
              </div>
              <a
                href={`tel:${profile.trustedContactPhone}`}
                className="bg-[#496455] hover:bg-[#314c3e] text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 active:scale-95 transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px] fill-1">call</span>
                <span>Call</span>
              </a>
            </div>
          </div>

          {/* What to do now (Calming grounding steps) */}
          <div className="space-y-3 pt-2">
            <h3 className="font-headline font-bold text-base sm:text-lg text-[#191c1c]">What to do now</h3>
            <div className="space-y-2">
              <div className="bg-white p-3.5 rounded-xl border border-[#bec8cb]/30 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#f3f4f4] text-[#006474] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[18px]">home_pin</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#191c1c]">Move to a safe place</div>
                  <div className="text-xs text-[#3f484b]">If you can, go somewhere you feel secure and comfortable (reading room, hostel lounge, garden).</div>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-[#bec8cb]/30 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#f3f4f4] text-[#006474] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[18px]">group</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#191c1c]">Don't stay alone</div>
                  <div className="text-xs text-[#3f484b]">Find a friend, roommate, or family member to simply sit with you. You don't need to explain everything.</div>
                </div>
              </div>

              {/* Interactive Breathing Guide */}
              <div className="bg-[#f3fcff] border border-[#2d7d8e]/30 p-4 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#2d7d8e] text-white flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px]">air</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#006474]">Focus on your breathing</div>
                      <div className="text-xs text-[#3f484b]">Take slow, deep breaths. Inhale for 4 seconds, exhale for 6.</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setBreathingActive(!breathingActive)}
                    className="px-3 py-1.5 bg-[#006474] text-white text-xs font-semibold rounded-full active:scale-95 transition-all shadow-sm"
                  >
                    {breathingActive ? 'Pause' : 'Start Pacer'}
                  </button>
                </div>

                {breathingActive && (
                  <div className="flex flex-col items-center justify-center py-4 bg-white/70 rounded-xl border border-[#2d7d8e]/20">
                    <div
                      className={`w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all duration-1000 ${
                        breathPhase === 'Inhale'
                          ? 'bg-[#cbead6] scale-110 shadow-lg text-[#006474]'
                          : 'bg-[#a9edff] scale-90 shadow-sm text-[#004e5b]'
                      }`}
                    >
                      <span className="font-headline font-bold text-sm uppercase tracking-wider">{breathPhase}</span>
                      <span className="font-headline font-extrabold text-2xl">{breathCount}s</span>
                    </div>
                    <span className="text-xs text-[#496455] mt-2 font-medium">
                      {breathPhase === 'Inhale' ? 'Gently fill your lungs through nose...' : 'Slowly release all tension through mouth...'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Privacy & Safety Note */}
          <div className="pt-2 text-center text-xs text-[#6f797c] flex items-center justify-center gap-1.5 border-t border-[#bec8cb]/30">
            <span className="material-symbols-outlined text-[16px]">lock</span>
            <span>All campus support contacts are 100% confidential and non-punitive.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
