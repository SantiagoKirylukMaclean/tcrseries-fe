"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface LoginDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement login logic
    console.log("Login attempt with:", { username, password })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center space-y-6 py-4">
          <div className="relative w-48 h-12">
          <div className="font-bold text-2xl">GOAT RACING</div>
          </div>
          
          <h2 className="text-2xl font-bold">Log in</h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-background/5 border-0 focus-visible:ring-1"
              />
            </div>
            
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background/5 border-0 focus-visible:ring-1"
              />
            </div>

            <Button type="submit" className="w-full">
              OK
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
} 