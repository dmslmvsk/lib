import { createFileRoute } from "@tanstack/react-router"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { authorService } from "../api/services/author.service"
import { useState } from "react"
import {
  AdminPageTemplate,
  type TableColumn,
} from "@/components/admin-page-template"
import { AdminModal, type FieldConfig } from "@/components/admin-modal"
import type { Author } from "@/types/book"

export const Route = createFileRoute("/admin/authors")({
  component: AuthorsPage,
})

function AuthorsPage() {
  const queryClient = useQueryClient()
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<{
    id: string
    name: string
  } | null>(null)

  const {
    data: authors,
    isLoading,
    isError,
  } = useQuery<Author[]>({
    queryKey: ["authors"],
    queryFn: authorService.getAll,
    retry: false,
  })

  const createMutation = useMutation({
    mutationFn: (name: string) => authorService.create({ name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authors"] })
      closeModal()
    },
    onError: (err: any) => alert(err.response?.data?.error || "Create error"),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name: string } }) =>
      authorService.update({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authors"] })
      closeModal()
    },
    onError: (err: any) => alert(err.response?.data?.error || "Update error"),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => authorService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authors"] }),
  })

  const openCreateModal = () => {
    setEditingItem(null)
    setIsModalOpen(true)
  }

  const openEditModal = (author: any) => {
    setEditingItem(author)
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

  const filteredAuthors = authors?.filter((author) =>
    author.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const columns: TableColumn<any>[] = [
    { header: "Author Name", render: (author) => author.name },
    {
      header: "ID",
      render: (author) => (
        <span className="font-mono text-xs text-zinc-500">{author.id}</span>
      ),
    },
  ]

  const modalFields: FieldConfig[] = [
    {
      name: "name",
      label: "Full Name",
      placeholder: "e.g. Stephen King",
      required: true,
    },
  ]

  if (isError)
    return <div className="p-4 text-red-500">Error loading authors.</div>

  return (
    <>
      <AdminPageTemplate
        title="Authors"
        description="Manage book authors"
        data={filteredAuthors}
        columns={columns}
        isLoading={isLoading}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAdd={openCreateModal}
        onEdit={openEditModal}
        onDelete={(author) => {
          if (confirm(`Delete "${author.name}"?`))
            deleteMutation.mutate(author.id)
        }}
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingItem ? "Edit Author" : "Add New Author"}
        description={
          editingItem
            ? "Update author info."
            : "Add a new author to the library."
        }
        fields={modalFields}
        initialData={editingItem}
        onSave={handleSave}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </>
  )
}
