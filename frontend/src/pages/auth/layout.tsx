import AuthHeader from "@/components/auth/auth-header"
import AuthFooter from "@/components/auth/auth-footer"

import { Outlet } from "react-router-dom"

export default function AuthLayout() {
  return (
    <div className="auth-container">
      <AuthHeader />
      <main>
        <Outlet /> {/* Child routes will render here */}
      </main>
      <AuthFooter />
    </div>
  )
}
