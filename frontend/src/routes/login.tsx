import { createFileRoute, useNavigate, redirect } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { authService } from '@/api/services/auth.service'
import { useAuthStore } from '@/store/useAuthStore'
import { LoginForm, type LoginFormData } from '@/components/forms/login-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'

const loginSearchSchema = z.object({
  reason: z.string().optional(),
})

export const Route = createFileRoute('/login')({
  validateSearch: loginSearchSchema,
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: '/', search: { reason: 'authenticated' } })
    }
  },
  onEnter: ({ search }) => {
    if (search.reason === 'auth_required') {
      toast.error("Please log in to access your profile")
    }
  },
  component: Login,
})

function Login() {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  
  const handleLoginSubmit = async (data: LoginFormData) => {
    try {
      const { user, token } = await authService.login(data)
      
      setAuth(user, token)
      toast.success(`Welcome back, ${user.email}!`)
      navigate({ to: '/' })
    } catch(error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.error || "Login failed"
        toast.error(message)
      } else {
        toast.error("An unexpected error occurred")
      }
      throw error
    }
  }

  const loginAsAdmin = () => handleLoginSubmit({ email: "admin@admin.com", password: "adminadmin" })
  const loginAsUser = () => handleLoginSubmit({ email: "user@user.com", password: "useruser" })

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4">
      <LoginForm onSubmit={handleLoginSubmit}/>
      
      <div className="mt-8 flex gap-4">
        <Button 
          variant="outline"
          className="rounded-sm border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer" 
          onClick={loginAsAdmin}
        >
          Login as ADMIN
        </Button>
        <Button 
          variant="outline"
          className="rounded-sm border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer" 
          onClick={loginAsUser}
        >
          Login as USER
        </Button>
      </div>
    </div>
  )
}