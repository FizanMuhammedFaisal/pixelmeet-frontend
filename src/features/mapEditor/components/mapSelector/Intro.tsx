import { Button } from '@/components/ui/button'
import { Globe, Plus } from 'lucide-react'
type props = {
   setView: (view: string) => void
}
function Intro({ setView }: props) {
   return (
      <div className="fixed inset-0 z-50 bg-white/50 flex items-center justify-center p-5 h-full w-full">
         <div className="bg-background rounded-xl shadow-2xl w-full   flex flex-col relative overflow-hidden max-w-5/6 h-5/6">
            <div className="flex-1 flex items-center justify-center relative z-10 p-8">
               <div className="text-center max-w-4xl mx-auto">
                  <h1 className="text-6xl md:text-7xl font-bold mb-8  leading-tight">
                     Create 2D Worlds
                  </h1>

                  <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto">
                     Build immersive pixel-perfect maps where communities thrive.
                     <br />
                     <span className="text-primary font-medium">Design. Connect. Explore.</span>
                  </p>

                  <div className="flex items-center justify-center gap-4 flex-wrap">
                     <Button
                        size="lg"
                        className="font-semibold px-10 h-16 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                        onClick={() => setView('create')}
                     >
                        <Plus className="mr-2 h-5 w-5" />
                        Start Creating
                     </Button>
                     <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setView('maps')}
                        className="h-16 px-10 text-lg font-semibold border-2 hover:bg-muted/50"
                     >
                        <Globe className="mr-2 h-5 w-5" />
                        Explore Maps
                     </Button>
                  </div>

                  <p className="text-sm text-muted-foreground mt-8">
                     Join thousands of creators building the future of virtual spaces
                  </p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Intro
