import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Loader2 } from 'lucide-react'


export type FieldConfig = {
  name: string; 
  label: string;
  placeholder?: string;
  type?: 'text' | 'number';
  required?: boolean;
}

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  fields: FieldConfig[];
  initialData?: Record<string, any> | null;
  onSave: (data: Record<string, any>) => void;
  isLoading?: boolean;
}

export function AdminModal({
  isOpen,
  onClose,
  title,
  description,
  fields,
  initialData,
  onSave,
  isLoading,
}: AdminModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>({})

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData)
      } else {
        const emptyState: Record<string, any> = {}
        fields.forEach((f) => (emptyState[f.name] = ''))
        setFormData(emptyState)
      }
    }
  }, [isOpen, initialData, fields])

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-96 bg-zinc-950 border-zinc-800 text-zinc-200 rounded-sm">
        <form onSubmit={handleSubmit}>
          
          <DialogHeader>
            <DialogTitle className="text-white">{title}</DialogTitle>
            {description && (
              <DialogDescription className="text-zinc-400">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>

          <div className="grid gap-4 py-6">
            {fields.map((field) => (
              <div key={field.name} className="flex flex-col gap-2">
                <Label htmlFor={field.name} className="text-zinc-400">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </Label>
                <Input
                  id={field.name}
                  type={field.type || 'text'}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={formData[field.name] || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.name]: e.target.value })
                  }
                  className="bg-zinc-900 border-zinc-800 focus-visible:ring-indigo-500 rounded-sm"
                />
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="border-zinc-700 bg-transparent hover:bg-zinc-800 hover:text-white rounded-sm hover:cursor-pointer"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-sm hover:cursor-pointer"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  )
}