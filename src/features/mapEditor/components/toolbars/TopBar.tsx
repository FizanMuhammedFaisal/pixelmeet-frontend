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
      <div className={`dark:bg-muted bg-white flex z-10 w-full p-2 justify-between ${className}`}>
         <div>
            <SubmitButton onClick={() => saveMap()} processingName="Saving" isLoading={isSaving}>
               <span className="flex">
                  {' '}
                  <SaveIcon /> Save
               </span>
            </SubmitButton>
         </div>
         <ThemeToggle onThemeChange={handleOnThemeChange} speed={0.5} />
      </div>
   )
}

export default TopBar
