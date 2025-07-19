import { Navigation } from '@/components/layout/home/Navigation'
import { Hero } from '@/components/layout/home/Hero'
import { Features } from '@/components/layout/home/Features'
import { Footer } from '@/components/layout/home/Footer'

const HomePage = () => {
  return (
    <div className='min-h-screen bg-background'>
      <Navigation />
      <Hero />
      <Features />
      <Footer />
    </div>
  )
}

export default HomePage
