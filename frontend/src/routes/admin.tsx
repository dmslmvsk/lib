import { createFileRoute, Outlet, redirect, Link } from '@tanstack/react-router'
import { LayoutDashboard, Book, Tags, Users, PenTool, Library, Building } from 'lucide-react'

export const Route = createFileRoute('/admin')({
  beforeLoad: ({ context }) => {
    if (!context.auth.user) {
      throw redirect({ to: '/login', search: { reason: 'authenticated' } })
    }
    if (context.auth.user.role !== "ADMIN") {
      throw redirect({ to: '/', search: { reason: '' } })
    }
  },
  component: AdminLayout,
})

function AdminLayout() {
  const navItems = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard }, 
    { to: '/admin/books', label: 'Books', icon: Book },          
    { to: '/admin/genres', label: 'Genres', icon: Tags },        
    { to: '/admin/authors', label: 'Authors', icon: PenTool },
    { to: '/admin/users', label: 'Users', icon: Users },
    { to: '/admin/shelves', label: 'Shelves', icon: Library },
    { to: '/admin/libraries', label: 'Libraries', icon: Building }
  ]

  return (
    <div className="min-h-dvh bg-[#0a0a0a] text-zinc-200 font-sans">
      <div className="flex flex-col md:flex-row container mx-auto min-h-[calc(100vh-160px)] py-6 md:py-8 px-4 md:px-6 gap-6 md:gap-8">
        
        <aside className="w-full md:w-64 shrink-0">
          <div className="rounded-sm border border-zinc-800 bg-zinc-900/50 p-3 md:p-4 backdrop-blur-sm">
            <div className="px-2 md:px-4 mb-4 md:mb-6 hidden md:block">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
                Library Admin
              </h2>
            </div>
            
            <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto no-scrollbar md:space-y-1 touch-pan-x">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeProps={{ className: 'bg-zinc-800 text-white border-zinc-700' }}
                  className="flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-3 rounded-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 border border-transparent transition-all duration-200 whitespace-nowrap"
                >
                  <item.icon size={16} className="md:w-5 md:h-5" />
                  <span className="font-medium text-xs md:text-sm">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1 w-full overflow-hidden">
          <div className="border border-zinc-800 bg-zinc-900/30 p-4 sm:p-6 md:p-8 min-h-full rounded-sm overflow-hidden">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}