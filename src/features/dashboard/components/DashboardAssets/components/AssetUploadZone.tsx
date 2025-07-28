import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, Plus } from 'lucide-react'

interface AssetUploadZoneProps {
  onUpload: () => void
}

export function AssetUploadZone({ onUpload }: AssetUploadZoneProps) {
  return (
    <Card className='border-dashed border-2 hover:border-primary/50 transition-colors'>
      <CardContent className='flex flex-col items-center justify-center p-8 text-center'>
        <Upload className='h-12 w-12 text-muted-foreground mb-4' />
        <h3 className='font-semibold mb-2'>Upload Assets</h3>
        <p className='text-sm text-muted-foreground mb-4'>
          Drag and drop files here or click to browse
        </p>
        <Button onClick={onUpload} className='gap-2'>
          <Plus className='h-4 w-4' />
          Add Files
        </Button>
      </CardContent>
    </Card>
  )
}
