import { User, Tag, ArrowRight, Bookmark } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "@tanstack/react-router"
import type { Book } from "@/api/types/book.types"

export function BookCard({ book }: { book: Book }) {
  const isAvailable = !book.userId

  return (
    <Card className="group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-sm border-zinc-800 bg-zinc-900/50 p-0 shadow-xl transition-all duration-300 hover:border-indigo-500/50 hover:bg-zinc-900">
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-indigo-500/5 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
      <div className="absolute top-0 right-0 -mt-10 -mr-10 h-24 w-24 bg-indigo-500/5 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />

      <CardHeader className="space-y-4 p-4 pb-0 md:p-5">
        <div className="flex items-start justify-between">
          <div className="rounded-sm bg-zinc-800 p-2 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
            <Bookmark className="h-4 w-4 md:h-5 md:w-5" />
          </div>
          <Badge
            variant={isAvailable ? "default" : "secondary"}
            className={`rounded-sm border-none px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase ${
              isAvailable
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-zinc-800 text-zinc-500"
            }`}
          >
            {isAvailable ? "Available" : "Borrowed"}
          </Badge>
        </div>

        <div className="space-y-1">
          <h3 className="line-clamp-2 text-lg leading-tight font-bold tracking-tight text-white transition-colors group-hover:text-indigo-400 md:text-xl">
            {book.title}
          </h3>
          <p className="flex items-center gap-1.5 text-xs font-medium text-zinc-400">
            <User className="h-3.5 w-3.5 shrink-0 text-indigo-500" />
            {book.author.name}
          </p>
        </div>
      </CardHeader>

      <CardContent className="px-4 py-4 md:px-5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-zinc-500">
            <Tag className="h-3.5 w-3.5 text-indigo-500" />
            <span className="text-[10px] font-bold tracking-tight uppercase">
              {book.genre.name}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="w-full px-4 pt-2 pb-4 md:px-5 md:pb-5">
        <Link
          to="/books/$bookId"
          params={{ bookId: book.id }}
          className="w-full"
        >
          <Button
            variant="outline"
            className="flex h-9 w-full cursor-pointer gap-2 rounded-sm border-zinc-700 bg-transparent text-[10px] font-bold tracking-wider uppercase transition-all hover:bg-zinc-800 hover:text-white active:scale-95 md:h-10 md:text-[11px]"
          >
            Details
            <ArrowRight className="h-3 w-3" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
