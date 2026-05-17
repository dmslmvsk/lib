import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { bookService } from '@/api/services/book.service'
import { api } from '@/api/axios'
import { BookCard } from '@/components/book-card'
import { Search, Loader2} from 'lucide-react'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const indexSearchSchema = z.object({
  search: z.string().optional(),
  genreId: z.string().optional(),
})

export const Route = createFileRoute('/')({
  validateSearch: indexSearchSchema,
  component: Index,
})

function Index() {
  const { search, genreId } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })

  const { data: books, isLoading } = useQuery({
    queryKey: ['public-books', search, genreId],
    queryFn: () => bookService.getAll({ search, genreId }),
  })

  const { data: genres } = useQuery({
    queryKey: ['genres'],
    queryFn: () => api.get('/genres').then(res => res.data),
  })

  const updateSearch = (val: string) => {
    navigate({ search: (prev) => ({ ...prev, search: val || undefined }) })
  }

  const updateGenre = (id: string | undefined) => {
    navigate({ search: (prev) => ({ ...prev, genreId: id || undefined }) })
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      
      <div className="border-b border-zinc-900 bg-zinc-950/50">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Archive <span className="text-indigo-500">Collection</span>
            </h1>
            <p className="text-zinc-500 text-sm max-w-lg">
              Manage and explore our digital repository of books and resources.
            </p>
          </div>
        </div>
      </div>

      <div className="sticky top-16 z-40 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-zinc-900">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            
            <div className="relative w-full lg:max-w-xs">
              <Input 
                type="text"
                placeholder="Search..." 
                value={search || ''}
                onChange={(e) => updateSearch(e.target.value)}
                className="w-full h-10 pl-9 pr-4 bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm rounded-sm placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>

            <div className="h-4 w-px bg-zinc-800 hidden lg:block" />

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full">
              <button
                onClick={() => updateGenre(undefined)}
                className={`px-3 py-1.5 rounded-sm hover:cursor-pointer text-xs font-medium transition-all whitespace-nowrap border ${
                  !genreId 
                  ? "bg-indigo-600 border-indigo-600 text-white" 
                  : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                }`}
              >
                All Genres
              </button>
              {genres?.map((g: any) => (
                <button
                  key={g.id}
                  onClick={() => updateGenre(g.id)}
                  className={`px-3 py-1.5 rounded-sm text-xs font-medium transition-all hover:cursor-pointer whitespace-nowrap border ${
                    genreId === g.id 
                    ? "bg-indigo-600 border-indigo-600 text-white" 
                    : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                  }`}
                >
                  {g.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-indigo-500" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {books?.map((book: any) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>

            {books?.length === 0 && (
              <div className="text-center py-20 border border-dashed border-zinc-900 rounded-sm">
                <p className="text-zinc-500 text-sm">No records found.</p>
                <button 
                  onClick={() => navigate({ search: {} })}
                  className="mt-2 text-indigo-500 hover:underline text-xs"
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