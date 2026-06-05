import React from "react"
import { Outlet } from "react-router-dom"
import { AppHeader } from "@/components/layout/header"
import AppFooter from "@/components/layout/footer"
export default function AppLayout() {
  return (
    <div>
      <AppHeader />
      <Outlet />
      <AppFooter />
    </div>
  )
}
