import type { LucideIcon } from 'lucide-react'
import { HandDrawnArrow } from './hand-drawn-arrow'
import { cn } from '@/shared/lib/utils'

interface EmptyStateProps {
   icon: LucideIcon
   title: string
   description: string
   action?: React.ReactNode
   showArrow?: boolean
   arrowOptions?: {
      delay?: number
      duration?: number
      text?: string
      color?: string
      direction?: 'up-right' | 'up-left' | 'down-right' | 'down-left'
      style?: 'simple' | 'swirly' | 'bouncy'
   }
   className?: string
}

export function EmptyState({
   icon: Icon,
   title,
   description,
   action,
   showArrow = false,
   arrowOptions = {},
   className,
}: EmptyStateProps) {
   const { text: arrowText, delay, duration, color, direction, style } = arrowOptions

   return (
      <div
         className={cn(
            'flex flex-col items-center justify-center py-16 text-center grow m-4 relative',
            className,
         )}
      >
         <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 ring-8 ring-primary/5">
            <Icon className="w-10 h-10 text-primary" />
         </div>
         <h3 className="text-2xl font-bold bg-linear-to-br from-foreground to-muted-foreground bg-clip-text text-transparent mb-2">
            {title}
         </h3>
         <p className="text-muted-foreground max-w-sm mb-12 leading-relaxed">{description}</p>

         {action && <div className="mt-4">{action}</div>}

         {showArrow && (
            <HandDrawnArrow
               className="hidden md:block absolute -top-10 right-[15%] w-40 h-40 -rotate-12 transform translate-x-8"
               delay={delay || 0.3}
               text={arrowText}
               duration={duration}
               color={color}
               direction={direction}
               style={style}
            />
         )}

         {/* Mobile fallback if arrow is shown but hidden on mobile */}
         {showArrow && (
            <div className="md:hidden text-sm text-muted-foreground italic mt-8">
               Tap the button above to create one
            </div>
         )}
      </div>
   )
}
