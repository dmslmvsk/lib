// src/routes/_admin.admin.tsx
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/')({
  component: AdminPage,
})

function AdminPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
      <Link to='/admin/books'>Books</Link>
    </div>
  )
}