import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import {  Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { createRootRouteWithContext } from '@tanstack/react-router'
import type { User } from '@/types/user'


interface RouterContext {
  auth: {
    user : User| null
    isAuthenticated : boolean
  }
}

const RootLayout = () => (
  <div className="flex flex-col min-h-screen bg-background text-foreground">
    <Header />
    <main className="grow flex flex-col">
      <Outlet />
    </main>

    <Footer />
    <TanStackRouterDevtools/>
  </div>
)

export const Route = createRootRouteWithContext<RouterContext>()({ component: RootLayout })