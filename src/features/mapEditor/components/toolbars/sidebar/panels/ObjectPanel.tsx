import { Button } from '@/components/ui/button'
import { Circle, Square, Triangle } from 'lucide-react'

function ObjectPanel() {
   return (
      <div className="h-full space-y-2">
         <div className="grid grid-cols-3 gap-1">
            <Button variant="outline" size="sm" className="aspect-square p-0 bg-transparent">
               <Square className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="aspect-square p-0 bg-transparent">
               <Circle className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="aspect-square p-0 bg-transparent">
               <Triangle className="h-4 w-4" />
            </Button>
         </div>
         <div className="flex-1 bg-muted/20 rounded border border-muted-foreground/25 p-2">
            <div className="text-xs text-muted-foreground mb-2">Recent Objects</div>
            <div className="space-y-1">
               <div className="text-xs p-1 bg-background rounded">Tree_01</div>
               <div className="text-xs p-1 bg-background rounded">Rock_02</div>
               <div className="text-xs p-1 bg-background rounded">House_03</div>
            </div>
         </div>
      </div>
   )
}

export default ObjectPanel
