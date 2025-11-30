import { Button } from '@/components/button'
import { ArrowLeft, Mail, RefreshCw } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
type props = {
   email: string | null
   error: string
   handleSendResetCode: () => void
   isLoading: boolean
   handleBack: () => void
}

function OTPSendStep({ email, error, handleSendResetCode, isLoading, handleBack }: props) {
   return (
      <div>
         <div className="space-y-4">
            <motion.div
               initial={{ y: -10, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.1 }}
               className="flex items-center"
            >
               <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBack}
                  className="p-2 hover:bg-muted/50 -ml-2"
               >
                  <ArrowLeft className="w-4 h-4" />
               </Button>
            </motion.div>
            <motion.div
               initial={{ y: -10, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.2 }}
               className="text-center space-y-2"
            >
               <h2 className="text-2xl font-medium text-foreground">Reset Your Password</h2>
               <p className="text-muted-foreground text-sm">We'll send you a password reset code</p>
            </motion.div>
         </div>
         <motion.div
            key="send-step"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
         >
            <div className="text-center space-y-3">
               <p className="font-medium text-foreground">{email}</p>
            </div>
            <div className="h-5 flex items-center justify-center">
               <AnimatePresence>
                  {error && (
                     <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-destructive text-sm"
                     >
                        {error}
                     </motion.p>
                  )}
               </AnimatePresence>
            </div>
            <Button onClick={handleSendResetCode} disabled={isLoading} className="w-full h-11">
               {isLoading ? (
                  <div className="flex items-center space-x-2">
                     <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                           duration: 1,
                           repeat: Number.POSITIVE_INFINITY,
                           ease: 'linear',
                        }}
                     >
                        <RefreshCw className="w-4 h-4" />
                     </motion.div>
                     <span>Sending...</span>
                  </div>
               ) : (
                  <div className="flex items-center space-x-2">
                     <Mail className="w-4 h-4" />
                     <span>Send Reset Code</span>
                  </div>
               )}
            </Button>
         </motion.div>
      </div>
   )
}

export default OTPSendStep
