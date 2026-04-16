import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Toaster } from '@/components/ui/sonner'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const RootLayout = () => (
  <div className="flex flex-col min-h-screen bg-background text-foreground">
    <Header />
    <main className="grow flex flex-col">
      <Outlet />
    </main>

    <Footer />
    <TanStackRouterDevtools/>
    <Toaster richColors position="top-center" />
  </div>
)

export const Route = createRootRoute({ component: RootLayout })