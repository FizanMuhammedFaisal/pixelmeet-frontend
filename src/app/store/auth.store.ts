import { create } from 'zustand'

type User = {
  id: string
  email: string
  name: string
  role: string
  verified: boolean
  blocked: boolean
  avatarId: string
  createdAt?: string
  updatedAt?: string
}
type Token = string | null
type AuthStoreState = {
  token: Token
  user: User | null
  isAuthenticated: boolean
  isInitialized: boolean
}

type AuthStoreActions = {
  setAuth: (user: User, token: Token) => void
  setIsInitialized: (isInitialized: boolean) => void
  clearAuth: () => void
  updateUser: (updates: Partial<User>) => void
}

type AuthStore = AuthStoreState & AuthStoreActions

const useAuthStore = create<AuthStore>()((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isInitialized: false,

  setAuth(user, token) {
    set({
      user,
      token,
      isAuthenticated: true,
      isInitialized: true
    })
  },
  setIsInitialized(isInitialized) {
    set({
      isInitialized
    })
  },
  clearAuth() {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isInitialized: true
    })
  },
  updateUser(updates) {
    const currentUser = get().user
    if (currentUser) {
      set({
        user: { ...currentUser, ...updates }
      })
    }
  }
}))

export default useAuthStore
// mobex
