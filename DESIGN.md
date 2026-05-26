---
name: University ClubHub Narrative
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#464555'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#3130c0'
  on-tertiary: '#ffffff'
  tertiary-container: '#4b4dd8'
  on-tertiary-container: '#d9d8ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display-lg:
    fontFamily: Poppins
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Poppins
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Poppins
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Poppins
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 40px
  margin-mobile: 20px
  bento-gap: 20px
---

## Brand & Style

The design system is engineered to evoke a sense of premium academic prestige blended with the vibrant, dynamic energy of student life. It targets a university demographic that values efficiency, social connectivity, and modern aesthetics.

The visual direction is defined as **Modern Glassmorphism** meets **Soft Bento**. This style leverages the clarity of a modular grid while softening the digital experience through translucent layers and organic roundedness. The goal is to create a UI that feels like a physical object—a frosted glass pane floating over a clean, organized workspace. By moving away from harsh borders and embracing depth through light and blur, the design system achieves a high-fidelity look that is both sophisticated and approachable.

## Colors

This design system utilizes a high-contrast palette anchored by a deep indigo primary and a vivid neon green secondary.

- **Primary (#4F46E5):** Used for core branding, primary actions, and key interactive elements. It provides the "academic" weight of the system.
- **Secondary (#10B981):** A dark neon green reserved exclusively for active states, success notifications, and "glow" effects to highlight live events or active club statuses.
- **Neutral & Background:** The canvas is a pure white (#FFFFFF) or a very subtle cool-gray (#F9FAFB). This ensures that the glass effects have a clean surface to reflect and blur, maintaining high legibility.
- **Surface Tints:** Translucent versions of the primary color (low opacity) are used for "glass" overlays to maintain color harmony within blurred containers.

## Typography

The typography strategy pairs **Poppins** for expressive headings and **Inter** for utilitarian body text.

**Poppins** provides a geometric, circular structure that complements the rounded bento shapes and pill-shaped buttons. It is used for all "Display" and "Headline" roles to establish a modern, friendly character.

**Inter** is utilized for all body copy, labels, and input fields. Its high legibility and neutral tone balance the more decorative Poppins, ensuring that dense information (like club descriptions or event schedules) remains easy to scan. Weight is used strategically—semi-bold for labels to ensure they "pop" against glass backgrounds, and regular for long-form reading.

## Layout & Spacing

The layout is built on a **Soft Bento Box modular grid**. This approach organizes content into distinct, rounded rectangles of varying sizes that sit harmoniously together.

- **Grid Structure:** A 12-column fluid grid is used for desktop, reflowing to a 4-column grid for mobile.
- **Modular Units:** Content is grouped into "Bento cells." These cells should span columns in increments (e.g., a featured event spans 8 columns, while a small sidebar widget spans 4).
- **Rhythm:** An 8px base unit governs all spacing. Gaps between bento cells are consistently set to 20px or 24px to provide enough breathing room for the soft shadows to diffuse without overlapping awkwardly.
- **Adaptability:** On mobile, bento cells stack vertically, maintaining their signature rounded corners and internal padding to preserve the "card" feel.

## Elevation & Depth

Depth in the design system is achieved through light and transparency rather than traditional heavy shadows or borders.

- **Glassmorphism Layers:** Primary navigation bars and floating action cards use a `backdrop-filter: blur(12px)` combined with a semi-transparent white fill (e.g., `rgba(255, 255, 255, 0.7)`). This creates a "frosted glass" effect that allows background colors to peek through.
- **Soft Diffused Shadows:** Elements use a single, ultra-soft drop shadow (`0px 10px 30px rgba(0, 0, 0, 0.05)`) to suggest elevation. These shadows should feel like ambient light, not a hard source.
- **No Solid Borders:** To maintain the "soft" aesthetic, solid borders are avoided. Instead, a very thin, 1px semi-transparent white inner stroke (border) can be used on glass cards to define the edges against light backgrounds.

## Shapes

The shape language is defined by extreme roundedness and organic curves.

- **Bento Cards:** Use a consistent border radius of 24px (`rounded-xl` equivalent). This large radius is essential to the "Soft Bento" look.
- **Interactive Elements:** Buttons and tags utilize a **pill-shape** (fully rounded ends) to distinguish them from the containers they sit within.
- **Consistency:** Every corner in the UI—from input fields to image containers—must follow the 16px to 24px radius rule. Sharp 90-degree angles are strictly forbidden to ensure the design remains "soft" and welcoming.

## Components

The components within the design system are designed to feel tactile and layered.

- **Buttons:** All buttons are pill-shaped. Primary buttons use the #4F46E5 Indigo with a subtle outer glow on hover. Secondary buttons are transparent with a glass-blur effect.
- **Bento Cards:** The foundational component. Cards have no solid border, a 24px radius, and a 12px backdrop blur. Content inside cards should have a minimum of 24px internal padding.
- **Inputs:** Text fields use a subtle cool-gray background (#F3F4F6) with a 16px radius. On focus, the background remains, but a 2px glow in the primary indigo color appears (using `box-shadow` rather than a stroke).
- **Chips & Tags:** Small pill-shaped containers. For "Active" status, chips use the secondary #10B981 color with a soft green outer glow to signify "Live" activity.
- **Navigation Bar:** A fixed top-bar with a heavy 20px blur and 70% opacity. It should feel like a floating pane that content scrolls behind.
- **Selection Controls:** Checkboxes and radio buttons are heavily rounded, using the primary indigo for the selected state and a soft bounce animation upon interaction.
