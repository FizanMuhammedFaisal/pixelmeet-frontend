import { ThemeToggle } from '@/shared/layout/Dashboard/ThemeButton'
import type { ThemeType } from '../../types/types'
import { SaveIcon } from 'lucide-react'
import { useMapSave } from '../../hooks/useMapSave'
import SubmitButton from '@/components/ui/submit-button'

type props = {
   className?: string
   setTheme: (theme: ThemeType) => void
}
function TopBar({ className, setTheme }: props) {
   const handleOnThemeChange = (theme: string) => {
      if (theme === 'light') {
         setTheme('dark')
      } else {
         setTheme('light')
      }
   }

   const { saveMap, isSaving } = useMapSave()
   return (
      <div
         className={`bg-card/95 dark:bg-zinc-900/95 backdrop-blur-sm border-b border-border dark:border-zinc-800/60 flex z-10 w-full p-2 justify-between ${className}`}
      >
         <div>
            <SubmitButton
               onClick={() => saveMap()}
               processingName="Saving"
               isLoading={isSaving}
               className="px-4 py-2"
            >
               <div className="flex gap-0.5">
                  <SaveIcon className="w-6 h-6 pt-0.5" />
                  <span className="mb-0.5">Save</span>
               </div>
            </SubmitButton>
         </div>
         <ThemeToggle onThemeChange={handleOnThemeChange} speed={0.5} />
      </div>
   )
}

export default TopBar
