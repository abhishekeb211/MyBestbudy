---
name: Serene Campus
colors:
  surface: '#f8f9f9'
  surface-dim: '#d9dada'
  surface-bright: '#f8f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f4'
  surface-container: '#edeeee'
  surface-container-high: '#e7e8e8'
  surface-container-highest: '#e1e3e3'
  on-surface: '#191c1c'
  on-surface-variant: '#3f484b'
  inverse-surface: '#2e3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#6f797c'
  outline-variant: '#bec8cb'
  surface-tint: '#086878'
  primary: '#006474'
  on-primary: '#ffffff'
  primary-container: '#2d7d8e'
  on-primary-container: '#f3fcff'
  inverse-primary: '#87d2e4'
  secondary: '#496455'
  on-secondary: '#ffffff'
  secondary-container: '#cbead6'
  on-secondary-container: '#4f6a5b'
  tertiary: '#88492c'
  on-tertiary: '#ffffff'
  tertiary-container: '#a66142'
  on-tertiary-container: '#fff8f6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a9edff'
  primary-fixed-dim: '#87d2e4'
  on-primary-fixed: '#001f26'
  on-primary-fixed-variant: '#004e5b'
  secondary-fixed: '#cbead6'
  secondary-fixed-dim: '#afcebb'
  on-secondary-fixed: '#052014'
  on-secondary-fixed-variant: '#314c3e'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#70361b'
  background: '#f8f9f9'
  on-background: '#191c1c'
  surface-variant: '#e1e3e3'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  container-margin: 20px
  gutter: 16px
---

## Brand & Style

The design system is centered on **Empathetic Modernism**. It prioritizes the mental well-being of engineering students by balancing professional reliability with a soft, human-centric touch. The aesthetic moves away from clinical rigidity toward a "lifestyle-wellness" feel that reduces the stigma of seeking help.

The UI utilizes a **Modern-Tactile** style: high-quality whitespace, exceptionally soft rounded corners, and subtle depth through tonal layering. It aims to evoke a sense of digital "breathing room," minimizing cognitive load for students who may be experiencing stress or anxiety. The emotional response should be one of immediate safety, privacy, and quiet optimism.

## Colors

The palette is anchored by **Teal-Main**, representing stability and clarity. **Sage Green** is used for growth-oriented features (journaling, progress), while **Peach-Accent** provides a warm, human touch for interactive highlights and supportive cues.

**Crisis/Warning States:** Use `crisis-red` sparingly. For high-urgency help buttons, use high-contrast white text on a `crisis-red` background, but pair it with a 1px border of the same color on a light background for non-urgent warnings to remain "non-alarming."

- **Primary:** Teal (Trust, Calm)
- **Secondary:** Sage (Natural, Balance)
- **Accents:** Peach (Warmth, Energy)
- **Neutrals:** Off-whites and deep charcoal-teals for text to avoid the harshness of pure black.

## Typography

This design system uses a dual-font approach. **Montserrat** provides a confident, modern geometric structure for headings, ensuring the "PCCOE" brand feels established and reliable. **Inter** is used for all body text and UI labels to maximize legibility and accessibility, especially during long reading sessions (e.g., resources or articles).

- **Hierarchy:** Use `display-lg` only for onboarding or major "Zen" moments.
- **Readability:** Body text should maintain a maximum line length of 65 characters to reduce visual fatigue.
- **Weight:** Avoid using "Thin" or "Light" weights for body text to ensure high accessibility for users under stress.

## Layout & Spacing

The design system employs a **4px baseline grid** with a fluid layout model. For mobile devices (the primary target), use a 4-column grid with 20px side margins and 16px gutters.

**Spacing Philosophy:**
- **Generous Gutters:** Use `lg` (24px) or `xl` (32px) spacing between major sections to prevent the UI from feeling "crowded," which can trigger claustrophobia or anxiety.
- **Grouped Elements:** Use `sm` (8px) for internal component spacing (e.g., icon to text).
- **Safe Areas:** Ensure interactive elements are at least 44x44px to accommodate relaxed or shaky motor input.

## Elevation & Depth

Depth in this design system is achieved through **Soft Tonal Layering** rather than heavy shadows.

- **Level 0 (Background):** `background-base` (#FAFBFB).
- **Level 1 (Cards/Surface):** `surface-white` (#FFFFFF) with a subtle 1px border in `teal-light` or a very soft, diffused shadow (10% opacity of `teal-deep`, 12px blur, 4px Y-offset).
- **Level 2 (Interactive/Floating):** Floating Action Buttons (FABs) or active modals use a more pronounced shadow (15% opacity, 20px blur) to signify "reachability."

Avoid harsh black shadows; always tint shadows with the primary `teal-deep` color to maintain the "Soft & Supportive" atmosphere.

## Shapes

The shape language is **Organic and Welcoming**. Sharp corners are avoided to minimize the "clinical" feel. 

- **Cards:** Use a generous 24px radius (`rounded-xl`) to make them feel like approachable containers.
- **Buttons:** Use 16px radius for a balance of modern tech and softness.
- **Interactive Elements:** Checkboxes and selection states should use slightly softened corners (4px-8px) rather than harsh 90-degree angles.
- **Imagery:** Any photos or avatars should also follow the 24px radius or be fully circular.

## Components

### Buttons
- **Primary:** Solid `teal-main` with white text. High-contrast, but the rounded corners keep it friendly.
- **Secondary:** `teal-light` background with `teal-main` text.
- **Crisis:** Solid `crisis-red` with white text, always accompanied by a "Phone" icon for immediate help.

### Input Fields
- Use a soft `teal-light` background instead of a harsh white background. 
- Focus state: 2px solid `teal-main` border with a subtle outer glow.

### Cards
- Standard containers for mood tracking, articles, or appointments.
- Should use `body-md` for description and `headline-md` for titles.
- Minimalist: Do not overload a single card with more than two actions.

### Mood Chips
- Pill-shaped (`100px` radius).
- Use `sage-light` for neutral states and `peach-accent` for active/selected states.

### Additional Components
- **Breathing Guide:** A circular, pulsating element using concentric circles of `teal-light` and `teal-main`.
- **Privacy Indicator:** A small, persistent "Locked" icon or "End-to-End Encrypted" label in footer areas using `label-sm` to reinforce the "Safe & Private" mood.