import { InputComponent } from './inputComponent'

// ABOUT:
//provide api's that implements the clean structre of input component
// this is going to get you scene owned input poller

//TODO if you know more about this update the about

export class KeyboardComponent extends InputComponent {
   private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys
   private keyW: Phaser.Input.Keyboard.Key
   private keyS: Phaser.Input.Keyboard.Key
   private keyA: Phaser.Input.Keyboard.Key
   private keyD: Phaser.Input.Keyboard.Key
   private keyboardEscapeKey: Phaser.Input.Keyboard.Key

   // keyboardPlugin
   // The Keyboard Plugin is an input plugin that belongs to the Scene-owned Input system.
   // Its role is to listen for native DOM Keyboard Events and then process them.
   // You do not need to create this class directly, the Input system will create an instance of it automatically.
   // You can access it from within a Scene using this.input.keyboard. For example, you can do:
   // ```js
   // this.input.keyboard.on('keydown', callback, context);
   // ```
   constructor(keyboardPlugin: Phaser.Input.Keyboard.KeyboardPlugin) {
      super()
      this.cursorKeys = keyboardPlugin.createCursorKeys()

      // Add WASD keys
      this.keyW = keyboardPlugin.addKey(Phaser.Input.Keyboard.KeyCodes.W)
      this.keyS = keyboardPlugin.addKey(Phaser.Input.Keyboard.KeyCodes.S)
      this.keyA = keyboardPlugin.addKey(Phaser.Input.Keyboard.KeyCodes.A)
      this.keyD = keyboardPlugin.addKey(Phaser.Input.Keyboard.KeyCodes.D)
      this.keyboardEscapeKey = keyboardPlugin.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
   }

   get isUpDown(): boolean {
      return this.cursorKeys.up.isDown || this.keyW.isDown
   }

   get isDownDown(): boolean {
      return this.cursorKeys.down.isDown || this.keyS.isDown
   }

   get isLeftDown(): boolean {
      return this.cursorKeys.left.isDown || this.keyA.isDown
   }

   get isRightDown(): boolean {
      return this.cursorKeys.right.isDown || this.keyD.isDown
   }

   get isEscapeKeyJustDown(): boolean {
      return Phaser.Input.Keyboard.JustDown(this.keyboardEscapeKey)
   }
}
