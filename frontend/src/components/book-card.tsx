import { User, Tag, ArrowRight, Bookmark } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "@tanstack/react-router"
import type { Book } from "@/api/types/book.types"

export function BookCard({ book }: { book: Book }) {
  const isAvailable = !book.userId;

  return (
    <Card className="group relative flex flex-col justify-between h-full w-full rounded-sm border-zinc-800 bg-zinc-900/50 p-0 transition-all duration-300 hover:border-indigo-500/50 hover:bg-zinc-900 overflow-hidden shadow-xl">
      

      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/5 blur-3xl transition-opacity opacity-0 group-hover:opacity-100" />
      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-2xl -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <CardHeader className="p-5 pb-0 space-y-4">
        <div className="flex items-start justify-between">
          <div className="bg-zinc-800 p-2 rounded-sm transition-colors group-hover:bg-indigo-600 group-hover:text-white">
            <Bookmark className="h-5 w-5" />
          </div>
          <Badge 
            variant={isAvailable ? "default" : "secondary"} 
            className={`rounded-sm px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest border-none ${
              isAvailable ? "bg-emerald-500/20 text-emerald-400" : "bg-zinc-800 text-zinc-500"
            }`}
          >
            {isAvailable ? "Available" : "Borrowed"}
          </Badge>
        </div>

        <div className="space-y-1">
          <h3 className="line-clamp-2 text-xl font-bold leading-tight tracking-tight text-white transition-colors group-hover:text-indigo-400">
            {book.title}
          </h3>
          <p className="flex items-center gap-1.5 text-xs font-medium text-zinc-400">
            <User className="h-3.5 w-3.5 shrink-0 text-indigo-500" />
            {book.author.name}
          </p>
        </div>
      </CardHeader>

      <CardContent className="px-5 py-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-zinc-500">
            <Tag className="h-3.5 w-3.5 text-indigo-500" />
            <span className="text-[10px] font-bold uppercase tracking-tight">{book.genre.name}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-5 pb-5 pt-2 w-3/4">
        <Link 
          to="/books/$bookId" 
          params={{ bookId: book.id }}
          className="w-full"
        >
          <Button 
            variant="outline" 
            className="w-full rounded-sm border-zinc-700 bg-transparent hover:bg-zinc-800 hover:text-white font-bold h-9 text-[11px] uppercase tracking-wider transition-all active:scale-95 cursor-pointer flex gap-2"
          >
            Details
            <ArrowRight className="h-3 w-3" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}