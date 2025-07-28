import { useEffect } from 'react'
import { authService } from '@/features/auth'

export const useAuthInit = () => {
  useEffect(() => {
    const init = async () => {
      try {
        const res = await authService.refresh()
        if (res) {
          await authService.refetchUser()
        }
      } catch (err) {
        console.log(err)
        console.warn('No valid session found.')
      }
    }
    init()
  }, [])
}
