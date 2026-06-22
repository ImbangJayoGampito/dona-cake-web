import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Mail, Lock, User } from "lucide-react"
import { Link } from "react-router-dom"
import { PublicRoutes } from "@/lib/routes"
import { UserService } from "@/services/user-service"
import { useNavigate } from "react-router-dom"
export function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }

    setIsLoading(true)

    try {
      console.log("Registering with:", { name, email, password, confirmPassword })
      const registerResponse = await UserService.register(
        username,
        name,
        email,
        password,
        confirmPassword
      )
      // Check if user is a string (error message) or an object (success)
      if (registerResponse.isSuccess()) {
        navigate(PublicRoutes.Home)
      } else {
        let errorMessage = registerResponse.message || "Registration failed"

        // 2. If there are field‑specific errors, extract the first one
        if (registerResponse.errors) {
          const firstField = Object.keys(registerResponse.errors)[0]
          if (firstField) {
            const firstError = registerResponse.errors[firstField][0]
            errorMessage = `${firstField}: ${firstError}`
          }
        }

        setError(errorMessage)
      }
    } catch (err) {
      setError("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-6 space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Daftar Akun</h2>
        <p className="text-sm text-muted-foreground">
          Mulai perjalanan manis Anda dengan Kami.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Nama Pengguna</Label>
          <div className="relative">
            <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
              className="pl-9"
              placeholder="namapengguna"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
              className="pl-9"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <div className="relative">
            <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
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
              autoComplete="new-password"
              disabled={isLoading}
              className="pl-9"
              placeholder="Minimal 8 karakter"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              disabled={isLoading}
              className="pl-9"
              placeholder="Konfirmasi password"
            />
          </div>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Membuat Akun..." : "Daftar"}
        </Button>





        <p className="text-center text-sm text-muted-foreground">
          Sudah punya akun?{" "}
          <Link
            to={PublicRoutes.Login}
            className="text-primary hover:underline"
          >
            Masuk
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register
