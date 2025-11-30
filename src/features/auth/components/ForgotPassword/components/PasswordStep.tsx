import { Button } from '@/components/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authService } from '@/features/auth/services'

import type { ZodErrorResponse } from '@/shared/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { Eye, EyeOff, Lock, RefreshCw } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type z from 'zod'
import type { ForgotPasswordComponentSteps } from '../ResetPasswordForm'
import { ResetPasswordSchema } from '../../../schema'
type props = {
   resetToken: string
   setError: (error: string) => void
   error: string
   setStep: (step: ForgotPasswordComponentSteps) => void
}
type PasswordFormData = z.infer<typeof ResetPasswordSchema>
function PasswordStep({ resetToken, setStep, setError, error }: props) {
   const [showPassword, setShowPassword] = useState(false)
   const [showConfirmPassword, setShowConfirmPassword] = useState(false)

   const {
      register,
      handleSubmit,
      formState: { errors: formErrors, isSubmitting },
      reset: resetForm,
   } = useForm<PasswordFormData>({
      resolver: zodResolver(ResetPasswordSchema),
      defaultValues: {
         token: resetToken,
      },
   })
   const resetPassword = useMutation({
      mutationFn: authService.resetPassword,
   })

   const handlePasswordReset = async (data: PasswordFormData) => {
      try {
         await resetPassword.mutateAsync({
            token: resetToken,
            password: data.password,
            confirmPassword: data.confirmPassword,
         })
         setStep('success')
         resetForm()
      } catch (error) {
         const axiosError = error as AxiosError<ZodErrorResponse>
         const firstDetail = axiosError.response?.data?.details?.[0]?.message
         const fallback = axiosError.response?.data?.message || 'Failed to reset password'
         setError(firstDetail || fallback)
      }
   }

   return (
      <div>
         <div className="space-y-4">
            <motion.div
               initial={{ y: -10, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.2 }}
               className="text-center space-y-2"
            >
               <h2 className="text-2xl font-medium text-foreground">Set New Password</h2>
               <p className="text-muted-foreground text-sm pb-5">Enter your new password below</p>
            </motion.div>
         </div>
         <motion.div
            key="password-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
         >
            <form onSubmit={handleSubmit(handlePasswordReset)} className="space-y-4">
               <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative">
                     <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter new password"
                        {...register('password')}
                        className="pr-10"
                     />
                     <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                     >
                        {showPassword ? (
                           <EyeOff className="h-4 w-4" />
                        ) : (
                           <Eye className="h-4 w-4" />
                        )}
                     </Button>
                  </div>
                  {formErrors.password && (
                     <p className="text-sm text-destructive">{formErrors.password.message}</p>
                  )}
               </div>

               <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                     <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm new password"
                        {...register('confirmPassword')}
                        className="pr-10"
                     />
                     <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                     >
                        {showConfirmPassword ? (
                           <EyeOff className="h-4 w-4" />
                        ) : (
                           <Eye className="h-4 w-4" />
                        )}
                     </Button>
                  </div>
                  {formErrors.confirmPassword && (
                     <p className="text-sm text-destructive">
                        {formErrors.confirmPassword.message}
                     </p>
                  )}
                  {formErrors.token && (
                     <p className="text-sm text-destructive">{formErrors.token.message}</p>
                  )}
               </div>

               {error && (
                  <motion.div
                     initial={{ opacity: 0, y: -5 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="p-3 bg-destructive/10 border border-destructive/20 rounded-md"
                  >
                     <p className="text-sm text-destructive">{error}</p>
                  </motion.div>
               )}

               <Button type="submit" disabled={isSubmitting} className="w-full h-11">
                  {isSubmitting ? (
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
                        <span>Resetting Password...</span>
                     </div>
                  ) : (
                     <div className="flex items-center space-x-2">
                        <Lock className="w-4 h-4" />
                        <span>Reset Password</span>
                     </div>
                  )}
               </Button>
            </form>
         </motion.div>
      </div>
   )
}

export default PasswordStep
