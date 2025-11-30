import { GalleryVerticalEnd } from 'lucide-react'
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
import { Button } from '@/components/button'
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
                     <div className="flex flex-col items-center gap-2">
                        <a href="#" className="flex flex-col items-center gap-2 font-medium">
                           <div className="flex size-8 items-center justify-center rounded-md">
                              <GalleryVerticalEnd className="size-6" />
                           </div>
                           <span className="sr-only  ">Pixel Meet</span>
                        </a>
                        <h1 className="text-xl font-bold">Welcome to Pixel Meet.</h1>
                        <div className="text-center text-sm">
                           Don&apos;t have an account?{' '}
                           <Link to={'/signup'} className="underline underline-offset-4">
                              Sign up
                           </Link>
                        </div>
                     </div>
                     <div className="flex flex-col gap-4">
                        {errors.root && (
                           <div className="text-red-500 text-sm">{errors.root.message}</div>
                        )}
                        <div className="grid gap-2">
                           <Label htmlFor="email">Email</Label>
                           <Input
                              {...register('email', {
                                 required: 'Email is required',
                              })}
                              id="email"
                              type="text"
                              placeholder="m@example.com"
                           />
                           {loginErrors.email && (
                              <div className="text-red-500 text-sm">
                                 {loginErrors.email.message}
                              </div>
                           )}
                        </div>
                        <div className="grid gap-2">
                           <div className="flex justify-between">
                              <Label htmlFor="email">Password</Label>
                              <span className="text-center text-sm text-zinc-500">
                                 <Link
                                    to={'/forgot-password'}
                                    className="hover:underline underline-offset-4"
                                 >
                                    forgot password?
                                 </Link>
                              </span>
                           </div>
                           <Input
                              {...register('password')}
                              id="password"
                              type="password"
                              placeholder="*******"
                           />
                           {loginErrors.password && (
                              <div className="text-red-500 text-sm">
                                 {loginErrors.password.message}
                              </div>
                           )}
                        </div>
                        <Button
                           type="submit"
                           variant={'special'}
                           disabled={isSubmitting}
                           className="w-full cursor-pointer "
                        >
                           Login
                        </Button>
                     </div>
                     <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                        <span className="bg-background text-muted-foreground relative z-10 px-2">
                           Or
                        </span>
                     </div>
                     <div className="flex w-full">
                        <GoogleLoginButton onLoginSuccess={handleGoogleLogin} />
                     </div>
                  </div>
               </form>
               <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                  By clicking continue, you agree to our <a href="#">Terms of Service</a> and{' '}
                  <a href="#">Privacy Policy</a>.
               </div>
            </div>
         )}
      </div>
   )
}
