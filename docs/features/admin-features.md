# Admin Features Documentation

> **Last Updated:** January 16, 2026

## Overview

The admin dashboard provides management tools for the PixelMeet platform including maps, assets, users, and settings.

---

## Pages

```
pages/admin/
├── Dashboard.tsx      # Main admin overview
├── Home.tsx          # Home/welcome
├── Login.tsx         # Admin authentication
├── MapEditor.tsx     # Map creation entry
├── Settings.tsx      # Admin settings
├── User.tsx          # User management
├── Avatar.tsx        # Avatar management
├── assets/           # Asset management (4 files)
└── maps/             # Map management (3 files)
```

---

## Feature Modules

### Dashboard Sections

Located in `features/dashboard/sections/` with **60 section components**:

| Section Category   | Purpose                   |
| ------------------ | ------------------------- |
| Analytics          | Platform statistics       |
| User Management    | CRUD for users            |
| Content Management | Maps, assets, experiences |
| Settings           | Platform configuration    |

### Key Components

```
features/dashboard/
├── components/       # Shared dashboard components
├── sections/         # 60 section modules
└── index.ts
```

---

## State Management

```
app/store/admin/      # Admin-specific Zustand stores (2 files)
```

---

## Asset Management

The `pages/admin/assets/` directory handles:

- Asset upload
- Asset library browsing
- Asset categorization
- Tileset management

---

## Map Management

The `pages/admin/maps/` directory provides:

- Map listing
- Map creation
- Map editing (links to Map Editor)

---

## Routing

Admin routes are protected by auth guards:

```
app/guards/           # 4 route guard files
```

---

## Improvements

### Recommendations

1. Add role-based access control (RBAC)
2. Implement audit logging
3. Add bulk operations for assets/users
4. Dashboard analytics with charts
