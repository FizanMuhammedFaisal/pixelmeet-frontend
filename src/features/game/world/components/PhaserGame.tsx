import { useLayoutEffect, useRef } from 'react'
import * as Phaser from 'phaser'
import StartGame from './main'
const GameCanvasName = 'game-container'
function PhaserGame() {
   const game = useRef<Phaser.Game | null>(null)

   useLayoutEffect(() => {
      if (game.current === null) {
         game.current = StartGame(GameCanvasName)
      }

      return () => {
         if (game.current) {
            game.current.destroy(true)
            if (game.current !== null) {
               game.current = null
            }
         }
      }
   }, [])

   return <div id={GameCanvasName} className="w-full h-full relative"></div>
}

export default PhaserGame
// this is part where phaser is given acces to dom and react kind of ends
