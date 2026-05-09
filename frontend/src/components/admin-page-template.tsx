import { Search, Plus, Edit2, Trash2, Loader2 } from 'lucide-react'

import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'

export interface TableColumn<T> {
  header: string;
  render: (item: T) => React.ReactNode; 
}

interface AdminPageTemplateProps<T> {
  title: string;
  description: string;
  data: T[] | undefined;
  columns: TableColumn<T>[];
  isLoading: boolean;
  
  searchQuery: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  
  onAdd: () => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
}

export function AdminPageTemplate<T extends { id: string }>({
  title,
  description,
  data,
  columns,
  isLoading,
  searchQuery,
  onSearchChange,
  searchPlaceholder = 'Search...',
  onAdd,
  onEdit,
  onDelete,
}: AdminPageTemplateProps<T>) {

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <p className="text-zinc-400 text-sm">{description}</p>
      </div>


      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 h-4 w-4" />
          <Input
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 bg-zinc-950 border-zinc-800 text-zinc-200 focus-visible:ring-indigo-500 rounded-sm"
          />
        </div>

        <Button 
          onClick={onAdd}
          className="bg-indigo-600 hover:bg-indigo-500 text-white w-full sm:w-auto hover:cursor-pointer rounded-sm"
        >
          <Plus className="mr-2 h-4 w-4 hover:cursor-pointer" />
          Add New
        </Button>
      </div>


      <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center p-10 text-zinc-500">
            <Loader2 className="animate-spin h-6 w-6" />
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-zinc-800/30">
              <TableRow className="border-zinc-800 hover:bg-transparent">
                {columns.map((col, index) => (
                  <TableHead key={index} className="text-zinc-300 font-semibold">
                    {col.header}
                  </TableHead>
                ))}
                <TableHead className="text-zinc-300 font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            
            <TableBody>
              {data?.length === 0 ? (
                <TableRow className="border-zinc-800 hover:bg-transparent">
                  <TableCell colSpan={columns.length + 1} className="h-24 text-center text-zinc-500">
                    No results found.
                  </TableCell>
                </TableRow>
              ) : (
                data?.map((item) => (
                  <TableRow 
                    key={item.id} 
                    className="border-zinc-800 hover:bg-zinc-800/20 transition-colors"
                  >
                    {columns.map((col, index) => (
                      <TableCell key={index} className="text-zinc-200 font-medium">
                        {col.render(item)}
                      </TableCell>
                    ))}
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => onEdit(item)}
                          className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-700 hover:cursor-pointer"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => onDelete(item)}
                          className="h-8 w-8 text-zinc-400 hover:text-red-400 hover:bg-red-900/30 hover:cursor-pointer"
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