import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router"
import { AxiosError } from "axios"
import { authService } from "@/api/services/auth.service"
import { useAuthStore } from "@/store/useAuthStore"
import {
  RegisterForm,
  type RegisterFormData,
} from "@/components/forms/register-form"
import { toast } from "sonner"

export const Route = createFileRoute("/register")({
  component: Register,
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      toast.info("You are already logged in")
      throw redirect({
        to: "/",
        search: { reason: "authenticated" },
      })
    }
  },
})

function Register() {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()

  const handleRegisterSubmit = async (data: RegisterFormData) => {
    try {
      const { user, token } = await authService.register(data)

      setAuth(user, token)
      toast.success("Account created successfully!")
      navigate({ to: "/" })
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.error || "Register failed"
        toast.error(message)
      } else {
        toast.error("An unexpected error occurred")
      }
      throw error
    }
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-[#0a0a0a] p-4">
      <RegisterForm onSubmit={handleRegisterSubmit} />
    </div>
  )
}
