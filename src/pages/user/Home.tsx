import { Navigation } from '@/shared/layout/home/Navigation'
import { Hero } from '@/shared/layout/home/Hero'
import { Features } from '@/shared/layout/home/Features'
import { Footer } from '@/shared/layout/home/Footer'

const HomePage = () => {
   return (
      <div className="min-h-screen bg-background">
         <Navigation />

         <Hero />
         <Features />
         <Footer />
      </div>
   )
}

export default HomePage
