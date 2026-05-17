import { Link } from '@tanstack/react-router'
import { Library } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-zinc-800 py-16 mt-20">
      <div className="w-full px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        <div className="col-span-1 md:col-span-1 space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-none">
              <Library className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white uppercase italic">
              Library<span className="text-indigo-500">Hub</span>
            </span>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xs font-medium">
            Your digital gateway to thousands of books, resources, and educational materials. Manage your collection with ease.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-zinc-200 text-xs font-black uppercase tracking-[0.2em]">Navigation</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-zinc-500 hover:text-indigo-400 text-sm transition-colors font-medium">
                Catalog
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="text-zinc-500 hover:text-indigo-400 text-sm transition-colors font-medium">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-zinc-200 text-xs font-black uppercase tracking-[0.2em]">Support</h4>
          <ul className="space-y-2">
            {["Help Center", "Terms of Service", "Privacy Policy"].map((item) => (
              <li key={item}>
                <a href="#" className="text-zinc-500 hover:text-indigo-400 text-sm transition-colors font-medium">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-zinc-200 text-xs font-black uppercase tracking-[0.2em]">Connect</h4>
          <div className="flex flex-wrap gap-3">
            <a 
              href="https://github.com/dmslmvsk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-2 bg-zinc-900 border border-zinc-800 rounded-none text-zinc-400 hover:text-white hover:border-indigo-500 transition-all hover:cursor-pointer text-[10px] font-black tracking-widest uppercase"
            >
              Github
            </a>

            <a 
              href="mailto:dmslmvsk@gmail.com" 
              className="px-5 py-2 bg-zinc-900 border border-zinc-800 rounded-none text-zinc-400 hover:text-white hover:border-indigo-500 transition-all hover:cursor-pointer text-[10px] font-black tracking-widest uppercase"
            >
              Email
            </a>
          </div>
          
          <div className="text-zinc-600 text-[10px] pt-6 font-mono uppercase tracking-tight leading-tight">
            © 2026 LibraryHub Inc. <br />
            Developed by <span className="text-zinc-400 font-bold">dmslmvsk</span>
          </div>
        </div>

      </div>
    </footer>
  )
}