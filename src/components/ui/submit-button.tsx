import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import { motion, AnimatePresence, LayoutGroup } from 'motion/react'

import type React from 'react'
import { cn } from '../../shared/lib/utils'
import { Spinner } from './spinner'

interface SubmitButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
   isLoading?: boolean
   isSuccess?: boolean
   children: React.ReactNode
   processingName?: string
}

const MotionButton = motion.create(Button)

export default function SubmitButton({
   isLoading = false,
   isSuccess = false,
   children,
   className,
   processingName = 'Processing',
   ...props
}: SubmitButtonProps) {
   const currentContentKey = isLoading ? 'loading' : isSuccess ? 'success' : 'default'
   console.log(isLoading)
   return (
      <LayoutGroup>
         <MotionButton
            className={cn(
               ' px-6 py-3 flex items-center justify-center',
               'disabled:opacity-100 disabled:cursor-default',
               className,
            )}
            disabled={isLoading || isSuccess}
            variant="default"
            {...props}
         >
            <motion.div className="flex items-center space-x-2">
               <motion.div
                  className="flex items-center justify-center overflow-hidden"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{
                     width: isLoading || isSuccess ? 16 : 0,
                     opacity: isLoading || isSuccess ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
               >
                  <AnimatePresence mode="wait" initial={false}>
                     {isLoading && <Spinner />}
                     {isSuccess && (
                        <motion.div
                           key="checkmark"
                           initial={{ scale: 0.8 }}
                           animate={{ scale: 1 }}
                           exit={{ scale: 0.8 }}
                           transition={{ duration: 0.2 }}
                           className="flex-shrink-0"
                        >
                           <CheckCircle className="h-4 w-4" />
                        </motion.div>
                     )}
                  </AnimatePresence>
               </motion.div>

               <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                     key={currentContentKey}
                     initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                     animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                     exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
                     transition={{ duration: 0.2 }}
                     className="font-medium"
                  >
                     {isLoading ? processingName : isSuccess ? 'Done' : children}
                  </motion.span>
               </AnimatePresence>
            </motion.div>
         </MotionButton>
      </LayoutGroup>
   )
}
