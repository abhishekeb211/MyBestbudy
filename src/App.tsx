import React, { useState, useEffect } from 'react';
import {
  Issue,
  JournalEntry,
  MoodLog,
  NavTab,
  QuestionnaireAnswers,
  Quest,
  SavedPrompt,
  StudentProfile,
} from './types';
import { DAILY_QUESTS, ISSUES_DATA } from './data/issuesData';
import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar } from './components/BottomNavBar';
import { CrisisModal } from './components/CrisisModal';
import { HomeView } from './components/HomeView';
import { ExploreView } from './components/ExploreView';
import { IssueDetailView } from './components/IssueDetailView';
import { QuestionnaireView } from './components/QuestionnaireView';
import { PromptResultView } from './components/PromptResultView';
import { ChatView } from './components/ChatView';
import { JournalView } from './components/JournalView';
import { ProgressView } from './components/ProgressView';
import { ProfileView } from './components/ProfileView';

const STORAGE_KEYS = {
  PROFILE: 'pccoe_wellness_profile',
  QUESTS: 'pccoe_wellness_quests',
  MOODS: 'pccoe_wellness_moods',
  JOURNAL: 'pccoe_wellness_journal',
  PROMPTS: 'pccoe_wellness_prompts',
};

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [questionnaireIssue, setQuestionnaireIssue] = useState<Issue | null>(null);
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<QuestionnaireAnswers | null>(null);
  const [initialChatPrompt, setInitialChatPrompt] = useState<string>('');
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);

  // Profile State
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      name: 'Arjun',
      department: 'Computer Engineering',
      year: 'Third Year (B.Tech)',
      campus: 'Pimpri Chinchwad College of Engineering (PCCOE)',
      trustedContactName: 'Mom',
      trustedContactRelation: 'Mother',
      trustedContactPhone: '+91 98230 12345',
    };
  });

  // Quests State
  const [quests, setQuests] = useState<Quest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUESTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DAILY_QUESTS;
  });

  // Mood History
  const [moodHistory, setMoodHistory] = useState<MoodLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MOODS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      { id: 'mood-1', date: 'Oct 21', rating: 4, note: 'Good' },
      { id: 'mood-2', date: 'Oct 22', rating: 3, note: 'Steady' },
      { id: 'mood-3', date: 'Oct 23', rating: 2, note: 'Exam pressure' },
      { id: 'mood-4', date: 'Oct 24', rating: 4, note: 'Relief after test' },
    ];
  });

  // Journal Entries
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.JOURNAL);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'entry-1',
        date: 'Oct 23, 2026',
        title: 'Overwhelming Placement Mock Interview',
        situation: 'Mock technical coding round on graphs',
        negativeThought: 'I froze on Dijkstra algorithm. I will never crack a technical interview.',
        distortion: 'Catastrophizing & All-or-Nothing',
        reframedThought: 'Dijkstra is a notoriously tricky graph algorithm. Freezing once simply highlights which topics to revise this Saturday.',
        moodBefore: 1,
        moodAfter: 4,
      },
    ];
  });

  // Saved Prompts
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROMPTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'p-initial',
        issueTitle: 'Academic Stress',
        content: `You are an evidence-informed mental health support AI. I am an engineering student at PCCOE.
I am currently experiencing Academic Stress related to upcoming exams and project deadlines. Over the last two weeks, I have been feeling overwhelmed, anxious, and have had difficulty sleeping.
My primary goal for this conversation is to find practical time-management techniques and simple grounding exercises to help manage acute stress moments.
Please provide compassionate, actionable advice structured in short, easy-to-read steps. Avoid clinical diagnoses.`,
        date: 'Oct 24, 2026',
        tags: ['Academic Stress', 'Exams', 'Grounding'],
      },
    ];
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch {}
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.QUESTS, JSON.stringify(quests));
    } catch {}
  }, [quests]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MOODS, JSON.stringify(moodHistory));
    } catch {}
  }, [moodHistory]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(journalEntries));
    } catch {}
  }, [journalEntries]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROMPTS, JSON.stringify(savedPrompts));
    } catch {}
  }, [savedPrompts]);

  // Handlers
  const handleCompleteQuest = (questId: string) => {
    setQuests((prev) =>
      prev.map((q) => (q.id === questId ? { ...q, completed: !q.completed } : q))
    );
  };

  const handleLogMood = (rating: number, label: string) => {
    const newLog: MoodLog = {
      id: `mood-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      rating,
      note: label,
    };
    setMoodHistory((prev) => [...prev, newLog]);
  };

  const handleAddJournalEntry = (newEntry: Omit<JournalEntry, 'id'>) => {
    const entry: JournalEntry = {
      ...newEntry,
      id: `entry-${Date.now()}`,
    };
    setJournalEntries((prev) => [entry, ...prev]);
  };

  const handleDeleteJournalEntry = (id: string) => {
    setJournalEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const handleSavePrompt = (prompt: SavedPrompt) => {
    setSavedPrompts((prev) => [prompt, ...prev]);
  };

  const handleDeletePrompt = (id: string) => {
    setSavedPrompts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleStartQuestionnaire = (issue: Issue) => {
    setSelectedIssue(null);
    setQuestionnaireAnswers(null);
    setQuestionnaireIssue(issue);
  };

  const handleCompleteQuestionnaire = (answers: QuestionnaireAnswers) => {
    setQuestionnaireIssue(null);
    setQuestionnaireAnswers(answers);
  };

  const handleOpenChatWithPrompt = (promptText: string) => {
    setSelectedIssue(null);
    setQuestionnaireIssue(null);
    setQuestionnaireAnswers(null);
    setInitialChatPrompt(promptText);
    setActiveTab('chat');
  };

  const handleExportData = () => {
    const backup = {
      profile,
      quests,
      moodHistory,
      journalEntries,
      savedPrompts,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pccoe-wellness-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearAllData = () => {
    if (window.confirm('Are you sure you want to reset all your local wellness data? This action cannot be undone.')) {
      localStorage.clear();
      setQuests(DAILY_QUESTS);
      setMoodHistory([]);
      setJournalEntries([]);
      setSavedPrompts([]);
      setProfile({
        name: 'Student',
        department: 'Engineering',
        year: 'Third Year',
        campus: 'Pimpri Chinchwad College of Engineering (PCCOE)',
        trustedContactName: 'Trusted Contact',
        trustedContactRelation: 'Family',
        trustedContactPhone: '+91 98000 00000',
      });
      alert('All local data has been erased.');
    }
  };

  const navigateTab = (tab: NavTab) => {
    setSelectedIssue(null);
    setQuestionnaireIssue(null);
    setQuestionnaireAnswers(null);
    setActiveTab(tab);
  };

  // Determine which sub-view to render
  const renderCurrentView = () => {
    if (questionnaireIssue) {
      return (
        <QuestionnaireView
          issue={questionnaireIssue}
          onClose={() => setQuestionnaireIssue(null)}
          onComplete={handleCompleteQuestionnaire}
        />
      );
    }

    if (questionnaireAnswers) {
      return (
        <PromptResultView
          answers={questionnaireAnswers}
          onEditResponses={() => {
            const issue = ISSUES_DATA.find((i) => i.id === questionnaireAnswers.issueId) || ISSUES_DATA[0];
            setQuestionnaireAnswers(null);
            setQuestionnaireIssue(issue);
          }}
          onOpenChatWithPrompt={handleOpenChatWithPrompt}
          onSavePrompt={handleSavePrompt}
          onClose={() => setQuestionnaireAnswers(null)}
        />
      );
    }

    if (selectedIssue) {
      return (
        <IssueDetailView
          issue={selectedIssue}
          onBack={() => setSelectedIssue(null)}
          onStartQuestionnaire={handleStartQuestionnaire}
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <HomeView
            profile={profile}
            quests={quests}
            onCompleteQuest={handleCompleteQuest}
            onNavigateToExplore={() => setActiveTab('explore')}
            onNavigateToChat={() => setActiveTab('chat')}
            onSelectIssue={(issue) => setSelectedIssue(issue)}
            onLogMood={handleLogMood}
            recentMood={moodHistory[moodHistory.length - 1]}
          />
        );
      case 'explore':
        return <ExploreView onSelectIssue={(issue) => setSelectedIssue(issue)} />;
      case 'chat':
        return (
          <ChatView
            initialPrompt={initialChatPrompt}
            profile={profile}
            onOpenCrisis={() => setIsCrisisModalOpen(true)}
          />
        );
      case 'journal':
        return (
          <JournalView
            entries={journalEntries}
            onAddEntry={handleAddJournalEntry}
            onDeleteEntry={handleDeleteJournalEntry}
          />
        );
      case 'progress':
        return <ProgressView quests={quests} moodHistory={moodHistory} />;
      case 'profile':
        return (
          <ProfileView
            profile={profile}
            onUpdateProfile={setProfile}
            savedPrompts={savedPrompts}
            onDeletePrompt={handleDeletePrompt}
            onExportData={handleExportData}
            onClearAllData={handleClearAllData}
            onOpenChatWithPrompt={handleOpenChatWithPrompt}
          />
        );
      default:
        return <HomeView profile={profile} quests={quests} onCompleteQuest={handleCompleteQuest} onNavigateToExplore={() => setActiveTab('explore')} onNavigateToChat={() => setActiveTab('chat')} onSelectIssue={(issue) => setSelectedIssue(issue)} onLogMood={handleLogMood} />;
    }
  };

  // Suppress bottom bar during questionnaire for clean, distraction-free flow
  const isQuestionnaireActive = Boolean(questionnaireIssue);

  return (
    <div className="min-h-screen bg-[#f8f9f9] text-[#191c1c] flex flex-col font-body antialiased">
      {/* Top App Bar */}
      <TopAppBar
        activeTab={activeTab}
        onNavigate={navigateTab}
        onOpenCrisis={() => setIsCrisisModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Mobile Bottom Navigation (Shown unless inside 5-step questionnaire) */}
      {!isQuestionnaireActive && (
        <BottomNavBar activeTab={activeTab} onNavigate={navigateTab} />
      )}

      {/* Immediate Crisis Support Modal */}
      <CrisisModal
        isOpen={isCrisisModalOpen}
        onClose={() => setIsCrisisModalOpen(false)}
        profile={profile}
      />
    </div>
  );
}
