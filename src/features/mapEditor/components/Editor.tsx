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
import CoordinatesDisplay from './toolbars/CoordinatesDisplay'
import { useParams } from 'react-router'
gsap.registerPlugin(PixiPlugin)

PixiPlugin.registerPIXI(PIXI)

export default function Editor() {
   const { mapId } = useParams()

   const handleThemeChange = (theme: ThemeType) => {
      //signal the system
      emitter.emit('switchTheme', { theme })
   }

   //hook to fetch map and pass it to pixi and pixi will recreate it fullly using hte. logic a load logic
   // and then after that  when saving chek if ther i alrady amp id then update the json and update  teh back end i guess
   // if not then add the json and then make a new map with given details collect anydetils from users if needed

   return (
      <div className="flex flex-col flex-1 grow">
         <Toaster richColors={true} />
         <TopBar className="absolute top-0  text-xs" setTheme={handleThemeChange} />

         <div className="flex justify-between w-full">
            <PixiEditor className="absolute inset-0" />
            <SideBar className="absolute top-0 right-0 h-full shadow-lg" />
            <CoordinatesDisplay />
         </div>
         <ToolControls />
      </div>
   )
}
