import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { useState } from "react"
import * as z from "zod"
import { Link } from "@tanstack/react-router"
import { Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const registerSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
})

export type RegisterFormData = z.infer<typeof registerSchema>

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const isLoading = form.formState.isSubmitting

  return (
    <div className="w-full max-w-[400px] mx-auto rounded-sm border border-zinc-800 bg-zinc-950 p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
      <div className="flex flex-col space-y-2 text-center mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Create an account
        </h1>
        <p className="text-sm text-zinc-400">
          Join the library to start borrowing books
        </p>
      </div>

      <form id="register-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <Controller 
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-sm font-medium text-zinc-400">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                  {...field}
                  id="email"
                  className="rounded-sm pl-10 h-10 bg-zinc-900 border-zinc-800 text-zinc-100 focus-visible:ring-indigo-500 placeholder:text-zinc-600 w-full"
                  placeholder="name@example.com"
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>
              {fieldState.invalid && (
                <span className="text-xs font-medium text-red-500">
                  {fieldState.error?.message}
                </span>
              )}
            </div>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-sm font-medium text-zinc-400">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                  type={showPassword ? "text" : "password"}
                  {...field}
                  id="password"
                  className="rounded-sm pl-10 pr-10 h-10 bg-zinc-900 border-zinc-800 text-zinc-100 focus-visible:ring-indigo-500 placeholder:text-zinc-600 w-full"
                  placeholder="••••••••"
                  disabled={isLoading}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {fieldState.invalid && (
                <span className="text-xs font-medium text-red-500">
                  {fieldState.error?.message}
                </span>
              )}
            </div>
          )}
        />

        <Button 
          type="submit" 
          form="register-form" 
          className="w-full h-10 mt-2 rounded-sm bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign Up
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-zinc-500">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
          Sign in
        </Link>
      </div>
    </div>
  )
}