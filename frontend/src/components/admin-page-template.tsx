import { Search, Plus, Edit2, Trash2, Loader2 } from "lucide-react"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"

export interface TableColumn<T> {
  header: string
  render: (item: T) => React.ReactNode
}

interface AdminPageTemplateProps<T> {
  title: string
  description: string
  data: T[] | undefined
  columns: TableColumn<T>[]
  isLoading: boolean

  searchQuery: string
  onSearchChange: (value: string) => void
  searchPlaceholder?: string

  onAdd?: () => void
  onEdit: (item: T) => void
  onDelete: (item: T) => void
}

export function AdminPageTemplate<T extends { id: string }>({
  title,
  description,
  data,
  columns,
  isLoading,
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Search...",
  onAdd,
  onEdit,
  onDelete,
}: AdminPageTemplateProps<T>) {
  return (
    <div className="space-y-4 rounded-sm md:space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white md:text-2xl">{title}</h1>
        <p className="text-xs text-zinc-400 md:text-sm">{description}</p>
      </div>

      <div className="flex flex-col items-start justify-between gap-3 rounded-sm border border-zinc-800 bg-zinc-900/50 p-3 sm:flex-row sm:items-center md:gap-4 md:p-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-sm border-zinc-800 bg-zinc-950 pl-9 text-zinc-200 focus-visible:ring-indigo-500"
          />
        </div>

        {onAdd && (
          <Button
            onClick={onAdd}
            className="h-10 w-full cursor-pointer rounded-sm bg-indigo-600 px-4 text-white hover:bg-indigo-500 sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        )}
      </div>

      <div className="no-scrollbar overflow-x-auto rounded-sm border border-zinc-800 bg-zinc-900">
        {isLoading ? (
          <div className="flex justify-center p-10 text-zinc-500">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <Table className="min-w-150 md:min-w-full">
            <TableHeader className="bg-zinc-800/30">
              <TableRow className="border-zinc-800 hover:bg-transparent">
                {columns.map((col, index) => (
                  <TableHead
                    key={index}
                    className="font-semibold whitespace-nowrap text-zinc-300"
                  >
                    {col.header}
                  </TableHead>
                ))}
                <TableHead className="text-right font-semibold whitespace-nowrap text-zinc-300">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.length === 0 ? (
                <TableRow className="border-zinc-800 hover:bg-transparent">
                  <TableCell
                    colSpan={columns.length + 1}
                    className="h-24 text-center text-sm text-zinc-500"
                  >
                    No results found.
                  </TableCell>
                </TableRow>
              ) : (
                data?.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border-zinc-800 transition-colors hover:bg-zinc-800/20"
                  >
                    {columns.map((col, index) => (
                      <TableCell
                        key={index}
                        className="py-3 font-medium text-zinc-200"
                      >
                        {col.render(item)}
                      </TableCell>
                    ))}
                    <TableCell className="py-3 text-right">
                      <div className="flex justify-end gap-1 md:gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(item)}
                          className="h-8 w-8 text-zinc-400 hover:cursor-pointer hover:bg-zinc-700 hover:text-white"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(item)}
                          className="h-8 w-8 text-zinc-400 hover:cursor-pointer hover:bg-red-900/30 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
