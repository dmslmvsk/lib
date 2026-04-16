import { createFileRoute} from '@tanstack/react-router'

import { toast } from 'sonner'
import { z } from 'zod'

const indexSearchSchema = z.object({
  reason: z.string().optional(),
})

export const Route = createFileRoute('/')({
  validateSearch: indexSearchSchema,
  onEnter: ({ search }) => {
    if (search.reason === 'authenticated') {
      toast.info("You are already signed in")
    }
  },
  component: Index,
})
function Index() {
  return <div>Hello "/profile"!</div>
}
