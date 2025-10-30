import type React from 'react'
import { Sparkles, ArrowRight } from 'lucide-react'

interface SuccessStateProps {
   title: string
   description: string
   actionLabel?: string
   onAction?: () => void
   icon?: React.ReactNode
}

export function SuccessState({
   title,
   description,
   actionLabel = 'Continue',
   onAction,
   icon,
}: SuccessStateProps) {
   return (
      <div className="flex-1 flex items-center justify-center p-8">
         <div className="text-center max-w-md">
            <div className="relative mb-8">
               <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto border border-primary/20">
                  {icon || <Sparkles className="h-8 w-8 text-primary" />}
               </div>

               <div className="absolute inset-0 w-16 h-16 bg-primary/20 rounded-2xl mx-auto animate-ping opacity-30"></div>
            </div>

            <h2 className="text-2xl font-semibold mb-3 text-foreground">{title}</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">{description}</p>

            {onAction && (
               <button
                  onClick={onAction}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium"
               >
                  {actionLabel}
                  <ArrowRight className="h-4 w-4" />
               </button>
            )}
         </div>
      </div>
   )
}
