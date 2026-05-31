import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Toaster } from "@/components/ui/sonner"
import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { BrowserRouter } from "react-router-dom"
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)
