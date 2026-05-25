import { createFileRoute } from "@tanstack/react-router"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { userService } from "../api/services/user.service"
import { useState } from "react"
import {
  AdminPageTemplate,
  type TableColumn,
} from "@/components/admin-page-template"
import { AdminModal, type FieldConfig } from "@/components/admin-modal"
import type { User } from "@/api/types/user.types"

export const Route = createFileRoute("/admin/users")({
  component: UsersPage,
})

function UsersPage() {
  const queryClient = useQueryClient()
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<User | null>(null)

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
    retry: false,
  })

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string
      data: { role: "USER" | "ADMIN" }
    }) => userService.update({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      closeModal()
    },
    onError: (err: any) => alert(err.response?.data?.error || "Update error"),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => userService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  })

  const openEditModal = (user: User) => {
    setEditingItem(user)
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
        data: { role: formData.role },
      })
    }
  }

  const filteredUsers = (users || []).filter((user) =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const columns: TableColumn<User>[] = [
    { header: "Email", render: (user) => user.email },
    {
      header: "Role",
      render: (user) => (
        <span
          className={`rounded-sm px-2 py-0.5 text-[10px] font-bold tracking-wider ${
            user.role === "ADMIN"
              ? "border border-indigo-500/30 bg-indigo-500/20 text-indigo-400"
              : "border border-zinc-700 bg-zinc-800 text-zinc-400"
          }`}
        >
          {user.role}
        </span>
      ),
    },
    {
      header: "Borrowed",
      render: (user) => (
        <span className="text-zinc-300">
          {user.borrowedBooks?.length || 0} books
        </span>
      ),
    },
    {
      header: "Created At",
      render: (user) => new Date(user.createdAt).toLocaleDateString(),
    },
  ]

  const modalFields: FieldConfig[] = [
    {
      name: "email",
      label: "User Email",
      type: "text",
      disabled: true,
      fullWidth: true,
    },
    {
      name: "role",
      label: "Account Role",
      type: "select",
      required: true,
      options: [
        { label: "USER", value: "USER" },
        { label: "ADMIN", value: "ADMIN" },
      ],
    },
  ]

  if (isError)
    return (
      <div className="p-4 font-mono text-red-500">
        Error loading users... check console.
      </div>
    )

  return (
    <>
      <AdminPageTemplate
        title="Users"
        description="Manage permissions and view activity of library members"
        data={filteredUsers}
        columns={columns}
        isLoading={isLoading}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onEdit={openEditModal}
        onDelete={(user) => {
          if (confirm(`Are you sure you want to delete ${user.email}?`)) {
            deleteMutation.mutate(user.id)
          }
        }}
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Edit User Permissions"
        description="Change user role to grant or revoke administrative access."
        fields={modalFields}
        initialData={editingItem}
        onSave={handleSave}
        isLoading={updateMutation.isPending}
      />
    </>
  )
}
