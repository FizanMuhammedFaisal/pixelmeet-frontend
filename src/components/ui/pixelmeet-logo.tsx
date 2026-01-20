import { cn } from '@/shared/lib/utils'

interface PixelMeetLogoProps {
   className?: string
   size?: 'sm' | 'md' | 'lg'
}

export function PixelMeetLogo({ className, size = 'md' }: PixelMeetLogoProps) {
   const sizeClasses = {
      sm: 'text-xl',
      md: 'text-3xl',
      lg: 'text-5xl',
   }

   return (
      <h1
         className={cn(
            'font-black font-Minecraftia text-primary tracking-wide',
            sizeClasses[size],
            className,
         )}
      >
         PIXELMEET
      </h1>
   )
}
