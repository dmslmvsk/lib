import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { bookService } from '../api/services/book.service'
import { authorService } from '../api/services/author.service'
import { genreService } from '../api/services/genre.service'
import { shelfService } from '../api/services/shelf.service'
import { libraryService } from '../api/services/library.service'
import { useState, useMemo } from 'react'
import { AdminPageTemplate, type TableColumn } from '@/components/admin-page-template'
import { AdminModal, type FieldConfig } from '@/components/admin-modal'
import type { Book } from '@/api/types/book.types'

export const Route = createFileRoute('/admin/books')({
  component: BooksPage,
})

function BooksPage() {
  const queryClient = useQueryClient()
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Book | null>(null)
  
  const [formValues, setFormValues] = useState<Record<string, any>>({})

  const { data: books, isLoading, isError } = useQuery({
    queryKey: ['books'],
    queryFn: bookService.getAll,
    retry: false
  })

  const { data: authors } = useQuery({
    queryKey: ['authors'],
    queryFn: authorService.getAll,
  })

  const { data: genres } = useQuery({
    queryKey: ['genres'],
    queryFn: genreService.getAll,
  })

  const { data: shelves } = useQuery({
    queryKey: ['shelves'],
    queryFn: shelfService.getAll,
  })

  const { data: libraries } = useQuery({
    queryKey: ['libraries'],
    queryFn: libraryService.getAll,
  })

  const createMutation = useMutation({
    mutationFn: (data: { title: string; authorId: string; genreId: string; shelfId: string }) => 
      bookService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
      closeModal()
    },
    onError: (err: any) => alert(err.response?.data?.error || 'Create error')
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: { title: string; authorId: string; genreId: string; shelfId: string } }) => 
      bookService.update({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
      closeModal()
    },
    onError: (err: any) => alert(err.response?.data?.error || 'Update error')
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => bookService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['books'] })
  })

  const openCreateModal = () => {
    setEditingItem(null)
    setIsModalOpen(true)
  }

  const openEditModal = (book: Book) => {
    setEditingItem(book)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingItem(null)
    setFormValues({})
  }

  const handleSave = (formData: Record<string, any>) => {
    const payload = {
      title: formData.title,
      authorId: formData.authorId,
      genreId: formData.genreId,
      shelfId: formData.shelfId,
    }

    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data: payload })
    } else {
      createMutation.mutate(payload)
    }
  }

  const filteredBooks = (books || []).filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const columns: TableColumn<Book>[] = [
    { header: 'Title', render: (book) => book.title },
    { header: 'Author', render: (book) => book.author?.name || '—' },
    { header: 'Genre', render: (book) => book.genre?.name || '—' },
    { header: 'Shelf', render: (book) => book.shelf?.label || '—' },
    { header: 'Library', render: (book) => book.shelf?.library?.name || '—' },
    { header: 'ID', render: (book) => <span className="text-zinc-500 font-mono text-xs">{book.id}</span> }
  ]

  const availableShelves = shelves?.filter(s => s.libraryId === formValues.libraryId) || []

  const modalFields: FieldConfig[] = [
    { 
      name: 'title', 
      label: 'Book Title', 
      placeholder: 'e.g. 1984, The Hobbit', 
      required: true 
    },
    {
      name: 'authorId',
      label: 'Author',
      type: 'select',
      placeholder: 'Select an author',
      required: true,
      options: authors?.map((a) => ({ label: a.name, value: a.id })) || []
    },
    {
      name: 'genreId',
      label: 'Genre',
      type: 'select',
      placeholder: 'Select a genre',
      required: true,
      options: genres?.map((g) => ({ label: g.name, value: g.id })) || []
    },
    {
      name: 'libraryId',
      label: 'Library',
      type: 'select',
      placeholder: 'Select a library',
      required: true,
      options: libraries?.map((l) => ({ label: l.name, value: l.id })) || []
    },
    {
      name: 'shelfId',
      label: 'Shelf',
      type: 'select',
      placeholder: formValues.libraryId ? 'Select a shelf' : 'Select a library first',
      required: true,
      disabled: !formValues.libraryId,
      options: availableShelves.map((s) => ({ 
        label: `${s.label} (${s.genre?.name || 'Unknown genre'})`, 
        value: s.id 
      }))
    }
  ]

  const initialModalData = useMemo(() => {
    return editingItem ? {
      ...editingItem,
      libraryId: editingItem.shelf?.libraryId || ''
    } : null
  }, [editingItem])

  if (isError) return <div className="text-red-500 p-4">Error loading books.</div>

  return (
    <>
      <AdminPageTemplate
        title="Books"
        description="Manage the library's book catalog and their placement"
        data={filteredBooks}
        columns={columns}
        isLoading={isLoading}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAdd={openCreateModal}
        onEdit={openEditModal}
        onDelete={(book) => {
          if (confirm(`Delete "${book.title}"?`)) deleteMutation.mutate(book.id)
        }}
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingItem ? 'Edit Book' : 'Add New Book'}
        description={editingItem ? 'Update the book details.' : 'Add a new book to the catalog.'}
        fields={modalFields}
        initialData={initialModalData}
        onSave={handleSave}
        isLoading={createMutation.isPending || updateMutation.isPending}
        onValuesChange={setFormValues}
      />
    </>
  )
}