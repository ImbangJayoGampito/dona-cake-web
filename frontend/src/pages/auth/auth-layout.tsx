import AuthFooter from "@/components/auth/auth-footer"
import { AppHeader } from "@/components/layout/header"
import { Outlet } from "react-router-dom"

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1">
        <div className="container mx-auto flex min-h-[calc(100vh-120px)] items-center justify-center px-4 py-8 md:px-6">
          <div className="grid w-full max-w-6xl overflow-hidden rounded-lg border bg-background shadow-lg md:grid-cols-2">
            {/* Left side – image & testimonial (hidden on mobile) */}
            <div className="relative hidden md:block">
              <img
                src="https://picsum.photos/id/106/800/1000"
                alt="Delicious cake dessert"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute right-0 bottom-0 left-0 p-6 md:p-8">
                <blockquote className="space-y-2">
                  <p className="text-lg font-medium text-white md:text-xl">
                    "Kue terbaik yang pernah saya coba! Rasanya luar biasa dan
                    pengiriman cepat."
                  </p>
                  <footer className="text-sm text-white/80">
                    — Sarah Wijaya
                  </footer>
                </blockquote>
              </div>
            </div>

            {/* Right side – dynamic form content */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </main>
      <AuthFooter />
    </div>
  )
}
