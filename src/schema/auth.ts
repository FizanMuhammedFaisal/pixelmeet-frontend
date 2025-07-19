import z from 'zod'

export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
})

export type LoginCredentials = z.infer<typeof loginSchema>
