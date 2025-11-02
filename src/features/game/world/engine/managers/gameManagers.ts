export class GameManager {
   static instance: GameManager

   getInstance() {
      if (!GameManager.instance) {
         GameManager.instance = new GameManager()
      }
      return GameManager.instance
   }
}

// Multi-room navigation → Scene Manager needed
// Real-time player sync → Network Manager needed
// Persistent player state → Player Manager needed
// UI overlays (chat, menus) → UI Manager needed
// Cross-scene data → Global state management needed
