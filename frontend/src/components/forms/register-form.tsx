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
  email: z.email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
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
    <div className="animate-in fade-in zoom-in-95 mx-auto w-full max-w-100 rounded-sm border border-zinc-800 bg-zinc-950 p-6 shadow-2xl duration-300 sm:p-8">
      <div className="mb-8 flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Create an account
        </h1>
        <p className="text-sm text-zinc-400">
          Join the library to start borrowing books
        </p>
      </div>

      <form
        id="register-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-zinc-400"
              >
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <Input
                  {...field}
                  id="email"
                  className="h-11 w-full rounded-sm border-zinc-800 bg-zinc-900 pl-10 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-indigo-500"
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
              <Label
                htmlFor="password"
                className="text-sm font-medium text-zinc-400"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <Input
                  type={showPassword ? "text" : "password"}
                  {...field}
                  id="password"
                  className="h-11 w-full rounded-sm border-zinc-800 bg-zinc-900 pr-10 pl-10 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-indigo-500"
                  placeholder="••••••••"
                  disabled={isLoading}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-1 -translate-y-1/2 cursor-pointer p-2 text-zinc-500 transition-colors hover:text-zinc-300"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
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
          className="mt-2 h-11 w-full cursor-pointer rounded-sm bg-indigo-600 font-medium text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign Up
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-zinc-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="-m-2 p-2 font-medium text-indigo-400 transition-colors hover:text-indigo-300"
        >
          Sign in
        </Link>
      </div>
    </div>
  )
}
