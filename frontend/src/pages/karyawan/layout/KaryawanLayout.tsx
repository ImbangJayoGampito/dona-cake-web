import { useState } from "react"
import { Outlet } from "react-router-dom"
import KaryawanSidebar from "./KaryawanSidebar"
import KaryawanHeader from "./KaryawanHeader"
import { Sheet, SheetContent } from "@/components/ui/sheet"

export default function KaryawanLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-[#FAFAF9] dark:bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 shrink-0 h-full">
        <KaryawanSidebar />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <KaryawanHeader onToggleSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile Sidebar Drawer */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64 bg-popover/90 border-r-0">
          <KaryawanSidebar onNavItemClick={() => setSidebarOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  )
}
