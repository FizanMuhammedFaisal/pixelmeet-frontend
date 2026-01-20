# PixelMeet Design System

> **Last Updated:** January 17, 2026

This document serves as an **AI prompt and design guide** for building UI in PixelMeet. Follow these rules strictly.

---

## CRITICAL: Reference Files

**DO NOT hardcode design values.** Always reference these source files:

| File                           | Contains                                            |
| ------------------------------ | --------------------------------------------------- |
| `src/index.css`                | All theme variables, colors, fonts, shadows, radius |
| `src/components/ui/button.tsx` | Button variants and sizes                           |
| `src/components/ui/card.tsx`   | Card component patterns                             |

**Before styling anything, read `index.css` to understand the available CSS variables.**

---

## Tech Stack

| Category      | Technology              |
| ------------- | ----------------------- |
| Framework     | React 19                |
| Build Tool    | Vite 7                  |
| Styling       | TailwindCSS 4           |
| Animation     | Motion (framer-motion)  |
| State         | Zustand, TanStack Query |
| Forms         | React Hook Form + Zod   |
| UI Primitives | Radix UI                |
| Icons         | Lucide React            |
| Router        | React Router 7          |
| Game Engine   | Phaser 3, PixiJS 8      |

---

## Theme Contexts

There are **4 theme contexts** defined in `index.css`:

```css
:root { ... }        /* Default */
.user { ... }        /* User light mode */
.user.dark { ... }   /* User dark mode */
.admin { ... }       /* Admin light mode */
.admin.dark { ... }  /* Admin dark mode */
```

**ALWAYS use theme variables, NEVER hardcode colors:**

```tsx
// ❌ WRONG
<div className="bg-blue-500 text-white">

// ✅ CORRECT
<div className="bg-primary text-primary-foreground">
```

---

## CSS Variables (from index.css)

**Reference `index.css` for exact values.** Key variables:

### Colors

- `--background`, `--foreground`
- `--primary`, `--primary-foreground`
- `--secondary`, `--secondary-foreground`
- `--muted`, `--muted-foreground`
- `--accent`, `--accent-foreground`
- `--destructive`, `--destructive-foreground`
- `--card`, `--card-foreground`
- `--popover`, `--popover-foreground`
- `--border`, `--input`, `--ring`

### Typography

- `--font-sans` - Body text
- `--font-serif` - Serif text
- `--font-mono` - Code
- `--font-Minecraftia` - Pixel art headlines (user side only)

### Spacing & Radius

- `--radius` - Base border radius
- `--spacing` - Base spacing unit
- Use `rounded-base` utility for `border-radius: var(--radius)`

### Shadows

- `--shadow-2xs` through `--shadow-2xl`
- User theme has minimal shadows (pixel art aesthetic)
- Admin theme has soft glow shadows

---

## Design Contexts

### User Side (Pixel Art)

- **Aesthetic:** Playful, colorful, game-like
- **Font:** `font-Minecraftia` for headlines, regular sans for body
- **Classes:** `.hero`, `.pixel-text-outline`
- **Shadows:** Minimal or none
- **Radius:** Smaller (`0.375rem`)

### Admin Side (Professional)

- **Aesthetic:** Clean, functional, professional
- **Font:** Montserrat (via `--font-sans`)
- **Shadows:** Soft glows
- **Radius:** Larger (`0.77rem`)

---

## Component Patterns

### Tab Navigation with layoutId Animation

**This is the REQUIRED pattern for animated tabs:**

```tsx
const LAYOUT_SPRING = {
   type: 'spring' as const,
   stiffness: 400,
   damping: 30,
}

// Structure: wrapper > motion.div (background) + button
<div className="flex bg-primary/15 border border-primary/15 rounded-base p-1">
   {tabs.map((tab) => (
      <div key={tab.id} className="relative">
         {isActive && (
            <motion.div
               layoutId="activeTab"
               className="absolute inset-0 bg-card rounded-base shadow-sm border border-border/90"
               initial={false}
               transition={LAYOUT_SPRING}
            />
         )}
         <button className="relative z-10 flex items-center gap-2 px-4 py-2">
            <Icon className={isActive ? 'text-primary' : 'text-muted-foreground'} />
            <span>{label}</span>
         </button>
      </div>
   ))}
</div>
```

**Rules:**

1. `motion.div` must be **sibling** to button, NOT child
2. Button must have `relative z-10` to stay above background
3. Use `initial={false}` to prevent initial animation
4. Spring config: `stiffness: 400, damping: 30`

---

### Buttons

Reference `src/components/ui/button.tsx` for variants:

| Variant       | Usage                       |
| ------------- | --------------------------- |
| `default`     | Primary actions             |
| `special`     | CTA buttons (gradient)      |
| `ghost`       | Tab buttons, subtle actions |
| `outline`     | Secondary actions           |
| `secondary`   | Alternative actions         |
| `destructive` | Delete, dangerous           |
| `link`        | Text links                  |

```tsx
<Button variant="special" size="lg">
   Get Started
</Button>
```

---

### Cards

Reference `src/components/ui/card.tsx`.

```tsx
<Card className="hover:border-primary/50 transition-all">
   <CardHeader>
      <CardTitle>Title</CardTitle>
      <CardDescription>Description</CardDescription>
   </CardHeader>
   <CardContent>Content</CardContent>
</Card>
```

---

### Navigation Bars

```tsx
<nav className="sticky top-0 border-b border-border bg-background/80 backdrop-blur-lg">
   <div className="container mx-auto px-6">
      <div className="flex h-16 items-center justify-between">
         {/* Logo */}
         <span className="font-Minecraftia text-xl font-bold">PixelMeet</span>

         {/* Actions */}
         <div className="flex items-center gap-4">
            <Button variant="special">Create</Button>
         </div>
      </div>
   </div>
</nav>
```

---

## Animation Standards

### Spring Configuration

```typescript
const LAYOUT_SPRING = {
   type: 'spring' as const,
   stiffness: 400,
   damping: 30,
}
```

### Common Patterns

```tsx
// Entrance animation
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.3 }}

// Hover effects
whileHover={{ scale: 1.02 }}  // Cards
whileHover={{ y: -2 }}        // Links
whileTap={{ scale: 0.95 }}    // Buttons
```

---

## Icons

**Library:** Lucide React

```tsx
import { Plus, Home, Settings } from 'lucide-react'

// Standard size
<Icon className="h-4 w-4" />

// Large size
<Icon className="h-5 w-5" />

// Active state
<Icon className={isActive ? 'text-primary' : 'text-muted-foreground'} />
```

---

## Spacing

Use Tailwind's spacing scale:

| Gap       | Use Case              |
| --------- | --------------------- |
| `gap-1.5` | Icon + text in button |
| `gap-2`   | Buttons in a group    |
| `gap-4`   | Section items         |
| `gap-6`   | Card internal padding |
| `gap-8`   | Nav items             |

---

## Rules Summary

1. **ALWAYS read `index.css`** before styling
2. **NEVER hardcode colors** - use theme variables
3. **Tab animations:** motion.div as sibling, button has z-10
4. **Spring config:** stiffness 400, damping 30
5. **User side:** Use `font-Minecraftia` for headlines
6. **Admin side:** Use default sans font
7. **Buttons:** Use variants from button.tsx
8. **Cards:** Add `hover:border-primary/50` for interaction
