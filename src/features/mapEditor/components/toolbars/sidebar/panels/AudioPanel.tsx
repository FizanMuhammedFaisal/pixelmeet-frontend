import { Button } from '@/components/button'
import { Upload, Volume2 } from 'lucide-react'

function AudioPanel() {
   return (
      <div className="h-full bg-muted/20 rounded border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center gap-2">
         <Volume2 className="h-8 w-8 text-muted-foreground" />
         <span className="text-muted-foreground text-xs">Drop audio files here</span>
         <Button variant="outline" size="sm" className="text-xs bg-transparent">
            <Upload className="h-3 w-3 mr-1" />
            Import Audio
         </Button>
      </div>
   )
}

export default AudioPanel
