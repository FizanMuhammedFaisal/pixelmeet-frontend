import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'

export const Hero = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/login')
  }
  return (
    <section className=' min-h-screen flex items-center justify-center overflow-hidden relative'>
      <div className='container mx-auto px-10 max-w-5xl relative '>
        <div className='text-center space-y-12'>
          {/* Main Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(3px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='space-y-6'
          >
            <h1 className='text-8xl lg:text-9xl font-black font-Minecraftia pixel-text-outline tracking-wider  text-slate-900 leading-none '>
              PIXELMEET
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              size={'lg'}
              className='px-16 font-extrabold'
              onClick={handleClick}
            >
              GET STARTED
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
