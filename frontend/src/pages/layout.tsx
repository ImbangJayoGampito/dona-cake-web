import React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {children}
    </div>
  )
}
