src/
├── app/ # App-level configuration
│ ├── providers/
│ │ ├── AppProvider.tsx # Root provider wrapper
│ │ ├── QueryProvider.tsx # React Query setup
│ │ ├── ThemeProvider.tsx # Theme configuration
│ │ └── RouterProvider.tsx # Router setup
│ ├── store/ # GLOBAL Zustand stores only
│ │ ├── index.ts # Combine all stores
│ │ ├── auth.store.ts # Global auth state
│ │ ├── theme.store.ts # Global theme state
│ │ ├── game.store.ts # Global game state (future)
│ │ └── ui.store.ts # Global UI state (modals, toasts)
│ └── routes/ # Route definitions
│ ├── index.tsx
│ ├── auth.routes.tsx
│ ├── admin.routes.tsx
│ └── user.routes.tsx
│
├── shared/ # Shared across ALL features
│ ├── ui/ # Base UI components (buttons, inputs)
│ │ ├── button.tsx
│ │ ├── input.tsx
│ │ ├── card.tsx
│ │ └── index.ts # Barrel export
│ ├── layouts/ # Layout components
│ │ ├── AuthLayout.tsx
│ │ ├── DashboardLayout.tsx
│ │ └── index.ts
│ ├── hooks/ # Cross-feature hooks
│ │ ├── useLocalStorage.ts
│ │ ├── useDebounce.ts
│ │ └── index.ts
│ ├── utils/ # Utility functions
│ │ ├── format.ts
│ │ ├── validation.ts
│ │ └── index.ts
│ ├── types/ # Global TypeScript definitions
│ │ ├── api.types.ts
│ │ ├── common.types.ts
│ │ └── index.ts
│ ├── constants/ # App-wide constants
│ │ ├── routes.ts
│ │ ├── api.ts
│ │ └── index.ts
│ └── lib/ # Third-party configurations
│ ├── axios.ts
│ ├── react-query.ts
│ └── index.ts
│
├── features/ # Feature-based organization
│ ├── auth/ # Authentication feature
│ │ ├── components/ # Feature-specific components
│ │ │ ├── LoginForm/
│ │ │ │ ├── LoginForm.tsx
│ │ │ │ ├── LoginForm.test.tsx
│ │ │ │ ├── LoginForm.types.ts
│ │ │ │ ├── hooks/ # Component-specific hooks
│ │ │ │ │ └── useLoginForm.ts
│ │ │ │ └── index.ts
│ │ │ ├── ResetPassword/
│ │ │ │ ├── ResetPassword.tsx
│ │ │ │ ├── ResetPassword.types.ts
│ │ │ │ ├── components/ # Sub-components (can use shared/ui)
│ │ │ │ │ ├── SendStep.tsx
│ │ │ │ │ ├── VerifyStep.tsx
│ │ │ │ │ ├── PasswordStep.tsx
│ │ │ │ │ ├── SuccessStep.tsx
│ │ │ │ │ └── index.ts
│ │ │ │ ├── hooks/
│ │ │ │ │ └── useResetPassword.ts
│ │ │ │ └── index.ts
│ │ │ ├── SignupForm/
│ │ │ ├── OTPForm/
│ │ │ └── index.ts # Export all auth components
│ │ ├── hooks/ # Feature-level hooks
│ │ │ ├── useAuth.ts # Uses app/store/auth.store.ts
│ │ │ ├── useLogin.ts
│ │ │ └── index.ts
│ │ ├── services/ # API services for this feature
│ │ │ ├── auth.api.ts
│ │ │ ├── auth.types.ts # API-specific types
│ │ │ └── index.ts
│ │ ├── utils/ # Auth-specific utilities
│ │ │ ├── auth.utils.ts
│ │ │ ├── validation.ts
│ │ │ └── index.ts
│ │ └── index.ts # Feature barrel export
│ │
│ ├── dashboard/ # Dashboard feature
│ │ ├── components/
│ │ │ ├── DashboardStats/
│ │ │ ├── RecentActivity/
│ │ │ └── index.ts
│ │ ├── hooks/
│ │ ├── services/
│ │ └── index.ts
│ │
│ ├── spaces/ # Spaces management
│ │ ├── components/
│ │ │ ├── SpaceCard/
│ │ │ ├── SpaceEditor/
│ │ │ │ ├── SpaceEditor.tsx
│ │ │ │ ├── components/
│ │ │ │ │ ├── ToolPanel.tsx
│ │ │ │ │ ├── Canvas.tsx
│ │ │ │ │ └── PropertiesPanel.tsx
│ │ │ │ └── hooks/
│ │ │ │ └── useSpaceEditor.ts
│ │ │ └── index.ts
│ │ ├── hooks/
│ │ ├── services/
│ │ └── index.ts
│ │
│ ├── game/ # Future Phaser.js integration
│ │ ├── components/
│ │ │ ├── GameCanvas/
│ │ │ ├── GameUI/
│ │ │ │ ├── GameUI.tsx
│ │ │ │ ├── components/
│ │ │ │ │ ├── HUD.tsx
│ │ │ │ │ ├── Inventory.tsx
│ │ │ │ │ └── ChatBox.tsx
│ │ │ │ └── hooks/
│ │ │ └── GameControls/
│ │ ├── engine/ # Phaser game engine (non-React)
│ │ │ ├── GameEngine.ts
│ │ │ ├── config.ts
│ │ │ └── index.ts
│ │ ├── scenes/ # Phaser scenes
│ │ │ ├── MainScene.ts
│ │ │ ├── MenuScene.ts
│ │ │ └── index.ts
│ │ ├── entities/ # Game entities/sprites
│ │ │ ├── Player.ts
│ │ │ ├── NPC.ts
│ │ │ └── index.ts
│ │ ├── systems/ # Game systems
│ │ │ ├── MovementSystem.ts
│ │ │ ├── CollisionSystem.ts
│ │ │ └── index.ts
│ │ ├── hooks/ # Game-related React hooks
│ │ │ ├── useGame.ts # Uses app/store/game.store.ts
│ │ │ └── index.ts
│ │ └── index.ts
│ │
│ └── admin/ # Admin panel feature
│ ├── components/
│ │ ├── UserManagement/
│ │ ├── Analytics/
│ │ └── index.ts
│ ├── hooks/
│ ├── services/
│ └── index.ts
│
├── pages/ # Page components (THIN wrappers)
│ ├── auth/
│ │ ├── LoginPage.tsx # Just imports LoginForm from features/auth
│ │ ├── SignupPage.tsx
│ │ └── ForgotPasswordPage.tsx
│ ├── admin/
│ │ ├── DashboardPage.tsx
│ │ ├── UsersPage.tsx
│ │ └── index.ts
│ ├── user/
│ │ ├── HomePage.tsx
│ │ ├── SpacesPage.tsx
│ │ └── index.ts
│ └── index.ts
│
└── assets/ # Static assets
├── images/
├── fonts/
├── icons/
└── sounds/ # For game audio
