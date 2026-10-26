# Mobile View Constraint & ProgressView Badge System

Provide a dedicated mobile phone layout experience (constrained to mobile viewport dimensions with clean ambient background framing on wide screens) and implement an achievement badge system in the ProgressView celebrating completed quests, mood logs, and cognitive reframing journal entries.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and UX choices have been aligned based on user answers:
> - **Mobile-Only Framing**: The app layout will be constrained to a clean mobile phone width (`max-w-md` ~ 440px) centered with responsive ambient backdrop styling, providing a native smartphone app feel on all devices while preserving touch targets $\ge 44\text{px}$.
> - **Badge Display & Progress Bars**: Badges will be displayed in an interactive visual grid showing both unlocked and in-progress/locked badges with live progress bars and milestone indicators.
> - **Badge Detail Modal**: Tapping any badge opens an interactive modal detailing its lore, criteria, completion progress, and celebration state.

- **Confirmed Decision 1**: Constrain layout to mobile phone width with clean centered positioning on wide screens.
- **Confirmed Decision 2**: Badges will include both quest completions, mood tracking streaks/counts, and journal reframing milestones.
- **Confirmed Decision 3**: Tapping any badge opens a full detail & celebration modal.

---

## 1. Overview & Core Concept

- **What It Does**: Transforms the web app into a mobile-first touch application with a centered mobile shell container (`max-w-md`) and introduces a celebratory Badge & Milestone system inside `ProgressView`. Badges reward consistent positive mental health habits—such as logging mood check-ins ('Consistency Champ'), reframing thoughts ('Reframer'), completing mindful quests ('Quest Pioneer', 'Zen Breather'), and engaging with the CBT companion.
- **Target Audience / Persona**: PCCOE engineering students seeking an empathetic, habit-building wellness companion that feels like an authentic mobile app with gentle, positive reinforcement.
- **Key Value**: Gamifies self-care without toxic streak penalties (zero-shame philosophy), giving students tangible visual milestones for emotional regulation and mindfulness.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Mobile Container Experience**:
   - On mobile devices, the app fills 100% of the screen seamlessly.
   - On tablet/desktop screens, the app renders as a centered mobile frame (`max-w-md mx-auto min-h-screen shadow-2xl bg-[#f8f9f9] border-x border-[#bec8cb]/30`) with an ambient subdued desktop backdrop (`bg-[#e7e8e8]`), ensuring identical mobile layout integrity and thumb-friendly navigation everywhere.

2. **Discovering & Tracking Badges in ProgressView**:
   - The user opens the **Progress** tab and finds a new **Milestone Badges** section placed prominently below the Mindful Garden.
   - A summary filter/status shows "Earned X of Y Unlocked".
   - The badge grid renders each badge with a distinctive domain icon, title, requirement, and status.
   - For locked or in-progress badges, a subtle progress bar shows immediate proximity (e.g. `3 / 5 Mood Logs (60%)`).
   - Earned badges display a vibrant teal/sage glow and an "Unlocked" checkmark indicator.

3. **Interactive Badge Detail Modal**:
   - Tapping any badge opens a smooth bottom-sheet or modal card.
   - Details include:
     - Badge insignia & title
     - Inspiring tagline & mental health philosophy
     - Exact unlocking criteria and current user progress
     - Earned timestamp (if unlocked) or encouraging tip (if in progress)
     - Dismiss action with smooth touch-friendly tap targets

### Visual Identity & Theme
- **Color Palette**:
  - Dominant Neutral: Canvas `#f8f9f9`, card surface `#ffffff`, border `#bec8cb`/40
  - Primary Accent: Deep Teal `#006474`, Sage Container `#cbead6`, Warm Terracotta `#88492c`
  - Unlocked Badge Glow: `#006474` and `#2d7d8e` with soft warm amber highlights `#fef08a`
  - Locked Badge: Subdued `#6f797c` with dashed hairline borders and muted grayscale icon
- **Typography & Hierarchy**:
  - Headline font: `Montserrat` (clean title weights)
  - Body font: `Inter` (13px–15px body prose, crisp touch legibility)
  - Data & Proximity: `tabular-nums` for progress indicators (`3/5`, `10/10`)
- **Interactive Feedback & Touch Target Discipline**:
  - Minimum tap hitbox $44 \times 44\text{px}$ across all badge cards and modal controls.
  - Micro-interactions: scale down on touch `active:scale-[0.98]`.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Mobile-Only Responsive Container**:
  - *Chosen Approach*: Center the entire app layout inside a `max-w-md` (448px) container centered in the viewport with a subtle device border and background contrast. Both the `TopAppBar` and `BottomNavBar` are scoped to this container.
  - *Why*: Delivers an authentic mobile experience on desktop while maintaining 100% responsiveness on real phones without horizontal overflow.
  - *Alternatives Considered*: Standard desktop responsive multi-column layout was rejected per user choice.

- **Decision 2: Badge Definition & Progression Calculation**:
  - *Chosen Approach*: Derive badge unlock status deterministically from existing tracked user data:
    - `Consistency Champ`: 5 mood logs recorded
    - `Mood Explorer`: 10 mood logs recorded
    - `Reframer`: 3 cognitive reframing journal entries (tiered up to 10 for 'Master Reframer')
    - `Quest Pioneer`: 3 daily quests completed
    - `Mindful Master`: 10 daily quests completed
    - `Deep Breather`: Breathing exercise practiced / pause quest completed
    - `Prompt Artisan`: Saved 2 or more custom AI support prompts
  - *Why*: Instant unlock recognition for existing entries without requiring complex backend database migrations. Everything is persisted via `localStorage` and synchronizes automatically whenever a quest, mood, journal entry, or prompt is saved.

- **Decision 3: Interactive Modal vs Static Badges**:
  - *Chosen Approach*: Build a reusable `BadgeDetailModal` component with animated appearance, full progress breakdown, and celebration effects for unlocked achievements.

---

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                       App Container                         │
│   (Mobile Constrained: max-w-md mx-auto relative shadow)    │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                     TopAppBar                         │  │
│  └───────────────────────────────────────────────────────┘  │
│                             │                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    ProgressView                       │  │
│  │  - Mindful Bloom Garden (Particle Matrix)             │  │
│  │  - Cumulative Stats Summary                           │  │
│  │  - Milestone Badges Section (Visual Grid)             │  │
│  │    ├─ Earned Badges (Active state + glow)             │  │
│  │    └─ In-Progress Badges (Progress bar + locked lock) │  │
│  │  - Recent Mood Trajectory                             │  │
│  │  - QuestMind Pillars                                  │  │
│  └───────────────────────────────────────────────────────┘  │
│                             │ (onSelectBadge)               │
│                             ▼                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                  BadgeDetailModal                     │  │
│  │  - Badge Icon, Title, Category                        │  │
│  │  - Unlocked State / Progress Bar (e.g. 7/10)          │  │
│  │  - Lore & Mental Wellbeing Benefit                    │  │
│  └───────────────────────────────────────────────────────┘  │
│                             │                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    BottomNavBar                       │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Data Model & State Additions

1. **Badge Type Definition (`src/types/index.ts`)**:
```typescript
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
```

2. **Progress Calculation in `ProgressView`**:
   - Takes `quests`, `moodHistory`, `journalEntries`, and `savedPrompts` as props.
   - Computes live progress percentages and unlocked flags.
   - Updates badges dynamically as users complete quests or write journal reframings.

3. **Mobile Layout Containment (`App.tsx` & `index.html`)**:
   - App shell wrapped in `min-h-screen bg-[#edeef0] flex justify-center`.
   - Inner smartphone canvas: `w-full max-w-md bg-[#f8f9f9] min-h-screen relative shadow-2xl flex flex-col`.
   - Fixed elements (`BottomNavBar`, `CrisisModal`, etc.) constrained within `max-w-md mx-auto` or centered overlays.
