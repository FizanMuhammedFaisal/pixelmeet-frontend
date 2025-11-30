// ABOUT:
// with this we can centralize all the common things for components
// and also we can do registration of a component to a entity, removal ,retreval

import type { GameObject } from '../common/type'

export class BaseGameObjectComponent {
   protected scene: Phaser.Scene
   protected gameObject: GameObject
   constructor(gameObject: GameObject) {
      this.scene = gameObject.scene
      this.gameObject = gameObject
      this.assignComponentToGameObject(gameObject)
   }
   protected assignComponentToGameObject(gameObject: GameObject): void {
      gameObject[`_${this.constructor.name}`] = this
   }
   static getComponent<T>(gameObject: GameObject): T {
      return gameObject[`_${this.name}`] as T
   }
   //removing the setted value
   static remoteComponent(gameObject: GameObject): void {
      delete gameObject[`_${this.name}`]
   }
}
