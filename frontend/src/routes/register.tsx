import { createFileRoute, useNavigate, redirect } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import {api} from "@/api/axios"
import { useAuthStore } from '@/store/useAuthStore'
import { RegisterForm, type RegisterFormData } from '@/components/forms/register-form'
import { toast } from 'sonner'
export const Route = createFileRoute('/register')({
  component: Register,
  beforeLoad: ({context}) => {
		if(context.auth.isAuthenticated){
      toast.info("You are already logged in")
			throw redirect({
        to: '/',
        search: {
    		reason: 'authenticated',
  },
      })
		}
	}}
)

function Register() {
  const navigate = useNavigate()
  const {setAuth} = useAuthStore()

  const handleRegisterSubmit = async (data: RegisterFormData) => {
    try{
      const response = await api.post("/auth/register",data)

      const {user,token} = response.data

      setAuth(user,token)
      toast.success("Account created successfully!")
      navigate({ to: '/' })
    } catch(error){
      if(error instanceof AxiosError){
        const message = error.response?.data?.error || "Register failed"
        toast.error(message)
      } else {
        toast.error("An unexpected error occurred")
      }
      throw error
      }
    }
  

  return (
    <div className='grow flex flex-col justify-center'>
      <RegisterForm onSubmit={handleRegisterSubmit}/>
    </div>
  )
}