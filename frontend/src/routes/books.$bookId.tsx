import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { bookService } from '@/api/services/book.service'
import { 
  Loader2, 
  ArrowLeft, 
  MapPin, 
  Library as LibraryIcon, 
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { api } from '@/api/axios'
import { toast } from 'sonner'

export const Route = createFileRoute('/books/$bookId')({
  component: BookDetailsPage,
})

function BookDetailsPage() {
  const { bookId } = Route.useParams()
  const queryClient = useQueryClient()

  const { data: book, isLoading, isError } = useQuery({
    queryKey: ['book', bookId],
    queryFn: () => bookService.getById(bookId),
  })

  const borrowMutation = useMutation({
    mutationFn: () => api.post(`/books/${bookId}/borrow`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['book', bookId] })
      toast.success("Book successfully borrowed.")
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || "Action failed"
      toast.error(message)
    }
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
      <div className="min-h-dvh bg-[#0a0a0a] flex items-center justify-center p-4 md:p-6">
        <div className="text-center space-y-4">
          <AlertCircle className="h-10 w-10 text-zinc-800 mx-auto" />
          <h2 className="text-xl font-semibold text-zinc-200">Book not found</h2>
          <Link to="/">
            <Button variant="outline" className="border-zinc-800 text-zinc-400 rounded-sm">
              Back to Catalog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const isBorrowed = !!book.userId

  return (

    <div className="min-h-dvh bg-[#0a0a0a] text-zinc-200 p-4 md:p-12">
      <div className="container mx-auto max-w-5xl">
        
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-indigo-500 transition-colors mb-6 md:mb-12 text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Catalog
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-20">
          
          <div className="md:col-span-5 lg:col-span-4 max-w-sm mx-auto md:max-w-none w-full">
            <div className="aspect-3/4 rounded-sm bg-zinc-900 border border-zinc-800 flex items-center justify-center relative group overflow-hidden shadow-2xl">
              <span className="text-7xl md:text-9xl font-bold text-zinc-800 select-none group-hover:text-indigo-500/20 transition-colors duration-500">
                {book.title[0]}
              </span>
              
              <div className="absolute top-4 right-4">
                 <div className={`px-2.5 py-1 rounded-sm border text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                    isBorrowed 
                    ? "border-zinc-800 text-zinc-600 bg-zinc-950" 
                    : "border-indigo-500/30 text-indigo-400 bg-indigo-500/5 backdrop-blur-sm"
                 }`}>
                    {isBorrowed ? "Reserved" : "Available"}
                 </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 lg:col-span-8 space-y-8 md:space-y-10">
            
            <div className="space-y-3 md:space-y-4">
              <div className="inline-flex px-2 py-1 rounded-sm bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-bold uppercase tracking-wider">
                {book.genre.name}
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                {book.title}
              </h1>
              
              <p className="text-base md:text-lg text-zinc-400">
                by <span className="text-indigo-400 font-medium">{book.author.name}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 py-6 md:py-8 border-y border-zinc-900">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-zinc-900 rounded-sm">
                    <LibraryIcon className="h-4 w-4 text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Library</p>
                    <p className="text-zinc-200 text-sm font-medium">{book.shelf.library.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-zinc-900 rounded-sm">
                    <MapPin className="h-4 w-4 text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Location</p>
                    <p className="text-zinc-200 text-sm font-medium">Shelf {book.shelf.label}</p>
                  </div>
                </div>
            </div>

            <div className="space-y-2 md:space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Description</h3>
                <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-normal">
                    {book.description || "No description available for this book."}
                </p>
            </div>

            <div className="pt-4 md:pt-6 pb-8 md:pb-0">
              <Button 
                  size="lg" 
                  onClick={() => borrowMutation.mutate()}
                  disabled={isBorrowed || borrowMutation.isPending}
                  className={`w-full sm:w-auto min-w-50 rounded-sm font-bold text-sm h-12 transition-all hover:cursor-pointer ${
                    isBorrowed 
                    ? "bg-zinc-900 text-zinc-600 border border-zinc-800" 
                    : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/10"
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