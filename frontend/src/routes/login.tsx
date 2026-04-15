import { LoginForm } from '@/components/forms/login-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
  return (
    <div className='bg-linear-to-br to-zinc-50 from-yellow-300 flex flex-col justify-center'>
      <LoginForm />
    </div>
  )
}