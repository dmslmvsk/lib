import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin')({
  component: AdminLayout,
  beforeLoad: ({ context }) => {
      if(!context.auth.user){
        throw redirect({ to: '/login', search: {
          reason: 'authenticated',
    }, })
      }

      if (context.auth.user.role !== "ADMIN") {
        throw redirect({ to: '/', search: {
          reason: '',
    }, })
      }
    },
})

function AdminLayout() {
  return (
      <div className="mx-auto max-w-7xl">
        <Outlet />
      </div>
  )
}