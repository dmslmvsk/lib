import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { bookService } from '@/api/services/book.service'
import { 
  Loader2, 
  ArrowLeft, 
  MapPin, 
  Library as LibraryIcon, 
  AlertCircle,
  CheckCircle2
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

  // 1. Получаем данные книги
  const { data: book, isLoading, isError } = useQuery({
    queryKey: ['book', bookId],
    queryFn: () => bookService.getById(bookId),
  })

  // 2. Логика выдачи книги (Borrow)
  const borrowMutation = useMutation({
    mutationFn: () => api.post(`/books/${bookId}/borrow`),
    onSuccess: () => {
      // Обновляем данные, чтобы кнопка сразу стала "Reserved"
      queryClient.invalidateQueries({ queryKey: ['book', bookId] })
      toast.success("Archive updated. Item assigned to your profile.")
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || "Transaction failed"
      toast.error(message)
    }
  })

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0a0a0a]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
          <p className="font-mono text-zinc-500 text-[10px] uppercase tracking-[0.3em]">Opening Archive...</p>
        </div>
      </div>
    )
  }

  if (isError || !book) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
        <div className="text-center space-y-6">
          <AlertCircle className="h-12 w-12 text-zinc-800 mx-auto" />
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-zinc-200 uppercase tracking-tight">Record Missing</h2>
            <p className="text-zinc-500 text-sm font-mono">The requested ID does not match any entry.</p>
          </div>
          <Link to="/">
            <Button variant="outline" className="border-zinc-800 text-zinc-400 hover:text-white rounded-sm">
              Return to Catalog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const isBorrowed = !!book.userId

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 p-6 md:p-12 selection:bg-indigo-500/30">
      <div className="container mx-auto max-w-5xl">
        
        {/* Navigation */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-zinc-600 hover:text-indigo-400 transition-colors mb-16 group font-mono text-[10px] uppercase tracking-widest"
        >
          <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
          Back to Index
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
          
          {/* LEFT: The Artifact (Placeholder) */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="aspect-[3/4] rounded-sm bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden relative group flex items-center justify-center cursor-default">
              
              {/* Internal Glow */}
              <div className="absolute inset-0 bg-indigo-500/5 blur-3xl opacity-40 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Massive First Letter */}
              <span className="text-[180px] font-black text-zinc-900 select-none leading-none transform scale-110 group-hover:text-indigo-900/40 transition-colors duration-500">
                {book.title[0]}
              </span>

              {/* Technical Corners */}
              <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-zinc-800 group-hover:border-indigo-500/30 transition-colors" />
              <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-zinc-800 group-hover:border-indigo-500/30 transition-colors" />
              
              {/* Availability Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              
              {/* Float Badge */}
              <div className="absolute top-6 right-6">
                 <div className={`px-2 py-1 rounded-sm border text-[9px] font-black uppercase tracking-tighter ${
                    isBorrowed 
                    ? "border-zinc-800 text-zinc-600" 
                    : "border-indigo-500/20 text-indigo-400 bg-indigo-500/5"
                 }`}>
                    {isBorrowed ? "Reserved" : "Available"}
                 </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Meta Information */}
          <div className="md:col-span-7 lg:col-span-8 space-y-12">
            
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="inline-flex px-2 py-1 rounded-sm bg-zinc-900 border border-zinc-800 text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">
                  {book.genre.name}
                </div>
                {isBorrowed && (
                  <div className="flex items-center gap-2 text-zinc-600 font-mono text-[10px] uppercase tracking-widest">
                    <CheckCircle2 className="h-3 w-3 text-indigo-500" /> Assigned
                  </div>
                )}
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[0.85] uppercase">
                {book.title}
              </h1>
              
              <p className="text-lg text-zinc-500 font-medium tracking-tight">
                Author: <span className="text-zinc-300 underline underline-offset-4 decoration-indigo-500/30">{book.author.name}</span>
              </p>
            </div>

            {/* Spec Sheet (Library & Shelf) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 py-10 border-y border-zinc-800/50">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-zinc-900 rounded-sm border border-zinc-800">
                      <LibraryIcon className="h-5 w-5 text-indigo-500" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] text-zinc-600 uppercase font-black tracking-[0.2em]">Repository</p>
                        <p className="text-zinc-200 font-medium">{book.shelf.library.name}</p>
                    </div>
                </div>
                
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-zinc-900 rounded-sm border border-zinc-800">
                      <MapPin className="h-5 w-5 text-indigo-500" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] text-zinc-600 uppercase font-black tracking-[0.2em]">Access Index</p>
                        <p className="text-zinc-200 font-medium">Shelf: {book.shelf.label}</p>
                    </div>
                </div>
            </div>

            {/* Abstract */}
            <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Archive Note</h3>
                <p className="text-zinc-400 leading-relaxed text-lg font-light italic max-w-xl border-l border-zinc-800 pl-6">
                    {book.description || "The digital record for this item does not include a summary."}
                </p>
            </div>

            {/* Final Action */}
            <div className="pt-4">
              <Button 
                  size="lg" 
                  onClick={() => borrowMutation.mutate()}
                  disabled={isBorrowed || borrowMutation.isPending}
                  className={`w-full md:w-auto px-16 rounded-sm font-black uppercase tracking-[0.2em] h-16 transition-all shadow-2xl active:scale-95 cursor-pointer ${
                    isBorrowed 
                    ? "bg-zinc-900 text-zinc-700 border border-zinc-800" 
                    : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20"
                  }`}
              >
                  {borrowMutation.isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : isBorrowed ? (
                    "Item Out"
                  ) : (
                    "Borrow Item"
                  )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}