import { useAppTheme } from '@/shared/hooks/useAppTheme'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export function ThemeToggleButton() {
  const { toggleTheme, theme } = useAppTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === 'dark'

  return (
    <motion.button
      onClick={toggleTheme}
      className='relative p-4 rounded-xl transition-all duration-300 font-bold'
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Icon container */}
      <div className='relative w-8 h-8 flex items-center justify-center'>
        <AnimatePresence mode='wait'>
          {isDark ? (
            <motion.div
              key='moon'
              initial={{ rotate: -180, opacity: 0, scale: 0.3 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 180, opacity: 0, scale: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className='absolute'
            >
              <svg
                width='32'
                height='32'
                viewBox='0 0 24 24'
                fill='none'
                className='text-foreground'
              >
                <motion.path
                  d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'
                  fill='currentColor'
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
                {/* Stars */}
                <motion.circle
                  cx='17'
                  cy='7'
                  r='1.5'
                  fill='currentColor'
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                />
                <motion.circle
                  cx='19'
                  cy='11'
                  r='1'
                  fill='currentColor'
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                />
                <motion.circle
                  cx='16'
                  cy='4'
                  r='1'
                  fill='currentColor'
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                />
              </svg>
            </motion.div>
          ) : (
            <motion.div
              key='sun'
              initial={{ rotate: 180, opacity: 0, scale: 0.3 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -180, opacity: 0, scale: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className='absolute'
            >
              <svg
                width='32'
                height='32'
                viewBox='0 0 24 24'
                fill='none'
                className='text-foreground'
              >
                {/* Sun center */}
                <motion.circle
                  cx='12'
                  cy='12'
                  r='5'
                  fill='currentColor'
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                />
                {/* Sun rays */}
                <g
                  stroke='currentColor'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                >
                  {[
                    { x1: 12, y1: 1, x2: 12, y2: 3 },
                    { x1: 12, y1: 21, x2: 12, y2: 23 },
                    { x1: 4.22, y1: 4.22, x2: 5.64, y2: 5.64 },
                    { x1: 18.36, y1: 18.36, x2: 19.78, y2: 19.78 },
                    { x1: 1, y1: 12, x2: 3, y2: 12 },
                    { x1: 21, y1: 12, x2: 23, y2: 12 },
                    { x1: 4.22, y1: 19.78, x2: 5.64, y2: 18.36 },
                    { x1: 18.36, y1: 5.64, x2: 19.78, y2: 4.22 }
                  ].map((ray, index) => (
                    <motion.line
                      key={index}
                      x1={ray.x1}
                      y1={ray.y1}
                      x2={ray.x2}
                      y2={ray.y2}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.4 + index * 0.05,
                        ease: 'easeOut'
                      }}
                    />
                  ))}
                </g>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  )
}
