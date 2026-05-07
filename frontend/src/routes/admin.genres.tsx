import { createFileRoute } from '@tanstack/react-router'
import { Plus, Trash2, Edit2 } from 'lucide-react'

export const Route = createFileRoute('/admin/genres')({
  component: GenresPage,
})

// Временные данные для верстки
const mockGenres = [
  { id: '1', name: 'Science Fiction' },
  { id: '2', name: 'Fantasy' },
  { id: '3', name: 'Biography' },
]

function GenresPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Genres</h1>
          <p className="text-zinc-400 text-sm">Manage book categories</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl transition-colors">
          <Plus size={18} />
          Add Genre
        </button>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-800/30">
              <th className="px-6 py-4 text-sm font-semibold text-zinc-300">Name</th>
              <th className="px-6 py-4 text-sm font-semibold text-zinc-300">ID</th>
              <th className="px-6 py-4 text-sm font-semibold text-zinc-300 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {mockGenres.map((genre) => (
              <tr key={genre.id} className="hover:bg-zinc-800/20 transition-colors">
                <td className="px-6 py-4 text-zinc-200 font-medium">{genre.name}</td>
                <td className="px-6 py-4 text-zinc-500 text-xs font-mono">{genre.id}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 hover:bg-red-900/30 rounded-lg text-zinc-400 hover:text-red-400 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}