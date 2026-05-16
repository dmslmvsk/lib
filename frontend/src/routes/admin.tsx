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
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200 font-sans">
      <div className="flex max-w-350 mx-auto min-h-[calc(100vh-160px)] py-8 px-4 gap-8">
        <aside className="w-64 shrink-0">
          <div className="rounded-sm border border-zinc-800 bg-zinc-900/50 p-4 backdrop-blur-sm">
            <div className="px-4 mb-6">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
                Library Admin
              </h2>
            </div>
            
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeProps={{ className: 'bg-zinc-800 text-white border-zinc-700' }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/50 border border-transparent transition-all duration-200"
                >
                  <item.icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>
        <main className="flex-1">
          <div className="border border-zinc-800 bg-zinc-900/30 p-8 min-h-full rounded-sm">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}