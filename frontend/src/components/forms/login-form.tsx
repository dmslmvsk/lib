import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Mail, Lock, Loader2 } from "lucide-react"
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

export const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
})

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const isLoading = form.formState.isSubmitting

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-95 rounded-sm border-muted shadow-sm animate-in fade-in duration-500">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl font-bold tracking-tight">Login</CardTitle>
          <CardDescription className="text-md">
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
                        className="rounded-sm pl-9 h-10 text-md focus-visible:ring-1"
                        placeholder="name@example.com"
                        disabled={isLoading}
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError className="text-md font-medium text-destructive">
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
                        {...field}
                        id="login-form-password"
                        type="password"
                        className="rounded-sm pl-9 h-10 text-md focus-visible:ring-1"
                        placeholder="••••••••"
                        disabled={isLoading}
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError className="text-md font-medium text-destructive">
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
            className="w-full h-10 rounded-sm bg-primary text-md font-medium transition-all hover:cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
          </Button>
          
          <div className="text-center text-md text-muted-foreground">
            No account?{" "}
            <a href="/register" className="text-foreground font-medium hover:underline">
              Create one
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}