import { createFileRoute } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { statsService } from "@/api/services/stats.service"
import { Book, Users, PenTool, BookmarkCheck, Loader2 } from "lucide-react"

export const Route = createFileRoute("/admin/")({
  component: DashboardPage,
})

function DashboardPage() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: statsService.getStats,
  })

  if (isLoading)
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="animate-spin text-indigo-500" />
      </div>
    )

  const cards = [
    {
      label: "Total Books",
      value: stats?.books,
      icon: Book,
      color: "text-blue-400",
    },
    {
      label: "Total Users",
      value: stats?.users,
      icon: Users,
      color: "text-purple-400",
    },
    {
      label: "Authors",
      value: stats?.authors,
      icon: PenTool,
      color: "text-amber-400",
    },
    {
      label: "On Hands",
      value: stats?.borrowed,
      icon: BookmarkCheck,
      color: "text-emerald-400",
    },
  ]

  return (
    <div className="animate-in fade-in space-y-8 p-8 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Dashboard
        </h1>
        <p className="text-zinc-400">Library overview and key metrics.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-sm border border-zinc-800 bg-zinc-900/50 p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <c.icon className={`h-6 w-6 ${c.color}`} />
            </div>
            <p className="text-sm font-medium tracking-wider text-zinc-500 uppercase">
              {c.label}
            </p>
            <p className="mt-1 text-4xl font-bold text-white">{c.value || 0}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex h-64 items-center justify-center rounded-sm border border-dashed border-zinc-800 text-zinc-700">
          Activity Chart Placeholder
        </div>
        <div className="flex h-64 items-center justify-center rounded-sm border border-dashed border-zinc-800 text-zinc-700">
          Popular Books Placeholder
        </div>
      </div>
    </div>
  )
}
