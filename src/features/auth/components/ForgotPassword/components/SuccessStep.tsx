import { Check } from 'lucide-react'
import { motion } from 'motion/react'

function SuccessStep() {
   return (
      <motion.div
         key="success-step"
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         exit={{ opacity: 0, scale: 0.9 }}
         transition={{ duration: 0.3 }}
         className="text-center space-y-6 py-8"
      >
         <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mx-auto w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center"
         >
            <Check className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
         </motion.div>
         <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-2"
         >
            <h2 className="text-2xl font-medium text-foreground">Password Reset Successfully</h2>
            <p className="text-muted-foreground text-sm">Redirecting to login page...</p>
         </motion.div>
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center"
         >
            <div className="flex space-x-1">
               {[0, 1, 2].map((i) => (
                  <motion.div
                     key={i}
                     className="w-2 h-2 bg-primary rounded-full"
                     animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                     }}
                     transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.2,
                     }}
                  />
               ))}
            </div>
         </motion.div>
      </motion.div>
   )
}

export default SuccessStep
