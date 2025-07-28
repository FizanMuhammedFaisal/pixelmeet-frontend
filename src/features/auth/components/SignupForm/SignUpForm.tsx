import { GalleryVerticalEnd } from 'lucide-react'
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
import { Button } from '@/components/ui/button'
import useGoogle from '../../hooks/useGoogle'

type FormFields = SignUpCredentials
type SignUpFormProps = {
  setShowOTP: (value: boolean) => void // your custom prop
  setEmail: (email: string) => void
} & React.ComponentProps<'div'>
export function SignUpForm({
  className,
  setShowOTP,
  setEmail,
  ...props
}: SignUpFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormFields>({
    resolver: zodResolver(signUpSchema)
  })
  const submit: SubmitHandler<FormFields> = async data => {
    setEmail(data.email)
    mutation.mutate(data)
  }

  const mutation = useMutation({
    mutationFn: authService.signUp,
    onSuccess: data => {
      setShowOTP(true)
      reset()
    },
    onError: error => {
      console.log(error)
      const axiosError = error as AxiosError<ZodErrorResponse>
      const firstDetail = axiosError.response?.data?.details?.[0]?.message
      const fallback =
        axiosError.response?.data?.message || 'Something went wrong'

      setError('root', {
        message: firstDetail || fallback
      })
    }
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
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-center gap-2'>
            <a
              href='#'
              className='flex flex-col items-center gap-2 font-medium'
            >
              <div className='flex size-8 items-center justify-center rounded-md'>
                <GalleryVerticalEnd className='size-6' />
              </div>
              <span className='sr-only  '>Pixel Meet</span>
            </a>
            <h1 className='text-xl font-bold'>Welcome to Pixel Meet.</h1>
            <div className='text-center text-sm'>
              already have an account?{' '}
              <Link to={'/login'} className='underline underline-offset-4'>
                Login
              </Link>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            {errors.root && (
              <div className='text-red-500 text-sm'>{errors.root.message}</div>
            )}

            <div className='grid gap-2'>
              <Label htmlFor='name'>Name</Label>
              <Input
                {...register('username', {
                  required: 'Name is required',
                  setValueAs: v => v.trim()
                })}
                id='username'
                type='text'
                placeholder='me'
              />
              {errors.username && (
                <div className='text-red-500 text-sm'>
                  {errors.username.message}
                </div>
              )}
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                {...register('email', {
                  required: 'Email is required',
                  setValueAs: v => v.trim()
                })}
                id='email'
                type='text'
                placeholder='m@example.com'
              />
              {errors.email && (
                <div className='text-red-500 text-sm'>
                  {errors.email.message}
                </div>
              )}
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Password</Label>
              <Input
                {...register('password')}
                id='password'
                type='password'
                placeholder='*******'
              />
              {errors.password && (
                <div className='text-red-500 text-sm'>
                  {errors.password.message}
                </div>
              )}
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Confirm Password</Label>
              <Input
                {...register('confirmPassword')}
                id='confirm password'
                type='password'
                placeholder='*******'
              />
              {errors.confirmPassword && (
                <div className='text-red-500 text-sm'>
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>
            <Button
              type='submit'
              disabled={isSubmitting}
              className='w-full cursor-pointer'
            >
              Sign Up
            </Button>
          </div>
          <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
            <span className='bg-background text-muted-foreground relative z-10 px-2'>
              Or
            </span>
          </div>
          <div className='flex'>
            <GoogleAuthButton onLoginSuccess={handleGoogleLogin} />
          </div>
        </div>
      </form>
      <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a>{' '}
        and <a href='#'>Privacy Policy</a>.
      </div>
    </div>
  )
}
