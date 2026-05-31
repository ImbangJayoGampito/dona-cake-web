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
import { Rocket, Shield, Zap, Globe, ChevronRight, Menu } from "lucide-react"
import { useState } from "react"
function addByTwo(x: number) {
  return x + 2
}

export function AppHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-xl font-bold text-transparent">
            DonaCake
          </span>

          {/* Desktop menu */}
          <div className="hidden items-center space-x-8 md:flex">
            <Button variant="link" className="text-foreground">
              Features
            </Button>
            <Button variant="link" className="text-foreground">
              Pricing
            </Button>
            <Button variant="link" className="text-foreground">
              About
            </Button>
            <Button variant="outline">Sign In</Button>
            <Button>Get Started</Button>
          </div>

          {/* Mobile menu using Sheet */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="mt-8 flex flex-col gap-4">
                <Button variant="ghost" className="justify-start">
                  Features
                </Button>
                <Button variant="ghost" className="justify-start">
                  Pricing
                </Button>
                <Button variant="ghost" className="justify-start">
                  About
                </Button>
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
                <Button className="w-full">Get Started</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
