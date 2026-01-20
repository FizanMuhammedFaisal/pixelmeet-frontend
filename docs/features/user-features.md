# User Features Documentation

> **Last Updated:** January 16, 2026

## Overview

The user-facing application allows users to explore virtual spaces, join experiences, and interact with others in real-time 2D worlds.

---

## Pages

```
pages/user/
├── Home.tsx        # User dashboard/home
├── Spaces.tsx      # Browse available spaces
├── World.tsx       # Game world entry point
├── Testing.tsx     # Development testing
└── auth/           # Authentication pages (3 files)
    ├── Login.tsx
    ├── Register.tsx
    └── ...
```

---

## Features

### Spaces

Browse and join available virtual spaces:

```
features/space/      # 10 files
```

### Authentication

Full auth flow with Google OAuth:

```
features/auth/       # 23 files
├── schema/         # Validation schemas
├── components/     # Auth UI components
└── services/       # Auth API services
```

**Auth Store** (`app/store/auth.store.ts`):

| State             | Type        |
| ----------------- | ----------- |
| `user`            | User object |
| `token`           | JWT string  |
| `isAuthenticated` | boolean     |
| `isInitialized`   | boolean     |

---

## Shared Hooks

```
shared/hooks/
├── useMobile.ts         # Mobile detection
├── useAppTheme.tsx      # Theme switching
├── useAuthInit.tsx      # Auth initialization
├── useOfflineStatus.tsx # Network detection
├── maps/                # Map-related hooks (5)
└── upload/              # Upload hooks (4)
```

---

## Layouts

```
shared/layout/           # 14 layout components
├── Dashboard/
│   ├── Dashboard.tsx
│   └── CMD.tsx         # Command palette
└── ...
```

---

## Improvements

### User Experience

1. Add onboarding flow for new users
2. Implement push notifications
3. Add user profile customization
4. Social features (friends, chat)

### Current Capabilities

- Google OAuth login
- Space browsing
- Real-time world exploration
- Theme switching (light/dark)
- Offline detection
