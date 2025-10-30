import { AlertCircle, CheckCircle, PlayCircle } from 'lucide-react'
import type { UploadStatus } from '../../../../types'
import { Spinner } from '../../../../../../components/ui/spinner'

export const getStatusIcon = (currentStatus: UploadStatus) => {
   switch (currentStatus) {
      case 'pending':
         return <PlayCircle className="w-4 h-4 text-muted-foreground" />
      case 'uploading':
         return <Spinner />
      case 'uploaded':
         return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'failed':
         return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
         return null
   }
}

export const getStatusBadgeVariant = (currentStatus: UploadStatus) => {
   switch (currentStatus) {
      case 'pending':
         return 'outline'
      case 'uploading':
         return 'default'
      case 'uploaded':
         return 'success'
      case 'failed':
         return 'destructive'
      default:
         return 'secondary'
   }
}
