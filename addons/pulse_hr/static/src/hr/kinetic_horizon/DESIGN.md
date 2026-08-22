---
name: Dayflow Cinematic Sci-Fi
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
  tertiary: '#42e18d'
  on-tertiary: '#00391e'
  tertiary-container: '#00a661'
  on-tertiary-container: '#003119'
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
  tertiary-fixed: '#65fea7'
  tertiary-fixed-dim: '#42e18d'
  on-tertiary-fixed: '#00210f'
  on-tertiary-fixed-variant: '#00522d'
  background: '#0f1322'
  on-background: '#dfe1f7'
  surface-variant: '#303445'
  surface-navy: '#0A1024'
  text-muted: '#8B95AE'
  text-white: '#F7F9FF'
  rim-light: rgba(40, 120, 255, 0.2)
  glass-bg: rgba(10, 16, 36, 0.6)
  glass-bg-heavy: rgba(10, 16, 36, 0.8)
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Plus Jakarta Sans
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
  unit: 8px
  stack-depth-sm: 12px
  gutter: 24px
  stack-depth-lg: 32px
  margin-mobile: 20px
  margin-desktop: 64px
---

## Brand & Style
Dayflow HRMS is a high-performance administrative command center designed for enterprise-scale workforce management. The brand personality is **authoritative, futuristic, and precise**, evoking the feeling of a sophisticated mission control room.

The design style is an evolved **Glassmorphism** mixed with **3D Spatial UI** elements. It utilizes deep "void" backgrounds, vibrant light-source accents (rim lighting), and layered translucency to create a sense of immense digital depth. The aesthetic is cinematic, targeting tech-forward executives and HR directors who require an interface that feels like an advanced intelligence tool rather than a standard spreadsheet-based HR tool.

## Colors
The palette is rooted in **Dayflow Void (#050817)**, creating a high-contrast environment for luminous interactive elements. 

- **Primary (Dayflow Blue):** Used for core actions, focus states, and primary brand signals. It is often accompanied by an outer glow or "bloom" effect.
- **Secondary (Dayflow Violet):** Represents AI intelligence and administrative security. Used for accents and status indicators related to "smart" features.
- **Success (Emerald):** A vibrant green used for health metrics and positive system confirmations.
- **Surface Navy:** Used for containers that require more opacity and structural grounding than standard glass panels.
- **Rim Lighting:** A specific semi-transparent blue used for top/left borders to simulate a light source hitting 3D edges.

## Typography
The system uses **Plus Jakarta Sans** exclusively to maintain a contemporary, geometric appearance that balances approachability with technical precision. 

- **Display levels** use heavy weights and tight letter spacing for a "heroic" feel.
- **Labels** are always uppercase with increased letter spacing (tracked out) to evoke the technical aesthetic of heads-up displays (HUDs).
- **Body text** utilizes a muted color (#8B95AE) to ensure that display titles and interactive elements remain the primary focus.
- **Gradients** are applied to secondary headlines (White to 70% White) to add a subtle "metallic" sheen.

## Layout & Spacing
The system employs a **12-column fixed grid** (max-width 1440px) for desktop, scaling down to 8 columns for tablets and 4 columns for mobile.

- **Spatial Depth:** The layout is not flat; it uses 3D perspective. The "Main Content" floats on a Z-axis above the background.
- **Rhythm:** An 8px base unit drives all spacing. `Stack-depth-lg` (32px) is used for vertical separation between major logical sections, while `stack-depth-sm` (12px) handles internal component grouping.
- **Safe Zones:** Generous 64px horizontal margins on desktop provide "breathing room" for floating parallax elements that exist outside the main container's flow.

## Elevation & Depth
Elevation is communicated through **translucency, blur, and light-modeling** rather than simple drop shadows.

- **Standard Glass:** 20px backdrop-blur with a 60% opacity surface. Used for secondary floating cards.
- **Heavy Glass:** 40px backdrop-blur with an 80% opacity surface. Used for primary interactive panels (e.g., Login, Modal).
- **Light Modeling:** Every panel features a 1px top and left border in `rim-light` blue to simulate a top-down light source. 
- **Shadows:** Shadows are extremely large and diffused (32px to 48px blur) with very low opacity, used to anchor floating elements to the 3D scene.
- **AI Accents:** High-priority AI-driven content is marked with a 4px solid left-border accent in `secondary` (Violet).

## Shapes
The shape language is sophisticated and modern. 
- **Standard Containers:** Use `12px` (rounded-xl) or `16px` (rounded-2xl) for large panels to feel substantial and high-end.
- **Buttons & Inputs:** Use `8px` (rounded-lg) to maintain a crisp, professional edge.
- **Status Pills:** Use `full` rounding for badges and status indicators to contrast against the architectural squareness of the primary grid.

## Components
- **Buttons (Primary):** Solid `#2878FF` with an inner white glow (inset shadow) and a blue drop-shadow to create a "pulsing" energetic effect. Text is always uppercase with wide tracking.
- **Buttons (Ghost):** Semi-transparent background with a 1px border. They inherit a blue border on hover.
- **Input Fields:** Dark `#050817` background with subtle borders. On focus, they transition to a 2px blue bottom border with a subtle volumetric glow.
- **Floating Metric Cards:** Small glass panels containing an icon (Material Symbol), a tracked-out label, and a display-grade value.
- **Pulsing Nodes:** Circular indicators for "Live" status, using a multi-layered CSS animation to simulate a sonar pulse.
- **SSO Buttons:** Use the `button-ghost` style with enterprise-specific icons (corporate_fare) to separate them from the primary login action.