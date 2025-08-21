import { ThemeToggle } from '@/shared/layout/Dashboard/ThemeButton'
import type { ThemeType } from '../../types/types'
import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'
import { useEditorActions } from '@/app/store/mapEditor/mapEditor'

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
   const { exportMap } = useEditorActions()
   const handleSave = () => {
      const map = exportMap()
      console.log(JSON.stringify(map))
   }
   return (
      <div className={`dark:bg-muted bg-white flex z-10 w-full p-2 justify-between ${className}`}>
         <div>
            <Button onClick={() => handleSave()}>
               <span>Save</span>
               <Save />
            </Button>
         </div>
         <ThemeToggle onThemeChange={handleOnThemeChange} speed={0.5} />
      </div>
   )
}

export default TopBar
