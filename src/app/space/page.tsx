"use client"
import { BadgeInfo, Key, Home, User, Settings, CircleStar, Send, ClipboardCopy } from 'lucide-react';
import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { PanelLeft, MoreHorizontal } from "lucide-react"
import { ToastContainer, toast, Bounce } from 'react-toastify';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Loader2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"



export default function AIDashboard() {
  const [loading, setLoading] = useState(false)

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [globalPrompt, setGlobalPrompt] = useState(" ");

  const [models, setModels] = useState<{
    id: number;
    name: string;
    company: string;
    tempName: string;
    apiKey: string;
    response: string;
    prompt?: string;
    isLoading?: boolean;
  }[]>([
    { id: 1, name: "Gemini-2.5-flash", company: " ", tempName: "", apiKey: "", response: "" }
  ]);

  // Load from localStorage only in the browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPrompt = localStorage.getItem("globalPrompt");
      if (savedPrompt) setGlobalPrompt(savedPrompt);

      const savedModels = localStorage.getItem("llms");
      if (savedModels) setModels(JSON.parse(savedModels));
    }
  }, []);

  const [zeroModel, setzeroModel] = useState(false)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast("Text Copied to Clipboard!");
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("llms", JSON.stringify(models));
    }
  }, [models]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("globalPrompt", globalPrompt);
    }
  }, [globalPrompt]);

  const addModel = () => {
    setModels([...models, { id: models.length + 1, name: "Model", tempName: "", company: " ", apiKey: "", prompt: "", response: " Your Response will appear here", isLoading: false }])
  }

  //these are the function to update single entity in the array of objects of models
  const removeModel = (id: number) => {
    setModels(models.filter((m) => m.id !== id))
    toast("Model Removed Successfully!");
  }
  const saveModel = (id: number) => {
    setModels(models.map((m) => (m.id === id ? { ...m, name: m.tempName || m.name } : m)))
    toast("Model Saved Successfully!, Click on three dots to close Window");
  }
  const updateTempName = (id: number, value: string) => {
    setModels(models.map((m) => (m.id === id ? { ...m, tempName: value } : m)))
  }
  const updateApiKey = (id: number, value: string) => {
    setModels(models.map((m) => (m.id === id ? { ...m, apiKey: value } : m)))
  }
  const updateCompany = (id: number, value: string) => {
    setModels(models.map((m) => (m.id === id ? { ...m, company: value } : m)))
  }
  const updatePrompt = (id: number, value: string) => {
    setModels(models.map((m) => (m.id === id ? { ...m, prompt: value } : m)))
  }

  //toSet the Company 
  const getApiUrl = (company: string) => {
    switch (company) {
      case "OpenAI":
        return "/api/openai";
      case "Gemini":
        return "/api/gemini";
      case "Anthropic":
        return "/api/anthropic";
      default:
        return "/api/gemini"; // fallback if needed
    }
  };

  const sendMessege = async () => {
    setLoading(true);
    if (models.length === 0) {
      setzeroModel(true);
      return;
    }
    setModels(models.map((m) => ({ ...m, isLoading: true })));
    const updatedModels = await Promise.all(
      models.map(async (m) => {
        try {
          const apiUrl = getApiUrl(m.company);
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: m.name || "gemini-1.5-flash",
              prompt: [
                globalPrompt || "Hello, Gemini",
                m.prompt ? `Here is my custom prompt: ${m.prompt}` : "",
              ],
              apiKey: m.apiKey,
            }),
          });

          const data = await response.json();
          toast("Messege Sent Successfully !")
          return { ...m, response: data.text || "No response" };
        } catch (error) {
          toast.error("Error in Sending the Messege , Service might be Inavailable from API Key Provider")
          return { ...m, response: "Thier was an Error in Fetching Response", error };
        }
      })
    );
    setLoading(false);
    setModels(updatedModels);
  };


  return (
    <div className="flex h-screen">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="w-60 bg-gray-100 dark:bg-gray-900 border-r p-4 overflow-hidden">
          <h2 className="text-lg font-semibold mb-4">Cubestry</h2>
          <Button variant="outline" className="w-full mb-2" onClick={addModel}>
            + Add Model
          </Button>
          <Button className="w-full mb-2 flex" onClick={sendMessege}>
            {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> :
              <>
                <Send />
                <span className="ml-2">Send</span>
              </>
            }
          </Button>
          <Command className="rounded-lg border shadow-md md:min-w-[] h-90 mt-2">
            <CommandInput placeholder="Type to search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <BadgeInfo />
                  <span>Learn More</span>
                </CommandItem>
                <CommandItem>
                  <Key />
                  <span>Manage API Keys</span>
                </CommandItem>
                <Link href="/" className="w-full">
                  <CommandItem>
                    <Home />
                    <span>Back to Home</span>
                  </CommandItem>
                </Link>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>
                  <User />
                  <span>Profile</span>
                  <CommandShortcut>⌘</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Settings />
                  <span>Settings</span>
                  <CommandShortcut>⌘</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
      {zeroModel ? (
        <AlertDialog open={zeroModel} onOpenChange={setzeroModel}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>No Models Found</AlertDialogTitle>
              <AlertDialogDescription>
                Please add at least one model before sending a message.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setLoading(false)}>Okay</AlertDialogCancel>
              <Link href="/learncubestry">
                <Link href="/info"><AlertDialogAction>Learn More</AlertDialogAction></Link>
              </Link>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : null}

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
            placeholder="Prompt Here"
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
                    <Select
                      onValueChange={(value) => updateCompany(model.id, value)}
                      value={model.company}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select the Provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Provider</SelectLabel>
                          <SelectItem value="OpenAI">OpenAI</SelectItem>
                          <SelectItem value="Gemini">Gemini</SelectItem>
                          <SelectItem value="Anthropic">Anthropic</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Please add Correct Model Name"
                      value={model.tempName}
                      onChange={(e) => updateTempName(model.id, e.target.value)}
                    />
                    <Input placeholder="API Key" value={model.apiKey} type="password" onChange={(e) => updateApiKey(model.id, e.target.value)} />
                    <Input placeholder="Custom Prompt (optional)" value={model.prompt} onChange={(e) => { updatePrompt(model.id, e.target.value) }} />
                    <div className="flex gap-2">
                      <Button className="w-1/2" onClick={() => saveModel(model.id)}>
                        Save
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
        {models.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400 text-lg">
            🚀 No models yet — click + Add Model to get started!
          </div>
        ) : (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-x overflow-hidden">
            {models.map((model) => (
              <div key={model.id} className="p-4 overflow-auto">
                <Card className="h-full flex flex-col">
                  <CardHeader className='flex justify-between items-center'>
                    <CardTitle className="flex items-center-safe gap-2">
                      <CircleStar /> {model.name}
                    </CardTitle>
                    <span onClick={() => handleCopy(model.response)}><ClipboardCopy className='w-4.5 h-4.5' /></span>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-auto relative">
                    {model.isLoading ? (
                      <div className="relative w-full h-full rounded-lg overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]"></div>
                        <div className="h-full w-full bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                      </div>
                    ) : (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {model.response}
                      </ReactMarkdown>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
