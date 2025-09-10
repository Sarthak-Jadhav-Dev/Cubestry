"use client"

import { useEffect,useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { PanelLeft, MoreHorizontal } from "lucide-react"
import { Loader2 } from "lucide-react"
import { Label } from "@radix-ui/react-label"

export default function AIDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [globalPrompt, setGlobalPrompt] = useState(()=>{
    return localStorage.getItem("globalPrompt")||" "
  })
  const [models, setModels] = useState<{ id: number; name: string; tempName: string }[]>(() => {
    const saved = localStorage.getItem("llms")
    return saved ? JSON.parse(saved) : [{ id: 1, name: "Gemini-2.5-flash", tempName: "" }]
  })

  // Keep localStorage in sync with models
  useEffect(() => {
    localStorage.setItem("llms", JSON.stringify(models))
  }, [models])

  useEffect(()=>{
    localStorage.setItem("globalPrompt",globalPrompt)
  },[globalPrompt])

  const addModel = () => {
    setModels([...models, { id: models.length + 1, name: "Untitled", tempName: "" }])
  }

  const removeModel = (id: number) => {
    setModels(models.filter((m) => m.id !== id))
  }

  const updateTempName = (id: number, value: string) => {
    setModels(models.map((m) => (m.id === id ? { ...m, tempName: value } : m)))
  }

  const saveModel = (id: number) => {
    setModels(models.map((m) => (m.id === id ? { ...m, name: m.tempName || m.name } : m)))
  }
  const sendMessege = ()=>{

  }


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="w-60 bg-gray-100 dark:bg-gray-900 border-r p-4">
          <h2 className="text-lg font-semibold mb-4">Menu</h2>
          <Button variant="outline" className="w-full mb-2" onClick={addModel}>
            + Add Model
          </Button>
          <Button className="w-full mb-2" onClick={sendMessege}>
            Send Messege
          </Button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header / Ribbon */}
        <div className="flex items-center gap-4 p-3 border-b bg-white dark:bg-gray-950">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <PanelLeft className="h-5 w-5" />
          </Button>

          {/* Global Prompt */}
          <Input
            className="flex-1 max-w-lg"
            placeholder="Global Prompt"
            value={globalPrompt}
            onChange={(e) => setGlobalPrompt(e.target.value)}
          />

          {/* Model Tabs */}
          <div className="flex gap-2">
            {models.map((model) => (
              <div key={model.id} className="flex items-center gap-1 rounded-md border px-2 py-1">
                <span className="font-medium">{model.name}</span>

                {/* Settings Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 p-3 space-y-3">
                    <h4 className="font-medium">Model Settings</h4>
                    <Input
                      placeholder="Model Name"
                      value={model.tempName}
                      onChange={(e) => updateTempName(model.id, e.target.value)}
                    />
                    <Input placeholder="API Key" type="password" />
                    <Input placeholder="Custom Prompt (optional)" />
                    <div className="flex gap-2">
                      <Button className="w-1/2" onClick={() => saveModel(model.id)}>
                        Send
                      </Button>
                      <Button className="w-1/2" variant="destructive" onClick={() => removeModel(model.id)}>
                        Remove
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </div>

        {/* Output Area */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-x">
          {models.map((model) => (
            <div key={model.id} className="p-4 overflow-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Output - {model.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Model response will appear here.</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
