import { Link, useNavigate, useRouter } from '@tanstack/react-router'
import { Library, User, LogIn, LogOut, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuthStore } from '@/store/useAuthStore'
import { toast } from 'sonner'

export function Header() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const router = useRouter();

  const logoutUser = async () => {
    logout();
    await router.invalidate();
    toast.success("Logged out successfully.");
    navigate({ to: '/login' });
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0a0a0a]/80 backdrop-blur-md border-b border-zinc-900">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="bg-indigo-600 p-1.5 rounded-sm transition-colors group-hover:bg-indigo-500">
              <Library className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Library<span className="text-indigo-500">Hub</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end border-r border-zinc-800 pr-4">
                <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Account</span>
                <span className="text-xs text-zinc-300">{user.email}</span>
              </div>

              <div className="flex items-center gap-2">
                {user.role === "ADMIN" && (
                  <Link to="/admin">
                    <Button 
                      variant="ghost"
                      className="h-9 px-3 text-xs font-semibold text-amber-500 hover:text-amber-400 hover:bg-amber-500/10 rounded-sm"
                    >
                      <ShieldAlert className="h-3.5 w-3.5 mr-1.5" />
                      Admin
                    </Button>
                  </Link>
                )}

                <Link to="/dashboard">
                  <Button 
                    className="h-9 px-4 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-sm transition-all hover:cursor-pointer"
                  >
                    <User className="h-3.5 w-3.5 mr-1.5" />
                    Dashboard
                  </Button>
                </Link>

                <Button 
                  onClick={logoutUser}
                  variant="ghost"
                  className="h-9 w-9 p-0 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-sm hover:cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <Button 
                className="h-9 px-6 text-xs font-semibold bg-white text-black hover:bg-zinc-200 rounded-sm transition-colors"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}