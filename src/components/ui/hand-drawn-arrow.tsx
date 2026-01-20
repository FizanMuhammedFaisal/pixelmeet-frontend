import { motion } from 'motion/react'
import { cn } from '@/shared/lib/utils'

interface HandDrawnArrowProps {
   className?: string
   delay?: number
   duration?: number
   text?: string
   color?: string
   direction?: 'up-right' | 'up-left' | 'down-right' | 'down-left'
   style?: 'simple' | 'swirly' | 'bouncy'
}

export function HandDrawnArrow({
   className,
   delay = 0.5,
   duration = 1.2,
   text = 'Create one !',
   color = 'currentColor',
   direction = 'up-right',
   style = 'swirly',
}: HandDrawnArrowProps) {
   // Arrow styles with all 4 directions
   const arrowStyles = {
      simple: {
         'up-right': {
            curve: 'M15,85 Q20,60 35,40 Q50,20 70,15',
            arrow1: 'M70,15 L62,24',
            arrow2: 'M70,15 L79,22',
            textPos: { x: '5%', y: '92%' },
         },
         'up-left': {
            curve: 'M85,85 Q80,60 65,40 Q50,20 30,15',
            arrow1: 'M30,15 L38,24',
            arrow2: 'M30,15 L21,22',
            textPos: { x: '75%', y: '92%' },
         },
         'down-right': {
            curve: 'M15,15 Q20,40 35,60 Q50,80 70,85',
            arrow1: 'M70,85 L62,76',
            arrow2: 'M70,85 L79,78',
            textPos: { x: '5%', y: '8%' },
         },
         'down-left': {
            curve: 'M85,15 Q80,40 65,60 Q50,80 30,85',
            arrow1: 'M30,85 L38,76',
            arrow2: 'M30,85 L21,78',
            textPos: { x: '75%', y: '8%' },
         },
      },
      swirly: {
         'up-right': {
            curve: 'M8,92 Q10,75 14,62 Q20,48 30,38 Q42,28 56,24 Q68,22 76,28 Q82,34 82,44 Q80,54 72,60 Q62,65 52,62 Q44,58 42,50 Q41,44 45,40 Q50,37 56,38 Q64,40 72,44 Q82,49 90,44 Q96,39 98,32',
            arrow1: 'M98,32 L88,36',
            arrow2: 'M98,32 L99,42',
            textPos: { x: '2%', y: '95%' },
         },
         'up-left': {
            curve: 'M92,92 Q90,75 86,62 Q80,48 70,38 Q58,28 44,24 Q32,22 24,28 Q18,34 18,44 Q20,54 28,60 Q38,65 48,62 Q56,58 58,50 Q59,44 55,40 Q50,37 44,38 Q36,40 28,44 Q18,49 10,44 Q4,39 2,32',
            arrow1: 'M2,32 L12,36',
            arrow2: 'M2,32 L-2,42',
            textPos: { x: '88%', y: '95%' },
         },
         'down-right': {
            curve: 'M8,8 Q10,25 14,38 Q20,52 30,62 Q42,72 56,76 Q68,78 76,72 Q82,66 82,56 Q80,46 72,40 Q62,35 52,38 Q44,42 42,50 Q41,56 45,60 Q50,63 56,62 Q64,60 72,56 Q82,51 90,56 Q96,61 98,68',
            arrow1: 'M98,68 L88,64',
            arrow2: 'M98,68 L102,58',
            textPos: { x: '2%', y: '5%' },
         },
         'down-left': {
            curve: 'M92,8 Q90,25 86,38 Q80,52 70,62 Q58,72 44,76 Q32,78 24,72 Q18,66 18,56 Q20,46 28,40 Q38,35 48,38 Q56,42 58,50 Q59,56 55,60 Q50,63 44,62 Q36,60 28,56 Q18,51 10,56 Q4,61 2,68',
            arrow1: 'M2,68 L12,64',
            arrow2: 'M2,68 L-2,58',
            textPos: { x: '88%', y: '5%' },
         },
      },
      bouncy: {
         'up-right': {
            curve: 'M12,88 Q16,72 20,60 Q26,46 35,35 Q45,24 58,18 Q65,15 72,14',
            arrow1: 'M72,14 L64,23',
            arrow2: 'M72,14 L81,21',
            textPos: { x: '3%', y: '94%' },
         },
         'up-left': {
            curve: 'M88,88 Q84,72 80,60 Q74,46 65,35 Q55,24 42,18 Q35,15 28,14',
            arrow1: 'M28,14 L36,23',
            arrow2: 'M28,14 L19,21',
            textPos: { x: '77%', y: '94%' },
         },
         'down-right': {
            curve: 'M12,12 Q16,28 20,40 Q26,54 35,65 Q45,76 58,82 Q65,85 72,86',
            arrow1: 'M72,86 L64,77',
            arrow2: 'M72,86 L81,79',
            textPos: { x: '3%', y: '6%' },
         },
         'down-left': {
            curve: 'M88,12 Q84,28 80,40 Q74,54 65,65 Q55,76 42,82 Q35,85 28,86',
            arrow1: 'M28,86 L36,77',
            arrow2: 'M28,86 L19,79',
            textPos: { x: '77%', y: '6%' },
         },
      },
   }

   const selectedStyle = arrowStyles[style][direction]

   return (
      <div className={cn('pointer-events-none relative', className)}>
         <svg
            viewBox="0 0 100 100"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full opacity-70"
            preserveAspectRatio="xMidYMid meet"
         >
            {/* Main curved path */}
            <motion.path
               d={selectedStyle.curve}
               initial={{ pathLength: 0, opacity: 0 }}
               animate={{ pathLength: 1, opacity: 1 }}
               transition={{
                  duration: duration,
                  ease: [0.43, 0.13, 0.23, 0.96],
                  delay: delay,
               }}
               strokeDasharray="0 1"
            />

            {/* Arrowhead - RIGHT wing */}
            <motion.path
               d={selectedStyle.arrow1}
               initial={{ pathLength: 0, opacity: 0 }}
               animate={{ pathLength: 1, opacity: 1 }}
               transition={{
                  duration: 0.3,
                  ease: 'easeOut',
                  delay: delay + duration - 0.15,
               }}
            />

            {/* Arrowhead - LEFT wing */}
            <motion.path
               d={selectedStyle.arrow2}
               initial={{ pathLength: 0, opacity: 0 }}
               animate={{ pathLength: 1, opacity: 1 }}
               transition={{
                  duration: 0.3,
                  ease: 'easeOut',
                  delay: delay + duration - 0.1,
               }}
            />
         </svg>

         {/* Animated text label */}
         <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
               duration: 0.6,
               delay: delay + duration + 0.2,
               ease: [0.34, 1.56, 0.64, 1],
            }}
            className="absolute -rotate-6"
            style={{
               left: selectedStyle.textPos.x,
               top: selectedStyle.textPos.y,
               fontFamily: 'cursive',
               fontSize: 'clamp(0.875rem, 3vw, 1.125rem)',
               whiteSpace: 'nowrap',
            }}
         >
            <span className="text-muted-foreground/80">{text}</span>
         </motion.div>
      </div>
   )
}
