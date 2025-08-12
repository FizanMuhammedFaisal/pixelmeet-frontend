import { ThemeToggle } from '@/shared/layout/Dashboard/ThemeButton'
import type { ThemeType } from '../../types/types'

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
   return (
      <div className={`dark:bg-muted bg-white flex z-10 w-full justify-between ${className}`}>
         <div>asdfasdf</div>
         <ThemeToggle onThemeChange={handleOnThemeChange} speed={0.5} />
      </div>
   )
}

export default TopBar
