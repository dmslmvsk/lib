import { createFileRoute } from "@tanstack/react-router"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { genreService } from "../api/services/genre.service"
import { useState } from "react"
import {
  AdminPageTemplate,
  type TableColumn,
} from "@/components/admin-page-template"
import { AdminModal, type FieldConfig } from "@/components/admin-modal"
import type { Genre } from "@/types/book"

export const Route = createFileRoute("/admin/genres")({
  component: GenresPage,
})

function GenresPage() {
  const queryClient = useQueryClient()
  const [searchQuery, setSearchQuery] = useState("")

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [editingItem, setEditingItem] = useState<{
    id: string
    name: string
  } | null>(null)

  const {
    data: genres,
    isLoading,
    isError,
  } = useQuery<Genre[]>({
    queryKey: ["genres"],
    queryFn: genreService.getAll,
    retry: false,
  })

  const createMutation = useMutation({
    mutationFn: (name: string) => genreService.create({ name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["genres"] })
      closeModal()
    },
    onError: (err: any) => alert(err.response?.data?.error || "Create error"),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name: string } }) =>
      genreService.update({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["genres"] })
      closeModal()
    },
    onError: (err: any) => alert(err.response?.data?.error || "Update error"),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => genreService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["genres"] }),
  })

  const openCreateModal = () => {
    setEditingItem(null)
    setIsModalOpen(true)
  }

  const openEditModal = (genre: any) => {
    setEditingItem(genre)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingItem(null)
  }

  const handleSave = (formData: Record<string, any>) => {
    if (editingItem) {
      updateMutation.mutate({
        id: editingItem.id,
        data: { name: formData.name },
      })
    } else {
      createMutation.mutate(formData.name)
    }
  }

  const filteredGenres = genres?.filter((genre) =>
    genre.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const columns: TableColumn<any>[] = [
    { header: "Name", render: (genre) => genre.name },
    {
      header: "ID",
      render: (genre) => (
        <span className="font-mono text-xs text-zinc-500">{genre.id}</span>
      ),
    },
  ]

  const modalFields: FieldConfig[] = [
    {
      name: "name",
      label: "Genre Name",
      placeholder: "e.g. Science Fiction",
      required: true,
    },
  ]

  if (isError)
    return <div className="p-4 text-red-500">Error loading genres.</div>

  return (
    <>
      <AdminPageTemplate
        title="Genres"
        description="Manage library categories"
        data={filteredGenres}
        columns={columns}
        isLoading={isLoading}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAdd={openCreateModal}
        onEdit={openEditModal}
        onDelete={(genre) => {
          if (confirm(`Delete "${genre.name}"?`))
            deleteMutation.mutate(genre.id)
        }}
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingItem ? "Edit Genre" : "Add New Genre"}
        description={
          editingItem
            ? "Update the details of the genre."
            : "Fill in the form to create a new genre."
        }
        fields={modalFields}
        initialData={editingItem}
        onSave={handleSave}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </>
  )
}
