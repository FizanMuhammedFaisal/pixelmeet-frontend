import { PixelMeetLogo } from '@/components/ui/pixelmeet-logo'
import OTPForm from '@/features/auth/components/LoginForm/OTPForm'
import { SignUpForm } from '@/features/auth/components/SignupForm/SignUpForm'
import { Navigation } from '@/shared/layout/home/Navigation'
import { useState } from 'react'

function SignUpPage() {
   const [showOTP, setShowOTP] = useState(false)
   const [email, setEmail] = useState<string | null>(null)

   return (
      <div className="min-h-svh w-full bg-background text-foreground">
         <Navigation />

         <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 pt-24">
            <div className="w-full max-w-sm">
               <div className="text-center mb-8">
                  <PixelMeetLogo />
               </div>
               {showOTP === true ? (
                  <OTPForm email={email} setShowOTP={setShowOTP} />
               ) : (
                  <SignUpForm setShowOTP={setShowOTP} setEmail={setEmail} />
               )}
            </div>
         </div>
      </div>
   )
}

export default SignUpPage
