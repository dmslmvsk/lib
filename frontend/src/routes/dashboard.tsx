import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/api/axios'
import { 
  User, 
  Calendar, 
  BookOpen, 
  Loader2, 
  RotateCcw,
  ShieldCheck,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  const queryClient = useQueryClient()

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => api.get('/users/me').then(res => res.data),
  })

  const returnMutation = useMutation({
    mutationFn: (bookId: string) => api.post(`/books/${bookId}/return`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      queryClient.invalidateQueries({ queryKey: ['public-books'] })
      toast.success("Book returned successfully")
    },
    onError: () => toast.error("Failed to return book")
  })

  if (isLoading) return (
    <div className="flex h-screen items-center justify-center bg-[#0a0a0a]">
      <Loader2 className="h-6 w-6 animate-spin text-indigo-500" />
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200 p-6 md:p-12">
      <div className="container mx-auto max-w-5xl space-y-10">
        
        <header className="border-b border-zinc-900 pb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">User Dashboard</h1>
          <p className="text-zinc-500 text-sm mt-1">Manage your profile and active readings.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-4">
            <div className="p-6 bg-zinc-950 border border-zinc-900 rounded-sm space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-600/10 rounded-sm">
                    <User className="h-5 w-5 text-indigo-500" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Email Address</p>
                    <p className="text-sm font-medium text-zinc-200 truncate">{profile.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-500/10 rounded-sm">
                    <ShieldCheck className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Access Level</p>
                    <p className="text-sm font-medium text-zinc-200">{profile.role}</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-900 grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-zinc-500">
                    <Calendar size={12} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Joined</span>
                  </div>
                  <p className="text-xs font-medium text-zinc-300">
                    {new Date(profile.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-zinc-500">
                    <BookOpen size={12} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Books</span>
                  </div>
                  <p className="text-xs font-medium text-zinc-300">
                    {profile.borrowedBooks.length} Active
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <ArrowRight size={14} className="text-indigo-500" />
              Your Active Borrows
            </h3>

            {profile.borrowedBooks.length === 0 ? (
              <div className="py-16 border border-dashed border-zinc-900 rounded-sm text-center bg-zinc-950/30">
                <p className="text-zinc-500 text-sm">You don't have any borrowed books.</p>
                <Link to="/" className="text-indigo-500 text-xs font-semibold hover:underline mt-3 inline-block">
                  Browse Catalog
                </Link>
              </div>
            ) : (
              <div className="grid gap-3">
                {profile.borrowedBooks.map((book: any) => (
                  <div 
                    key={book.id} 
                    className="p-4 bg-zinc-900/40 border border-zinc-900 rounded-sm flex items-center justify-between hover:border-zinc-800 transition-colors"
                  >
                    <div className="space-y-1">
                      <h4 className="font-semibold text-zinc-100">{book.title}</h4>
                      <p className="text-xs text-zinc-500">
                        {book.author.name} • {book.shelf.library.name}
                      </p>
                    </div>
                    <Button 
                      onClick={() => returnMutation.mutate(book.id)}
                      disabled={returnMutation.isPending}
                      variant="outline"
                      size="sm"
                      className="h-9 px-4 text-xs font-semibold border-zinc-800 hover:bg-indigo-600 hover:border-indigo-600 hover:text-white rounded-sm hover:cursor-pointer transition-all"
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