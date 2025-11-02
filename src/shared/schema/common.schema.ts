import z from 'zod'

export const emailSchema = z.string().email({ message: 'Invalid email' })

export const passwordSchema = z
   .string()
   .min(8, { message: 'Password must be at least 8 characters' })
   .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message:
         'Password must contain at least one uppercase letter, one lowercase letter, and one number',
   })

export const roleSchema = z.enum(['user', 'admin'])

export const apiResponseSchema = z.object({
   success: z.boolean(),
   message: z.string(),
   data: z.any().optional(),
   errors: z.array(z.string()).optional(),
})
