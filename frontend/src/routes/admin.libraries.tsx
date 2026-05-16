import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { libraryService } from '../api/services/library.service'
import { useState } from 'react'
import { AdminPageTemplate, type TableColumn } from '@/components/admin-page-template'
import { AdminModal, type FieldConfig } from '@/components/admin-modal'
import type { Library } from '@/api/types/library.types'

export const Route = createFileRoute('/admin/libraries')({
  component: LibrariesPage,
})

function LibrariesPage() {
  const queryClient = useQueryClient()
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Library | null>(null)

  const { data: libraries, isLoading, isError } = useQuery({
    queryKey: ['libraries'],
    queryFn: libraryService.getAll,
    retry: false
  })

  const createMutation = useMutation({
    mutationFn: (data: { name: string }) => libraryService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['libraries'] })
      closeModal()
    },
    onError: (err: any) => alert(err.response?.data?.error || 'Create error')
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: { name: string } }) => 
      libraryService.update({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['libraries'] })
      closeModal()
    },
    onError: (err: any) => alert(err.response?.data?.error || 'Update error')
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => libraryService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['libraries'] })
  })

  const openCreateModal = () => {
    setEditingItem(null)
    setIsModalOpen(true)
  }

  const openEditModal = (library: Library) => {
    setEditingItem(library)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingItem(null)
  }

  const handleSave = (formData: Record<string, any>) => {
    const payload = {
      name: formData.name,
    }

    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data: payload })
    } else {
      createMutation.mutate(payload)
    }
  }

  const filteredLibraries = (libraries || []).filter((library) =>
    library.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const columns: TableColumn<Library>[] = [
    { header: 'Library Name', render: (library) => library.name },
    { header: 'Shelves Count', render: (library) => library.shelves?.length || 0 },
    { header: 'ID', render: (library) => <span className="text-zinc-500 font-mono text-xs">{library.id}</span> }
  ]

  const modalFields: FieldConfig[] = [
    { 
      name: 'name', 
      label: 'Library Name', 
      placeholder: 'e.g. Central Library, Science Branch', 
      required: true 
    }
  ]

  if (isError) return <div className="text-red-500 p-4">Error loading libraries.</div>

  return (
    <>
      <AdminPageTemplate
        title="Libraries"
        description="Manage physical library buildings and branches"
        data={filteredLibraries}
        columns={columns}
        isLoading={isLoading}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAdd={openCreateModal}
        onEdit={openEditModal}
        onDelete={(library) => {
          if (confirm(`Delete library "${library.name}"?`)) deleteMutation.mutate(library.id)
        }}
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingItem ? 'Edit Library' : 'Add New Library'}
        description={editingItem ? 'Update the library building details.' : 'Create a new library branch.'}
        fields={modalFields}
        initialData={editingItem}
        onSave={handleSave}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </>
  )
}