// src/App.tsx
import { Routes, Route } from "react-router-dom"
import { Button } from "@/components/ui/button"
import AuthLayout from "./pages/auth/auth-layout"
import { useEffect } from "react"
// Example page components
import Login from "./pages/auth/login"
import Register from "./pages/auth/register"
import { useState } from "react"
import MainHome from "./pages/main-menu/main-home"
import { useAuthStore } from "./lib/state/logged-user"
import { TokenStorage } from "./lib/local-storage/token"
import { UserService } from "./services/user-service"
import { PublicRoutes, ProtectedRoutes } from "./lib/routes"
import { toast } from "sonner"
export function App() {
  const [isLoading, setIsLoading] = useState(true)
  const setUser = useAuthStore((state) => state.setUser)
  const logout = useAuthStore((state) => state.logout)

  useEffect(() => {
    const initAuth = async () => {
      const tokenBefore = TokenStorage.getToken()
      console.log("Token BEFORE API call:", tokenBefore)
      if (tokenBefore) {
        const response = await UserService.fromToken(tokenBefore)
        console.log("API response success?", response.isSuccess())
        if (!response.isSuccess()) {
          console.warn("Removing token due to failed validation")
          TokenStorage.removeToken()
          logout()
        }
      }
      const tokenAfter = TokenStorage.getToken()
      console.log("Token AFTER initAuth:", tokenAfter)
      setIsLoading(false)
    }
    initAuth()
  }, [logout, setUser]) // dependencies are stable

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    )
  }
  return (
    <Routes>
      {/* Auth routes with layout */}
      <Route element={<AuthLayout />}>
        <Route path={PublicRoutes.Login} element={<Login />} />
        <Route path={PublicRoutes.Register} element={<Register />} />
      </Route>

      {/* Public or other routes */}
      <Route path={PublicRoutes.Home} element={<MainHome />} />

      {/* Example using Button */}
      <Route
        path="/test-button"
        element={<Button onClick={() => alert("Clicked!")}>Click me</Button>}
      />
    </Routes>
  )
}

export default App
