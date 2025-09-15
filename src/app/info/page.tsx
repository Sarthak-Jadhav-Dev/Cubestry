"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Link from "next/link"

const heroCards = [
  {
    title: "Superior  Experience",
    desc: "Cubestry gives the best performance for Testing and Comaparing AI Models.",
    icon: ">", // Replace with an icon or SVG as needed
  },
  {
    title: "Battle-teste the AI Models",
    desc: "We Dont Keep your API Keys , they are Stored on the Local Storage of your Browser. So that you can test the Models without any worries.",
    icon: "⭕",
  },
  {
    title: "0 Constraints from our Side",
    desc: "We Dont put any Constraints on your usage of the Models. Use it as much as you want. The Constaints are only from the Providers Side.",
    icon: "⏩",
  }
]

const templates = [
  {
    tag: "User Friendly",
    title: "Cubestry is User Friendly",
    desc: "An intuitive, easy-to-navigate interface for all users.",
  },
  {
    tag: "Open Source",
    title: "Transparent & Open Source",
    desc: "Fully open source on GitHub for community contributions.",
  },
  {
    tag: "Performance",
    title: "High Performance",
    desc: "Optimized for speed and reliability under load.",
  },
]

const whyCards = [
  {
    title: "100% Open Source",
    desc: "Cubestry is Open Source , so you can Trust us.",
    icon: "🧩",
  },
  {
    title: "Friendly Design",
    desc: "Responsive, mobile-friendly UI out of the box.",
    icon: "📱",
  },
  {
    title: "Modern Technologies",
    desc: "Built on Next.js, TailwindCSS, and Shadcn UI.",
    icon: "🚀",
  },
  {
    title: "Inclusive & Versatile",
    desc: "Equally useful for non-technical users and developers.",
    icon: "🌏",
  },
]

const techCards = [
  { title: "Frontend Framework", desc: "Next.js", icon: "⚡" },
  { title: "Language", desc: "TypeScript", icon: "💻" },
  { title: "Styling", desc: "TailwindCSS", icon: "🎨" },
  { title: "UI Components", desc: "Shadcn UI", icon: "🧱" },
]

const roadmapCards = [
  { title: "Join Us", desc: "Join Cubestry", icon: "🔧" },
  { title: "Get API Keys", desc: "Get the API Keys from your Provider", icon: "🌙" },
  { title: "Add Keys and Models", desc: "API integrations", icon: "🔗" },
  { title: "Enjoy Your Time", desc: "Now Decide who is the Best for you", icon: "📚" }
]

export default function InfoPage() {
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
    <>
      <Navbar />
      <main className="w-full flex flex-col items-center bg-gray-50">
        {/* Hero Section */}
        <section className="w-full py-20 bg-white text-center">
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            A powerful framework for building <br/>
            <span className="text-primary">high-performance</span> server rendered web applications
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-12">
            Cubestry delivers peerless performance, developer efficiency, and modern UI building blocks. Trusted for production by smart teams.
          </p>
          <div className="flex flex-col md:flex-row gap-8 justify-center mt-6">
            {heroCards.map((card, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-gray-100 shadow-md p-7 flex-1 max-w-sm"
              >
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="font-bold text-xl mb-2">{card.title}</h3>
                <p className="text-muted-foreground">{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center gap-4">
            <Link href="/info"><Button className="text-base px-8 py-4 shadow-lg">Learn About  Cubestry</Button></Link>
            <Button variant="secondary" className="text-base px-8 py-4" onClick={handleClick}>Get Started</Button>
          </div>
        </section>

        {/* Templates Showcase */}
        <section className="w-full py-16 bg-gray-50">
          <h2 className="text-4xl font-bold text-center mb-8">
            Use AI like the best
          </h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {templates.map((tpl, i) => (
              <div
                key={tpl.title}
                className="bg-white border rounded-xl shadow-lg p-6 w-72"
              >
                <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded mb-2 text-sm font-medium">{tpl.tag}</div>
                <h3 className="font-semibold text-lg mb-1">{tpl.title}</h3>
                <p className="text-muted-foreground text-sm">{tpl.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button className="px-8 py-3 text-lg" onClick={handleClick}>Start Using Cubestry</Button>
          </div>
        </section>

        {/* Why Cubestry Cards */}
        <section className="max-w-5xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-semibold mb-8 text-center">Why Cubestry?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {whyCards.map((item, idx) => (
              <Card
                key={idx}
                className="transition-transform transform hover:-translate-y-2 hover:shadow-xl hover:border-primary group"
              >
                <CardHeader>
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Feature Grid */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Authentication", desc: "Secure sign in / sign up flows with sessions." },
              { title: "Responsive UI", desc: "Looks great on mobile, tablet, and desktop devices." },
              { title: "Custom Theming", desc: "Light/Dark mode and Tailwind-based customization." },
              { title: "Reusable Components", desc: "Modular Shadcn UI components for fast development." },
              { title: "Performance", desc: "Optimized with Next.js best practices for speed." },
              { title: "Developer Friendly", desc: "TypeScript + ESLint + clean folder structure." },
            ].map((feature, idx) => (
              <Card className="shadow-md" key={idx}>
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tech Stack & Architecture Cards */}
        <section className="max-w-5xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-semibold mb-8 text-center">Tech Stack & Architecture</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {techCards.map((item, idx) => (
              <Card
                key={idx}
                className="transition-transform transform hover:-translate-y-2 hover:shadow-xl hover:border-primary group"
              >
                <CardHeader>
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Getting Started */}
        <section className="max-w-5xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-semibold">Getting Started</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>For Users</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-2">
                <p>1. Visit the site and explore features.</p>
                <p>2. Sign up or log in if required.</p>
                <p>3. Use Cubestry.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>For Developers</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <pre className="bg-muted p-3 rounded-md text-sm overflow-auto">
                  <code>
                    git clone https://github.com/Sarthak-Jadhav-Dev/Cubestry.git
                    <br />
                    cd Cubestry
                    <br />
                    npm install
                    <br />
                    npm run dev
                  </code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contribution */}
        <section className="max-w-5xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-semibold">Contributing</h2>
          <p className="mt-4 text-muted-foreground">
            Contributions are welcome! Submit issues or pull requests on our GitHub repo. 
            Please follow coding standards and ensure your code is clean, documented, and tested.
          </p>
          <Button className="mt-6" asChild>
            <a
              href="https://github.com/Sarthak-Jadhav-Dev/Cubestry.git"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </Button>
        </section>

        {/* Roadmap Cards */}
        <section className="max-w-5xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-semibold mb-8 text-center">Roadmap</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {roadmapCards.map((item, idx) => (
              <Card
                key={idx}
                className="transition-transform transform hover:-translate-y-2 hover:shadow-xl hover:border-primary group"
              >
                <CardHeader>
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
