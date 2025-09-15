"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSession,signOut} from "next-auth/react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";



export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (session) {
      router.push("/space");
    } else {
      router.push("/login?callbackUrl=/space");
    }
  };
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b bg-white/70 backdrop-blur-md">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 bg-black rounded-sm"></span>
        <Link href='/'><span className="font-bold text-lg">Cubestry</span></Link>
      </div>

      {/* Links */}
      <nav className="hidden md:flex gap-6 text-sm font-medium">
        <Button className="hover:underline" onClick={handleClick}>Space</Button>
        <Link href="/info"><Button className="hover:underline">Info</Button></Link>
        <Link href="/github"><Button className="hover:underline">GitHub</Button></Link>
      </nav>

      {/* Search + Actions */}
      {session?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="rounded-full">
              {session.user.email || session.user.email}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        // If not logged in
        <div className="flex gap-2">
          <Link href="/login">
            <Button variant="default">Login</Button>
          </Link>
          <Link href="/signup">
            <Button variant="outline">Sign Up</Button>
          </Link>
        </div>
      )}
    </header>
  )
}
