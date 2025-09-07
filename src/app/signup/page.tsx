"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { ToastContainer, toast } from 'react-toastify';
import Link from "next/link";

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


export default function CardDemo() {
  const [email, setemail] = useState("")
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [loader, setloader] = useState(false)

  const successNotify =()=>toast("Signed Up Successfully")
  const errorNotify =()=>toast("Signed Up Failed")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setloader(true)
    try {
      const response = await fetch('/api/signin', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      })
      const data = await response.json();
      if (response.ok) {
        console.log("User Signed Up Successfully",data);
        setemail("")
        setusername("")
        setpassword("")
      } else {
        console.log("Error in Signing Up the User");
      }
    } catch (error) {
      console.log("Their was an Error in Submitting the Form Detailes")
    } finally{
      setloader(false);
    }
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm ">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
          <CardAction>
            <Link href="/login">
            <Button variant="link">Log In</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">UserName</Label>
                <Input
                  id="username"
                  type="string"
                  placeholder="Sarthak Jadhav"
                  onChange={(e) => { setusername(e.target.value) }}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => { setemail(e.target.value) }}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required onChange={(e) => { setpassword(e.target.value) }} />
              </div>
            </div>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full mt-3">
                {loader ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>SigninUp...</>):(
                  "SignUp"
                )}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
