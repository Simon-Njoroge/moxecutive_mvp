"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye, Search, Filter } from "lucide-react"

export function ContentManagement() {
  const [activeTab, setActiveTab] = useState("pages")

  const pages = [
    {
      id: 1,
      title: "Home",
      slug: "home",
      status: "published",
      lastModified: "2024-01-15",
      author: "Admin",
    },
    {
      id: 2,
      title: "About Us",
      slug: "about",
      status: "published",
      lastModified: "2024-01-14",
      author: "Editor",
    },
    {
      id: 3,
      title: "Services",
      slug: "services",
      status: "draft",
      lastModified: "2024-01-13",
      author: "Admin",
    },
  ]

  const sections = [
    {
      id: 1,
      title: "Hero Section",
      page: "Home",
      type: "hero",
      status: "active",
      order: 1,
    },
    {
      id: 2,
      title: "Services Overview",
      page: "Home",
      type: "services",
      status: "active",
      order: 2,
    },
    {
      id: 3,
      title: "Portfolio Showcase",
      page: "Home",
      type: "portfolio",
      status: "active",
      order: 3,
    },
  ]

  const tabs = [
    { id: "pages", label: "Pages", count: pages.length },
    { id: "sections", label: "Sections", count: sections.length },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Content Management</h1>
          <p className="text-muted-foreground">Manage your website pages and content sections</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
              <Badge variant="secondary" className="ml-2">
                {tab.count}
              </Badge>
            </button>
          ))}
        </nav>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search content..."
            className="pl-10 pr-4 py-2 w-full bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Content Table */}
      <Card>
        <CardHeader>
          <CardTitle>{activeTab === "pages" ? "Pages" : "Content Sections"}</CardTitle>
        </CardHeader>
        <CardContent>
          {activeTab === "pages" ? (
            <div className="space-y-4">
              {pages.map((page) => (
                <div key={page.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{page.title}</h3>
                    <p className="text-sm text-muted-foreground">/{page.slug}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>Modified: {page.lastModified}</span>
                      <span>By: {page.author}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={page.status === "published" ? "default" : "secondary"}>{page.status}</Badge>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sections.map((section) => (
                <div key={section.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{section.title}</h3>
                    <p className="text-sm text-muted-foreground">Page: {section.page}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>Type: {section.type}</span>
                      <span>Order: {section.order}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={section.status === "active" ? "default" : "secondary"}>{section.status}</Badge>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
