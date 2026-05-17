import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/api/axios'
import { 
  User, 
  Calendar, 
  BookOpen, 
  LogOut, 
  Loader2, 
  RotateCcw,
  ShieldCheck
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
      toast.success("Book returned to archive")
    },
    onError: () => toast.error("Failed to return book")
  })

  if (isLoading) return (
    <div className="flex h-screen items-center justify-center bg-[#0a0a0a]">
      <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 p-6 md:p-12">
      <div className="container mx-auto max-w-6xl space-y-12">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-800 pb-10">
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tighter uppercase">Command Center</h1>
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">User Session: Active</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 bg-zinc-950 border border-zinc-800 rounded-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <User size={120} className="text-indigo-500" />
              </div>
              
              <div className="relative z-10 space-y-8">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-sm bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-2">
                    <ShieldCheck className="h-3 w-3" /> {profile.role}
                  </div>
                  <h2 className="text-2xl font-bold truncate">{profile.email}</h2>
                </div>

                <div className="space-y-4 pt-4 border-t border-zinc-900">
                  <div className="flex items-center gap-3 text-zinc-400">
                    <Calendar className="h-4 w-4 text-indigo-500" />
                    <div className="text-xs">
                      <p className="text-zinc-600 font-black uppercase tracking-tighter text-[9px]">Registered Since</p>
                      <p>{new Date(profile.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-zinc-400">
                    <BookOpen className="h-4 w-4 text-indigo-500" />
                    <div className="text-xs">
                      <p className="text-zinc-600 font-black uppercase tracking-tighter text-[9px]">Current Borrows</p>
                      <p>{profile.borrowedBooks.length} Items</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-500 border-l-2 border-indigo-500 pl-4">
              My Active Records
            </h3>

            {profile.borrowedBooks.length === 0 ? (
              <div className="py-20 border border-dashed border-zinc-800 rounded-sm text-center">
                <p className="text-zinc-600 italic">No active records found in your possession.</p>
                <Link to="/" className="text-indigo-500 text-sm hover:underline mt-4 inline-block">Browse Catalog</Link>
              </div>
            ) : (
              <div className="grid gap-4">
                {profile.borrowedBooks.map((book: any) => (
                  <div key={book.id} className="group p-6 bg-zinc-900/50 border border-zinc-800 rounded-sm flex items-center justify-between hover:border-zinc-700 transition-colors">
                    <div className="space-y-1">
                      <h4 className="font-bold text-lg group-hover:text-indigo-400 transition-colors">{book.title}</h4>
                      <p className="text-xs text-zinc-500">{book.author.name} • {book.shelf.library.name}</p>
                    </div>
                    <Button 
                      onClick={() => returnMutation.mutate(book.id)}
                      disabled={returnMutation.isPending}
                      variant="secondary"
                      size="sm"
                      className="bg-zinc-800 hover:bg-indigo-600 hover:text-white rounded-sm font-bold text-[10px] uppercase tracking-widest px-6 h-10 hover:cursor-pointer"
                    >
                      {returnMutation.isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : (
                        <>
                          <RotateCcw className="mr-2 h-3 w-3" /> Return
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