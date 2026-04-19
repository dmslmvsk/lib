import { User, Star, Tag, ArrowRight, Bookmark } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Book {
  id: string
  title: string
  author: string
  category: string
  rating: number
  isAvailable: boolean
}

export function BookCard({ book }: { book: Book }) {
  return (
    <Card className="group relative flex flex-col justify-between h-70 w-full rounded-3xl border-border bg-card p-1 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 overflow-hidden">
      
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition-opacity opacity-0 group-hover:opacity-100" />

      <CardHeader className="p-5 pb-0 space-y-3">
        <div className="flex items-start justify-between">
          <div className="bg-primary/10 p-2.5 rounded-xl transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Bookmark className="h-5 w-5" />
          </div>
          <Badge 
            variant={book.isAvailable ? "default" : "secondary"} 
            className="rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest"
          >
            {book.isAvailable ? "Available" : "Borrowed"}
          </Badge>
        </div>

        <div className="h-16 flex flex-col justify-center">
          <h3 className="line-clamp-2 text-xl font-black leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary">
            {book.title}
          </h3>
          <p className="mt-1 line-clamp-1 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <User className="h-3.5 w-3.5 shrink-0" />
            {book.author}
          </p>
        </div>
      </CardHeader>

      <CardContent className="px-5 py-1">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-lg bg-muted/50 px-2 py-1 border border-border/40">
            <Tag className="h-3 w-3 text-primary" />
            <span className="text-[10px] font-bold uppercase">{book.category}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-black">{book.rating}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-2 px-5 pb-12 pt-2">
        <Button 
          variant="default" 
          className="w-full rounded-xl font-bold h-10 text-xs hover:cursor-pointer transition-all active:scale-95 shadow-sm"
        >
          Borrow
        </Button>
        <Button 
          variant="secondary" 
          className="w-full rounded-xl font-bold h-10 text-xs hover:cursor-pointer flex gap-1.5 transition-all active:scale-95"
        >
          Details
          <ArrowRight className="h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  )
}