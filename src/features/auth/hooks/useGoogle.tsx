import { useMutation } from '@tanstack/react-query'
import type { AuthResponse, LoginCredentials } from '../schema'
import { authService } from '@/features/auth'

function useGoogle() {
  return useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: authService.login
  })
}

export default useGoogle
