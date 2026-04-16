import { Link } from '@tanstack/react-router'
import { Library } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border py-12">
      <div className="w-full px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        <div className="col-span-1 md:col-span-1 space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-sm">
              <Library className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tighter text-foreground uppercase">
              Library<span className="text-primary">Hub</span>
            </span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
            Your digital gateway to thousands of books, resources, and educational materials. Manage your collection with ease.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-foreground text-xs font-bold uppercase tracking-widest">Navigation</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Catalog
              </Link>
            </li>
            <li>
              <Link to="/login" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                My Books
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-foreground text-xs font-bold uppercase tracking-widest">Support</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-foreground text-xs font-bold uppercase tracking-widest">Connect</h4>
          <div className="flex flex-wrap gap-3">
            <a 
              href="https://github.com/dmslmvsk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-secondary border border-border rounded-sm text-muted-foreground hover:text-primary hover:border-primary transition-all hover:cursor-pointer text-xs font-bold tracking-widest uppercase"
            >
              Github
            </a>

            <a 
              href="mailto:dmslmvsk@gmail.com" 
              className="px-4 py-2 bg-secondary border border-border rounded-sm text-muted-foreground hover:text-primary hover:border-primary transition-all hover:cursor-pointer text-xs font-bold tracking-widest uppercase"
            >
              Email
            </a>
          </div>
          
          <div className="text-muted-foreground opacity-70 text-xs pt-4">
            © 2026 LibraryHub Inc. <br />
            Developed by <span className="text-foreground font-medium">dmslmvsk</span>
          </div>
        </div>

      </div>
    </footer>
  )
}