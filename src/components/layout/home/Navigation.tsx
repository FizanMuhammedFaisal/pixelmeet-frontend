import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Menu, X, Zap } from 'lucide-react'

const navItems = [
  { name: 'Product', href: '#product' },
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Company', href: '#company' }
]

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border'
    >
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className='flex items-center gap-3'
          >
            <div className='p-2 rounded-lg bg-gradient-primary shadow-purple'>
              <Zap className='w-6 h-6 text-primary-foreground' />
            </div>
            <span className='text-xl font-bold text-foreground'>PixelMeet</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-8'>
            {navItems.map(item => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ y: -2 }}
                className='text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium'
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className='hidden md:flex items-center gap-4'>
            <Button variant='ghost' className='font-medium'>
              Sign In
            </Button>
            <Button variant='purple' size='default'>
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className='md:hidden p-2 text-foreground'
          >
            {isOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isOpen ? 'auto' : 0,
            opacity: isOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className='md:hidden overflow-hidden'
        >
          <div className='py-4 space-y-4'>
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isOpen ? 1 : 0,
                  x: isOpen ? 0 : -20
                }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setIsOpen(false)}
                className='block text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium'
              >
                {item.name}
              </motion.a>
            ))}
            <div className='pt-4 space-y-2'>
              <Button variant='ghost' className='w-full justify-start'>
                Sign In
              </Button>
              <Button variant='purple' className='w-full'>
                Get Started
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}
