# Map Editor Documentation

> **Last Updated:** January 16, 2026

## Overview

The Map Editor is a PixiJS-based visual tool for creating and editing 2D tile maps. It provides a canvas-based interface with viewport controls for panning, zooming, and tile manipulation.

---

## Architecture

```
features/mapEditor/
├── components/
│   ├── Editor/
│   │   ├── App.ts          # Core PixiJS application
│   │   └── ...
│   ├── Editor.tsx          # React wrapper
│   ├── PixiEditor.tsx      # PixiJS integration
│   ├── mapSelector/        # Map selection UI (5 files)
│   └── toolbars/           # Editor toolbars (12 files)
├── helpers/
├── hooks/
├── types/
│   ├── types.ts
│   └── config.ts           # WORLD_WIDTH, WORLD_HEIGHT
└── utils/
```

---

## Core Components

### App.ts - PixiJS Application

The `App` class is the core engine that initializes PixiJS with viewport controls:

| Feature         | Implementation                       |
| --------------- | ------------------------------------ |
| **Drag**        | Click and drag to pan                |
| **Pinch**       | Touch pinch to zoom (1% sensitivity) |
| **Wheel**       | Mouse wheel zoom                     |
| **Decelerate**  | Momentum scrolling                   |
| **Zoom Limits** | `minScale: 0.45`, `maxScale: 16`     |

**Theme Support:**

- Reads CSS variables: `--editor-select-dark`, `--editor-select-light`
- Dynamic background color based on theme mode

### Key Configuration

```typescript
// types/config.ts
WORLD_WIDTH // World canvas width
WORLD_HEIGHT // World canvas height
```

---

## Toolbars

12 toolbar components provide editing functionality:

| Toolbar       | Purpose                   |
| ------------- | ------------------------- |
| Tile Selector | Select tiles from tileset |
| Layer Panel   | Manage map layers         |
| Zoom Controls | Zoom in/out/reset         |
| Save/Export   | Save map data             |
| Undo/Redo     | Action history            |
| Grid Toggle   | Show/hide grid overlay    |

---

## State Management

- **Zustand Store**: `app/store/mapEditor/` (2 files)
- **IndexedDB**: Uses `idb-keyval` for local storage

---

## Integration

### React Integration

```tsx
// PixiEditor.tsx - Mounts PixiJS app
// Editor.tsx - Full editor with toolbars
```

### Theme Integration

Uses CSS custom properties from global theme:

```css
--editor-select-dark: #aed7f8;
--editor-select-light: #184769;
```

---

## Known Issues & Improvements

### Issues

1. **No cleanup on unmount** - The resize event listener in `App.ts` is never removed, causing potential memory leaks.

### Suggested Improvements

1. Add cleanup in `App.ts` for event listeners
2. Implement error boundaries for PixiJS failures
3. Add loading states and progress indicators
4. Consider WebGL context loss handling
