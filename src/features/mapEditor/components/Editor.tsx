/* will return pixi editor
 , all the tool bars and other things on the editor 
 ,mange the global state of hte eidotr and hadle the event emmiter*/

import PixiEditor from './PixiEditor'
import SideBar from './toolbars/sidebar/SideBar'
import TopBar from './toolbars/TopBar'
import type { ThemeType } from '../types/types'
import emitter from '../utils/EventEmitter'
import * as PIXI from 'pixi.js'
import gsap from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'
import ToolControls from './toolbars/ToolControls'
import { Toaster } from 'sonner'
gsap.registerPlugin(PixiPlugin)

PixiPlugin.registerPIXI(PIXI)

export default function Editor() {
   const handleThemeChange = (theme: ThemeType) => {
      //signal the system
      emitter.emit('switchTheme', { theme })
   }

   return (
      <div className="flex flex-col flex-1 grow">
         <Toaster richColors={true} />
         <TopBar className="absolute top-0  text-xs" setTheme={handleThemeChange} />

         <div className="flex justify-between w-full">
            <PixiEditor className="absolute inset-0" />
            <SideBar className="absolute top-0 right-0 h-full shadow-lg" />
         </div>
         <ToolControls />
      </div>
   )
}
