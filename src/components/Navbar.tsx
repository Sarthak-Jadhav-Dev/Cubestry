"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"



export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b bg-white/70 backdrop-blur-md">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 bg-black rounded-sm"></span>
        <Link href='/'><span className="font-bold text-lg">Cubestry</span></Link>
      </div>

      {/* Links */}
      <nav className="hidden md:flex gap-6 text-sm font-medium">
        <Link href="/space" className="hover:underline">Space</Link>
        <Link href="/info" className="hover:underline">Info</Link>
        <Link href="/github" className="hover:underline">GitHub</Link>
      </nav>

      {/* Search + Actions */}
      <div className="flex items-center gap-3">
        <Link href="/signup"><Button variant="outline">Signup</Button></Link>
        <Link href="/login"><Button>Login</Button></Link>
      </div>
    </header>
  )
}
