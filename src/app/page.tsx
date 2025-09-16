"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import Image from "next/image"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (session) {
      router.push("/space");
    } else {
      router.push("/login?callbackUrl=/space");
    }
  };
  const features = [
    {
      title: "Dont Just Compare Models , Understand Them",
      desc: "Cubestry allows you to test and compare different AI models side by side, helping you choose the best one for your needs."
    },
    {
      title: "Compare and Win",
      desc: "In the World of AI , Prompt Matters the most. Cubestry allows you to test and compare different prompts side by side, helping you choose the best one for your needs."
    },
    {
      title: "Open Source",
      desc: "This project is open source on GitHub, welcoming contributions and feedback from the community."
    },
    {
      title: "Fully Secure",
      desc: "We Dont use any of your data , all the data is stored in your browsers local storage."
    },
    {
      title: "Growing Project",
      desc: "We are constantly adding new features and models to Cubestry based on user feedback and the latest advancements in AI."
    },
    {
      title: "100% Free and Secure",
      desc: "Cubestry is completely free to use and does not store any of your data. All data is stored in your browsers local storage."
    },
    
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />
      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-1 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mt-16">
          All in One AI Playground
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Used by some of the worlds largest companies, Next.js enables you to
          create <span className="font-semibold">high-quality web applications</span>{" "}
          with the power of React components.
        </p>

        <div className="flex gap-4 mt-10">
          <Button size="lg" onClick={handleClick}>Get Started</Button>
          <Link href="/info"><Button size="lg" variant="outline">Learn about Cubestry</Button></Link>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          ▲ Does Prompt Matters ? ▲
        </p>
      </main>

      {/* Whats in Next.js Section */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          What is Cubestry?{"\n"}
          <span className="font-normal text-muted-foreground">
            Everything you need to Test and Understand AI Models.
          </span>
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Card key={i} className="hover:shadow-lg transition">
              <CardHeader>
                <CardTitle>{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}

          {/* Special Highlight Card */}
          <Card className="bg-black text-white hover:shadow-lg transition col-span-1 sm:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>Cubestry</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Understand Who Works Best for you , all from your side</p>
            </CardContent>
          </Card>
        </div>
      </section>
      {/* Get Started Section */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Get started in seconds{" "}
        </h2>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {["Free", "Secure", "All in One", "AI", "Mordern", "SaaS", "Open Source"].map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 text-sm rounded-full bg-muted text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Content */}
        <div className="mt-12 grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Side */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground">
              Cubestry is an open-source project that provides a collection of
              ready-to-use Features for Understanding and using Perfect Suitable AI Model.
            </p>
            <p className="text-lg text-muted-foreground">
              Not Just Models , Compare Prompts too.
            </p>

            <Button className="bg-black text-white hover:bg-black/90 rounded-xl px-6 py-6 text-base" onClick={handleClick}>
              Go to Space
            </Button>
          </div>

          {/* Image Cards */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="grid grid-cols-3">
              <div className="col-span-1">
                <Image
                src={"/image1.png"}
                width={700}
                height={700}
                alt="Image 1"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
