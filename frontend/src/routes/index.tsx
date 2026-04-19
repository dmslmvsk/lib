import { createFileRoute} from '@tanstack/react-router'
import { BookCard } from '@/components/book-card'
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
const MOCK_BOOKS = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Classic',
    rating: 4.8,
    isAvailable: true
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Self-Help',
    rating: 4.9,
    isAvailable: false
  },
]

function Index() {
  return (
    <div className="container mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Catalog</h1>
        <p className="text-muted-foreground">Explore our vast collection of books</p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {MOCK_BOOKS.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  )
}
