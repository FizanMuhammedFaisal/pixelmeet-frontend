import type React from 'react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Check, ArrowLeft, RefreshCw, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { cn } from '@/shared/lib/utils'
import { useMutation } from '@tanstack/react-query'

import { toast } from 'sonner'
import type { AxiosError } from 'axios'
import type { ZodErrorResponse } from '@/shared/schema'
import { useNavigate } from 'react-router'
import { authService } from '@/features/auth'

type OTPProps = {
   setShowOTP: (value: boolean) => void
   email: string | null
}

function OTPForm({
   setShowOTP,
   email,
   className,
   ...props
}: OTPProps & React.ComponentProps<'div'>) {
   const router = useNavigate()
   const [step, setStep] = useState<'send' | 'otp' | 'welcome'>('send')
   const [value, setValue] = useState('')
   const [isLoading, setIsLoading] = useState(false)
   const [isSuccess, setIsSuccess] = useState(false)
   const [error, setError] = useState('')
   const [timeLeft, setTimeLeft] = useState(0)
   const [canResend, setCanResend] = useState(true)

   // Countdown timer for resend
   useEffect(() => {
      if (timeLeft > 0) {
         const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
         return () => clearTimeout(timer)
      } else if (timeLeft === 0 && step === 'otp') {
         setCanResend(true)
      }
   }, [timeLeft, step])

   // Navigate to home after welcome screen
   useEffect(() => {
      if (step === 'welcome') {
         const timer = setTimeout(() => {
            router('/home')
         }, 2500)

         return () => clearTimeout(timer)
      }
   }, [step, router])

   const sendOTP = useMutation({
      mutationFn: authService.sendOTP,
   })

   const handleSendOTP = async () => {
      setIsLoading(true)
      setError('')
      try {
         await sendOTP.mutateAsync({ email })
         setStep('otp')
         setTimeLeft(120)
         setCanResend(false)
      } catch (error) {
         toast("Couldn't Send Try Again")
         setCanResend(false)
      }
      setIsLoading(false)
   }

   const verifyOTP = useMutation({
      mutationFn: authService.verifyOTP,
   })

   const handleVerifyOTP = async (otp: string) => {
      setIsLoading(true)
      setError('')
      try {
         await verifyOTP.mutateAsync({ email, otp })
         setIsSuccess(true)
         // Show welcome screen after short delay
         setTimeout(() => {
            setStep('welcome')
         }, 1000)
      } catch (error) {
         console.log(error)
         const axiosError = error as AxiosError<ZodErrorResponse>
         const firstDetail = axiosError.response?.data?.details?.[0]?.message
         const fallback = axiosError.response?.data?.message || 'Something went wrong'
         setError(firstDetail || fallback)
         setValue('')
      }
      setIsLoading(false)
   }

   const handleResend = async () => {
      setCanResend(false)
      setTimeLeft(60)
      setError('')
      setValue('')
      // Simulate resend API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
   }

   const handleBack = () => {
      if (step === 'otp') {
         setStep('send')
         setValue('')
         setError('')
         setTimeLeft(0)
         setCanResend(true)
      } else if (step === 'send') {
         setShowOTP(false)
      }
   }

   return (
      <motion.div
         initial={{ opacity: 0, scale: 0.98 }}
         animate={{ opacity: 1, scale: 1 }}
         exit={{ opacity: 0, scale: 0.98 }}
         transition={{ duration: 0.2 }}
         className={cn(
            'w-full max-w-md mx-auto bg-background border border-border/50 rounded-xl p-8',
            className,
         )}
         {...props}
      >
         <div className="space-y-6">
            <AnimatePresence mode="wait">
               {step === 'welcome' ? (
                  <motion.div
                     key="welcome-step"
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
                        <h2 className="text-2xl font-medium text-foreground">
                           Welcome to Pixel Meet
                        </h2>
                        <p className="text-muted-foreground text-sm">Be Ready to Explore</p>
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
               ) : (
                  <>
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
                           <h2 className="text-2xl font-medium text-foreground">
                              {step === 'send' ? 'Send Verification Code' : 'Verify Your Code'}
                           </h2>
                           <p className="text-muted-foreground text-sm">
                              {step === 'send'
                                 ? "We'll send you a verification code"
                                 : `We've sent a 6-digit code to ${email}`}
                           </p>
                        </motion.div>
                     </div>

                     {/* Content */}
                     <AnimatePresence mode="wait">
                        {step === 'send' ? (
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

                              {/* Fixed height container for error to prevent layout shift */}
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

                              <Button
                                 onClick={handleSendOTP}
                                 disabled={isLoading}
                                 className="w-full h-11"
                              >
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
                                       <span>Send Verification Code</span>
                                    </div>
                                 )}
                              </Button>
                           </motion.div>
                        ) : (
                           <motion.div
                              key="otp-step"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.2 }}
                              className="space-y-6"
                           >
                              {/* OTP Input */}
                              <div className="space-y-4">
                                 <div className="flex justify-center">
                                    <InputOTP
                                       maxLength={6}
                                       value={value}
                                       onChange={(value) => {
                                          setValue(value)
                                          setError('')
                                          if (value.length === 6) {
                                             handleVerifyOTP(value)
                                          }
                                       }}
                                       disabled={isLoading || isSuccess}
                                    >
                                       <InputOTPGroup>
                                          <InputOTPSlot
                                             index={0}
                                             className="w-11 h-11 text-base border-border/50"
                                          />
                                          <InputOTPSlot
                                             index={1}
                                             className="w-11 h-11 text-base border-border/50"
                                          />
                                          <InputOTPSlot
                                             index={2}
                                             className="w-11 h-11 text-base border-border/50"
                                          />
                                       </InputOTPGroup>
                                       <div className="mx-2">
                                          <div className="w-2 h-0.5 bg-border/50" />
                                       </div>
                                       <InputOTPGroup>
                                          <InputOTPSlot
                                             index={3}
                                             className="w-11 h-11 text-base border-border/50"
                                          />
                                          <InputOTPSlot
                                             index={4}
                                             className="w-11 h-11 text-base border-border/50"
                                          />
                                          <InputOTPSlot
                                             index={5}
                                             className="w-11 h-11 text-base border-border/50"
                                          />
                                       </InputOTPGroup>
                                    </InputOTP>
                                 </div>

                                 {/* Fixed height container for status messages */}
                                 <div className="h-6 flex items-center justify-center">
                                    <AnimatePresence mode="wait">
                                       {error && (
                                          <motion.p
                                             key="error"
                                             initial={{ opacity: 0, y: -5 }}
                                             animate={{ opacity: 1, y: 0 }}
                                             exit={{ opacity: 0, y: -5 }}
                                             className="text-destructive text-sm"
                                          >
                                             {error}
                                          </motion.p>
                                       )}
                                       {isLoading && (
                                          <motion.div
                                             key="loading"
                                             initial={{ opacity: 0 }}
                                             animate={{ opacity: 1 }}
                                             exit={{ opacity: 0 }}
                                             className="flex items-center space-x-2 text-muted-foreground"
                                          >
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
                                             <span className="text-sm">Verifying...</span>
                                          </motion.div>
                                       )}
                                       {isSuccess && (
                                          <motion.div
                                             key="success"
                                             initial={{ opacity: 0, scale: 0.8 }}
                                             animate={{ opacity: 1, scale: 1 }}
                                             exit={{ opacity: 0, scale: 0.8 }}
                                             className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400"
                                          >
                                             <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{
                                                   delay: 0.1,
                                                   type: 'spring',
                                                   stiffness: 200,
                                                }}
                                             >
                                                <Check className="w-4 h-4" />
                                             </motion.div>
                                             <span className="text-sm font-medium">
                                                Verified successfully!
                                             </span>
                                          </motion.div>
                                       )}
                                    </AnimatePresence>
                                 </div>
                              </div>

                              {/* Resend Section */}
                              <div className="text-center space-y-3">
                                 <p className="text-sm text-muted-foreground">
                                    Didn't receive the code?
                                 </p>

                                 {canResend ? (
                                    <Button
                                       variant="ghost"
                                       onClick={handleResend}
                                       className="text-primary hover:text-primary/80 font-medium h-auto p-0"
                                    >
                                       Resend Code
                                    </Button>
                                 ) : (
                                    <p className="text-sm text-muted-foreground">
                                       Resend in{' '}
                                       <motion.span
                                          key={timeLeft}
                                          initial={{ scale: 1.05 }}
                                          animate={{ scale: 1 }}
                                          className="font-medium text-foreground tabular-nums"
                                       >
                                          {timeLeft}s
                                       </motion.span>
                                    </p>
                                 )}
                              </div>

                              {/* Manual Submit Button (if needed) */}
                              {value.length === 6 && !isLoading && !isSuccess && (
                                 <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="pt-2"
                                 >
                                    <Button
                                       onClick={() => handleVerifyOTP(value)}
                                       className="w-full h-11"
                                       disabled={isLoading}
                                    >
                                       Verify Code
                                    </Button>
                                 </motion.div>
                              )}
                           </motion.div>
                        )}
                     </AnimatePresence>
                  </>
               )}
            </AnimatePresence>
         </div>
      </motion.div>
   )
}

export default OTPForm
