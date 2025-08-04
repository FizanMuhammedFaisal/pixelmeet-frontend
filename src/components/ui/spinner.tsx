import { motion } from 'framer-motion'
import { LoaderIcon } from 'lucide-react'
import { cn } from '../../shared/lib/utils'

type SpinnerSize = 'sm' | 'md' | 'lg' | 'default'

interface SpinnerProps {
  size?: SpinnerSize
  speed?: number
  className?: string
}

const MotionLoaderIcon = motion(LoaderIcon)

export const Spinner = ({
  size = 'default',
  speed = 1,
  className,
  ...props
}: SpinnerProps) => {
  const spinnerSize = {
    sm: 16,
    md: 24,
    default: 24,
    lg: 32
  }[size]

  return (
    <MotionLoaderIcon
      size={spinnerSize}
      className={cn('text-current ', className)}
      animate={{
        rotate: [0, 360],
        scale: [1, 1.05, 1]
      }}
      transition={{
        duration: speed,
        ease: 'easeInOut',
        repeat: Number.POSITIVE_INFINITY,
        repeatType: 'loop'
      }}
      aria-label='Loading'
      role='status'
      {...props}
    />
  )
}
