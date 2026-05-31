import { User } from "@/models/user.model"
import { TokenStorage } from "../local-storage/token"

import { create } from "zustand"
interface AuthStore {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
  loadUser: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => {
    TokenStorage.removeToken()
    set({ user: null })
  },
  loadUser: async () => {
    try {
      const user = await fetchCurrentUser()
      set({ user })
    } catch (error) {
      set({ user: null })
    }
  },
}))
