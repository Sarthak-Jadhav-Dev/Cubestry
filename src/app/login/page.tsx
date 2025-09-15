"use client"
import { Button } from "@/components/ui/button"
import { signIn } from 'next-auth/react'
import { Loader2 } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function CardDemo() {
  const [password, setpassword] = useState("")
  const [email, setemail] = useState("")
  const [loading, setloading] = useState(false)

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setloading(true);
    const result = await signIn("credentials", {
      redirect: true,
      email,
      password,
    })
    setloading(false);
    console.log("Successfull Loggin in")
    if (result?.error) {
      alert("Invalid Credintials");
      console.log("Successfull Non Loggin in")
    }

  }
  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Link href='/signup'>
            <Button variant="link">Sign Up</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlesubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required onChange={(e) => setpassword(e.target.value)} />
              </div>
            </div>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full mt-3">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Login in....
                  </>
                ) : ("Login")}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
    <Footer/>
    </>
  )
}
