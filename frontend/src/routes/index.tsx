import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { bookService } from '@/api/services/book.service'
import { BookCard } from '@/components/book-card'
import { Input } from '@/components/ui/input'
import { Search, Loader2, Library } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'

const indexSearchSchema = z.object({
  reason: z.string().optional(),
})

export const Route = createFileRoute('/')({
  validateSearch: indexSearchSchema,
  component: Index,
})

function Index() {
  const [search, setSearch] = useState('')

  const { data: books, isLoading } = useQuery({
    queryKey: ['public-books'],
    queryFn: bookService.getAll,
  })

  const filteredBooks = books?.filter(book => 
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100">
      {/* Hero Section */}
      <div className="border-b border-zinc-800 bg-zinc-900/30">
        <div className="container mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">
                <Library className="h-3 w-3" />
                Digital Library Access
              </div>
              <h1 className="text-5xl font-black tracking-tighter text-white lg:text-6xl">
                Library<span className="text-indigo-500">Hub</span>
              </h1>
              <p className="text-zinc-400 max-w-md text-lg leading-relaxed">
                Explore thousands of books, manage your readings, and discover your next favorite story.
              </p>
            </div>

            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input 
                placeholder="Search by title or author..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 pl-10 rounded-sm bg-zinc-900 border-zinc-800 text-white focus-visible:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="container mx-auto px-6 py-12">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
            <p className="font-mono text-zinc-500 text-sm">Loading library collection...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {filteredBooks?.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
            
            {filteredBooks?.length === 0 && (
              <div className="col-span-full py-20 text-center border border-dashed border-zinc-800 rounded-sm">
                <p className="text-zinc-500">No books found matching your search.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}