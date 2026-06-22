import type { ReactNode } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/lib/state/logged-user"
import { useNavigate } from "react-router-dom"
import { UserService } from "@/services/user-service"
import { PublicRoutes, ProtectedRoutes } from "@/lib/routes"

interface UserAvatarDropdownProps {
  trigger?: ReactNode
}

export function UserAvatarDropdown({ trigger }: UserAvatarDropdownProps = {}) {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    UserService.logoutAll()
    navigate(PublicRoutes.Home)
  }

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button variant="ghost" className="relative rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                {user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <div className="flex items-center justify-start gap-2 p-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
        <DropdownMenuItem onClick={() => navigate(ProtectedRoutes.Me)}>
          Profile
        </DropdownMenuItem>
        {(user.isAdmin() || user.isKaryawan()) && (
          <>
            <DropdownMenuSeparator />
            {user.isAdmin() && (
              <DropdownMenuItem onClick={() => navigate("/admin/dashboard")}>
                Dashboard Admin
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => navigate("/karyawan/pesanan")}>
              Dashboard Karyawan
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
