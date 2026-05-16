import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { shelfService } from '../api/services/shelf.service'
import { genreService } from '../api/services/genre.service'
import { libraryService } from '../api/services/library.service'
import { useState } from 'react'
import { AdminPageTemplate, type TableColumn } from '@/components/admin-page-template'
import { AdminModal, type FieldConfig } from '@/components/admin-modal'
import type { Shelf } from '@/api/types/shelf.types'

export const Route = createFileRoute('/admin/shelves')({
  component: ShelvesPage,
})

function ShelvesPage() {
  const queryClient = useQueryClient()
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Shelf | null>(null)

  const { data: shelves, isLoading, isError } = useQuery({
    queryKey: ['shelves'],
    queryFn: shelfService.getAll,
    retry: false
  })

  const { data: genres } = useQuery({
    queryKey: ['genres'],
    queryFn: genreService.getAll,
  })

  const { data: libraries } = useQuery({
    queryKey: ['libraries'],
    queryFn: libraryService.getAll,
  })

  const createMutation = useMutation({
    mutationFn: (data: { label: string; libraryId: string; genreId: string }) => shelfService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shelves'] })
      closeModal()
    },
    onError: (err: any) => alert(err.response?.data?.error || 'Create error')
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: { label: string; libraryId: string; genreId: string } }) => 
      shelfService.update({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shelves'] })
      closeModal()
    },
    onError: (err: any) => alert(err.response?.data?.error || 'Update error')
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => shelfService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['shelves'] })
  })

  const openCreateModal = () => {
    setEditingItem(null)
    setIsModalOpen(true)
  }

  const openEditModal = (shelf: Shelf) => {
    setEditingItem(shelf)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingItem(null)
  }

  const handleSave = (formData: Record<string, any>) => {
    const payload = {
      label: formData.label,
      libraryId: formData.libraryId,
      genreId: formData.genreId,
    }

    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data: payload })
    } else {
      createMutation.mutate(payload)
    }
  }

  const filteredShelves = (shelves || []).filter((shelf) =>
    shelf.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const columns: TableColumn<Shelf>[] = [
    { header: 'Shelf Label', render: (shelf) => shelf.label },
    { header: 'Library', render: (shelf) => shelf.library?.name || '—' },
    { header: 'Genre', render: (shelf) => shelf.genre?.name || '—' },
    { header: 'Books', render: (shelf) => shelf.books?.length || 0 },
    { header: 'ID', render: (shelf) => <span className="text-zinc-500 font-mono text-xs">{shelf.id}</span> }
  ]

  const modalFields: FieldConfig[] = [
    { 
      name: 'label', 
      label: 'Shelf Label', 
      placeholder: 'e.g. A1, Sci-Fi Block', 
      required: true 
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
      name: 'genreId',
      label: 'Genre',
      type: 'select',
      placeholder: 'Select a genre',
      required: true,
      options: genres?.map((g) => ({ label: g.name, value: g.id })) || []
    }
  ]

  if (isError) return <div className="text-red-500 p-4">Error loading shelves.</div>

  return (
    <>
      <AdminPageTemplate
        title="Shelves"
        description="Manage library shelves and assign them to libraries and genres"
        data={filteredShelves}
        columns={columns}
        isLoading={isLoading}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAdd={openCreateModal}
        onEdit={openEditModal}
        onDelete={(shelf) => {
          if (confirm(`Delete shelf "${shelf.label}"?`)) deleteMutation.mutate(shelf.id)
        }}
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingItem ? 'Edit Shelf' : 'Add New Shelf'}
        description={editingItem ? 'Update the shelf details.' : 'Create a new shelf and assign a library and genre.'}
        fields={modalFields}
        initialData={editingItem}
        onSave={handleSave}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </>
  )
}