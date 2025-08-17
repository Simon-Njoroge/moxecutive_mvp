"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bell, Search, User, X } from "lucide-react"

export function AdminHeader() {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  return (
    <header className="bg-background border-b border-border p-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          {/* Desktop search: visible on sm+ */}
          <div className="hidden sm:block relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-input border border-border rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Mobile search toggle button */}
          <div className="sm:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileSearchOpen((s) => !s)} aria-label={mobileSearchOpen ? "Close search" : "Open search"}>
              {mobileSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </Button>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>

          {/* Profile */}
          <Button variant="ghost" size="icon" aria-label="Profile">
            <User className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile search input (collapsible) */}
        {mobileSearchOpen && (
          <div className="sm:hidden w-full mt-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-input border border-border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
