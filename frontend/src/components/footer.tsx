import { Link } from '@tanstack/react-router'
import { Library } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-zinc-900 py-10 md:py-16 mt-12 md:mt-20">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
        
        <div className="col-span-1 md:col-span-1 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="bg-indigo-600 p-1.5 rounded-sm">
              <Library className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Library<span className="text-indigo-500">Hub</span>
            </span>
          </div>
          <p className="text-zinc-500 text-xs md:text-sm leading-relaxed max-w-xs">
            Your digital gateway to thousands of books and resources. Manage your personal collection with ease and speed.
          </p>
        </div>

        <div className="space-y-3 md:space-y-4">
          <h4 className="text-zinc-200 text-sm font-semibold tracking-tight">Navigation</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-zinc-500 hover:text-indigo-400 text-sm transition-colors font-medium">Catalog</Link>
            </li>
            <li>
              <Link to="/dashboard" className="text-zinc-500 hover:text-indigo-400 text-sm transition-colors font-medium">Dashboard</Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3 md:space-y-4">
          <h4 className="text-zinc-200 text-sm font-semibold tracking-tight">Support</h4>
          <ul className="space-y-2">
            {["Help Center", "Terms of Service", "Privacy Policy"].map((item) => (
              <li key={item}>
                <a href="#" className="text-zinc-500 hover:text-indigo-400 text-sm transition-colors font-medium">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 md:space-y-5">
          <h4 className="text-zinc-200 text-sm font-semibold tracking-tight">Connect</h4>
          <div className="flex flex-wrap gap-2.5">
            <a 
              href="https://github.com/dmslmvsk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-sm text-zinc-400 hover:text-white hover:border-indigo-500 transition-all hover:cursor-pointer text-xs font-semibold"
            >
              Github
            </a>
            <a 
              href="mailto:dmslmvsk@gmail.com" 
              className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-sm text-zinc-400 hover:text-white hover:border-indigo-500 transition-all hover:cursor-pointer text-xs font-semibold"
            >
              Email
            </a>
          </div>
          
          <div className="text-zinc-600 text-[10px] md:text-[11px] pt-4 border-t border-zinc-900/50">
            <p>© 2026 LibraryHub Inc.</p>
            <p className="mt-1">
              Developed by <span className="text-zinc-400 font-medium">dmslmvsk</span>
            </p>
          </div>
        </div>

      </div>
    </footer>
  )
}