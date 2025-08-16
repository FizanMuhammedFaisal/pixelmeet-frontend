import { Button } from '@/components/ui/button'
import { XIcon } from 'lucide-react'
type props = {
   isModalOpen: boolean
   setIsModalOpen: (is: boolean) => void
   children: React.ReactNode
   heading: string
}
function PanelAssetAdd({ isModalOpen, setIsModalOpen, children, heading }: props) {
   return (
      <div>
         <div
            className="absolute bg-card/10 backdrop-blur-md top-[100px] left-0 right-0 bottom-0 border-l border-muted/10
 z-50 shadow-lg"
         >
            <div className="flex justify-between px-4 ">
               <div className="text-lg font-medium text-center pt-2">{heading}</div>

               <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0  pr-4 m-1 hover:bg-card-foreground/10 bg-card-foreground/20 relative z-50"
                  onClick={() => setIsModalOpen(!isModalOpen)}
               >
                  <XIcon className="h-4 w-4" />
               </Button>
            </div>
            <div className="p-4 h-full flex flex-col">
               <div className="flex-1 flex  text-muted-foreground text-sm">{children}</div>
            </div>
         </div>
      </div>
   )
}

export default PanelAssetAdd
