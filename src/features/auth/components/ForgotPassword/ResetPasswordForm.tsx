import type React from 'react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/shared/lib/utils'
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/features/auth'
import { toast } from 'sonner'
import type { AxiosError } from 'axios'
import { useNavigate } from 'react-router'
import { type ZodErrorResponse } from '@/shared/schema'
import SuccessStep from './components/SuccessStep'
import OTPSendStep from './components/OTPSendStep'
import PasswordStep from './components/PasswordStep'
import VerifyOTPStep from './components/VerifyOTPStep'

type ResetPasswordProps = {
  setShowResetPassword: (value: boolean) => void
  email: string | null
}
export type ForgotPasswordComponentSteps =
  | 'send'
  | 'verify'
  | 'password'
  | 'success'
function ResetPasswordForm({
  setShowResetPassword,
  email,
  className,
  ...props
}: ResetPasswordProps & React.ComponentProps<'div'>) {
  const router = useNavigate()
  const [step, setStep] = useState<ForgotPasswordComponentSteps>('send')
  const [tokenValue, setTokenValue] = useState('')
  const [resetToken, setResetToken] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const [timeLeft, setTimeLeft] = useState(0)
  const [canResend, setCanResend] = useState(true)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && step === 'verify') {
      setCanResend(true)
    }
  }, [timeLeft, step])

  useEffect(() => {
    if (step === 'success') {
      const timer = setTimeout(() => {
        router('/login')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [step, router])

  const sendResetCode = useMutation({
    mutationFn: authService.sendPasswordResetToken
  })

  const handleSendResetCode = async () => {
    setIsLoading(true)
    setError('')
    try {
      await sendResetCode.mutateAsync({ email })
      setStep('verify')
      setTimeLeft(120)
      setCanResend(false)
    } catch (error) {
      toast("Couldn't send reset code. Try again.")
      setCanResend(false)
    }
    setIsLoading(false)
  }

  const verifyResetCode = useMutation({
    mutationFn: authService.verifyPasswordResetToken
  })

  const handleVerifyCode = async (token: string) => {
    setIsLoading(true)
    setError('')
    try {
      const res = await verifyResetCode.mutateAsync({ email, token })
      setIsSuccess(true)
      setResetToken(res.resetToken)
      setStep('password')
      setIsLoading(false)
      setIsSuccess(false)
    } catch (error) {
      const axiosError = error as AxiosError<ZodErrorResponse>
      const firstDetail = axiosError.response?.data?.details?.[0]?.message
      const fallback =
        axiosError.response?.data?.message || 'Invalid verification code'
      setError(firstDetail || fallback)
      setTokenValue('')
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    setCanResend(false)
    setIsLoading(true)
    setError('')
    try {
      await sendResetCode.mutateAsync({ email })
      setStep('verify')
      setTimeLeft(120)
      setCanResend(false)
    } catch (error) {
      toast("Couldn't send reset code. Try again.")
      setCanResend(false)
    }
    setIsLoading(false)
  }

  const handleBack = () => {
    if (step === 'verify') {
      setStep('send')
      setTokenValue('')
      setError('')
      setTimeLeft(0)
      setCanResend(true)
    } else if (step === 'send') {
      setShowResetPassword(false)
    } else if (step === 'password') {
      setStep('verify')
      setError('')
      // resetForm()
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
        className
      )}
      {...props}
    >
      <div className='space-y-6'>
        <AnimatePresence mode='wait'>
          {step === 'success' ? (
            <SuccessStep />
          ) : (
            <>
              <AnimatePresence mode='wait'>
                {step === 'send' ? (
                  <OTPSendStep
                    email={email}
                    error={error}
                    handleSendResetCode={handleSendResetCode}
                    isLoading={isLoading}
                    handleBack={handleBack}
                  />
                ) : step === 'verify' ? (
                  <VerifyOTPStep
                    tokenValue={tokenValue}
                    setTokenValue={setTokenValue}
                    setError={setError}
                    isLoading={isLoading}
                    isSuccess={isSuccess}
                    error={error}
                    canResend={canResend}
                    handleResend={handleResend}
                    timeLeft={timeLeft}
                    handleVerifyCode={handleVerifyCode}
                    handleBack={handleBack}
                    email={email}
                  />
                ) : (
                  <PasswordStep
                    resetToken={resetToken}
                    setError={setError}
                    error={error}
                    setStep={setStep}
                    handleBack={handleBack}
                  />
                )}
              </AnimatePresence>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default ResetPasswordForm
