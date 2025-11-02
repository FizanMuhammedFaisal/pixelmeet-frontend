import ForgotPasswordForm from '@/features/auth/components/ForgotPassword/ForgotPasswordForm'

import ResetPasswordForm from '@/features/auth/components/ForgotPassword/ResetPasswordForm'
import { useState } from 'react'

function ForgotPasswordPage() {
   const [showResetPassword, setShowResetPassword] = useState(false)
   const [email, setEmail] = useState<string | null>(null)
   return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
         <div className="w-full max-w-sm">
            {showResetPassword === true ? (
               <ResetPasswordForm email={email} setShowResetPassword={setShowResetPassword} />
            ) : (
               <ForgotPasswordForm
                  setShowResetPassword={setShowResetPassword}
                  setEmail={setEmail}
               />
            )}
         </div>
      </div>
   )
}

export default ForgotPasswordPage
