import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import type { User } from "@/types/user"

interface RouterContext {
  auth: {
    user: User | null
    isAuthenticated: boolean
  }
}

const RootLayout = () => (
  <div className="flex min-h-dvh flex-col bg-[#0a0a0a] font-sans text-zinc-200 selection:bg-indigo-500/30">
    <Header />

    <main className="flex grow flex-col">
      <Outlet />
    </main>

    <Footer />

    {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
  </div>
)

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
})
