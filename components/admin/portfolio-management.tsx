"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Search, ExternalLink, ImageIcon } from "lucide-react"

export function PortfolioManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const portfolioItems = [
    {
      id: 1,
      title: "Corporate Brand Film",
      slug: "corporate-brand-film",
      description: "A compelling brand story for a tech startup",
      category: "Film Production",
      service: "Film & TV Production",
      previewImage: "/placeholder.svg",
      status: "published",
      orderPosition: 1,
      externalLink: "https://example.com",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      title: "Event Coverage",
      slug: "event-coverage",
      description: "Professional event photography and videography",
      category: "Photography",
      service: "Photography",
      previewImage: "/placeholder.svg",
      status: "published",
      orderPosition: 2,
      externalLink: "",
      createdAt: "2024-01-14",
    },
    {
      id: 3,
      title: "Brand Identity Design",
      slug: "brand-identity-design",
      description: "Complete brand identity for a restaurant chain",
      category: "Branding",
      service: "Graphic Design & Branding",
      previewImage: "/placeholder.svg",
      status: "draft",
      orderPosition: 3,
      externalLink: "",
      createdAt: "2024-01-13",
    },
  ]

  const categories = ["all", "Film Production", "Photography", "Branding", "Event Management"]

  const filteredItems =
    selectedCategory === "all" ? portfolioItems : portfolioItems.filter((item) => item.category === selectedCategory)

  const handleEdit = (item: any) => {
    setEditingItem(item)
    setIsDialogOpen(true)
  }

  const handleAdd = () => {
    setEditingItem(null)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Portfolio Management</h1>
          <p className="text-muted-foreground">Manage your portfolio items and showcase work</p>
        </div>
        <Button onClick={handleAdd} className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Portfolio Item
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{portfolioItems.length}</div>
            <p className="text-sm text-muted-foreground">Total Items</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">
              {portfolioItems.filter((item) => item.status === "published").length}
            </div>
            <p className="text-sm text-muted-foreground">Published</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">
              {portfolioItems.filter((item) => item.status === "draft").length}
            </div>
            <p className="text-sm text-muted-foreground">Drafts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">4</div>
            <p className="text-sm text-muted-foreground">Categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search portfolio..." className="pl-10" />
        </div>
        <div className="flex items-center gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category === "all" ? "All" : category}
            </Button>
          ))}
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="group hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
              <img
                src={item.previewImage || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary">{item.category}</Badge>
                    <Badge variant={item.status === "published" ? "default" : "outline"}>{item.status}</Badge>
                  </div>
                </div>
                {item.externalLink && <ExternalLink className="h-4 w-4 text-muted-foreground" />}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{item.description}</p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-destructive bg-transparent">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Portfolio Item" : "Add New Portfolio Item"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input placeholder="Portfolio item title" defaultValue={editingItem?.title} />
              </div>
              <div>
                <label className="text-sm font-medium">Slug</label>
                <Input placeholder="portfolio-item-slug" defaultValue={editingItem?.slug} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea placeholder="Describe this portfolio item" rows={3} defaultValue={editingItem?.description} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Category</label>
                <select className="w-full p-2 border border-border rounded-lg">
                  <option value="Film Production">Film Production</option>
                  <option value="Photography">Photography</option>
                  <option value="Branding">Branding</option>
                  <option value="Event Management">Event Management</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Service</label>
                <select className="w-full p-2 border border-border rounded-lg">
                  <option value="Film & TV Production">Film & TV Production</option>
                  <option value="Photography">Photography</option>
                  <option value="Graphic Design & Branding">Graphic Design & Branding</option>
                  <option value="Event Management">Event Management</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">External Link</label>
                <Input placeholder="https://example.com" defaultValue={editingItem?.externalLink} />
              </div>
              <div>
                <label className="text-sm font-medium">Order Position</label>
                <Input type="number" placeholder="1" defaultValue={editingItem?.orderPosition} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Preview Image</label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>{editingItem ? "Update" : "Create"} Portfolio Item</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
