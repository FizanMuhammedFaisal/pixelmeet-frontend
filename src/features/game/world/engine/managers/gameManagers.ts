export class GameManager {
   static instance: GameManager

   getInstance() {
      if (!GameManager.instance) {
         GameManager.instance = new GameManager()
      }
      return GameManager.instance
   }
}
