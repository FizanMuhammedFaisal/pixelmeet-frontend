import type React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail } from 'lucide-react'

type FormData = {
   email: string
   confirmEmail: string
}

type Props = {
   setEmail: (email: string) => void
   setShowResetPassword: (show: boolean) => void
} & React.ComponentProps<'div'>

function ForgotPasswordForm({ setEmail, setShowResetPassword, ...props }: Props) {
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors, isSubmitting },
   } = useForm<FormData>()

   watch('email')

   const onSubmit = async (data: FormData) => {
      setEmail(data.email)
      setShowResetPassword(true)
   }

   return (
      <Card className="w-full max-w-md mx-auto" {...props}>
         <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
               <Mail className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>Email Verification Required</CardTitle>
            <CardDescription>
               To continue, please verify your email address. Enter your email below and we'll send
               you a verification code.
            </CardDescription>
         </CardHeader>
         <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
               <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                     id="email"
                     type="email"
                     placeholder="m@example.com"
                     {...register('email', {
                        required: 'Email is required',
                        pattern: {
                           value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                           message: 'Please enter a valid email address',
                        },
                     })}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
               </div>

               <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Processing...' : 'Confirm Email'}
               </Button>
            </form>
         </CardContent>
      </Card>
   )
}

export default ForgotPasswordForm
