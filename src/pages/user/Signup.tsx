import OTPForm from '@/features/auth/components/LoginForm/OTPForm'
import { SignUpForm } from '@/features/auth/components/SignupForm/SignUpForm'
import { useState } from 'react'

function SignUpPage() {
  const [showOTP, setShowOTP] = useState(false)
  const [email, setEmail] = useState<string | null>(null)
  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        {showOTP === true ? (
          <OTPForm email={email} setShowOTP={setShowOTP} />
        ) : (
          <SignUpForm setShowOTP={setShowOTP} setEmail={setEmail} />
        )}
      </div>
    </div>
  )
}

export default SignUpPage
