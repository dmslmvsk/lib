import { createFileRoute, Outlet, redirect, Link } from "@tanstack/react-router"
import {
  LayoutDashboard,
  Book,
  Tags,
  Users,
  PenTool,
  Library,
  Building,
} from "lucide-react"

export const Route = createFileRoute("/admin")({
  beforeLoad: ({ context }) => {
    if (!context.auth.user) {
      throw redirect({ to: "/login", search: { reason: "authenticated" } })
    }
    if (context.auth.user.role !== "ADMIN") {
      throw redirect({ to: "/", search: { reason: "" } })
    }
  },
  component: AdminLayout,
})

function AdminLayout() {
  const navItems = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/books", label: "Books", icon: Book },
    { to: "/admin/genres", label: "Genres", icon: Tags },
    { to: "/admin/authors", label: "Authors", icon: PenTool },
    { to: "/admin/users", label: "Users", icon: Users },
    { to: "/admin/shelves", label: "Shelves", icon: Library },
    { to: "/admin/libraries", label: "Libraries", icon: Building },
  ]

  return (
    <div className="min-h-dvh bg-[#0a0a0a] font-sans text-zinc-200">
      <div className="container mx-auto flex min-h-[calc(100vh-160px)] flex-col gap-6 px-4 py-6 md:flex-row md:gap-8 md:px-6 md:py-8">
        <aside className="w-full shrink-0 md:w-64">
          <div className="rounded-sm border border-zinc-800 bg-zinc-900/50 p-3 backdrop-blur-sm md:p-4">
            <div className="mb-4 hidden px-2 md:mb-6 md:block md:px-4">
              <h2 className="text-sm font-semibold tracking-widest text-zinc-500 uppercase">
                Library Admin
              </h2>
            </div>

            <nav className="no-scrollbar flex touch-pan-x flex-row gap-2 overflow-x-auto md:flex-col md:space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeProps={{
                    className: "bg-zinc-800 text-white border-zinc-700",
                  }}
                  className="flex items-center gap-2 rounded-sm border border-transparent px-3 py-2 whitespace-nowrap text-zinc-400 transition-all duration-200 hover:bg-zinc-800/50 hover:text-white md:gap-3 md:px-4 md:py-3"
                >
                  <item.icon size={16} className="md:h-5 md:w-5" />
                  <span className="text-xs font-medium md:text-sm">
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        <main className="w-full flex-1 overflow-hidden">
          <div className="min-h-full overflow-hidden rounded-sm border border-zinc-800 bg-zinc-900/30 p-4 sm:p-6 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
