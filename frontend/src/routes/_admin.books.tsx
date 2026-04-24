import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/books')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_admin/books"!</div>
}
