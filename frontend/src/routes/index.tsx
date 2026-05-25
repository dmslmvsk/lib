import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { bookService } from "@/api/services/book.service"
import { api } from "@/api/axios"
import { BookCard } from "@/components/book-card"
import { Loader2 } from "lucide-react"
import { z } from "zod"
import { Input } from "@/components/ui/input"

const indexSearchSchema = z.object({
  reason: z.string().optional(),
  search: z.string().optional(),
  genreId: z.string().optional(),
})

export const Route = createFileRoute("/")({
  validateSearch: indexSearchSchema,
  component: Index,
})

function Index() {
  const { search, genreId } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })

  const { data: books, isLoading } = useQuery({
    queryKey: ["public-books", search, genreId],
    queryFn: () => bookService.getAll({ search, genreId }),
  })

  const { data: genres } = useQuery({
    queryKey: ["genres"],
    queryFn: () => api.get("/genres").then((res) => res.data),
  })

  const updateSearch = (val: string) => {
    navigate({ search: (prev) => ({ ...prev, search: val || undefined }) })
  }

  const updateGenre = (id: string | undefined) => {
    navigate({ search: (prev) => ({ ...prev, genreId: id || undefined }) })
  }

  return (
    <div className="min-h-dvh bg-[#0a0a0a] text-zinc-200">
      <div className="border-b border-zinc-900 bg-zinc-950/50">
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              Archive <span className="text-indigo-500">Collection</span>
            </h1>
            <p className="max-w-lg text-xs text-zinc-500 md:text-sm">
              Manage and explore our digital repository of books and resources.
            </p>
          </div>
        </div>
      </div>

      <div className="sticky top-16 z-40 border-b border-zinc-900 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3 md:px-6 md:py-4">
          <div className="flex flex-col items-start gap-3 md:gap-4 lg:flex-row lg:items-center">
            <div className="relative w-full lg:max-w-xs">
              <Input
                type="text"
                placeholder="Search..."
                value={search || ""}
                onChange={(e) => updateSearch(e.target.value)}
                className="h-10 w-full rounded-sm border border-zinc-800 bg-zinc-900 pr-4 pl-9 text-sm text-zinc-100 transition-all placeholder:text-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="hidden h-4 w-px bg-zinc-800 lg:block" />
            <div className="no-scrollbar flex w-full touch-pan-x items-center gap-2 overflow-x-auto pb-1">
              <button
                onClick={() => updateGenre(undefined)}
                className={`rounded-sm border px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all hover:cursor-pointer ${
                  !genreId
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                }`}
              >
                All Genres
              </button>
              {genres?.map((g: any) => (
                <button
                  key={g.id}
                  onClick={() => updateGenre(g.id)}
                  className={`rounded-sm border px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all hover:cursor-pointer ${
                    genreId === g.id
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                  }`}
                >
                  {g.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ИЗМЕНЕНИЕ: px-4 вместо px-6 для мобилок, чтобы карточки были крупнее */}
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-10">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-indigo-500" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
              {books?.map((book: any) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>

            {books?.length === 0 && (
              <div className="mx-2 rounded-sm border border-dashed border-zinc-900 py-20 text-center">
                <p className="text-sm text-zinc-500">No records found.</p>
                <button
                  onClick={() => navigate({ search: {} })}
                  className="mt-2 text-xs text-indigo-500 hover:underline"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
