import { createFileRoute, Link } from "@tanstack/react-router"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/api/axios"
import {
  User,
  Calendar,
  BookOpen,
  Loader2,
  RotateCcw,
  ShieldCheck,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
})

function DashboardPage() {
  const queryClient = useQueryClient()

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => api.get("/users/me").then((res) => res.data),
  })

  const returnMutation = useMutation({
    mutationFn: (bookId: string) => api.post(`/books/${bookId}/return`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] })
      queryClient.invalidateQueries({ queryKey: ["public-books"] })
      toast.success("Book returned successfully")
    },
    onError: () => toast.error("Failed to return book"),
  })

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center bg-[#0a0a0a]">
        <Loader2 className="h-6 w-6 animate-spin text-indigo-500" />
      </div>
    )

  return (
    <div className="min-h-dvh bg-[#0a0a0a] p-4 text-zinc-200 md:p-12">
      <div className="container mx-auto max-w-5xl space-y-8 md:space-y-10">
        <header className="border-b border-zinc-900 pb-6 md:pb-8">
          <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            User Dashboard
          </h1>
          <p className="mt-1 text-xs text-zinc-500 md:text-sm">
            Manage your profile and active readings.
          </p>
        </header>

        <div className="grid grid-cols-1 items-start gap-6 md:gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="space-y-6 rounded-sm border border-zinc-900 bg-zinc-950 p-5 md:p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-sm bg-indigo-600/10 p-2">
                    <User className="h-5 w-5 text-indigo-500" />
                  </div>
                  <div className="space-y-0.5 overflow-hidden">
                    <p className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase">
                      Email Address
                    </p>
                    <p className="truncate text-sm font-medium text-zinc-200">
                      {profile.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-sm bg-amber-500/10 p-2">
                    <ShieldCheck className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase">
                      Access Level
                    </p>
                    <p className="text-sm font-medium text-zinc-200">
                      {profile.role}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-zinc-900 pt-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-zinc-500">
                    <Calendar size={12} />
                    <span className="text-[10px] font-bold tracking-wider uppercase">
                      Joined
                    </span>
                  </div>
                  <p className="text-xs font-medium text-zinc-300">
                    {new Date(profile.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-zinc-500">
                    <BookOpen size={12} />
                    <span className="text-[10px] font-bold tracking-wider uppercase">
                      Books
                    </span>
                  </div>
                  <p className="text-xs font-medium text-zinc-300">
                    {profile.borrowedBooks.length} Active
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-8">
            <h3 className="flex items-center gap-2 text-xs font-bold tracking-widest text-zinc-500 uppercase">
              <ArrowRight size={14} className="text-indigo-500" />
              Your Active Borrows
            </h3>

            {profile.borrowedBooks.length === 0 ? (
              <div className="rounded-sm border border-dashed border-zinc-900 bg-zinc-950/30 py-12 text-center md:py-16">
                <p className="text-xs text-zinc-500 md:text-sm">
                  You don't have any borrowed books.
                </p>
                <Link
                  to="/"
                  className="mt-3 inline-block text-xs font-semibold text-indigo-500 hover:underline"
                >
                  Browse Catalog
                </Link>
              </div>
            ) : (
              <div className="grid gap-3">
                {profile.borrowedBooks.map((book: any) => (
                  <div
                    key={book.id}
                    className="flex flex-col justify-between gap-4 rounded-sm border border-zinc-900 bg-zinc-900/40 p-4 transition-colors hover:border-zinc-800 sm:flex-row sm:items-center"
                  >
                    <div className="space-y-1">
                      <h4 className="text-sm leading-tight font-semibold text-zinc-100 md:text-base">
                        {book.title}
                      </h4>
                      <p className="text-xs text-zinc-500">
                        {book.author.name} • {book.shelf.library.name}
                      </p>
                    </div>
                    <Button
                      onClick={() => returnMutation.mutate(book.id)}
                      disabled={returnMutation.isPending}
                      variant="outline"
                      size="sm"
                      // ИЗМЕНЕНИЕ: w-full на мобилках, sm:w-auto на планшетах
                      className="h-9 w-full rounded-sm border-zinc-800 px-4 text-xs font-semibold transition-all hover:cursor-pointer hover:border-indigo-600 hover:bg-indigo-600 hover:text-white sm:w-auto"
                    >
                      {returnMutation.isPending ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <>
                          <RotateCcw className="mr-2 h-3.5 w-3.5" /> Return
                        </>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
