import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen'
import { useAuthStore } from "./store/useAuthStore"
import { Toaster } from "sonner"
import type { User } from "./types/user"

const queryClient = new QueryClient()

const router = createRouter({ 
  routeTree, 
  context: { auth: undefined! } as RouterContext 
})

interface RouterContext {
  auth: {
    user: User | null
    isAuthenticated: boolean
  }
}


declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  const { user, token } = useAuthStore()
  const isAuthenticated = !!token

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors position="top-center"/>
      <RouterProvider 
        router={router} 
        context={{ 
          auth: { user, isAuthenticated } 
        }} 
      />
      </QueryClientProvider>
      
    </ThemeProvider>
  )
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
