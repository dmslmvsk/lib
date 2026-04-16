import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { useState } from "react"
import * as z from "zod"
import { Link } from "@tanstack/react-router"
import { Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
})

export type LoginFormData = z.infer<typeof loginSchema>

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const isLoading = form.formState.isSubmitting

  return (
    <div className="grow flex items-center justify-center p-4">
      <Card className="w-full max-w-95 rounded-sm border-border bg-card shadow-md animate-in fade-in duration-500">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl font-bold tracking-tight text-foreground">
            Login
          </CardTitle>
          <CardDescription className="text-md text-muted-foreground">
            Enter your credentials to access the library
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form id="login-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FieldGroup className="grid gap-3">
              
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="grid gap-1.5" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="login-form-email" className="text-xs uppercase tracking-wider text-muted-foreground">
                      Email
                    </FieldLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        {...field}
                        id="login-form-email"
                        className="rounded-sm pl-9 h-10 text-md focus-visible:ring-1 bg-background border-border text-foreground"
                        placeholder="name@example.com"
                        disabled={isLoading}
                        autoComplete="email"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError className="text-sm font-medium text-destructive">
                        {fieldState.error?.message}
                      </FieldError>
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="grid gap-1.5" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="login-form-password" className="text-xs uppercase tracking-wider text-muted-foreground">
                      Password
                    </FieldLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                        id="login-form-password"
                        className="rounded-sm pl-9 h-10 text-md focus-visible:ring-1 bg-background border-border text-foreground"
                        placeholder="••••••••"
                        disabled={isLoading}
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors hover:cursor-pointer duration-300"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError className="text-sm font-medium text-destructive">
                        {fieldState.error?.message}
                      </FieldError>
                    )}
                  </Field>
                )}
              />
              
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button 
            type="submit" 
            form="login-form" 
            className="w-40 h-10 rounded-sm bg-primary text-primary-foreground font-medium transition-all hover:cursor-pointer duration-300 shadow-sm hover:opacity-90"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
          </Button>
          
          <div className="text-center text-sm text-muted-foreground">
            No account?{" "}
            <Link to="/register" className="text-foreground font-medium hover:underline transition-colors duration-300">
              Create one
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}