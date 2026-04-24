import { Link, useNavigate, useRouter } from '@tanstack/react-router'
import { Library, User, LogIn,LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuthStore } from '@/store/useAuthStore'
import { toast } from 'sonner'
export function Header() {

  const {user, logout} = useAuthStore();
  const navigate = useNavigate();
  const router = useRouter();
  const logoutUser = async () => {
    logout();
    
    await router.invalidate(); 
    
    toast.success("Logged out successfully!");
    navigate({ to: '/login' });
  }
  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="w-full flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-sm">
              <Library className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-foreground uppercase">
              Library<span className="text-primary">Hub</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link 
              to="/" 
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Catalog
            </Link>
            <Link 
              to="/login" 
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              My Books
            </Link>
          </nav>
        </div>

          {user?
          <div className="flex items-center gap-2">
            <Link to="/profile">
            <Button 
            variant="default"
            className="h-10 px-8 text-sm font-medium transition-all rounded-sm hover:cursor-pointer flex gap-2"
          >
            <User className="h-4 w-4" />
            Profile
          </Button>
            </Link>
          <Button 
            onClick={logoutUser}
            variant="secondary"
            className="h-10 px-8 text-sm font-medium transition-all rounded-sm hover:cursor-pointer flex gap-2 hover:bg-accent"
          >
            <LogOut  className="h-4 w-4" />
            Sign Out
          </Button>
          
          {user.role === "ADMIN"?
             <Link to="/admin">
            <Button 
            variant="default"
            className="h-10 px-8 text-sm font-medium transition-all rounded-sm hover:cursor-pointer flex gap-2"
          >
            <User className="h-4 w-4" />
            Admin
          </Button>
            </Link>
            :
            <div></div>
        }
          </div>
          :
          <Link to="/login">
          <Button 
            variant="default"
            className="h-10 px-8 text-sm font-medium transition-all rounded-sm hover:cursor-pointer flex gap-2"
          >
            <LogIn className='h-4 w-4'/>
            Sign In
          </Button> 
          </Link>
          
          }
          
      </div>
    </header>
  )
}