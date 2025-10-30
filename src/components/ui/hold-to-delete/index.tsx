import type React from 'react'
import { useState, useRef, useEffect } from 'react'

import './index.css'
import { cn } from '../../../shared/lib/utils'
import { motion } from 'motion/react'

type ButtonSize = 'sm' | 'md' | 'lg'

interface HoldToDeleteButtonProps extends React.ComponentPropsWithoutRef<'button'> {
   onHoldComplete: () => void
   holdDuration?: number
   children?: React.ReactNode
   size?: ButtonSize
}

export function HoldToDeleteButton({
   onHoldComplete,
   holdDuration = 1000,
   children,
   className,
   size = 'md',
   ...props
}: HoldToDeleteButtonProps) {
   const [isHolding, setIsHolding] = useState(false)
   const [progress, setProgress] = useState(0)
   const timeoutRef = useRef<NodeJS.Timeout | null>(null)
   const intervalRef = useRef<NodeJS.Timeout | null>(null)
   const startTimeRef = useRef<number>(0)

   const startHold = () => {
      setIsHolding(true)
      setProgress(0)
      startTimeRef.current = Date.now()

      timeoutRef.current = setTimeout(() => {
         setIsHolding(false)
         setProgress(0)
         onHoldComplete()
         if (intervalRef.current) clearInterval(intervalRef.current)
      }, holdDuration)

      intervalRef.current = setInterval(() => {
         const elapsed = Date.now() - startTimeRef.current
         setProgress(Math.min((elapsed / holdDuration) * 100, 100))
      }, 10)
   }

   const cancelHold = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
      setIsHolding(false)
      setProgress(0)
   }

   useEffect(() => {
      return () => {
         if (timeoutRef.current) clearTimeout(timeoutRef.current)
         if (intervalRef.current) clearInterval(intervalRef.current)
      }
   }, [])

   const clipPathValue = `inset(0% ${100 - progress}% 0% 0%)`

   const iconSize = {
      sm: 14,
      md: 16,
      lg: 20,
   }[size]

   const defaultContent = (
      <>
         <svg height={iconSize} strokeLinejoin="round" viewBox="0 0 16 16" width={iconSize}>
            <path
               fillRule="evenodd"
               clipRule="evenodd"
               d="M6.75 2.75C6.75 2.05964 7.30964 1.5 8 1.5C8.69036 1.5 9.25 2.05964 9.25 2.75V3H6.75V2.75ZM5.25 3V2.75C5.25 1.23122 6.48122 0 8 0C9.51878 0 10.75 1.23122 10.75 2.75V3H12.9201H14.25H15V4.5H14.25H13.8846L13.1776 13.6917C13.0774 14.9942 11.9913 16 10.6849 16H5.31508C4.00874 16 2.92263 14.9942 2.82244 13.6917L2.11538 4.5H1.75H1V3H1.75H3.07988H5.25ZM4.31802 13.5767L3.61982 4.5H12.3802L11.682 13.5767C11.6419 14.0977 11.2075 14.5 10.6849 14.5H5.31508C4.79254 14.5 4.3581 14.0977 4.31802 13.5767Z"
               fill="currentColor"
            />
         </svg>
         {'Hold to Delete'}
      </>
   )

   return (
      <motion.button
         className={cn(
            'button',
            `button-${size}  inset-0 bg-card rounded-lg shadow-sm border border-border/90`,
            className,
         )}
         whileHover={{ scale: 1.01 }}
         whileTap={{ scale: 0.99 }}
         onMouseDown={startHold}
         onMouseUp={cancelHold}
         onMouseLeave={cancelHold}
         onTouchStart={startHold}
         onTouchEnd={cancelHold}
         {...props}
      >
         <div aria-hidden="true" className="hold-overlay" style={{ clipPath: clipPathValue }}>
            {children || defaultContent}
         </div>
         {children || defaultContent}
      </motion.button>
   )
}
