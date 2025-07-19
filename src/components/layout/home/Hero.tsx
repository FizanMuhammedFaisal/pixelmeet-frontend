import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'

export const Hero = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/login')
  }
  return (
    <section className='min-h-screen flex items-center justify-center relative overflow-hidden'>
      {/* Subtle background pattern */}
      <div className='absolute inset-0 bg-gradient-to-br from-slate-50 to-white'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,23,42,0.03),transparent_70%)]' />
      </div>

      <div className='container mx-auto px-8 max-w-5xl relative z-10'>
        <div className='text-center space-y-12'>
          {/* Main Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='space-y-6'
          >
            <h1 className='text-7xl lg:text-9xl font-black font-Minecraftia tracking-tighter text-slate-900 leading-none '>
              PIXELMEET
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className='max-w-2xl mx-auto'
          >
            <p className='text-lg text-slate-600 leading-relaxed font-medium'>
              A metaverse workspace designed by experts who understand digital
              collaboration. Every virtual environment tells a story—we help you
              tell yours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button size={'lg'} className='px-10' onClick={handleClick}>
              Login
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
