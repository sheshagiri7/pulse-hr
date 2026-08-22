---
name: Dayflow Pulse
colors:
  surface: '#0f1322'
  surface-dim: '#0f1322'
  surface-bright: '#353849'
  surface-container-lowest: '#0a0d1d'
  surface-container-low: '#171b2b'
  surface-container: '#1b1f2f'
  surface-container-high: '#26293a'
  surface-container-highest: '#303445'
  on-surface: '#dfe1f7'
  on-surface-variant: '#c2c6d7'
  inverse-surface: '#dfe1f7'
  inverse-on-surface: '#2c3040'
  outline: '#8c90a0'
  outline-variant: '#424655'
  surface-tint: '#b0c6ff'
  primary: '#b0c6ff'
  on-primary: '#002d6f'
  primary-container: '#568dff'
  on-primary-container: '#002661'
  inverse-primary: '#0058cb'
  secondary: '#d5bbff'
  on-secondary: '#41008b'
  secondary-container: '#6603d2'
  on-secondary-container: '#ceb2ff'
  tertiary: '#c0c5e1'
  on-tertiary: '#2a2f45'
  tertiary-container: '#8a90a9'
  on-tertiary-container: '#23293e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d9e2ff'
  primary-fixed-dim: '#b0c6ff'
  on-primary-fixed: '#001945'
  on-primary-fixed-variant: '#00429b'
  secondary-fixed: '#ebdcff'
  secondary-fixed-dim: '#d5bbff'
  on-secondary-fixed: '#270058'
  on-secondary-fixed-variant: '#5d00c2'
  tertiary-fixed: '#dce1fe'
  tertiary-fixed-dim: '#c0c5e1'
  on-tertiary-fixed: '#151b2f'
  on-tertiary-fixed-variant: '#40465c'
  background: '#0f1322'
  on-background: '#dfe1f7'
  surface-variant: '#303445'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
  data-mono:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-padding-desktop: 40px
  container-padding-mobile: 20px
  gutter: 24px
  depth-z-index-base: '0'
  depth-z-index-raised: '100'
  depth-z-index-overlay: '500'
---

## Brand & Style
The design system embodies a "Cinematic 3D" aesthetic tailored for high-performance enterprise environments. It prioritizes depth, motion, and a sense of physical space within a digital interface. The emotional response is one of calm authority combined with cutting-edge innovation.

**Core Aesthetic: Atmospheric Glassmorphism**
The visual language is defined by layered translucency, where surfaces feel like precision-milled glass hovering in a void. Depth is established through rim lighting (simulating light hitting the edges of 3D objects) and soft, pulsating glows that represent the "Pulse" of real-time data.

**Key Principles:**
- **Atmospheric Depth:** Use Z-axis layering with backdrop blurs to separate information planes.
- **Luminance over Flat Color:** UI elements should feel self-illuminated, using gradients and inner glows rather than solid fills.
- **Dynamic Vitality:** Micro-interactions should mimic biological rhythms—smooth, easing transitions that feel like breathing or a heartbeat.

## Colors
The palette is rooted in a "Deep Space" spectrum, utilizing high-contrast accents against a multi-layered dark foundation.

- **Foundational Layers:** Use the Neutral (#050817) for the primary background. The Tertiary (#0A1024) acts as the "Base Surface" for containers.
- **Vibrant Accents:** The Primary Electric Blue is used for critical paths and active states. Soft Violet is reserved for secondary data streams and decorative "Pulse" elements.
- **The Rim Light Effect:** Every elevated surface must feature a 1px inner border or "rim light" using a linear gradient of the Primary and Secondary colors at low opacity. This creates the 3D "milled glass" look.
- **State Semantics:**
    - **Active/Pulse:** Electric Blue glow.
    - **Neutral/Inactive:** Desaturated Indigo.
    - **Warning/Urgent:** High-chroma Violet.

## Typography
Typography in this design system is treated as a precision instrument. **Plus Jakarta Sans** provides a clean, geometric structure that balances the organic nature of the 3D effects.

- **Hierarchical Scale:** Use high contrast in weights. Headlines should be ExtraBold to anchor the layout against soft background blurs.
- **Letter Spacing:** Tighten spacing for large display text to give it a "machined" feel. Increase spacing for small labels (label-caps) to ensure legibility against dark backgrounds.
- **Color Application:** Primary body text should be at 90% white. Secondary text or metadata should use a "dimmed" state (60% white) to recede into the depth.

## Layout & Spacing
The layout follows a "Layered Canvas" model. Instead of traditional flat grids, think of components as floating islands within a 3D space.

- **8pt Grid System:** All spatial relationships are multiples of 8px to ensure mathematical harmony.
- **The Parallax Rule:** As users scroll, background "Pulse" glows and secondary glass layers should move at different speeds (0.8x and 0.9x) to emphasize the 3D depth.
- **Safe Zones:** Maintain generous inner padding (minimum 24px) within cards to allow the "rim light" and glass textures enough room to be visible without crowding content.
- **Mobile Adaptation:** On mobile, the 3D depth is flattened slightly to reduce visual noise. Remove background parallax but retain the "rim light" on cards.

## Elevation & Depth
Elevation is not conveyed through black shadows, but through **light and opacity**.

- **Layer 0 (Background):** Deep Midnight Navy (#050817) with subtle radial gradients of Electric Blue in the corners.
- **Layer 1 (Cards/Containers):** Dark Indigo (#0A1024) at 70% opacity with a 24px Backdrop Blur. A 1px border with a top-down linear gradient (Electric Blue to Transparent) creates the "rim."
- **Layer 2 (Interactive Elements):** Buttons and active chips use a "glow-shadow" — an outer drop shadow with a spread of 15px using the Primary color at 20% opacity.
- **The Pulse Effect:** High-priority cards feature an animated "Pulse" border—a slow-moving gradient trace that travels around the perimeter of the shape, simulating a heartbeat.

## Shapes
The shape language is "Soft-Tech"—geometric and precise, but with rounded corners to feel approachable and premium.

- **Standard Radius:** 16px (rounded-lg) for main dashboard cards and modals.
- **Small Elements:** 8px for buttons and input fields.
- **The "Pulse" Circle:** Circular elements (avatars, status indicators) must feature a secondary, larger concentric circle at 10% opacity that breathes (scales 1.0 to 1.1) to indicate life.

## Components
Consistent implementation of these components ensures the 3D narrative remains intact.

- **Glass Buttons:** Semi-transparent background with a solid 1px rim. On hover, the background opacity increases and the "Pulse" glow expands. Use "Plus Jakarta Sans" Bold for button labels.
- **Pulse Cards:** Use a subtle mesh gradient background (Blue to Violet) at 5% opacity inside the card to give the glass a sense of "volume." 
- **Input Fields:** Darker than the card surface. The border is invisible until focused, at which point it illuminates with a 1px Electric Blue rim light.
- **Data Chips:** Pill-shaped with a Soft Violet tint. They should appear to sit "on top" of the glass cards with a higher z-index and a slightly sharper rim light.
- **The Pulse Indicator:** A small 8px dot used near titles. It features a 3-tier shadow:
    1. Core (Solid Color)
    2. Inner Glow (Same color, 50% opacity, 4px blur)
    3. Outer Aura (Same color, 10% opacity, 12px blur, animating in a heartbeat rhythm).
- **Segmented Controls:** Designed as a single "carved" track in the glass where the active state is a floating frosted glass pill that slides between options.