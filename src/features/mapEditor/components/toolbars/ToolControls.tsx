import { motion } from 'motion/react'
import {
   Lock,
   MousePointer2,
   Hand,
   ZoomIn,
   ZoomOut,
   EraserIcon,
   SquareDashed,
   PaintBucket,
} from 'lucide-react'
import { useRef, useState } from 'react'
import { useEditorActions, useMapEditorStore } from '@/app/store/mapEditor/mapEditor'
import type { ControlTools } from '../../types/types'

const tools = [
   { id: 'lock', icon: Lock, label: 'Lock' },
   { id: 'select', icon: MousePointer2, label: 'Select' },
   { id: 'hand', icon: Hand, label: 'Hand' },
   { id: 'fill', icon: SquareDashed, label: 'Fill' },
   { id: 'buckerfill', icon: PaintBucket, label: 'Bucket Fill' },
   // { id: 'rectanglefill', icon: Grid2X2, label: 'Rectangle Fill' },
   { id: 'eraser', icon: EraserIcon, label: 'Eraser' },
   { id: 'zoomin', icon: ZoomIn, label: 'Zoom In' },
   { id: 'zoomout', icon: ZoomOut, label: 'Zoom Out' },
]

function ToolControls() {
   const activeTool = useMapEditorStore((s) => s.selectedTool)
   const { setTool } = useEditorActions()
   const [hoveredTool, setHoveredTool] = useState<string | null>(null)
   const hoverTimeRef = useRef<NodeJS.Timeout | null>(null)

   const handleToolHover = (id: string) => {
      if (hoverTimeRef.current) {
         clearTimeout(hoverTimeRef.current)
      }
      const timeoutDuration = hoveredTool ? 50 : 1000
      const newTimeout = setTimeout(() => {
         setHoveredTool(id)
      }, timeoutDuration)
      hoverTimeRef.current = newTimeout
   }

   const hanldeToolChange = (tool: ControlTools) => {
      setTool(tool)
   }

   return (
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
         <motion.div
            initial={{ y: 100, opacity: 0, filter: 'blur(10px)', scale: 0.9 }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)', scale: 1 }}
            transition={{
               duration: 1,
               delay: 1,
               ease: [0.175, 0.885, 0.32, 1.275],
               staggerChildren: 0.05,
            }}
            className="flex items-center gap-2.5 px-2 py-2 bg-card/35 backdrop-blur-sm border border-border shadow-lg shadow-black/5 dark:shadow-black/20"
            style={{
               borderRadius: 'calc(var(--radius) - 4px)',
            }}
            onHoverEnd={() => {
               setHoveredTool(null)
               if (hoverTimeRef.current) {
                  clearTimeout(hoverTimeRef.current)
               }
               hoverTimeRef.current = null
            }}
         >
            {tools.map((tool, index) => {
               const Icon = tool.icon
               const isActive = activeTool === tool.id
               const isHovered = hoveredTool === tool.id

               return (
                  <div key={tool.id} className="relative">
                     <motion.button
                        onHoverStart={() => handleToolHover(tool.id)}
                        onClick={() => hanldeToolChange(tool.id as ControlTools)}
                        className={`
                  relative flex items-center justify-center w-9 h-9
                  transition-colors duration-200 ease-out
                  ${
                     isActive
                        ? 'text-accent-foreground shadow-lg'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10'
                  } `}
                        style={{ borderRadius: 'var(--radius)' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                           type: 'spring',
                           stiffness: 400,
                           damping: 25,
                        }}
                     >
                        <motion.div
                           initial={{ rotate: 0 }}
                           animate={{
                              y: !isActive && isHovered ? [0, -3, 0] : 0,
                           }}
                           transition={{
                              duration: 0.8,
                              ease: 'easeInOut',
                              repeat: !isActive && isHovered ? Infinity : 0,
                           }}
                        >
                           <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                        </motion.div>

                        {isActive && (
                           <motion.div
                              layoutId="activeIndicator"
                              className="absolute inset-0 bg-primary/40 dark:bg-primary/40 border border-primary/10 shadow-lg shadow-primary/25"
                              style={{ borderRadius: 'var(--radius)' }}
                              initial={false}
                              transition={{
                                 duration: 0.3,
                                 ease: [0.215, 0.61, 0.355, 1],
                              }}
                           />
                        )}

                        {isHovered && !isActive && (
                           <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="absolute inset-0 bg-primary/10 "
                              style={{ borderRadius: 'var(--radius)' }}
                              transition={{ duration: 0.15 }}
                           />
                        )}
                     </motion.button>

                     {isHovered && (
                        <motion.div
                           initial={{ opacity: 0, y: 10, scale: 0.8 }}
                           animate={{ opacity: 1, y: 0, scale: 1 }}
                           exit={{ opacity: 0, y: 10, scale: 0.8 }}
                           className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 backdrop-blur-md bg-popover/80 border border-border shadow-md z-50"
                           style={{ borderRadius: 'var(--radius)' }}
                           transition={{ duration: 0.15, ease: [0.78, 0.41, 0.46, 1.17] }}
                        >
                           <span className="text-xs font-medium text-popover-foreground whitespace-nowrap">
                              {tool.label}
                           </span>
                           <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-popover border-r border-b border-border rotate-45" />
                        </motion.div>
                     )}

                     {(index === 0 || index === 5) && (
                        <motion.div
                           initial={{ opacity: 0, scaleY: 0 }}
                           animate={{ opacity: 1, scaleY: 1 }}
                           transition={{ delay: index * 0.05 + 0.2 }}
                           className="absolute -right-0.5  top-1/2 -translate-y-1/2 w-px h-6 bg-border"
                        />
                     )}
                  </div>
               )
            })}
         </motion.div>
      </div>
   )
}

export default ToolControls
