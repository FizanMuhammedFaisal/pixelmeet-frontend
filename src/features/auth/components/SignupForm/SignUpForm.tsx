import { useForm, type SubmitHandler } from 'react-hook-form'
import { cn } from '@/shared/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { type ZodErrorResponse } from '@/shared/schema'
import type { AxiosError } from 'axios'
import { toast } from 'sonner'
import { Link } from 'react-router'
import GoogleAuthButton from '../GoogleLoginButton/GoogleLoginButton'
import type { CredentialResponse } from '@react-oauth/google'
import { signUpSchema, type SignUpCredentials } from '@/features/auth'
import { authService } from '@/features/auth'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import SubmitButton from '@/components/ui/submit-button'
import useGoogle from '../../hooks/useGoogle'

type FormFields = SignUpCredentials
type SignUpFormProps = {
   setShowOTP: (value: boolean) => void // your custom prop
   setEmail: (email: string) => void
} & React.ComponentProps<'div'>
export function SignUpForm({ className, setShowOTP, setEmail, ...props }: SignUpFormProps) {
   const {
      register,
      handleSubmit,
      setError,
      reset,
      formState: { errors, isSubmitting },
   } = useForm<FormFields>({
      resolver: zodResolver(signUpSchema),
   })
   const submit: SubmitHandler<FormFields> = async (data) => {
      setEmail(data.email)
      mutation.mutate(data)
   }

   const mutation = useMutation({
      mutationFn: authService.signUp,
      onSuccess: (data) => {
         setShowOTP(true)
         reset()
      },
      onError: (error) => {
         console.log(error)
         const axiosError = error as AxiosError<ZodErrorResponse>
         const firstDetail = axiosError.response?.data?.details?.[0]?.message
         const fallback = axiosError.response?.data?.message || 'Something went wrong'

         setError('root', {
            message: firstDetail || fallback,
         })
      },
   })
   const { mutateAsync: googleLogin } = useGoogle()
   const handleGoogleLogin = async (data: CredentialResponse) => {
      try {
         await googleLogin({ isGoogle: true, code: data.credential })
         toast.success('Logged In')
      } catch (error) {
         toast.error('Try Loggin In Again')
      }
   }
   return (
      <div className={cn('flex flex-col gap-6', className)} {...props}>
         <form onSubmit={handleSubmit(submit)}>
            <div className="flex flex-col gap-6">
               <div className="text-center">
                  <h2 className="text-2xl font-bold text-foreground">Create your account</h2>
                  <p className="text-muted-foreground mt-1">Sign up for your PixelMeet account</p>
               </div>

               <div className="flex flex-col gap-4">
                  {errors.root && (
                     <div className="text-destructive text-sm text-center">
                        {errors.root.message}
                     </div>
                  )}

                  <div className="grid gap-1.5">
                     <Label htmlFor="username">Name</Label>
                     <Input
                        {...register('username', {
                           required: 'Name is required',
                           setValueAs: (v) => v.trim(),
                        })}
                        id="username"
                        type="text"
                        placeholder="Enter your name..."
                        className="h-11"
                     />
                     {errors.username && (
                        <div className="text-destructive text-sm">{errors.username.message}</div>
                     )}
                  </div>
                  <div className="grid gap-1.5">
                     <Label htmlFor="email">Email</Label>
                     <Input
                        {...register('email', {
                           required: 'Email is required',
                           setValueAs: (v) => v.trim(),
                        })}
                        id="email"
                        type="text"
                        placeholder="Enter your email address..."
                        className="h-11"
                     />
                     {errors.email && (
                        <div className="text-destructive text-sm">{errors.email.message}</div>
                     )}
                  </div>
                  <div className="grid gap-1.5">
                     <Label htmlFor="password">Password</Label>
                     <Input
                        {...register('password')}
                        id="password"
                        type="password"
                        placeholder="Create a password..."
                        className="h-11"
                     />
                     {errors.password && (
                        <div className="text-destructive text-sm">{errors.password.message}</div>
                     )}
                  </div>
                  <div className="grid gap-1.5">
                     <Label htmlFor="confirmPassword">Confirm Password</Label>
                     <Input
                        {...register('confirmPassword')}
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password..."
                        className="h-11"
                     />
                     {errors.confirmPassword && (
                        <div className="text-destructive text-sm">
                           {errors.confirmPassword.message}
                        </div>
                     )}
                  </div>
                  <SubmitButton
                     type="submit"
                     variant="special"
                     isLoading={isSubmitting}
                     processingName="Creating account..."
                     className="w-full h-11 cursor-pointer"
                  >
                     Continue
                  </SubmitButton>
                  <p className="text-sm text-muted-foreground text-center">
                     Already have an account?{' '}
                     <Link
                        to={'/login'}
                        className="text-primary hover:underline underline-offset-4 font-medium"
                     >
                        Log in
                     </Link>
                  </p>
               </div>
               <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-background text-muted-foreground relative z-10 px-3">
                     or continue with email
                  </span>
               </div>
               <div className="flex w-full">
                  <GoogleAuthButton onLoginSuccess={handleGoogleLogin} />
               </div>
            </div>
         </form>
      </div>
   )
}
