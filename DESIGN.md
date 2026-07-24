---
name: L&M Septic Pros Design System
description: Visual design tokens and guidelines for the invisible covenant of home services.
colors:
  brand-green: "#0E763B"
  brand-green-hover: "#0B5C2E"
  emergency-yellow: "#FDE047"
  emergency-yellow-hover: "#EAB308"
  text-dark: "#0F172A"
  text-muted: "#64748B"
  surface-light: "#F8FAFC"
  border-light: "#E2E8F0"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.05em"
rounded:
  sm: "4px"
  md: "8px"
  xl: "12px"
  "2xl": "16px"
  "4xl": "32px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
components:
  button-call:
    backgroundColor: "{colors.emergency-yellow}"
    textColor: "{colors.brand-green}"
    rounded: "{rounded.xl}"
    padding: "16px 32px"
  button-call-hover:
    backgroundColor: "{colors.emergency-yellow-hover}"
  card-service:
    backgroundColor: "#FFFFFF"
    rounded: "{rounded.2xl}"
    padding: "24px"
---

# Design System: L&M Septic Pros

## 1. Overview

**Creative North Star: "The Invisible Covenant"**

L&M Septic Pros is built on a covenant between neighbors: providing heavy infrastructural services (septic installations, repair, and pumping) with an invisible presence, seamless functionality, and local reliability. The visual language balances rugged field expertise with pristine residential trust. 

The system relies on clear, spacious typography, high contrast, and deep forest-green accents that feel grounded in North Carolina's native environment. We avoid flashy, hyper-animated elements or SaaS-style tech graphics, maintaining an authoritative and accessible tone that respects emergency customer contexts.

### Key Characteristics:
- **Clean Contrast**: Heavy slate text against clean white and soft clay backgrounds.
- **Organic Accents**: Grounded forest greens and natural clay tones representing the soil and lawn.
- **Tactile Details**: Soft, large-radius containers that evoke safety and security.

## 2. Colors

The color palette is rooted in earth tones and clean residential elements, prioritizing safety and reliability.

### Primary
- **Forest Green** (`#0E763B` / oklch(0.42 0.16 142)): Used for main branding, key headings, active link states, and trust badges.
- **Pine Shadow** (`#0B5C2E` / oklch(0.35 0.13 142)): Used for hover states on primary components.

### Secondary
- **Emergency Yellow** (`#FDE047` / oklch(0.88 0.19 95)): A highly visible warm accent used exclusively for call-to-actions, emergency click-to-calls, and conversion points.

### Neutral
- **Slate Dark** (`#0F172A` / oklch(0.13 0.03 262)): Used for high-contrast headlines and body text to maximize readability.
- **Lawn Muted** (`#64748B` / oklch(0.55 0.03 250)): Used for secondary body text, icons, and supporting information.
- **Clay Bright** (`#F8FAFC` / oklch(0.98 0.005 240)): Used for clean card backgrounds, section alternative fills, and sidecars.
- **Gravel Border** (`#E2E8F0` / oklch(0.92 0.01 240)): Used for subtle dividers and borders to structure layouts cleanly.

### Named Rules
**The Accent Limitation Rule.** Forest green is used for brand presence (≤15% of screen real estate) and emergency yellow is restricted strictly to active conversion triggers (≤10% of screen). Surfaces remain predominantly clean white or soft clay.

## 3. Typography

**Display Font:** Manrope (with sans-serif fallback)  
**Body Font:** Manrope (with sans-serif fallback)  
**Label Font:** Work Sans (with sans-serif fallback)

### Hierarchy
- **Display** (black/900, 32px to 48px, line-height 1.05): Used for main page hero headings.
- **Headline** (bold/700, 24px to 36px, line-height 1.25): Used for section titles.
- **Title** (semibold/600, 18px to 20px, line-height 1.4): Used for subheadings and card titles.
- **Body** (regular/400, 16px to 18px, line-height 1.6): Used for descriptive copy. Body text columns must stay below a maximum of 75ch.
- **Label** (semibold/600, 12px to 13px, tracking 0.05em, uppercase): Used for badges, categories, and pre-headers.

### Named Rules
**The Readability First Rule.** Headings must never use italic styles or thin weights. High legibility is critical to support customers viewing the site in stressful situations.

## 4. Elevation

The elevation vocabulary is flat and structural, relying on soft ambient shadows to raise key elements off the background.

### Shadow Vocabulary
- **Nav Shadow** (`box-shadow: 0 2px 10px rgba(15, 23, 42, 0.02)`): Used to separate the fixed navigation bar from the scrolling content.
- **Service Card Shadow** (`box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08)`): Used on key content containers to define service boundaries.
- **Hero Card Shadow** (`box-shadow: 0 8px 40px rgba(15, 23, 42, 0.08)`): Used for large hero layouts to separate them from background imagery.
- **CTA Call Shadow** (`box-shadow: 0 8px 20px rgba(14, 118, 59, 0.25)`): Used on primary yellow action buttons to make them feel tactile and tappable.

### Named Rules
**The Flat Surfaces Rule.** Content cards do not stack shadows. Shadow elevations are reserved exclusively for interactive elements (buttons, inputs) and high-priority container cards.

## 5. Components

### Buttons
- **Shape:** Rounded corners (`12px` / `0.75rem` / `xl`).
- **Primary Emergency CTA:** Bright yellow (`#FDE047`) background, dark green (`#0E763B`) text, padded (`16px 32px`), elevated by shadow. Hover transitions to yellow-500 (`#EAB308`).
- **Secondary UI Actions:** White background, thin border (`#E2E8F0`), dark slate text. Hover shifts to clay background (`#F8FAFC`).

### Cards / Containers
- **Corner Style:** Large rounded corners (`16px` / `2xl` or `32px` / `4xl`).
- **Background:** White or soft clay fill (`#F8FAFC`).
- **Border:** Soft gray (`#E2E8F0`) or none when shadowed.

### Navigation
- **Fixed Bar:** Padded flex row, height (`80px`), clean white background (`#FFFFFF`) with blur backdrop (`backdrop-blur-md` at `95%` opacity).
- **Links:** UPPERCASE sans (`Work Sans`), `12px`, letter spacing `0.05em`, active indicator is forest green border-b.

## 6. Do's and Don'ts

### Do:
- **Do** tint all neutral backgrounds toward the brand colors (using slate `#0F172A` and clay `#F8FAFC`).
- **Do** use large, comfortable tap targets (minimum height `48px`) for touch navigation.
- **Do** limit the line length of text columns to between 60ch and 75ch.

### Don't:
- **Don't** use colored accent borders (e.g. side-stripes like `border-left-4` on alerts or cards).
- **Don't** use gradient text under any circumstances.
- **Don't** wrap nested cards inside cards.
- **Don't** display generic icon grids without localized copy or unique titles.
