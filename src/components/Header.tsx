"use client"

import { useState } from "react"
import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"
import { UserCircle } from "lucide-react"
import { LoginDialog } from "./login-dialog"

export default function Header() {
  const [showLoginDialog, setShowLoginDialog] = useState(false)

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="font-bold text-2xl">GOAT RACING</div>
        </Link>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setShowLoginDialog(true)}
          >
            <UserCircle className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <LoginDialog 
        open={showLoginDialog} 
        onOpenChange={setShowLoginDialog}
      />
    </header>
  )
} 