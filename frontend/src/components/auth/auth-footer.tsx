import { Separator } from "@/components/ui/separator"
import { Heart } from "lucide-react"
import { Link } from "react-router-dom"

function AuthFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto my-6 px-4 py-12 md:px-6">
        {/* Featured Section */}

        <div className="text-center text-sm text-muted-foreground">
          Dona Cake
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <Link to="/privacy" className="transition-colors hover:text-primary">
            Privacy Policy
          </Link>
          <Link to="/terms" className="transition-colors hover:text-primary">
            Terms of Service
          </Link>
          <Link to="/contact" className="transition-colors hover:text-primary">
            Contact
          </Link>
        </div>

        <Separator className="my-6" />

        <div className="flex justify-center gap-6">
          {/* Instagram SVG */}
          <Link
            to="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            <span className="sr-only">Instagram</span>
          </Link>

          {/* Facebook SVG */}
          <Link
            to="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
            <span className="sr-only">Facebook</span>
          </Link>

          {/* Twitter SVG */}
          <Link
            to="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.3 9 4-1-2.7.2-5.6 2.8-7 2.7-1.4 5.9 0 7.2 2.3" />
            </svg>
            <span className="sr-only">Twitter</span>
          </Link>

          {/* Google SVG (colored) */}
          <Link
            to="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="sr-only">Google</span>
          </Link>
        </div>

        <Separator className="my-6" />

        <div className="text-center text-sm text-muted-foreground">
          © {currentYear} Dona Cake. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
export default AuthFooter
