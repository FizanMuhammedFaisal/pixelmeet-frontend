import { Button } from '@/components/ui/button'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from '@/components/ui/input-otp'
import { ArrowLeft, Check, RefreshCw } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

type Props = {
  tokenValue: string
  setTokenValue: (token: string) => void
  setError: (token: string) => void
  isLoading: boolean
  isSuccess: boolean
  error: string
  canResend: boolean
  handleResend: () => void
  timeLeft: number
  handleVerifyCode: (token: string) => void
  email: string | null
  handleBack: () => void
}
function VerifyOTPStep({
  tokenValue,
  setTokenValue,
  setError,
  isLoading,
  isSuccess,
  error,
  canResend,
  handleResend,
  timeLeft,
  handleVerifyCode,
  email,
  handleBack
}: Props) {
  return (
    <div>
      <div className='space-y-4'>
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className='flex items-center'
        >
          <Button
            variant='ghost'
            size='sm'
            onClick={handleBack}
            className='p-2 hover:bg-muted/50 -ml-2'
          >
            <ArrowLeft className='w-4 h-4' />
          </Button>
        </motion.div>
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className='text-center space-y-2'
        >
          <h2 className='text-2xl font-medium text-foreground'>
            Verify Reset Code
          </h2>
          <p className='text-muted-foreground text-sm'>
            We've sent a 6-digit code to {email}
          </p>
        </motion.div>
      </div>
      <motion.div
        key='verify-step'
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
        className='space-y-6'
      >
        <div className='space-y-4'>
          <div className='flex justify-center'>
            <InputOTP
              maxLength={6}
              value={tokenValue}
              onChange={value => {
                setTokenValue(value)
                setError('')
                if (value.length === 6) {
                  handleVerifyCode(value)
                }
              }}
              disabled={isLoading || isSuccess}
            >
              <InputOTPGroup>
                <InputOTPSlot
                  index={0}
                  className='w-11 h-11 text-base border-border/50'
                />
                <InputOTPSlot
                  index={1}
                  className='w-11 h-11 text-base border-border/50'
                />
                <InputOTPSlot
                  index={2}
                  className='w-11 h-11 text-base border-border/50'
                />
              </InputOTPGroup>
              <div className='mx-2'>
                <div className='w-2 h-0.5 bg-border/50' />
              </div>
              <InputOTPGroup>
                <InputOTPSlot
                  index={3}
                  className='w-11 h-11 text-base border-border/50'
                />
                <InputOTPSlot
                  index={4}
                  className='w-11 h-11 text-base border-border/50'
                />
                <InputOTPSlot
                  index={5}
                  className='w-11 h-11 text-base border-border/50'
                />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className='h-6 flex items-center justify-center'>
            <AnimatePresence mode='wait'>
              {error && (
                <motion.p
                  key='error'
                  initial={{ opacity: 0, y: -5, filter: 'blur(3px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: 5, filter: 'blur(3px)' }}
                  className='text-destructive text-sm'
                >
                  {error}
                </motion.p>
              )}
              {isLoading && (
                <motion.div
                  key='loading'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='flex items-center space-x-2 text-muted-foreground'
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'linear'
                    }}
                  >
                    <RefreshCw className='w-4 h-4' />
                  </motion.div>
                  <span className='text-sm'>Verifying...</span>
                </motion.div>
              )}
              {isSuccess && (
                <motion.div
                  key='success'
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className='flex items-center space-x-2 text-emerald-600 dark:text-emerald-400'
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.1,
                      type: 'spring',
                      stiffness: 200
                    }}
                  >
                    <Check className='w-4 h-4' />
                  </motion.div>
                  <span className='text-sm font-medium'>
                    Code verified successfully!
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className='text-center space-y-3'>
          <p className='text-sm text-muted-foreground'>
            Didn't receive the code?
          </p>
          {canResend ? (
            <Button
              variant='ghost'
              onClick={handleResend}
              className='text-primary hover:text-primary/80 font-medium h-auto p-0'
            >
              Resend Code
            </Button>
          ) : (
            <p className='text-sm text-muted-foreground'>
              Resend in{' '}
              <motion.span
                key={timeLeft}
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                className='font-medium text-foreground tabular-nums'
              >
                {timeLeft}s
              </motion.span>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default VerifyOTPStep
