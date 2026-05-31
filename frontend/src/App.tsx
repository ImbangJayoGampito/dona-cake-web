// src/App.tsx
import { Routes, Route } from "react-router-dom"
import { Button } from "@/components/ui/button"
import AuthLayout from "./pages/auth/layout"

// Example page components
import Login from "./pages/auth/login"
import Register from "./pages/auth/register"
import Homepage from "./pages/homepage"
import MainHome from "./pages/main-menu/main-home"
export function App() {
  return (
    <Routes>
      {/* Auth routes with layout */}
      <Route element={<AuthLayout />}>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Route>

      {/* Public or other routes */}
      <Route path="/" element={<Homepage />} />
      <Route path="/home" element={<MainHome />} />

      {/* Example using Button */}
      <Route
        path="/test-button"
        element={<Button onClick={() => alert("Clicked!")}>Click me</Button>}
      />
    </Routes>
  )
}

export default App
