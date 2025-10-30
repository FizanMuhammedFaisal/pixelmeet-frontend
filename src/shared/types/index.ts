export * from './upload'
export * from './map/map'
export * from './map/map.api'
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
