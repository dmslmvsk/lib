import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { User } from '@/types/user'

interface RouterContext {
  auth: {
    user: User | null
    isAuthenticated: boolean
  }
}

const RootLayout = () => (
  <div className="flex flex-col min-h-dvh bg-[#0a0a0a] text-zinc-200 selection:bg-indigo-500/30 font-sans">
    <Header />
    
    <main className="grow flex flex-col">
      <Outlet />
    </main>

    <Footer />
    
    {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
  </div>
)

export const Route = createRootRouteWithContext<RouterContext>()({ 
  component: RootLayout 
})