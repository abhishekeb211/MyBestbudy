export type NavTab = 'home' | 'explore' | 'chat' | 'journal' | 'progress' | 'profile';

export type IssueCategory = 'All Topics' | 'Academic' | 'Emotional' | 'Social' | 'Career' | 'Safety';

export interface CbtStrategy {
  title: string;
  explanation: string;
  negativeThought: string;
  reframedThought: string;
  distortionType: string;
  practiceExamples?: Array<{
    situation: string;
    negative: string;
    reframed: string;
  }>;
}

export interface RebtInsight {
  title: string;
  explanation: string;
  demand: string;
  preference: string;
  beliefModel: {
    activatingEvent: string;
    irrationalBelief: string;
    emotionalConsequence: string;
    effectiveDispute: string;
  };
}

export interface Issue {
  id: string;
  title: string;
  category: IssueCategory;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  image: string;
  badgeBg: string;
  badgeText: string;
  heroImage: string;
  cbtStrategy: CbtStrategy;
  rebtInsight: RebtInsight;
  copingSteps: string[];
  suggestedSymptoms: string[];
  suggestedTriggers: string[];
}

export interface QuestionnaireAnswers {
  issueId: string;
  issueTitle: string;
  symptoms: string[];
  frequency: string;
  thoughts: string;
  impactScore: number;
  triggers: string[];
}

export interface SavedPrompt {
  id: string;
  issueTitle: string;
  content: string;
  date: string;
  tags: string[];
}

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  situation: string;
  negativeThought: string;
  distortion: string;
  reframedThought: string;
  moodBefore: number;
  moodAfter: number;
}

export interface MoodLog {
  id: string;
  date: string;
  rating: number; // 1 to 5
  note?: string;
}

export interface Quest {
  id: string;
  type: 'move' | 'pause' | 'think' | 'connect' | 'reflect';
  title: string;
  duration: string;
  description: string;
  completed: boolean;
  actionLabel: string;
}

export interface StudentProfile {
  name: string;
  department: string;
  year: string;
  campus: string;
  trustedContactName: string;
  trustedContactRelation: string;
  trustedContactPhone: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'buddy';
  text: string;
  timestamp: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  category: 'quest' | 'mood' | 'journal' | 'prompt' | 'mindfulness';
  icon: string;
  targetCount: number;
  currentCount: number;
  isUnlocked: boolean;
  unlockedDate?: string;
  benefitTip: string;
}

