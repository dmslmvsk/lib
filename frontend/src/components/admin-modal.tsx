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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

export type FieldConfig = {
  name: string;
  label: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'select';
  required?: boolean;
  disabled?: boolean;
  options?: { label: string; value: string }[];
  fullWidth?: boolean;
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
  onValuesChange?: (data: Record<string, any>) => void;
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
  onValuesChange,
}: AdminModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>({})

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData)
        onValuesChange?.(initialData)
      } else {
        const emptyState: Record<string, any> = {}
        fields.forEach((f) => (emptyState[f.name] = ''))
        setFormData(emptyState)
        onValuesChange?.(emptyState)
      }
    }
  }, [isOpen, initialData])

  const handleChange = (name: string, value: any) => {
    const newData = { ...formData, [name]: value }
    setFormData(newData)
    onValuesChange?.(newData)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const isFormValid = fields.every((field) => {
    if (field.required) {
      const value = formData[field.name];
      if (!value) return false;
      
      if (field.type === 'select' && field.options) {
        return field.options.some(opt => opt.value === value);
      }
    }
    return true;
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[95vw] max-w-2xl bg-zinc-950 border-zinc-800 text-zinc-200 rounded-sm p-5 md:p-8 max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:gap-6">
          
          <DialogHeader className="mb-1 md:mb-2 text-left">
            <DialogTitle className="text-xl font-semibold text-white tracking-tight">{title}</DialogTitle>
            {description && (
              <DialogDescription className="text-xs md:text-sm text-zinc-400 mt-1">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 md:gap-y-5">
            {fields.map((field) => (
              <div 
                key={field.name} 
                className={`flex flex-col gap-2 ${field.fullWidth ? 'sm:col-span-2' : ''}`}
              >
                <Label htmlFor={field.name} className="text-xs md:text-sm font-medium text-zinc-400">
                  {field.label}
                </Label>

                {field.type === 'select' ? (
                  <Select
                    value={formData[field.name] || ''}
                    onValueChange={(value) => handleChange(field.name, value)}
                    disabled={field.disabled}
                  >
                    <SelectTrigger className="w-full bg-zinc-900 border-zinc-800 text-zinc-200 focus:ring-indigo-500 rounded-sm h-10 md:h-11 disabled:opacity-50">
                      <SelectValue placeholder={field.placeholder || "Select an option"} />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-200 rounded-sm max-h-50">
                      {field.options?.map((opt) => (
                        <SelectItem 
                          key={opt.value} 
                          value={opt.value}
                          className="focus:bg-zinc-800 focus:text-white rounded-sm cursor-pointer"
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={field.name}
                    type={field.type || 'text'}
                    placeholder={field.placeholder}
                    required={field.required}
                    disabled={field.disabled}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-full bg-zinc-900 border-zinc-800 focus-visible:ring-indigo-500 rounded-sm h-10 md:h-11 disabled:opacity-50 text-zinc-100 placeholder:text-zinc-600"
                  />
                )}
              </div>
            ))}
          </div>

          <DialogFooter className="pt-4 mt-2 border-t border-zinc-800/50 flex flex-col-reverse sm:flex-row gap-3 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="w-full sm:w-auto border-zinc-700 bg-transparent hover:bg-zinc-800 hover:text-white rounded-sm hover:cursor-pointer"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || !isFormValid}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white rounded-sm disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
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