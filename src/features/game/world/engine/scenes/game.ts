import { Scene } from 'phaser'

export class Game extends Scene {
   constructor() {
      super('Game')
   }

   preload() {}

   create() {
      const { width, height } = this.cameras.main

      // Add background color
      this.cameras.main.setBackgroundColor('#2c3e50')

      // Display loaded sprites (adjust keys based on your asset pack)
      const sprite1 = this.add.sprite(width * 0.25, height * 0.2, 'your-sprite-key')
      const sprite2 = this.add.sprite(width * 0.75, height * 0.5, 'another-sprite-key')

      // Scale sprites if needed
      sprite1.setScale(3)
      sprite2.setScale(2)

      // Add some text
      this.add
         .text(width / 2, 100, 'Asset Pack Loaded!', {
            fontSize: '42px',
            color: '#ffffff',
         })
         .setOrigin(0.5)

      // List all loaded textures (for debugging)
      // this.listLoadedAssets()

      // Add click interaction
      this.input.on('pointerdown', () => {
         sprite1.setTint(Math.random() * 0xffffff)
         sprite2.setTint(Math.random() * 0xffffff)
      })

      // Add simple animation
      this.tweens.add({
         targets: [sprite1, sprite2],
         y: height * 0.5 - 50,
         duration: 1000,
         yoyo: true,
         repeat: -1,
         ease: 'Sine.easeInOut',
      })
   }

   // private listLoadedAssets() {
   //    console.log('Loaded textures:')
   //    this.textures.list.forEach((texture, key) => {
   //       if (key !== '__DEFAULT' && key !== '__MISSING') {
   //          console.log(`- ${key}`)
   //       }
   //    })

   //    console.log('Loaded audio:')
   //    this.cache.audio.entries.forEach((entry, key) => {
   //       console.log(`- ${key}`)
   //    })
   // }
}
