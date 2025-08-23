import { useState } from 'react'
import Intro from './Intro'
import NewMap from './NewMap'
import BrowseMaps from './BrowseMaps'
import { useNavigate } from 'react-router'

export default function MapSelector() {
   const [view, setView] = useState<string>('intro')
   const navigate = useNavigate()
   const handleStartBuilding = (id: string) => {
      navigate(`/dashboard/map-editor/${id}`)
   }
   if (view === 'create') {
      return (
         <NewMap setView={setView} key={'make new map'} handleStartBuilding={handleStartBuilding} />
      )
   }

   if (view !== 'maps') {
      return <Intro setView={setView} key={'Intro page'} />
   }

   return <BrowseMaps setView={setView} handleStartBuilding={handleStartBuilding} />
}
