import { motion } from 'motion/react'
import { LoaderIcon } from 'lucide-react'
import { cn } from '../../shared/lib/utils'

type SpinnerSize = 'sm' | 'md' | 'lg' | 'default'

interface SpinnerProps {
   size?: SpinnerSize
   speed?: number
   className?: string
}

const MotionLoaderIcon = motion.create(LoaderIcon)

export const Spinner = ({ size = 'default', speed = 0.6, className, ...props }: SpinnerProps) => {
   const spinnerSize = {
      sm: 16,
      md: 24,
      default: 24,
      lg: 32,
   }[size]

   return (
      <MotionLoaderIcon
         size={spinnerSize}
         className={cn('text-current ', className)}
         animate={{
            rotate: [0, 360],
            scale: [1, 1.05, 1],
         }}
         transition={{
            duration: speed,
            ease: 'easeInOut',
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'loop',
         }}
         aria-label="Loading"
         role="status"
         {...props}
      />
   )
}
