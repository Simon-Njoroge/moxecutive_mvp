"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Search, Star, User, ImageIcon } from "lucide-react"

export function TestimonialsManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null)

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "Tech Innovations Ltd",
      role: "Marketing Director",
      message:
        "Moxecutive Media transformed our brand presence with exceptional video content and strategic media buying.",
      rating: 5,
      status: "active",
      photo: "/placeholder.svg",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Michael Chen",
      company: "Global Events Co",
      role: "CEO",
      message: "Professional, creative, and results-driven. Their event management services exceeded our expectations.",
      rating: 5,
      status: "active",
      photo: "/placeholder.svg",
      createdAt: "2024-01-14",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      company: "Startup Hub",
      role: "Founder",
      message: "Their branding expertise helped us establish a strong market presence. Highly recommended!",
      rating: 5,
      status: "pending",
      photo: "/placeholder.svg",
      createdAt: "2024-01-13",
    },
  ]

  const handleEdit = (testimonial: any) => {
    setEditingTestimonial(testimonial)
    setIsDialogOpen(true)
  }

  const handleAdd = () => {
    setEditingTestimonial(null)
    setIsDialogOpen(true)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Testimonials Management</h1>
          <p className="text-muted-foreground">Manage client testimonials and reviews</p>
        </div>
        <Button onClick={handleAdd} className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{testimonials.length}</div>
            <p className="text-sm text-muted-foreground">Total Testimonials</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">
              {testimonials.filter((t) => t.status === "active").length}
            </div>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">
              {testimonials.filter((t) => t.status === "pending").length}
            </div>
            <p className="text-sm text-muted-foreground">Pending Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">4.9</div>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search testimonials..." className="pl-10" />
        </div>
      </div>

      {/* Testimonials List */}
      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-muted rounded-full overflow-hidden flex-shrink-0">
                  <ImageIcon
                    src={testimonial.photo || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                      <div className="flex items-center gap-1 mt-1">{renderStars(testimonial.rating)}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={testimonial.status === "active" ? "default" : "secondary"}>
                        {testimonial.status}
                      </Badge>
                      <Button variant="outline" size="sm" onClick={() => handleEdit(testimonial)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive bg-transparent">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                  <blockquote className="text-foreground italic">"{testimonial.message}"</blockquote>
                  <p className="text-xs text-muted-foreground mt-2">Added on {testimonial.createdAt}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input placeholder="Client name" defaultValue={editingTestimonial?.name} />
              </div>
              <div>
                <label className="text-sm font-medium">Company</label>
                <Input placeholder="Company name" defaultValue={editingTestimonial?.company} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Role</label>
              <Input placeholder="Job title" defaultValue={editingTestimonial?.role} />
            </div>
            <div>
              <label className="text-sm font-medium">Testimonial Message</label>
              <Textarea
                placeholder="What did the client say about your services?"
                rows={4}
                defaultValue={editingTestimonial?.message}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Rating</label>
                <select className="w-full p-2 border border-border rounded-lg">
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <select className="w-full p-2 border border-border rounded-lg">
                  <option value="active">Active</option>
                  <option value="pending">Pending Review</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Client Photo</label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <User className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Click to upload client photo</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>
                {editingTestimonial ? "Update" : "Create"} Testimonial
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
