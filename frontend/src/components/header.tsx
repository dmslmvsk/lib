import { Link } from '@tanstack/react-router'
import { Library, User, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
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

        <div className="flex items-center gap-2">
          
          <Button 
            variant="default"
            className="h-10 px-8 text-sm font-medium transition-all rounded-sm hover:cursor-pointer flex gap-2"
          >
            <User className="h-4 w-4" />
            Profile
          </Button>
          
          <Button 
            variant="default"
            className="h-10 px-8 text-sm font-medium transition-all rounded-sm hover:cursor-pointer flex gap-2"
          >
            <LogIn className='h-4 w-4'/>
            Sign In
          </Button>
        </div>
      </div>
    </header>
  )
}