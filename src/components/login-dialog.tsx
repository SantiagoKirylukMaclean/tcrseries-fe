"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

interface LoginDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await login(email, password)
      onOpenChange(false)
    } catch {
      setError("Email/Usuario o contraseña incorrectos")
    } finally {
      setIsLoading(false)
    }
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
                placeholder="Email o Usuario"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/5 border-0 focus-visible:ring-1"
                disabled={isLoading}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background/5 border-0 focus-visible:ring-1"
                disabled={isLoading}
                required
                minLength={4}
              />
            </div>

            {error && (
              <div className="text-sm text-red-500 text-center">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Cargando..." : "OK"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
} 