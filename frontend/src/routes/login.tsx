import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router"
import { AxiosError } from "axios"
import { authService } from "@/api/services/auth.service"
import { useAuthStore } from "@/store/useAuthStore"
import { LoginForm, type LoginFormData } from "@/components/forms/login-form"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "@/components/ui/button"

const loginSearchSchema = z.object({
  reason: z.string().optional(),
})

export const Route = createFileRoute("/login")({
  validateSearch: loginSearchSchema,
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: "/", search: { reason: "authenticated" } })
    }
  },
  onEnter: ({ search }) => {
    if (search.reason === "auth_required") {
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
      navigate({ to: "/" })
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.error || "Login failed"
        toast.error(message)
      } else {
        toast.error("An unexpected error occurred")
      }
      throw error
    }
  }

  const loginAsAdmin = () =>
    handleLoginSubmit({ email: "admin@admin.com", password: "adminadmin" })
  const loginAsUser = () =>
    handleLoginSubmit({ email: "user@user.com", password: "useruser" })

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-[#0a0a0a] p-4">
      <LoginForm onSubmit={handleLoginSubmit} />

      <div className="mt-6 flex w-full max-w-[400px] flex-col gap-3 sm:mt-8 sm:flex-row">
        <Button
          variant="outline"
          className="h-11 flex-1 rounded-md border-zinc-800 bg-zinc-900/50 text-zinc-400 transition-all hover:bg-zinc-800 hover:text-white active:scale-95"
          onClick={loginAsAdmin}
        >
          Login as ADMIN
        </Button>
        <Button
          variant="outline"
          className="h-11 flex-1 rounded-md border-zinc-800 bg-zinc-900/50 text-zinc-400 transition-all hover:bg-zinc-800 hover:text-white active:scale-95"
          onClick={loginAsUser}
        >
          Login as USER
        </Button>
      </div>
    </div>
  )
}
