# VibeTribe Design Guide
## Royal, Chic University Dating Portal

**Version:** 1.0  
**Last Updated:** February 2, 2026  
**Target Market:** UAE University Students

---

## 🎨 Design Philosophy

VibeTribe embodies a **royal, chic aesthetic** that appeals to aspirational university students in the UAE. The design balances elegance with approachability, sophistication with playfulness, and exclusivity with warmth.

### Core Design Principles
1. **Elevated Simplicity** - Clean white backgrounds with strategic pops of royal colors
2. **Italic Sophistication** - Serif italics for elegance, sans-serif for clarity
3. **Purposeful Luxury** - Gold accents used sparingly for premium moments
4. **Breathing Room** - Generous white space, never cluttered
5. **Subtle Animation** - Smooth, refined micro-interactions

---

## 🎨 Color Palette

### Primary Colors

#### Royal Purple
- **HEX:** `#6B4FA3`
- **RGB:** `rgb(107, 79, 163)`
- **Usage:** Primary brand color, main CTAs, active states, links, headings
- **Psychology:** Royalty, sophistication, creativity, ambition
- **Do:** Use for primary buttons, important headings, brand moments
- **Don't:** Overuse - maintain impact through strategic placement

#### Royal Gold
- **HEX:** `#D4AF37`
- **RGB:** `rgb(212, 175, 55)`
- **Usage:** Premium features, highlights, accents, VIP badges
- **Psychology:** Luxury, success, prestige, achievement
- **Do:** Reserve for premium elements, achievements, special badges
- **Don't:** Use as background color or large areas

#### Royal Navy
- **HEX:** `#1B1464`
- **RGB:** `rgb(27, 20, 100)`
- **Usage:** Dark headings, important text, hover states
- **Psychology:** Trust, depth, authority, stability
- **Do:** Use for important copy, contrast headings
- **Don't:** Use for body text (too heavy)

### Background Colors

#### Pure White
- **HEX:** `#FFFFFF`
- **RGB:** `rgb(255, 255, 255)`
- **Usage:** Main background, cards, clean surfaces
- **Note:** Primary background - maintains clean, airy feel

#### Soft Cream
- **HEX:** `#FAF8F5`
- **RGB:** `rgb(250, 248, 245)`
- **Usage:** Alternating sections, subtle backgrounds, card containers
- **Note:** Warmer than pure white, adds sophistication

#### Warm Grey
- **HEX:** `#E8E4DF`
- **RGB:** `rgb(232, 228, 223)`
- **Usage:** Borders, dividers, subtle separators
- **Note:** Softer than harsh grey, maintains elegant tone

### Text Colors

#### Text Dark
- **HEX:** `#2C2C2C`
- **RGB:** `rgb(44, 44, 44)`
- **Usage:** Primary body text, main content
- **Accessibility:** AAA compliant on white backgrounds

#### Text Muted
- **HEX:** `#6B6B6B`
- **RGB:** `rgb(107, 107, 107)`
- **Usage:** Secondary text, captions, metadata, timestamps
- **Accessibility:** AA compliant on white backgrounds

### Accent Colors

#### Accent Rose
- **HEX:** `#D4A5A5`
- **RGB:** `rgb(212, 165, 165)`
- **Usage:** Romantic moments, likes, positive actions, gradients
- **Psychology:** Romance, warmth, approachability

#### Accent Mint
- **HEX:** `#A5D4C4`
- **RGB:** `rgb(165, 212, 196)`
- **Usage:** Fresh moments, new matches, success states, gradients
- **Psychology:** Fresh start, growth, positivity

### Gradient Combinations

#### Royal Gradient
```css
background: linear-gradient(135deg, #6B4FA3 0%, #D4A5A5 100%);
```
**Usage:** Profile avatars, feature cards, hero sections

#### Fresh Gradient
```css
background: linear-gradient(135deg, #6B4FA3 0%, #A5D4C4 100%);
```
**Usage:** New user onboarding, success states, achievement badges

#### Subtle Background Gradient
```css
background: linear-gradient(135deg, #FFFFFF 0%, #FAF8F5 100%);
```
**Usage:** Large sections, landing pages, subtle depth

---

## 📝 Typography

### Font Families

#### Cormorant (Display Font)
- **Type:** Serif
- **Style:** Italic (primary), Normal (secondary)
- **Google Fonts:** `font-family: 'Cormorant', serif;`
- **Weights Used:** 
  - Light Italic (300) - Subtle headings
  - Regular (400) - Body when needed
  - Regular Italic (400) - Secondary headings
  - SemiBold Italic (600) - Main headings, hero text
- **Import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,600;1,300;1,400;1,600&display=swap" rel="stylesheet">
```

**Usage:**
- Logo and branding
- Page titles and main headings (H1, H2)
- Feature titles
- Profile names
- Emotional/aspirational copy
- Call-to-action text on hero sections

**Character:** Elegant, sophisticated, romantic, editorial

#### Montserrat (Body Font)
- **Type:** Sans-serif
- **Style:** Normal (no italics for body)
- **Google Fonts:** `font-family: 'Montserrat', sans-serif;`
- **Weights Used:**
  - Light (300) - Subtitles, secondary descriptions
  - Regular (400) - Body text, UI labels
  - Medium (500) - Emphasized text, navigation
  - SemiBold (600) - Buttons, strong emphasis
- **Import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
```

**Usage:**
- All body text and paragraphs
- UI labels and buttons
- Form inputs
- Navigation menus
- Metadata (age, university, major)
- Chat messages

**Character:** Clean, modern, professional, readable

### Type Scale

#### Desktop Typography

**H1 - Hero Titles**
- Font: Cormorant Italic SemiBold (600)
- Size: 48px (3rem)
- Line Height: 1.2
- Color: Royal Navy (#1B1464)
- Letter Spacing: 0.5px
- Usage: Landing page hero, main page titles

**H2 - Section Titles**
- Font: Cormorant Italic SemiBold (600)
- Size: 36px (2.25rem)
- Line Height: 1.3
- Color: Royal Purple (#6B4FA3)
- Letter Spacing: 0.3px
- Usage: Section headers, feature categories

**H3 - Card Titles**
- Font: Cormorant Italic Regular (400)
- Size: 24px (1.5rem)
- Line Height: 1.4
- Color: Royal Purple (#6B4FA3)
- Usage: Profile names, card headers

**H4 - Subheadings**
- Font: Cormorant Italic Light (300)
- Size: 20px (1.25rem)
- Line Height: 1.5
- Color: Royal Navy (#1B1464)
- Usage: Subsection titles, step indicators

**Body Large**
- Font: Montserrat Regular (400)
- Size: 18px (1.125rem)
- Line Height: 1.7
- Color: Text Dark (#2C2C2C)
- Usage: Important descriptions, intro paragraphs

**Body Regular**
- Font: Montserrat Regular (400)
- Size: 16px (1rem)
- Line Height: 1.6
- Color: Text Dark (#2C2C2C)
- Usage: Main body text, profile bios

**Body Small**
- Font: Montserrat Regular (400)
- Size: 14px (0.875rem)
- Line Height: 1.6
- Color: Text Muted (#6B6B6B)
- Usage: Captions, metadata, timestamps

**Caption**
- Font: Montserrat Light (300)
- Size: 12px (0.75rem)
- Line Height: 1.5
- Color: Text Muted (#6B6B6B)
- Letter Spacing: 0.3px
- Text Transform: Uppercase (optional)
- Usage: Labels, tags, fine print

#### Mobile Typography

**H1 - Hero Titles**
- Size: 32px (2rem)
- Line Height: 1.2

**H2 - Section Titles**
- Size: 28px (1.75rem)
- Line Height: 1.3

**H3 - Card Titles**
- Size: 20px (1.25rem)
- Line Height: 1.4

**Body Regular**
- Size: 16px (1rem)
- Line Height: 1.6

**Body Small**
- Size: 14px (0.875rem)
- Line Height: 1.5

---

## 🎯 UI Components

### Buttons

#### Primary Button
```css
.btn-primary {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 16px;
    padding: 12px 32px;
    border-radius: 25px;
    background: #6B4FA3;
    color: #FFFFFF;
    border: none;
    transition: all 0.3s ease;
    cursor: pointer;
}

.btn-primary:hover {
    background: #1B1464;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(107, 79, 163, 0.3);
}
```
**Usage:** Main actions (Join, Match, Send Message)

#### Secondary Button
```css
.btn-secondary {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 16px;
    padding: 12px 32px;
    border-radius: 25px;
    background: transparent;
    color: #6B4FA3;
    border: 2px solid #6B4FA3;
    transition: all 0.3s ease;
    cursor: pointer;
}

.btn-secondary:hover {
    background: #6B4FA3;
    color: #FFFFFF;
}
```
**Usage:** Secondary actions (Learn More, Pass, Cancel)

#### Gold/Premium Button
```css
.btn-gold {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 16px;
    padding: 12px 32px;
    border-radius: 25px;
    background: #D4AF37;
    color: #1B1464;
    border: none;
    transition: all 0.3s ease;
    cursor: pointer;
}

.btn-gold:hover {
    background: #C19B2E;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
}
```
**Usage:** Premium features, upgrades, VIP actions

#### Text Button
```css
.btn-text {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 14px;
    color: #6B4FA3;
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.3s ease;
}

.btn-text:hover {
    color: #1B1464;
    text-decoration: underline;
}
```
**Usage:** Links, subtle actions, navigation

### Cards

#### Standard Card
```css
.card {
    background: #FFFFFF;
    border-radius: 16px;
    padding: 24px;
    border: 1px solid #E8E4DF;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(107, 79, 163, 0.1);
}
```

#### Profile Card
```css
.profile-card {
    background: #FFFFFF;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    max-width: 350px;
}
```

#### Feature Card
```css
.feature-card {
    background: #FAF8F5;
    padding: 32px;
    border-radius: 12px;
    border-left: 4px solid #D4AF37;
    transition: all 0.3s ease;
}

.feature-card:hover {
    transform: translateX(5px);
    box-shadow: 0 5px 20px rgba(107, 79, 163, 0.1);
}
```

### Form Elements

#### Input Fields
```css
.input-field {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    padding: 12px 16px;
    border: 1px solid #E8E4DF;
    border-radius: 8px;
    background: #FFFFFF;
    color: #2C2C2C;
    transition: all 0.3s ease;
}

.input-field:focus {
    border-color: #6B4FA3;
    outline: none;
    box-shadow: 0 0 0 3px rgba(107, 79, 163, 0.1);
}

.input-field::placeholder {
    color: #6B6B6B;
}
```

#### Text Area
```css
.textarea {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    padding: 12px 16px;
    border: 1px solid #E8E4DF;
    border-radius: 8px;
    background: #FFFFFF;
    color: #2C2C2C;
    resize: vertical;
    min-height: 100px;
}
```

### Tags & Badges

#### Interest Tag
```css
.tag {
    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
    font-weight: 500;
    padding: 6px 12px;
    border-radius: 15px;
    background: #FAF8F5;
    color: #6B4FA3;
    border: 1px solid #E8E4DF;
    display: inline-block;
}
```

#### VIP Badge
```css
.badge-vip {
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 10px;
    background: #D4AF37;
    color: #1B1464;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}
```

#### Verification Badge
```css
.badge-verified {
    font-size: 16px;
    color: #6B4FA3;
    display: inline-block;
}
/* Use ✓ or verified icon */
```

#### Match Score
```css
.match-score {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-weight: 600;
    padding: 6px 12px;
    border-radius: 20px;
    background: #D4AF37;
    color: #1B1464;
}
```

---

## 📐 Spacing System

### Spacing Scale
Based on 8px grid system for consistency:

- **XXS:** 4px (0.25rem)
- **XS:** 8px (0.5rem)
- **S:** 12px (0.75rem)
- **M:** 16px (1rem)
- **L:** 24px (1.5rem)
- **XL:** 32px (2rem)
- **XXL:** 48px (3rem)
- **XXXL:** 64px (4rem)

### Component Spacing

**Card Padding:** 24px (L) on desktop, 16px (M) on mobile  
**Button Padding:** 12px 32px (vertical: S, horizontal: XL)  
**Section Spacing:** 48px (XXL) between major sections  
**Element Margin:** 16px (M) between related elements

---

## 🎭 Iconography

### Icon Style
- **Style:** Outlined, rounded corners
- **Stroke Width:** 2px
- **Size Range:** 16px - 48px
- **Color:** Matches surrounding text color
- **Library Recommendation:** Lucide Icons, Feather Icons, or Heroicons

### Icon Usage

**Navigation:** 24px  
**Buttons:** 20px  
**Features:** 32px - 48px  
**Inline:** 16px - 20px

---

## 🌊 Animations & Transitions

### Timing Functions
```css
--ease-smooth: cubic-bezier(0.4, 0.0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Standard Transitions
```css
transition: all 0.3s ease;
```

### Hover Effects

**Cards:**
```css
transform: translateY(-5px);
box-shadow: 0 10px 25px rgba(107, 79, 163, 0.1);
transition: all 0.3s ease;
```

**Buttons:**
```css
transform: translateY(-2px);
box-shadow: 0 5px 15px rgba(107, 79, 163, 0.3);
transition: all 0.3s ease;
```

### Page Load Animations
```css
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-in {
    animation: fadeInUp 0.6s ease-out;
}
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */

/* Small devices (phones, up to 640px) */
@media (max-width: 640px) { }

/* Medium devices (tablets, 641px to 1024px) */
@media (min-width: 641px) and (max-width: 1024px) { }

/* Large devices (desktops, 1025px and up) */
@media (min-width: 1025px) { }

/* Extra large devices (large desktops, 1440px and up) */
@media (min-width: 1440px) { }
```

---

## 🖼️ Images & Media

### Profile Photos
- **Aspect Ratio:** 3:4 (portrait)
- **Minimum Size:** 800 x 1066px
- **Recommended Size:** 1200 x 1600px
- **Format:** JPEG, PNG, WebP
- **Border Radius:** 16px for cards, 50% for avatars

### Background Images
- **Format:** WebP with JPEG fallback
- **Optimization:** Under 200KB per image
- **Usage:** Hero sections, feature backgrounds

### Avatar Placeholders
- **Style:** Gradient backgrounds with initials
- **Font:** Cormorant Italic
- **Size:** Responsive (60px - 120px)

---

## ♿ Accessibility

### Color Contrast
- **Body Text on White:** 4.5:1 minimum (AAA)
- **Large Text on White:** 3:1 minimum (AA)
- **Interactive Elements:** Clear focus states

### Focus States
```css
.interactive-element:focus {
    outline: 2px solid #6B4FA3;
    outline-offset: 2px;
}
```

### Text Sizing
- Minimum body text: 16px
- Scalable with user preferences
- Never disable zoom

---

## 🎨 Design Patterns

### Empty States
- Use illustrations or icons
- Cormorant Italic for heading
- Montserrat for description
- Clear call-to-action

### Loading States
- Skeleton screens matching content
- Purple (#6B4FA3) shimmer effect
- Never block entire interface

### Error States
- Gentle red accent (#D4A5A5 tinted darker)
- Clear, friendly messaging
- Actionable solutions

### Success States
- Mint accent (#A5D4C4)
- Celebratory but subtle
- Brief confirmation, then return to normal

---

## 📋 CSS Variables Setup

```css
:root {
    /* Colors */
    --royal-purple: #6B4FA3;
    --royal-gold: #D4AF37;
    --royal-navy: #1B1464;
    --soft-cream: #FAF8F5;
    --pure-white: #FFFFFF;
    --warm-grey: #E8E4DF;
    --text-dark: #2C2C2C;
    --text-muted: #6B6B6B;
    --accent-rose: #D4A5A5;
    --accent-mint: #A5D4C4;
    
    /* Typography */
    --font-display: 'Cormorant', serif;
    --font-body: 'Montserrat', sans-serif;
    
    /* Spacing */
    --space-xxs: 4px;
    --space-xs: 8px;
    --space-s: 12px;
    --space-m: 16px;
    --space-l: 24px;
    --space-xl: 32px;
    --space-xxl: 48px;
    --space-xxxl: 64px;
    
    /* Border Radius */
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    --radius-xl: 25px;
    --radius-full: 50%;
    
    /* Shadows */
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 5px 20px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 40px rgba(107, 79, 163, 0.15);
    --shadow-hover: 0 15px 50px rgba(107, 79, 163, 0.2);
    
    /* Transitions */
    --transition-fast: 0.15s ease;
    --transition-base: 0.3s ease;
    --transition-slow: 0.5s ease;
}
```

---

## 🎯 Brand Voice in Design

### Visual Tone
- **Aspirational but Accessible:** Luxury without intimidation
- **Youthful Sophistication:** Modern elegance, not stuffy
- **Warm Minimalism:** Clean but inviting
- **Confident & Playful:** Serious about quality, fun in execution

### Design Don'ts
❌ Never use Comic Sans, Times New Roman, or Arial  
❌ Avoid harsh blacks (#000000) - use Text Dark instead  
❌ No neon or overly bright colors  
❌ No cluttered layouts - embrace white space  
❌ No generic stock photos - curated imagery only  
❌ Avoid rounded rectangles under 8px (too sharp)  
❌ Never mix more than 3 font weights in one view  

### Design Do's
✅ Use generous white space  
✅ Maintain consistent 8px grid  
✅ Keep animations subtle and purposeful  
✅ Layer depth through shadows and cards  
✅ Use gold sparingly for maximum impact  
✅ Prioritize readability over decoration  
✅ Test on actual devices, not just simulators  

---

## 🌍 Cultural Considerations (UAE Market)

### Design Sensitivity
- Elegant, modest imagery
- Right-to-left (RTL) layout preparation
- Bilingual support considerations (Arabic/English)
- Premium aesthetic expectations
- Privacy-forward visual language

### Luxury Indicators
- Clean, uncluttered interfaces
- High-quality imagery
- Attention to detail (kerning, alignment)
- Smooth, refined animations
- Premium color palette execution

---

## 📦 Component Library Recommendation

For fastest implementation with this design system:

**React:** Tailwind CSS + Headless UI + Custom components  
**Vue:** Tailwind CSS + Headless UI Vue + Custom components  
**Plain JS:** Custom CSS framework following this guide

---

## ✅ Design Checklist

Before launching any screen:

- [ ] Uses correct font (Cormorant for headings, Montserrat for body)
- [ ] Maintains white/cream background dominance
- [ ] Purple as primary brand color, gold as premium accent
- [ ] Minimum 16px font size for body text
- [ ] Proper spacing using 8px grid
- [ ] Hover states on all interactive elements
- [ ] Focus states for accessibility
- [ ] Responsive design tested on mobile, tablet, desktop
- [ ] Colors meet WCAG AA contrast requirements
- [ ] Animations are smooth and purposeful
- [ ] Loading states implemented
- [ ] Empty states designed
- [ ] Error states handled gracefully

---

**End of Design Guide**

This comprehensive guide ensures visual consistency across all VibeTribe touchpoints. Refer to this document for all design decisions, and update it as the design system evolves.
