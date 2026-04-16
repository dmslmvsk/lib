import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import {api} from "@/api/axios"
import { useAuthStore } from '@/store/useAuthStore'
import { LoginForm, type LoginFormData } from '@/components/forms/login-form'
import { toast } from 'sonner'
export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
  const navigate = useNavigate()
  const {setAuth} = useAuthStore()

  const handleLoginSubmit = async (data: LoginFormData) => {
    try{
      const response = await api.post("/auth/login",data)

      const {user,token} = response.data

      setAuth(user,token)
      toast.success("Welcome back!")
      navigate({ to: '/' })
    } catch(error){
      if(error instanceof AxiosError){
        const message = error.response?.data?.error || "Login failed"
        toast.error(message)
      } else {
        toast.error("An unexpected error occurred")
      }
      throw error
      }
    }
  

  return (
    <div className='grow flex flex-col justify-center'>
      <LoginForm onSubmit={handleLoginSubmit}/>
    </div>
  )
}