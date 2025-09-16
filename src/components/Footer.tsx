"use client"

import { Github,} from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-5 gap-12">
        {/* Logo */}
        <div>
          <div className="flex items-center gap-2 font-bold text-xl">
            Cubestry
          </div>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold mb-4">Resources</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/info">Learn</Link></li>
            <li><Link href="/space">Showcase</Link></li>
            <li><Link href="/space">Previews</Link></li>
          </ul>
        </div>

        {/* More */}
        <div>
          <h4 className="font-semibold mb-4">More</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/github">GitHub</Link></li>
            <li><Link href="/github">Releases</Link></li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h4 className="font-semibold mb-4">About Cubestry</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/github">Open Source Software</Link></li>
            <li><Link href="/github">GitHub</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t py-6 px-6 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground max-w-7xl mx-auto">
        <p>© 2025 Cubestry Inc.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="/github"><Github className="h-5 w-5" /></Link>
        </div>
      </div>
    </footer>
  )
}
