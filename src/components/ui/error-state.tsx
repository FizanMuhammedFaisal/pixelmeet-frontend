import type React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface ErrorStateProps {
   title?: string
   description?: string
   actionLabel?: string
   onRetry?: () => void
   icon?: React.ReactNode
}

export function ErrorState({
   title = 'Something went wrong',
   description = 'An unexpected error occurred. Please try again.',
   actionLabel = 'Try Again',
   onRetry,
   icon,
}: ErrorStateProps) {
   return (
      <div className="flex-1 flex items-center justify-center p-8">
         <div className="text-center max-w-md">
            <div className="relative mb-8">
               <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center mx-auto border border-destructive/20">
                  {icon || <AlertTriangle className="h-8 w-8 text-destructive" />}
               </div>

               <div className="absolute inset-0 w-16 h-16 bg-destructive/20 rounded-2xl mx-auto animate-pulse opacity-30"></div>
            </div>

            <h2 className="text-2xl font-semibold mb-3 text-foreground">{title}</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">{description}</p>

            {onRetry && (
               <button
                  onClick={onRetry}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-destructive text-destructive-foreground rounded-xl hover:bg-destructive/90 transition-colors font-medium"
               >
                  <RefreshCw className="h-4 w-4" />
                  {actionLabel}
               </button>
            )}
         </div>
      </div>
   )
}
