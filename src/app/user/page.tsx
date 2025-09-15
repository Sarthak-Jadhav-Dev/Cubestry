import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

type ButtonVariant = "destructive" | "default" | "secondary" | "link" | "outline" | "ghost";

//i want to extract user info using nextauth cookie and display it here


const accountInfo = [
  {
    title: "Profile",
    icon: "👤",
    items: [
      { label: "Name", value: {} },
      { label: "Username", value: "sarthak_dev" },
      { label: "Email", value: "sarthak@example.com" },
    ]
  },
  {
    title: "Security",
    icon: "🔐",
    items: [
      { label: "Password", value: "••••••••" },
      { label: "Two-Factor", value: "Enabled" },
    ]
  },
  {
    title: "Preferences",
    icon: "🎛️",
    items: [
      { label: "Theme", value: "Dark" },
      { label: "Notifications", value: "On" },
    ]
  },
  {
    title: "Actions",
    icon: "⚡",
    items: [
      { label: "Status", value: "Active" }
    ],
    actions: [
      { label: "Edit Profile", variant: "default" as ButtonVariant },
      { label: "Change Password", variant: "secondary" as ButtonVariant },
      { label: "Logout", variant: "destructive" as ButtonVariant },
    ]
  }
]

const recentActivity = [
  "Signed in on Chrome (Windows) · 2h ago",
  "Changed password · 1d ago",
  "Enabled two-factor authentication · 3d ago",
  "Signed out on mobile · 6d ago"
]

export default function AccountsPage() {
  return (
    <>
      <Navbar />
      <main className="w-full flex flex-col items-center bg-gray-50 min-h-screen">
        {/* Header */}
        <section className="w-full py-16 bg-white text-center">
          <h1 className="text-5xl font-extrabold mb-4">Account Overview</h1>
          <p className="max-w-xl mx-auto text-lg text-gray-600 mb-8">
            Manage your profile, security, preferences, and account actions. Your details are secure and beautifully presented—Cubestry style!
          </p>
        </section>

        {/* Accounts Grid */}
        <section className="max-w-6xl mx-auto px-6 py-12 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {accountInfo.map((card, idx) => (
              <Card
                key={idx}
                className="transition-transform transform hover:-translate-y-2 hover:shadow-xl hover:border-primary group"
              >
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl group-hover:scale-110 transition-transform">{card.icon}</span>
                    <CardTitle className="text-lg">{card.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {card.items.map((item, k) => (
                    <div key={k} className="flex justify-between">
                      <span className="text-muted-foreground text-sm">{item.label}</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                  {card.actions && (
                    <div className="flex flex-col gap-2 pt-4">
                      {card.actions.map((action, aIdx) => (
                        <Button key={aIdx} variant={action.variant} className="w-full">{action.label}</Button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="max-w-5xl mx-auto px-6 py-12 w-full">
          <h2 className="text-2xl font-semibold mb-6 text-center">Recent Activity</h2>
          <Card className="shadow-md transition-transform hover:-translate-y-2 hover:shadow-xl hover:border-primary">
            <CardHeader>
              <CardTitle>Login History</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground text-sm">
                {recentActivity.map((log, idx) => <li key={idx}>{log}</li>)}
              </ul>
            </CardContent>
          </Card>
        </section>

        <Footer />
      </main>
    </>
  )
}
