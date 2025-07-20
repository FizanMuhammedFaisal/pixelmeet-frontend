import z from 'zod'

export const loginSchema = z.object({
  email: z.email().min(1, 'Email is required'),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
  role: z.enum(['user', 'admin'])
})

export type LoginCredentials = z.infer<typeof loginSchema>

export const signUpSchema = z.object({
  email: z.email('Invalid email format').min(1, 'Email is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[^a-zA-Z0-9]/,
      'Password must contain at least one special character'
    ),
  username: z.string().min(3, 'Username must be at least 3 characters')
})

export type SignUpCredentials = z.infer<typeof signUpSchema>
