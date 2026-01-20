import { useForm, type FieldErrors, type SubmitHandler } from 'react-hook-form'
import { cn, GlobalMutationError } from '@/shared/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { type ZodErrorResponse } from '@/shared/schema'
import type { Axios, AxiosError } from 'axios'
import { toast } from 'sonner'
import { Link } from 'react-router'
import GoogleLoginButton from '../GoogleLoginButton/GoogleLoginButton'
import type { CredentialResponse } from '@react-oauth/google'
import { useState } from 'react'
import UserVerificationForm from './UserVerificationForm'
import { loginSchema, type LoginCredentials } from '../../schema'
import { authService } from '../../services'
import useGoogle from '../../hooks/useGoogle'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import SubmitButton from '@/components/ui/submit-button'
import type { ErrorResponse } from '../../../../shared/types'

type FormFields = LoginCredentials
type LoginFormFormProps = {
   setShowOTP: (value: boolean) => void
   setEmail: (email: string) => void
} & React.ComponentProps<'div'>
export function LoginForm({
   className,
   setShowOTP,
   setEmail,

   ...props
}: LoginFormFormProps) {
   const {
      register,
      handleSubmit,
      setError,
      reset,
      formState: { errors, isSubmitting },
   } = useForm<FormFields>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         role: 'user',
         isGoogle: false,
      },
   })
   const [showUserVerificationForm, setShowUserVerificationForm] = useState(false)
   const [isGoogleLoading, setIsGoogleLoading] = useState(false)

   const submit: SubmitHandler<FormFields> = async (data) => {
      mutation.mutate(data)
   }

   const mutation = useMutation({
      mutationFn: authService.login,
      onSuccess: (data) => {
         toast('Logged In')
         reset()
      },
      onError: (error, variables, context) => {
         console.log(error)
         const axiosError = error as AxiosError<ZodErrorResponse>
         const firstDetail = axiosError.response?.data?.details?.[0]?.message
         const fallback = axiosError.response?.data?.message || 'Something went wrong'
         GlobalMutationError(axiosError)
         setError('root', {
            message: firstDetail || fallback,
         })
         if (
            axiosError.response?.data.message === 'Email is not Verified' &&
            axiosError.status === 403
         ) {
            setShowUserVerificationForm(true)
         }
      },
   })
   const { mutateAsync: googleLogin } = useGoogle()
   const handleGoogleLogin = async (data: CredentialResponse) => {
      setIsGoogleLoading(true)
      try {
         await googleLogin({ isGoogle: true, code: data.credential })
         toast.success('Logged In')
      } catch (error) {
         console.log(error)
         const axiosError = error as AxiosError<ErrorResponse>
         const firstDetail = axiosError.response?.data?.issues?.[0]?.message
         const fallback = axiosError.response?.data?.message || 'Something went wrong Try Again'

         toast.error(firstDetail || fallback)

         if (
            axiosError.response?.data.message === 'Email is not Verified' &&
            axiosError.status === 403
         ) {
            setShowUserVerificationForm(true)
         }
      } finally {
         setIsGoogleLoading(false)
      }
   }
   const loginErrors = errors as FieldErrors<{
      email: string
      password: string
   }>
   return (
      <div>
         {showUserVerificationForm === true ? (
            <UserVerificationForm setEmail={setEmail} setShowOTP={setShowOTP} />
         ) : (
            <div className={cn('flex flex-col gap-6', className)} {...props}>
               <form onSubmit={handleSubmit(submit)}>
                  <div className="flex flex-col gap-6">
                     <div className="text-center">
                        <p className="text-muted-foreground">Log in to your PixelMeet account</p>
                     </div>

                     <div className="flex flex-col gap-4">
                        {errors.root && (
                           <div className="text-destructive text-sm text-center">
                              {errors.root.message}
                           </div>
                        )}
                        <div className="grid gap-1.5">
                           <Label htmlFor="email">Email</Label>
                           <Input
                              {...register('email', {
                                 required: 'Email is required',
                              })}
                              id="email"
                              type="text"
                              placeholder="john@example.com"
                           />
                           {loginErrors.email && (
                              <div className="text-destructive text-sm">
                                 {loginErrors.email.message}
                              </div>
                           )}
                        </div>
                        <div className="grid gap-1.5">
                           <div className="flex justify-between">
                              <Label htmlFor="password">Password</Label>
                              <Link
                                 to={'/forgot-password'}
                                 className="text-sm text-muted-foreground hover:text-primary"
                              >
                                 Forgot password?
                              </Link>
                           </div>
                           <Input
                              {...register('password')}
                              id="password"
                              type="password"
                              placeholder="••••••••"
                           />
                           {loginErrors.password && (
                              <div className="text-destructive text-sm">
                                 {loginErrors.password.message}
                              </div>
                           )}
                        </div>
                        <SubmitButton
                           type="submit"
                           variant="special"
                           isLoading={isSubmitting || isGoogleLoading}
                           processingName={
                              isGoogleLoading ? 'Signing in with Google...' : 'Logging in...'
                           }
                           className="w-full h-11 cursor-pointer"
                        >
                           Continue
                        </SubmitButton>
                        <p className="text-sm text-muted-foreground text-center">
                           Don&apos;t have an account?{' '}
                           <Link
                              to={'/signup'}
                              className="text-primary hover:underline underline-offset-4 font-medium"
                           >
                              Sign up
                           </Link>
                        </p>
                     </div>
                     <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                        <span className="bg-background text-muted-foreground relative z-10 px-3">
                           or continue with email
                        </span>
                     </div>
                     <div className="flex w-full">
                        <GoogleLoginButton onLoginSuccess={handleGoogleLogin} />
                     </div>
                  </div>
               </form>
            </div>
         )}
      </div>
   )
}
