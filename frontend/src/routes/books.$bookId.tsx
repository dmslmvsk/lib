import { createFileRoute, Link } from "@tanstack/react-router"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { bookService } from "@/api/services/book.service"
import {
  Loader2,
  ArrowLeft,
  MapPin,
  Library as LibraryIcon,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { api } from "@/api/axios"
import { toast } from "sonner"

export const Route = createFileRoute("/books/$bookId")({
  component: BookDetailsPage,
})

function BookDetailsPage() {
  const { bookId } = Route.useParams()
  const queryClient = useQueryClient()

  const {
    data: book,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["book", bookId],
    queryFn: () => bookService.getById(bookId),
  })

  const borrowMutation = useMutation({
    mutationFn: () => api.post(`/books/${bookId}/borrow`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["book", bookId] })
      toast.success("Book successfully borrowed.")
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || "Action failed"
      toast.error(message)
    },
  })

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0a0a0a]">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    )
  }

  if (isError || !book) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#0a0a0a] p-4 md:p-6">
        <div className="space-y-4 text-center">
          <AlertCircle className="mx-auto h-10 w-10 text-zinc-800" />
          <h2 className="text-xl font-semibold text-zinc-200">
            Book not found
          </h2>
          <Link to="/">
            <Button
              variant="outline"
              className="rounded-sm border-zinc-800 text-zinc-400"
            >
              Back to Catalog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const isBorrowed = !!book.userId

  return (
    <div className="min-h-dvh bg-[#0a0a0a] p-4 text-zinc-200 md:p-12">
      <div className="container mx-auto max-w-5xl">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-indigo-500 md:mb-12"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Catalog
        </Link>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12 lg:gap-20">
          <div className="mx-auto w-full max-w-sm md:col-span-5 md:max-w-none lg:col-span-4">
            <div className="group relative flex aspect-3/4 items-center justify-center overflow-hidden rounded-sm border border-zinc-800 bg-zinc-900 shadow-2xl">
              <span className="text-7xl font-bold text-zinc-800 transition-colors duration-500 select-none group-hover:text-indigo-500/20 md:text-9xl">
                {book.title[0]}
              </span>

              <div className="absolute top-4 right-4">
                <div
                  className={`rounded-sm border px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase shadow-sm ${
                    isBorrowed
                      ? "border-zinc-800 bg-zinc-950 text-zinc-600"
                      : "border-indigo-500/30 bg-indigo-500/5 text-indigo-400 backdrop-blur-sm"
                  }`}
                >
                  {isBorrowed ? "Reserved" : "Available"}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 md:col-span-7 md:space-y-10 lg:col-span-8">
            <div className="space-y-3 md:space-y-4">
              <div className="inline-flex rounded-sm border border-zinc-800 bg-zinc-900 px-2 py-1 text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                {book.genre.name}
              </div>

              <h1 className="text-3xl leading-tight font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                {book.title}
              </h1>

              <p className="text-base text-zinc-400 md:text-lg">
                by{" "}
                <span className="font-medium text-indigo-400">
                  {book.author.name}
                </span>
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 border-y border-zinc-900 py-6 sm:grid-cols-2 sm:gap-6 md:py-8">
              <div className="flex items-center gap-3">
                <div className="rounded-sm bg-zinc-900 p-2">
                  <LibraryIcon className="h-4 w-4 text-indigo-500" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase">
                    Library
                  </p>
                  <p className="text-sm font-medium text-zinc-200">
                    {book.shelf.library.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-sm bg-zinc-900 p-2">
                  <MapPin className="h-4 w-4 text-indigo-500" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase">
                    Location
                  </p>
                  <p className="text-sm font-medium text-zinc-200">
                    Shelf {book.shelf.label}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 md:space-y-3">
              <h3 className="text-xs font-bold tracking-wider text-zinc-500 uppercase">
                Description
              </h3>
              <p className="text-sm leading-relaxed font-normal text-zinc-400 md:text-base">
                {book.description || "No description available for this book."}
              </p>
            </div>

            <div className="pt-4 pb-8 md:pt-6 md:pb-0">
              <Button
                size="lg"
                onClick={() => borrowMutation.mutate()}
                disabled={isBorrowed || borrowMutation.isPending}
                className={`h-12 w-full min-w-50 rounded-sm text-sm font-bold transition-all hover:cursor-pointer sm:w-auto ${
                  isBorrowed
                    ? "border border-zinc-800 bg-zinc-900 text-zinc-600"
                    : "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10 hover:bg-indigo-500"
                }`}
              >
                {borrowMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : isBorrowed ? (
                  "Currently Unavailable"
                ) : (
                  "Borrow this Book"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
