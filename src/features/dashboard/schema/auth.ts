import { emailSchema, passwordSchema, roleSchema } from '@/shared/schema'
import z from 'zod'

export const loginSchema = z.discriminatedUnion('isGoogle', [
  // Normal login
  z.object({
    isGoogle: z.literal(false),
    email: emailSchema,
    password: passwordSchema,
    role: roleSchema
  }),

  // Google login
  z.object({
    isGoogle: z.literal(true),

    code: z.string().optional() // For Authorization Code flow (from button)
    // token: z.string().optional() // For ID Token flow (from One Tap or implicit button)
  })
  // .refine(data => data.code || data.token, {
  //   message:
  //     "For Google login, either 'code' (authorization code) or 'token' (ID token) must be provided.",
  //   path: ['code', 'token']
  // }) // for maybe in future to addd normal google button so we ill ned the token
])

export type LoginCredentials = z.infer<typeof loginSchema>

export interface AuthResponse {
  success: boolean
  message: string
  accessToken: string
  user: {
    id: string
    username: string
    email: string
    role: 'admin' | 'user'
  }
}
export const signUpSchema = z
  .object({
    email: z.email('Invalid email format').min(1, 'Email is required').trim(),
    password: passwordSchema,
    confirmPassword: passwordSchema,
    username: z.string().min(3, 'Username must be at least 3 characters').trim()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

export type SignUpCredentials = z.infer<typeof signUpSchema>

export const sendOTPSchema = {
  email: z.email()
}

export type SendOTPCredentials = z.infer<typeof sendOTPSchema>
export const VerifyOTPSchema = {
  email: z.email(),
  otp: z.email()
}

export type VerifyOTPCredentials = z.infer<typeof VerifyOTPSchema>
export const LogoutSchema = {
  id: z.string()
}

export type LogoutCredentials = z.infer<typeof LogoutSchema>

export const SendPasswordResetTokenSchema = {
  email: z.email()
}
export type SendPasswordResetTokenCredentials = z.infer<
  typeof SendPasswordResetTokenSchema
>
export const VerifyPasswordResetTokenSchema = {
  token: z.string(),
  email: z.email()
}
export type VerifyPasswordResetTokenCredentials = z.infer<
  typeof VerifyPasswordResetTokenSchema
>
export type VerifyPasswordResetTokenResponse = {
  resetToken: string
}
export const ResetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
    token: z.string()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match'
  })
export type ResetPasswordCredentials = z.infer<typeof ResetPasswordSchema>
