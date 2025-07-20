import { GalleryVerticalEnd } from 'lucide-react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import {
  loginSchema,
  type LoginCredentials,
  type ZodErrorResponse
} from '@/schema'
import { authService } from '@/api/services'
import type { AxiosError } from 'axios'
import { toast } from 'sonner'
import { Link } from 'react-router'

type FormFields = LoginCredentials
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      role: 'user'
    }
  })
  const submit: SubmitHandler<FormFields> = async data => {
    mutation.mutate(data)
    reset()
  }

  const mutation = useMutation({
    mutationFn: authService.login,
    onSuccess: data => {
      toast.success('Logged In')
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
              Don&apos;t have an account?{' '}
              <Link to={'/signup'} className='underline underline-offset-4'>
                Sign up
              </Link>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            {errors.root && (
              <div className='text-red-500 text-sm'>{errors.root.message}</div>
            )}
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                {...register('email', {
                  required: 'Email is required'
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
            <Button
              type='submit'
              disabled={isSubmitting}
              className='w-full cursor-pointer bg-primary'
            >
              Login
            </Button>
          </div>
          <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
            <span className='bg-background text-muted-foreground relative z-10 px-2'>
              Or
            </span>
          </div>
          <div className='flex'>
            <Button variant='outline' type='button' className='w-full'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                <path
                  d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                  fill='currentColor'
                />
              </svg>
              Continue with Google
            </Button>
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
