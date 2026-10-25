import React, { useState } from 'react';
import { SavedPrompt, StudentProfile } from '../types';

interface ProfileViewProps {
  profile: StudentProfile;
  onUpdateProfile: (updated: StudentProfile) => void;
  savedPrompts: SavedPrompt[];
  onDeletePrompt: (id: string) => void;
  onExportData: () => void;
  onClearAllData: () => void;
  onOpenChatWithPrompt: (promptText: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onUpdateProfile,
  savedPrompts,
  onDeletePrompt,
  onExportData,
  onClearAllData,
  onOpenChatWithPrompt,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [department, setDepartment] = useState(profile.department);
  const [year, setYear] = useState(profile.year);
  const [trustedName, setTrustedName] = useState(profile.trustedContactName);
  const [trustedRelation, setTrustedRelation] = useState(profile.trustedContactRelation);
  const [trustedPhone, setTrustedPhone] = useState(profile.trustedContactPhone);
  const [activePromptModal, setActivePromptModal] = useState<SavedPrompt | null>(null);
  const [copyToast, setCopyToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...profile,
      name,
      department,
      year,
      trustedContactName: trustedName,
      trustedContactRelation: trustedRelation,
      trustedContactPhone: trustedPhone,
    });
    setIsEditing(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopyToast(true);
    setTimeout(() => setCopyToast(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 animate-fade-in pb-28 md:pb-12">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline font-bold text-2xl sm:text-4xl text-[#191c1c] tracking-tight">
            Student Profile & Settings
          </h1>
          <p className="text-xs sm:text-sm text-[#3f484b] mt-0.5">
            Manage your campus information, emergency contact, and privacy controls.
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-white hover:bg-[#f3f4f4] border border-[#bec8cb]/50 text-[#006474] font-semibold text-xs sm:text-sm rounded-full shadow-xs active:scale-95 transition-all"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {/* Profile Card */}
      <section className="bg-white border border-[#bec8cb]/40 rounded-3xl p-6 sm:p-8 shadow-xs">
        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-4">
            <h3 className="font-headline font-bold text-lg text-[#191c1c] mb-2">Edit Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#6f797c] mb-1">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#f8f9f9] border border-[#bec8cb]/50 focus:bg-white rounded-xl px-3.5 py-2 text-sm outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6f797c] mb-1">Department</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g. Computer Engineering"
                  className="w-full bg-[#f8f9f9] border border-[#bec8cb]/50 focus:bg-white rounded-xl px-3.5 py-2 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6f797c] mb-1">Year</label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="e.g. Third Year (TE)"
                  className="w-full bg-[#f8f9f9] border border-[#bec8cb]/50 focus:bg-white rounded-xl px-3.5 py-2 text-sm outline-none"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-[#bec8cb]/30">
              <h4 className="text-xs font-bold text-[#496455] uppercase tracking-wider mb-2">
                Emergency Trusted Contact
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#6f797c] mb-1">Contact Name</label>
                  <input
                    type="text"
                    value={trustedName}
                    onChange={(e) => setTrustedName(e.target.value)}
                    placeholder="e.g. Mom"
                    className="w-full bg-[#f8f9f9] border border-[#bec8cb]/50 focus:bg-white rounded-xl px-3.5 py-2 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#6f797c] mb-1">Relationship</label>
                  <input
                    type="text"
                    value={trustedRelation}
                    onChange={(e) => setTrustedRelation(e.target.value)}
                    placeholder="e.g. Mother / Friend"
                    className="w-full bg-[#f8f9f9] border border-[#bec8cb]/50 focus:bg-white rounded-xl px-3.5 py-2 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#6f797c] mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={trustedPhone}
                    onChange={(e) => setTrustedPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full bg-[#f8f9f9] border border-[#bec8cb]/50 focus:bg-white rounded-xl px-3.5 py-2 text-sm outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="submit"
                className="px-5 py-2 bg-[#006474] text-white text-xs font-semibold rounded-full shadow-xs active:scale-95"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#cbead6] text-[#006474] flex items-center justify-center font-headline font-bold text-2xl">
                {profile.name ? profile.name[0].toUpperCase() : 'A'}
              </div>
              <div>
                <h2 className="font-headline font-bold text-xl text-[#191c1c]">{profile.name}</h2>
                <p className="text-xs sm:text-sm text-[#3f484b]">
                  {profile.department} · {profile.year}
                </p>
                <span className="text-[11px] font-medium text-[#006474] bg-[#f3fcff] px-2 py-0.5 rounded-md mt-1 inline-block border border-[#2d7d8e]/20">
                  {profile.campus}
                </span>
              </div>
            </div>

            <div className="bg-[#f8f9f9] border border-[#bec8cb]/40 rounded-2xl p-4 w-full sm:w-auto">
              <span className="text-[10px] font-bold text-[#6f797c] uppercase tracking-wider block mb-1">
                Configured Trusted Contact
              </span>
              <div className="text-sm font-semibold text-[#191c1c]">{profile.trustedContactName} ({profile.trustedContactRelation})</div>
              <div className="text-xs text-[#006474] font-medium">{profile.trustedContactPhone}</div>
            </div>
          </div>
        )}
      </section>

      {/* Saved Prompts Collection */}
      <section className="bg-white border border-[#bec8cb]/40 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006474]">bookmarks</span>
            <h3 className="font-headline font-bold text-lg sm:text-xl text-[#191c1c]">
              Saved Support Prompts
            </h3>
          </div>
          <span className="text-xs text-[#6f797c]">{savedPrompts.length} saved</span>
        </div>

        {savedPrompts.length > 0 ? (
          <div className="space-y-3">
            {savedPrompts.map((p) => (
              <div
                key={p.id}
                className="bg-[#f8f9f9] border border-[#bec8cb]/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-headline font-bold text-sm text-[#191c1c]">{p.issueTitle}</span>
                    <span className="text-[10px] text-[#6f797c] bg-white px-2 py-0.5 rounded border border-[#bec8cb]/30">
                      {p.date}
                    </span>
                  </div>
                  <p className="text-xs text-[#3f484b] line-clamp-1 mt-1 font-mono">{p.content}</p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <button
                    onClick={() => copyToClipboard(p.content)}
                    className="px-3 py-1.5 bg-white hover:bg-[#f3f4f4] border border-[#bec8cb]/40 text-[#006474] text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">content_copy</span>
                    <span>Copy</span>
                  </button>
                  <button
                    onClick={() => onOpenChatWithPrompt(p.content)}
                    className="px-3 py-1.5 bg-[#006474] hover:bg-[#004e5b] text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    <span>Chat</span>
                  </button>
                  <button
                    onClick={() => onDeletePrompt(p.id)}
                    className="p-1.5 text-[#6f797c] hover:text-[#ba1a1a] rounded-lg hover:bg-white"
                    title="Delete prompt"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 bg-[#f8f9f9] rounded-2xl text-center text-xs text-[#6f797c]">
            No prompts saved yet. Generate one in "Explore Issues" to save it here for quick access.
          </div>
        )}
      </section>

      {/* Privacy, Storage & Data Control (D-011) */}
      <section className="bg-white border border-[#bec8cb]/40 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-[#496455]">
          <span className="material-symbols-outlined text-[22px]">shield</span>
          <h3 className="font-headline font-bold text-lg sm:text-xl text-[#191c1c]">
            Data Ownership & Privacy
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-[#3f484b] leading-relaxed">
          PCCOE Wellness operates with a strict <strong>local-first</strong> architecture. Your journal thoughts, mood scores, and prompt questionnaire answers are stored exclusively in your browser's private local storage. No advertising SDKs, no behavioral tracking, and no covert psychological diagnostic scoring.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={onExportData}
            className="px-5 py-2.5 bg-[#f3f4f4] hover:bg-[#e7e8e8] text-[#191c1c] text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Export My Data (JSON)</span>
          </button>

          <button
            onClick={onClearAllData}
            className="px-5 py-2.5 bg-[#ffdad6]/40 hover:bg-[#ffdad6] text-[#ba1a1a] text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">delete_forever</span>
            <span>Erase All Local Data</span>
          </button>
        </div>
      </section>

      {copyToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#006474] text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg animate-bounce">
          Copied to clipboard!
        </div>
      )}
    </div>
  );
};
