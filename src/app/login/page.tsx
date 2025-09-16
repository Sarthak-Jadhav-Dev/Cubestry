"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { useState, Suspense } from "react";
import Link from "next/link";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSearchParams, useRouter } from "next/navigation";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const callbackUrl = searchParams.get("callbackUrl") || "/space";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    setLoading(false);

    if (!result?.error) {
      setTimeout(() => {
        router.push(callbackUrl);
      }, 2000);

      toast.success("Logged in successfully! Redirecting...", {
        autoClose: 2000,
      });
    } else {
      toast.error("Invalid Credentials", {
        autoClose: 5000,
      });
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email and password to log in
        </CardDescription>
        <CardAction>
          <Link href="/signup">
            <Button variant="link">Sign Up</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full mt-3" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <ToastContainer />
        <Suspense fallback={<p>Loading login...</p>}>
          <LoginForm />
        </Suspense>
      </div>
      <Footer />
    </>
  );
}
