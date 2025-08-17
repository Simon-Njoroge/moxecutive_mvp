"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Search, Film, Palette, Calendar, ShoppingCart, GraduationCap, Camera } from "lucide-react"

export function ServicesManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<any>(null)

  const services = [
    {
      id: 1,
      title: "Film & TV Production",
      slug: "film-tv-production",
      shortDescription: "High-quality video content that amplifies your audience",
      fullDescription:
        "Professional film and television production services including scripting, filming, editing, and post-production.",
      icon: "Film",
      orderPosition: 1,
      status: "active",
    },
    {
      id: 2,
      title: "Graphic Design & Branding",
      slug: "graphic-design-branding",
      shortDescription: "Creative visual identity solutions that make your brand memorable",
      fullDescription:
        "Comprehensive branding and graphic design services including logo design, brand identity development.",
      icon: "Palette",
      orderPosition: 2,
      status: "active",
    },
    {
      id: 3,
      title: "Event Management",
      slug: "event-management",
      shortDescription: "Seamless event planning and execution for memorable gatherings",
      fullDescription: "Full-service event management from concept to execution.",
      icon: "Calendar",
      orderPosition: 3,
      status: "active",
    },
  ]

  const getServiceIcon = (iconName: string) => {
    const icons = {
      Film: Film,
      Palette: Palette,
      Calendar: Calendar,
      ShoppingCart: ShoppingCart,
      GraduationCap: GraduationCap,
      Camera: Camera,
    }
    const IconComponent = icons[iconName as keyof typeof icons] || Film
    return <IconComponent className="h-6 w-6" />
  }

  const handleEdit = (service: any) => {
    setEditingService(service)
    setIsDialogOpen(true)
  }

  const handleAdd = () => {
    setEditingService(null)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Services Management</h1>
          <p className="text-muted-foreground">Manage your service offerings</p>
        </div>
        <Button onClick={handleAdd} className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search services..." className="pl-10" />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">{getServiceIcon(service.icon)}</div>
                  <div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      Order: {service.orderPosition}
                    </Badge>
                  </div>
                </div>
                <Badge variant={service.status === "active" ? "default" : "secondary"}>{service.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{service.shortDescription}</p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(service)}>
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingService ? "Edit Service" : "Add New Service"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input placeholder="Service title" defaultValue={editingService?.title} />
              </div>
              <div>
                <label className="text-sm font-medium">Slug</label>
                <Input placeholder="service-slug" defaultValue={editingService?.slug} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Short Description</label>
              <Textarea placeholder="Brief description for cards" defaultValue={editingService?.shortDescription} />
            </div>
            <div>
              <label className="text-sm font-medium">Full Description</label>
              <Textarea placeholder="Detailed description" rows={4} defaultValue={editingService?.fullDescription} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Icon</label>
                <select className="w-full p-2 border border-border rounded-lg">
                  <option value="Film">Film</option>
                  <option value="Palette">Palette</option>
                  <option value="Calendar">Calendar</option>
                  <option value="ShoppingCart">Shopping Cart</option>
                  <option value="GraduationCap">Graduation Cap</option>
                  <option value="Camera">Camera</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Order Position</label>
                <Input type="number" placeholder="1" defaultValue={editingService?.orderPosition} />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>{editingService ? "Update" : "Create"} Service</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
