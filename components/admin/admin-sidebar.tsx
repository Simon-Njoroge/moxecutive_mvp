"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  FileText,
  ImageIcon,
  Users,
  Settings,
  Award,
  MessageSquare,
  HelpCircle,
  BarChart3,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin", active: true },
    { icon: FileText, label: "Pages & Content", href: "/admin/content" },
    { icon: ImageIcon, label: "Media Library", href: "/admin/media" },
    { icon: Award, label: "Services", href: "/admin/services" },
    { icon: BarChart3, label: "Portfolio", href: "/admin/portfolio" },
    { icon: MessageSquare, label: "Testimonials", href: "/admin/testimonials" },
    { icon: HelpCircle, label: "FAQs", href: "/admin/faqs" },
    { icon: Users, label: "Users", href: "/admin/users" },
    { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div className="fixed inset-0 z-40 lg:hidden bg-black/50" onClick={() => setIsCollapsed(true)} />
      )}

      {/* Mobile open button when sidebar is collapsed */}
      {isCollapsed && (
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(false)} aria-label="Open sidebar">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 z-50 h-full bg-sidebar border-r border-sidebar-border transition-all duration-300",
          isCollapsed ? "-translate-x-full lg:translate-x-0 lg:w-16" : "w-64",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          {!isCollapsed && <div className="text-xl font-bold text-sidebar-primary">Moxecutive Admin</div>}
          <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="lg:hidden">
            {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <a
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                  item.active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                )}
              >
                <IconComponent className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span className="font-medium">{item.label}</span>}
              </a>
            )
          })}
        </nav>

        {/* User Profile */}
        {!isCollapsed && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-3 p-3 bg-sidebar-accent rounded-lg">
              <div className="w-8 h-8 bg-sidebar-primary rounded-full flex items-center justify-center">
                <span className="text-sidebar-primary-foreground text-sm font-medium">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-sidebar-accent-foreground">Admin User</div>
                <div className="text-xs text-sidebar-accent-foreground/70">admin@moxecutive.com</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
