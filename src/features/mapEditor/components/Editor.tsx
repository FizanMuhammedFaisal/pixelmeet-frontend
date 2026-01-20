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
import { useGetMap } from '@/shared/hooks/maps/useGetMap'
import type { MapWithManifest } from '@/shared/types'
import MapSelector from './mapSelector/MapSelector'
import { Spinner } from '@/components/ui/spinner'
import { ErrorState } from '@/components/ui/error-state'
import { useNavigate } from 'react-router'
gsap.registerPlugin(PixiPlugin)

PixiPlugin.registerPIXI(PIXI)

export default function Editor() {
   const { mapId } = useParams()

   const handleThemeChange = (theme: ThemeType) => {
      //signal the system
      emitter.emit('switchTheme', { theme })
   }

   const { data, isLoading, error, refetch } = useGetMap({ id: mapId, populate: 'manifest' })
   const navigate = useNavigate()

   console.log(data)
   if (isLoading) {
      return (
         <div className="h-[calc(100vh-64px)] w-full flex items-center justify-center bg-background z-50">
            <Spinner />
         </div>
      )
   }
   if (error) {
      console.log(error)
      return (
         <div className="flex flex-col h-full w-full items-center justify-center gap-4">
            <ErrorState
               title="Failed to load map"
               description={error?.message || 'Unable to fetch the map data. Please try again.'}
               onRetry={() => refetch()}
            />
            <div className="flex gap-2">
               <button
                  onClick={() => navigate('/dashboard/maps')}
                  className="text-sm text-muted-foreground hover:text-foreground underline"
               >
                  Go back to maps
               </button>
            </div>
         </div>
      )
   }
   const map = data?.data.data.map as unknown as MapWithManifest
   return (
      <div className="flex flex-col flex-1 grow">
         {map === undefined ? (
            <MapSelector />
         ) : (
            <div>
               <Toaster richColors={true} />
               <TopBar className="absolute top-0  text-xs" setTheme={handleThemeChange} />

               <div className="flex justify-between w-full">
                  <PixiEditor map={map} className="absolute inset-0" />
                  <SideBar className="absolute top-0 right-0 h-full shadow-lg" />
                  <CoordinatesDisplay />
               </div>
               <ToolControls />
            </div>
         )}
      </div>
   )
}
