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
    toast.success("Connection terminated. Logged out.");
    navigate({ to: '/login' });
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0a0a0a]/80 backdrop-blur-md border-b border-zinc-800">
      <div className="container mx-auto flex h-16 items-center justify-between px-2">
        
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-indigo-600 p-1.5 rounded-none transition-transform group-hover:rotate-90 duration-300">
              <Library className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-[0.1em] text-white uppercase italic">
              LIB<span className="text-indigo-500">HUB</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end mr-2">
                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Active User</span>
                <span className="text-xs font-mono text-zinc-400">{user.email}</span>
              </div>

              <div className="flex items-center gap-2 border-l border-zinc-800 pl-4">
                {user.role === "ADMIN" && (
                  <Link to="/admin">
                    <Button 
                      variant="ghost"
                      className="h-9 px-4 text-[10px] font-black uppercase tracking-widest text-amber-500 hover:text-amber-400 hover:bg-amber-500/10 rounded-none border border-amber-500/20"
                    >
                      <ShieldAlert className="h-3 w-3 mr-2" />
                      Admin
                    </Button>
                  </Link>
                )}

                {/* Dashboard */}
                <Link to="/dashboard">
                  <Button 
                    variant="default"
                    className="h-9 px-4 text-[10px] font-black uppercase tracking-widest bg-indigo-600 hover:bg-indigo-500 text-white rounded-none shadow-[4px_4px_0px_0px_rgba(79,70,229,0.2)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all hover:cursor-pointer"
                  >
                    <User className="h-3 w-3 mr-2" />
                    Dashboard
                  </Button>
                </Link>

                <Button 
                  onClick={logoutUser}
                  variant="ghost"
                  className="h-9 w-9 p-0 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-none border border-transparent hover:border-red-500/20 hover:cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <Button 
                variant="default"
                className="h-10 px-8 text-[10px] font-black uppercase tracking-[0.2em] bg-white text-black hover:bg-indigo-500 hover:text-white rounded-none transition-colors"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Access Archive
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}