import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { User, Lock } from "lucide-react"
import { Link } from "react-router-dom"
import { PublicRoutes } from "@/lib/routes"
import { UserService } from "@/services/user-service"
import { useNavigate } from "react-router-dom"

export function Login() {
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    if (!username || !password) {
      setError("Please fill in both fields.")
      return
    }

    setIsLoading(true)

    try {
      const loginResponse = await UserService.login(username, password)

      if (loginResponse.isSuccess()) {
        navigate(PublicRoutes.Home)
      } else {
        let errorMessage = loginResponse.message || "Registration failed"

        // 2. If there are field‑specific errors, extract the first one
        if (loginResponse.errors) {
          const firstField = Object.keys(loginResponse.errors)[0]
          if (firstField) {
            const firstError = loginResponse.errors[firstField][0]
            errorMessage = `${firstField}: ${firstError}`
          }
        }

        setError(errorMessage)
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col justify-center overflow-y-auto p-6 md:p-8">
      <div className="mb-6 space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">
          Selamat Datang
        </h2>
        <p className="text-sm text-muted-foreground">
          Mulai untuk melakukan pesanan.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="text">Nama Pengguna atau Email</Label>
          <div className="relative">
            <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="contohnamapengguna"
              disabled={isLoading}
              className="pl-9"
              placeholder="contoh@email.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              disabled={isLoading}
              className="pl-9"
              placeholder="Masukkan password"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <Label
              htmlFor="remember"
              className="cursor-pointer text-sm font-normal"
            >
              Ingat saya
            </Label>
          </div>

        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Memasuki Akun..." : "Masuk"}
        </Button>


        <p className="text-center text-sm text-muted-foreground">
          Belum punya akun?{" "}
          <Link
            to={PublicRoutes.Register}
            className="text-primary hover:underline"
          >
            Daftar sekarang
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login
