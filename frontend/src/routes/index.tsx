import { BookCard } from '@/components/book-card'
import { toast } from 'sonner'
import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'
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
  { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Classic', rating: 4.8, isAvailable: true },
  { id: '2', title: 'Atomic Habits', author: 'James Clear', category: 'Self-Help', rating: 4.9, isAvailable: false },
  { id: '3', title: 'The Hobbit', author: 'J.R.R. Tolkien', category: 'Fantasy', rating: 4.7, isAvailable: true },
  { id: '4', title: 'Deep Work', author: 'Cal Newport', category: 'Self-Help', rating: 4.6, isAvailable: true },
  { id: '5', title: 'Zero to One', author: 'Peter Thiel', category: 'Business', rating: 4.5, isAvailable: false },
  { id: '6', title: '1984', author: 'George Orwell', category: 'Classic', rating: 4.9, isAvailable: true },
]

function Index() {
  return (
    <div className="container mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tight text-foreground">
          Library<span className="text-primary">Hub</span> Catalog
        </h1>
        <p className="text-muted-foreground mt-2">
          Explore our collection of available books.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {MOCK_BOOKS.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  )
}