export type ErrorResponse = {
  success: boolean
  message: string
  statusCode: number
  errorCode: string
  issues?: {
    path: string
    message: string
    code: string
  }[]
}
