import { useEffect } from 'react'
import { authService } from '@/api/services'

export const useAuthInit = () => {
  useEffect(() => {
    const init = async () => {
      try {
        await authService.refresh()
      } catch (err) {
        console.log(err)
        console.warn('No valid session found.')
      }
    }
    init()
  }, [])
}
