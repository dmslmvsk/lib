import { Link } from "@tanstack/react-router"
import { Library } from "lucide-react"

export function Footer() {
  return (
    <footer className="mt-12 w-full border-t border-zinc-900 bg-[#0a0a0a] py-10 md:mt-20 md:py-16">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-6 md:grid-cols-4 md:gap-12">
        <div className="col-span-1 space-y-4 md:col-span-1">
          <div className="flex items-center gap-2.5">
            <div className="rounded-sm bg-indigo-600 p-1.5">
              <Library className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Library<span className="text-indigo-500">Hub</span>
            </span>
          </div>
          <p className="max-w-xs text-xs leading-relaxed text-zinc-500 md:text-sm">
            Your digital gateway to thousands of books and resources. Manage
            your personal collection with ease and speed.
          </p>
        </div>

        <div className="space-y-3 md:space-y-4">
          <h4 className="text-sm font-semibold tracking-tight text-zinc-200">
            Navigation
          </h4>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="text-sm font-medium text-zinc-500 transition-colors hover:text-indigo-400"
              >
                Catalog
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-zinc-500 transition-colors hover:text-indigo-400"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3 md:space-y-4">
          <h4 className="text-sm font-semibold tracking-tight text-zinc-200">
            Support
          </h4>
          <ul className="space-y-2">
            {["Help Center", "Terms of Service", "Privacy Policy"].map(
              (item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm font-medium text-zinc-500 transition-colors hover:text-indigo-400"
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        <div className="space-y-4 md:space-y-5">
          <h4 className="text-sm font-semibold tracking-tight text-zinc-200">
            Connect
          </h4>
          <div className="flex flex-wrap gap-2.5">
            <a
              href="https://github.com/dmslmvsk"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-400 transition-all hover:cursor-pointer hover:border-indigo-500 hover:text-white"
            >
              Github
            </a>
            <a
              href="mailto:dmslmvsk@gmail.com"
              className="rounded-sm border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-400 transition-all hover:cursor-pointer hover:border-indigo-500 hover:text-white"
            >
              Email
            </a>
          </div>

          <div className="border-t border-zinc-900/50 pt-4 text-[10px] text-zinc-600 md:text-[11px]">
            <p>© 2026 LibraryHub Inc.</p>
            <p className="mt-1">
              Developed by{" "}
              <span className="font-medium text-zinc-400">dmslmvsk</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
