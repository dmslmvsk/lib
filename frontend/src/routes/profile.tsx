import { createFileRoute, redirect } from '@tanstack/react-router'
export const Route = createFileRoute('/profile')({
  component: Profile,
	beforeLoad: ({context}) => {
		if(!context.auth.isAuthenticated){
			throw redirect({
        to: '/login',
				search: {
    		reason: 'auth_required',
  },
      })
		}
	}}
)

function Profile() {
  return <div>Hello "/profile"!</div>
}
