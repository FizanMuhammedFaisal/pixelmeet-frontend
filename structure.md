pixel-meet/
├── client/ # React frontend
│ ├── public/
│ │ ├── assets/
│ │ │ ├── sprites/ # Character sprites, animations
│ │ │ ├── tiles/ # Map tiles, environment assets
│ │ │ ├── ui/ # UI icons, buttons
│ │ │ └── audio/ # Sound effects, background music
│ │ └── index.html
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ │ ├── common/ # Shared components
│ │ │ │ ├── Button/
│ │ │ │ ├── Modal/
│ │ │ │ ├── Input/
│ │ │ │ └── Loader/
│ │ │ ├── game/ # Game-specific components
│ │ │ │ ├── Canvas/ # Main game canvas
│ │ │ │ ├── Player/ # Player avatar component
│ │ │ │ ├── Chat/ # Chat system
│ │ │ │ ├── VideoCall/ # Video/audio components
│ │ │ │ ├── Minimap/ # Map overview
│ │ │ │ └── InteractionZones/ # Meeting rooms, areas
│ │ │ └── layout/ # Layout components
│ │ │ ├── Header/
│ │ │ ├── Sidebar/
│ │ │ └── Footer/
│ │ ├── pages/ # Main application pages
│ │ │ ├── Home/ # Landing page
│ │ │ ├── Login/ # Authentication
│ │ │ ├── Register/
│ │ │ ├── Game/ # Main game interface
│ │ │ ├── Profile/ # User profile
│ │ │ └── Settings/ # User settings
│ │ ├── admin/ # Admin panel (separate routing)
│ │ │ ├── components/
│ │ │ │ ├── Dashboard/
│ │ │ │ ├── UserManagement/
│ │ │ │ ├── RoomManagement/
│ │ │ │ ├── Analytics/
│ │ │ │ └── Settings/
│ │ │ ├── pages/
│ │ │ │ ├── AdminDashboard/
│ │ │ │ ├── Users/
│ │ │ │ ├── Rooms/
│ │ │ │ └── Reports/
│ │ │ └── hooks/ # Admin-specific hooks
│ │ ├── hooks/ # Custom React hooks
│ │ │ ├── useAuth.js # Authentication logic
│ │ │ ├── useSocket.js # WebSocket connection
│ │ │ ├── useGame.js # Game state management
│ │ │ ├── useMovement.js # Player movement
│ │ │ ├── useChat.js # Chat functionality
│ │ │ └── useWebRTC.js # Video/audio calls
│ │ ├── services/ # API and external services
│ │ │ ├── api/
│ │ │ │ ├── auth.js
│ │ │ │ ├── users.js
│ │ │ │ ├── rooms.js
│ │ │ │ └── admin.js
│ │ │ ├── socket.js # Socket.io client setup
│ │ │ ├── webrtc.js # WebRTC implementation
│ │ │ └── storage.js # Local storage utilities
│ │ ├── store/ # State management (Redux/Zustand)
│ │ │ ├── slices/ # Redux slices or Zustand stores
│ │ │ │ ├── authSlice.js
│ │ │ │ ├── gameSlice.js
│ │ │ │ ├── chatSlice.js
│ │ │ │ └── adminSlice.js
│ │ │ └── index.js # Store configuration
│ │ ├── utils/ # Utility functions
│ │ │ ├── constants.js # App constants
│ │ │ ├── helpers.js # Generic helper functions
│ │ │ ├── validation.js # Form validation
│ │ │ ├── gameUtils.js # Game-specific utilities
│ │ │ └── formatters.js # Data formatters
│ │ ├── styles/ # Global styles
│ │ │ ├── globals.css
│ │ │ ├── variables.css # CSS custom properties
│ │ │ └── components/ # Component-specific styles
│ │ ├── contexts/ # React contexts
│ │ │ ├── AuthContext.js
│ │ │ ├── GameContext.js
│ │ │ └── SocketContext.js
│ │ ├── game/ # Game engine logic
│ │ │ ├── engine/
│ │ │ │ ├── GameEngine.js # Main game loop
│ │ │ │ ├── Renderer.js # Canvas rendering
│ │ │ │ ├── InputManager.js # Keyboard/mouse input
│ │ │ │ └── CollisionDetection.js
│ │ │ ├── entities/
│ │ │ │ ├── Player.js
│ │ │ │ ├── NPC.js
│ │ │ │ └── InteractionZone.js
│ │ │ ├── systems/
│ │ │ │ ├── MovementSystem.js
│ │ │ │ ├── RenderSystem.js
│ │ │ │ └── InteractionSystem.js
│ │ │ └── maps/
│ │ │ ├── MapLoader.js
│ │ │ └── mapData/ # JSON map configurations
│ │ ├── App.js
│ │ ├── index.js
│ │ └── routes.js # Route configuration
│ ├── package.json
│ └── tailwind.config.js # If using Tailwind CSS
├── server/ # Backend (Node.js/Express)
│ ├── src/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── middleware/
│ │ ├── services/
│ │ └── utils/
│ └── package.json
├── shared/ # Shared utilities between client/server
│ ├── constants/
│ ├── types/ # TypeScript types (if using TS)
│ └── utils/
└── docs/ # Project documentation
├── API.md
├── SETUP.md
└── ARCHITECTURE.md
