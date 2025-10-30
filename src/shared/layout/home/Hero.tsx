import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'

export const Hero = () => {
   const navigate = useNavigate()
   const handleClick = () => {
      //navigate to. lgoin if auteticated
      navigate('/login')
   }

   return (
      <section className="min-h-screen flex items-center justify-center overflow-hidden relative">
         <div className="hero w-full min-h-screen relative flex items-center justify-center">
            {/* White top section that fades to transparent */}
            <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-slate-300 to-transparent" />

            {/* Main gradient starting after the white section */}
            <div className="absolute inset-0">
               <div className="absolute top-20 bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500/30 via-blue-50/10 to-transparent" />
            </div>

            {/* 
        <div className='absolute inset-0'>
          <div className='absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-blue-300/20 via-blue-100/5 to-transparent rounded-t-full transform scale-x-150' />
        </div> */}

            <div className="container mx-auto px-10 max-w-5xl relative z-10 -mt-52">
               <div className="text-center ">
                  {/* Main Brand */}
                  <motion.div
                     initial={{ opacity: 0, y: 20, filter: 'blur(3px)' }}
                     animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                     transition={{ duration: 0.6, ease: 'easeOut' }}
                     className="space-y-6"
                  >
                     <h1 className="text-8xl lg:text-9xl  font-black font-Minecraftia pixel-text-outline tracking-wider text-slate-900">
                        PIXELMEET
                     </h1>
                  </motion.div>

                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ duration: 0.6, delay: 0.4 }}
                     className="pt-20"
                  >
                     <Button
                        size={'lg'}
                        className="px-20 py-4 font-extrabold cursor-pointer"
                        onClick={handleClick}
                     >
                        GET STARTED
                     </Button>
                  </motion.div>
               </div>
            </div>
         </div>
      </section>
   )
}
