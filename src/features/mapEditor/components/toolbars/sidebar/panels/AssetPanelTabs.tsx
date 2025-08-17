import { useState } from 'react'
import { motion } from 'framer-motion'
import ObjectPanel from './ObjectPanel'
import AudioPanel from './AudioPanel'
import TilesPanel from './TilesPanle/TilesPanel'

function AssetPanel() {
   const [activeTab, setActiveTab] = useState('tilesets')

   const tabs = [
      { id: 'tilesets', label: 'Tilesets' },
      { id: 'objects', label: 'Objects' },
      { id: 'audio', label: 'Audio' },
   ]

   const renderActiveContent = () => {
      switch (activeTab) {
         case 'tilesets':
            return <TilesPanel />
         case 'objects':
            return <ObjectPanel />
         case 'audio':
            return <AudioPanel />
         default:
            return <TilesPanel />
      }
   }

   return (
      <div className="h-full flex flex-col bg-muted/30">
         <div className="relative flex p-1 bg-muted/50 border-b border-border/50">
            {tabs.map((tab, index) => (
               <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
              relative flex-1 px-4 py-2 mx-0.5 text-sm font-medium rounded-md
              transition-all duration-200 ease-out
              hover:scale-[1.02] active:scale-[0.98]
              ${activeTab === tab.id ? 'text-foreground z-10' : 'text-muted-foreground hover:text-foreground'}
            `}
               >
                  {activeTab === tab.id && (
                     <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary/10 border border-border/50 rounded-md shadow-sm"
                        initial={false}
                        transition={{
                           type: 'spring',
                           stiffness: 500,
                           damping: 45,
                        }}
                     />
                  )}
                  <span className="relative z-20">{tab.label}</span>
               </button>
            ))}
         </div>

         <div className="flex-1 min-h-0 p-3">
            <div className="h-full bg-background border border-border/50 rounded-lg shadow-md overflow-hidden">
               <div className="h-full">{renderActiveContent()}</div>
            </div>
         </div>
      </div>
   )
}

export default AssetPanel
