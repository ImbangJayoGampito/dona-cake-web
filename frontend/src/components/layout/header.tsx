// src/components/Footer.tsx
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Rocket, Shield, Zap, Globe, ChevronRight, Menu, Bot } from "lucide-react"
import { useState } from "react"
import { User } from "@/models/user.model"
import { useAuthStore } from "@/lib/state/logged-user"
import { UserAvatarDropdown } from "@/components/user-avatar-dropdown"
import { ModeToggle } from "@/components/mode-toggle"
import { PublicRoutes, ProtectedRoutes } from "@/lib/routes"
import { useNavigate } from "react-router-dom"

export function AppHeader() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const user = useAuthStore((state) => state.user)
  function registerRedirect() {
    navigate(PublicRoutes.Register)
  }
  function logInRedirect() {
    navigate(PublicRoutes.Login)
  }
  function redirectTo(url: string) {
    navigate(url)
  }

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-xl font-bold text-transparent">
            DonaCake
          </span>

          {/* Desktop menu */}
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-end">
            {user ? (
              <>
                {/* Centered navigation buttons */}
                <div className="flex flex-1 justify-center gap-6">
                  <Button
                    onClick={() => {
                      redirectTo("/")
                    }}
                    variant="ghost"
                  >
                    Beranda
                  </Button>
                  <Button
                    onClick={() => {
                      redirectTo(PublicRoutes.Katalog)
                    }}
                    variant="ghost"
                  >
                    Katalog
                  </Button>
                  <Button
                    onClick={() => {
                      redirectTo(PublicRoutes.CreateBooking)
                    }}
                    variant="ghost"
                  >
                    Custom Cake
                  </Button>
                  <Button
                    onClick={() => {
                      redirectTo(ProtectedRoutes.Cart)
                    }}
                    variant="ghost"
                  >
                    Keranjang
                  </Button>
                  <Button
                    onClick={() => redirectTo(ProtectedRoutes.Pantau)}
                    variant="ghost"
                  >
                    Pantau
                  </Button>
                </div>
                {/* Avatar on the far right */}
                <div className="ml-4 flex items-center gap-2">
                  <Button
                    onClick={() => redirectTo("/asisten-virtual")}
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full"
                    title="Asisten AI"
                  >
                    <Bot className="h-5 w-5" />
                  </Button>
                  <UserAvatarDropdown />
                  <ModeToggle />
                </div>
              </>
            ) : (
              <div className="flex gap-3">
                <Button variant="outline" onClick={registerRedirect}>
                  Daftar
                </Button>
                <Button variant="outline" onClick={logInRedirect}>
                  Masuk
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu using Sheet */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <div className="mt-8 flex flex-col gap-4">
                {user ? (
                  <>
                    {/* Navigation buttons */}
                    <Button
                      onClick={() => {
                        redirectTo("/")
                      }}
                      variant="ghost"
                      className="w-full justify-center"
                    >
                      Beranda
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-center"
                      onClick={() => {
                        redirectTo(PublicRoutes.Katalog)
                      }}
                    >
                      Katalog
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-center"
                      onClick={() => {
                        redirectTo(PublicRoutes.CreateBooking)
                      }}
                    >
                      Custom Cake
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-center"
                      onClick={() => {
                        redirectTo(ProtectedRoutes.Cart)
                      }}
                    >
                      Keranjang
                    </Button>
                    <Button
                      onClick={() => redirectTo(ProtectedRoutes.Pantau)}
                      variant="ghost"
                    >
                      Pantau
                    </Button>
                    <Button
                      onClick={() => redirectTo("/asisten-virtual")}
                      variant="ghost"
                      className="w-full justify-center gap-2"
                    >
                      <Bot className="h-4 w-4" />
                      Asisten AI
                    </Button>

                    <div className="justify-center border-t pt-4">
                      <UserAvatarDropdown />
                    </div>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="w-full justify-center"
                      onClick={registerRedirect}
                    >
                      Daftar
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-center"
                      onClick={logInRedirect}
                    >
                      Masuk
                    </Button>
                  </>
                )}

                <div className="border-t pt-4 *:justify-center">
                  <ModeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
