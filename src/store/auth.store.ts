import { createStore } from 'zustand'

type AuthStoreState = { token: string | null }

type AuthStoreActions = {
  getToken: () => string | null
}

type AuthStore = AuthStoreState & AuthStoreActions

const useAuthStore = createStore<AuthStore>()((set, get) => ({
  token: null,
  getToken() {
    return get().token
  }
}))

export default useAuthStore
