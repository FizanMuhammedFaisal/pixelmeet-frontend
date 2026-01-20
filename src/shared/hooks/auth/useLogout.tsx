import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { authService } from '@/features/auth'
import useAuthStore from '@/app/store/auth.store'

export const useLogout = () => {
   const navigate = useNavigate()
   const { logout } = useAuthStore()

   return useMutation({
      mutationFn: authService.logout,
      onSuccess: () => {
         logout()
         toast.success('Logged out successfully')
         navigate('/auth/login')
      },
      onError: () => {
         // Even if API fails, we should probably log the user out locally
         logout()
         toast.error('Failed to logout from server, but logged out locally')
         navigate('/auth/login')
      },
   })
}
