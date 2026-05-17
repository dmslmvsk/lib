import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { statsService } from '@/api/services/stats.service'
import { Book, Users, PenTool, BookmarkCheck, Loader2 } from 'lucide-react'

export const Route = createFileRoute('/admin/')({
  component: DashboardPage,
})

function DashboardPage() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: statsService.getStats,
  })

  if (isLoading) return <div className="flex h-full items-center justify-center"><Loader2 className="animate-spin text-indigo-500" /></div>

  const cards = [
    { label: 'Total Books', value: stats?.books, icon: Book, color: 'text-blue-400' },
    { label: 'Total Users', value: stats?.users, icon: Users, color: 'text-purple-400' },
    { label: 'Authors', value: stats?.authors, icon: PenTool, color: 'text-amber-400' },
    { label: 'On Hands', value: stats?.borrowed, icon: BookmarkCheck, color: 'text-emerald-400' },
  ]

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
        <p className="text-zinc-400">Library overview and key metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c) => (
          <div key={c.label} className="p-6 rounded-sm border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center justify-between mb-4">
              <c.icon className={`h-6 w-6 ${c.color}`} />
            </div>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider">{c.label}</p>
            <p className="text-4xl font-bold text-white mt-1">{c.value || 0}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-64 rounded-sm border border-zinc-800 border-dashed flex items-center justify-center text-zinc-700">
          Activity Chart Placeholder
        </div>
        <div className="h-64 rounded-sm border border-zinc-800 border-dashed flex items-center justify-center text-zinc-700">
          Popular Books Placeholder
        </div>
      </div>
    </div>
  )
}