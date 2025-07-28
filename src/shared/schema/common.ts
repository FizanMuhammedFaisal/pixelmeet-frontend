export type ZodErrorResponse = {
  message: string
  details?: {
    path: string
    message: string
    code: string
  }[]
}
