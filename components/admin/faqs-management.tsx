"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Search, HelpCircle, ChevronDown, ChevronUp } from "lucide-react"

type Faq = {
  id: number
  category: string
  question: string
  answer: string
  status: string
  orderPosition?: number
  createdAt?: string
}

export function FaqsManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingFaq, setEditingFaq] = useState<Faq | null>(null)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [faqs, setFaqs] = useState<Faq[]>([])
  const [loading, setLoading] = useState(false)

  // Form state
  const [category, setCategory] = useState("")
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [status, setStatus] = useState("active")
  const [orderPosition, setOrderPosition] = useState<number | undefined>(1)

  const API = "/api/faqs"

  useEffect(() => {
    loadFaqs()
  }, [])

  const loadFaqs = async () => {
    setLoading(true)
    try {
      const res = await fetch(API)
      const data = await res.json()
      setFaqs(data.faqs || data.items || [])
    } catch (err) {
      console.error("Failed to load faqs", err)
    } finally {
      setLoading(false)
    }
  }

  const openForEdit = (faq: Faq) => {
    setEditingFaq(faq)
    setCategory(faq.category)
    setQuestion(faq.question)
    setAnswer(faq.answer)
    setStatus(faq.status)
    setOrderPosition(faq.orderPosition)
    setIsDialogOpen(true)
  }

  const openForAdd = () => {
    setEditingFaq(null)
    setCategory("")
    setQuestion("")
    setAnswer("")
    setStatus("active")
    setOrderPosition(1)
    setIsDialogOpen(true)
  }

  const handleSubmit = async () => {
    const payload = {
      category,
      question,
      answer,
      status,
      orderPosition,
    }

    try {
      if (editingFaq) {
        const res = await fetch(API, {
          method: "PUT",
          body: JSON.stringify({ id: editingFaq.id, ...payload }),
          headers: { "Content-Type": "application/json" },
        })
        const data = await res.json()
        if (data?.success && data.faq) {
          setFaqs((prev) => prev.map((f) => (f.id === data.faq.id ? data.faq : f)))
        }
      } else {
        const res = await fetch(API, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        })
        const data = await res.json()
        if (data?.success && data.faq) {
          setFaqs((prev) => [data.faq, ...prev])
        }
      }
      setIsDialogOpen(false)
    } catch (err) {
      console.error("Save failed", err)
    }
  }

  const handleDelete = async (id?: number) => {
    if (!id) return
    if (!confirm("Delete this FAQ?")) return
    try {
      const res = await fetch(`${API}?id=${id}`, { method: "DELETE" })
      const data = await res.json()
      if (data?.success) {
        setFaqs((prev) => prev.filter((f) => f.id !== id))
      }
    } catch (err) {
      console.error("Delete failed", err)
    }
  }

  const categories = ["all", ...Array.from(new Set(faqs.map((f) => f.category)))].filter(Boolean)

  const filteredFaqs = selectedCategory === "all" ? faqs : faqs.filter((faq) => faq.category === selectedCategory)

  const toggleExpanded = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">FAQs Management</h1>
          <p className="text-muted-foreground">Manage frequently asked questions</p>
        </div>
        <Button onClick={openForAdd} className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add FAQ
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{faqs.length}</div>
            <p className="text-sm text-muted-foreground">Total FAQs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{faqs.filter((f) => f.status === "active").length}</div>
            <p className="text-sm text-muted-foreground">Published</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{faqs.filter((f) => f.status === "draft").length}</div>
            <p className="text-sm text-muted-foreground">Drafts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{new Set(faqs.map((faq) => faq.category)).size}</div>
            <p className="text-sm text-muted-foreground">Categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search FAQs..." className="pl-10" onChange={(e) => setCategory(e.target.value)} value={category} />
        </div>
        <div className="flex items-center gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === "all" ? "All" : cat}
            </Button>
          ))}
        </div>
      </div>

      {/* FAQs List */}
      <div className="space-y-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          filteredFaqs.map((faq) => (
            <Card key={faq.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">{faq.question}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">{faq.category}</Badge>
                        <Badge variant={faq.status === "active" ? "default" : "outline"}>{faq.status}</Badge>
                        <span className="text-xs text-muted-foreground">Order: {faq.orderPosition}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => toggleExpanded(faq.id)}>
                      {expandedFaq === faq.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => openForEdit(faq)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive bg-transparent" onClick={() => handleDelete(faq.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>

                {expandedFaq === faq.id && (
                  <div className="ml-8 pt-4 border-t border-border">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    <p className="text-xs text-muted-foreground mt-3">Created on {faq.createdAt}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingFaq ? "Edit FAQ" : "Add New FAQ"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Category</label>
                <select className="w-full p-2 border border-border rounded-lg" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="General">General</option>
                  <option value="Production">Production</option>
                  <option value="Pricing">Pricing</option>
                  <option value="Process">Process</option>
                  <option value="Support">Support</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Order Position</label>
                <Input type="number" placeholder="1" value={orderPosition} onChange={(e) => setOrderPosition(Number(e.target.value))} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Question</label>
              <Input placeholder="What is your question?" value={question} onChange={(e) => setQuestion(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Answer</label>
              <Textarea placeholder="Provide a detailed answer" rows={4} value={answer} onChange={(e) => setAnswer(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Status</label>
              <select className="w-full p-2 border border-border rounded-lg" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>{editingFaq ? "Update" : "Create"} FAQ</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
