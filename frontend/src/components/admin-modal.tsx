import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Loader2 } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

export type FieldConfig = {
  name: string
  label: string
  placeholder?: string
  type?: "text" | "number" | "select"
  required?: boolean
  disabled?: boolean
  options?: { label: string; value: string }[]
  fullWidth?: boolean
}

interface AdminModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  fields: FieldConfig[]
  initialData?: Record<string, any> | null
  onSave: (data: Record<string, any>) => void
  isLoading?: boolean
  onValuesChange?: (data: Record<string, any>) => void
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
        fields.forEach((f) => (emptyState[f.name] = ""))
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
      const value = formData[field.name]
      if (!value) return false

      if (field.type === "select" && field.options) {
        return field.options.some((opt) => opt.value === value)
      }
    }
    return true
  })

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] w-[95vw] max-w-2xl overflow-y-auto rounded-sm border-zinc-800 bg-zinc-950 p-5 text-zinc-200 md:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:gap-6">
          <DialogHeader className="mb-1 text-left md:mb-2">
            <DialogTitle className="text-xl font-semibold tracking-tight text-white">
              {title}
            </DialogTitle>
            {description && (
              <DialogDescription className="mt-1 text-xs text-zinc-400 md:text-sm">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>

          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 md:gap-y-5">
            {fields.map((field) => (
              <div
                key={field.name}
                className={`flex flex-col gap-2 ${field.fullWidth ? "sm:col-span-2" : ""}`}
              >
                <Label
                  htmlFor={field.name}
                  className="text-xs font-medium text-zinc-400 md:text-sm"
                >
                  {field.label}
                </Label>

                {field.type === "select" ? (
                  <Select
                    value={formData[field.name] || ""}
                    onValueChange={(value) => handleChange(field.name, value)}
                    disabled={field.disabled}
                  >
                    <SelectTrigger className="h-10 w-full rounded-sm border-zinc-800 bg-zinc-900 text-zinc-200 focus:ring-indigo-500 disabled:opacity-50 md:h-11">
                      <SelectValue
                        placeholder={field.placeholder || "Select an option"}
                      />
                    </SelectTrigger>
                    <SelectContent className="max-h-50 rounded-sm border-zinc-800 bg-zinc-900 text-zinc-200">
                      {field.options?.map((opt) => (
                        <SelectItem
                          key={opt.value}
                          value={opt.value}
                          className="cursor-pointer rounded-sm focus:bg-zinc-800 focus:text-white"
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={field.name}
                    type={field.type || "text"}
                    placeholder={field.placeholder}
                    required={field.required}
                    disabled={field.disabled}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="h-10 w-full rounded-sm border-zinc-800 bg-zinc-900 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-indigo-500 disabled:opacity-50 md:h-11"
                  />
                )}
              </div>
            ))}
          </div>

          <DialogFooter className="mt-2 flex flex-col-reverse gap-3 border-t border-zinc-800/50 pt-4 sm:flex-row sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="w-full rounded-sm border-zinc-700 bg-transparent hover:cursor-pointer hover:bg-zinc-800 hover:text-white sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !isFormValid}
              className="w-full rounded-sm bg-indigo-600 text-white hover:cursor-pointer hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
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
