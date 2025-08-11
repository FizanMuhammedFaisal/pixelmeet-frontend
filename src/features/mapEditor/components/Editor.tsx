/* will return pixi editor
 , all the tool bars and other things on the editor 
 ,mange the global state of hte eidotr and hadle the event emmiter*/

import { useState } from 'react'
import PixiEditor from './PixiEditor'
import SideBar from './toolbars/SideBar'
import TopBar from './toolbars/TopBar'
import type { Layer } from '../types/types'

export default function Editor() {
   const [layers, setLayers] = useState<Layer[]>([
      { id: '1', name: 'Background', visible: true, locked: false },
      { id: '2', name: 'Objects', visible: true, locked: false },
      { id: '3', name: 'UI Elements', visible: true, locked: true },
      { id: '4', name: 'Effects', visible: false, locked: false },
   ])

   return (
      <div className="flex flex-col flex-1 grow">
         <div>
            <TopBar />
         </div>
         <div className="flex justify-between w-full">
            <PixiEditor className="absolute inset-0" />
            <SideBar layers={layers} className="absolute top-0 right-0 h-full shadow-lg" />
         </div>
      </div>
   )
}
