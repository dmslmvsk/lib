import { Link, useNavigate, useRouter } from "@tanstack/react-router"
import { Library, User, LogIn, LogOut, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/useAuthStore"
import { toast } from "sonner"

export function Header() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const router = useRouter()

  const logoutUser = async () => {
    logout()
    await router.invalidate()
    toast.success("Logged out successfully.")
    navigate({ to: "/login" })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-900 bg-[#0a0a0a]/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <Link to="/" className="group flex items-center gap-2 md:gap-2.5">
            <div className="rounded-sm bg-indigo-600 p-1.5 transition-colors group-hover:bg-indigo-500">
              <Library className="h-4 w-4 text-white md:h-5 md:w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white md:text-xl">
              Library<span className="text-indigo-500">Hub</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden flex-col items-end border-r border-zinc-800 pr-4 lg:flex">
                <span className="text-[10px] font-medium tracking-wider text-zinc-500 uppercase">
                  Account
                </span>
                <span className="text-xs text-zinc-300">{user.email}</span>
              </div>

              <div className="flex items-center gap-1.5 md:gap-2">
                {user.role === "ADMIN" && (
                  <Link to="/admin">
                    <Button
                      variant="ghost"
                      className="h-9 rounded-sm px-2 text-xs font-semibold text-amber-500 hover:cursor-pointer hover:bg-amber-500/10 hover:text-amber-400 sm:px-3"
                    >
                      <ShieldAlert className="h-4 w-4 sm:mr-1.5" />
                      <span className="hidden sm:inline">Admin</span>
                    </Button>
                  </Link>
                )}

                <Link to="/dashboard">
                  <Button className="h-9 rounded-sm bg-indigo-600 px-2 text-xs font-semibold text-white transition-all hover:cursor-pointer hover:bg-indigo-500 sm:px-4">
                    <User className="h-4 w-4 sm:mr-1.5" />
                    <span className="hidden sm:inline">Dashboard</span>
                  </Button>
                </Link>

                <Button
                  onClick={logoutUser}
                  variant="ghost"
                  className="ml-1 h-9 w-9 rounded-sm p-0 text-zinc-500 hover:cursor-pointer hover:bg-red-500/10 hover:text-red-500"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <Button className="h-9 rounded-sm bg-white px-4 text-xs font-semibold text-black transition-colors hover:bg-zinc-200 md:px-6">
                <LogIn className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Sign In</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
