"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Grid, List, Check, Upload, ImageIcon, Video, File } from "lucide-react"

interface MediaItem {
  id: number
  name: string
  type: string
  size: string
  url: string
  dimensions?: string
  uploadDate: string
}

interface MediaPickerProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (media: MediaItem[]) => void
  multiple?: boolean
  acceptedTypes?: string[]
}

export function MediaPicker({ isOpen, onClose, onSelect, multiple = false, acceptedTypes }: MediaPickerProps) {
  const [selectedItems, setSelectedItems] = useState<MediaItem[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")

  const mediaItems: MediaItem[] = [
    {
      id: 1,
      name: "hero-video.mp4",
      type: "video",
      size: "15.2 MB",
      url: "/placeholder.svg",
      dimensions: "1920x1080",
      uploadDate: "2024-01-15",
    },
    {
      id: 2,
      name: "company-logo.png",
      type: "image",
      size: "245 KB",
      url: "/placeholder.svg",
      dimensions: "512x512",
      uploadDate: "2024-01-14",
    },
    {
      id: 3,
      name: "portfolio-1.jpg",
      type: "image",
      size: "2.1 MB",
      url: "/placeholder.svg",
      dimensions: "1200x800",
      uploadDate: "2024-01-13",
    },
    {
      id: 4,
      name: "brand-guidelines.pdf",
      type: "document",
      size: "1.8 MB",
      url: "/placeholder.svg",
      uploadDate: "2024-01-12",
    },
  ]

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-6 w-6 text-blue-500" />
      case "video":
        return <Video className="h-6 w-6 text-purple-500" />
      default:
        return <File className="h-6 w-6 text-gray-500" />
    }
  }

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case "image":
        return "bg-blue-100 text-blue-800"
      case "video":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredItems = mediaItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || item.type === filterType
    const matchesAccepted = !acceptedTypes || acceptedTypes.includes(item.type)
    return matchesSearch && matchesType && matchesAccepted
  })

  const toggleSelection = (item: MediaItem) => {
    if (multiple) {
      setSelectedItems((prev) => {
        const isSelected = prev.some((selected) => selected.id === item.id)
        if (isSelected) {
          return prev.filter((selected) => selected.id !== item.id)
        } else {
          return [...prev, item]
        }
      })
    } else {
      setSelectedItems([item])
    }
  }

  const isSelected = (item: MediaItem) => {
    return selectedItems.some((selected) => selected.id === item.id)
  }

  const handleSelect = () => {
    onSelect(selectedItems)
    onClose()
    setSelectedItems([])
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Select Media</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search media..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="p-2 border border-border rounded-lg"
              >
                <option value="all">All Types</option>
                <option value="image">Images</option>
                <option value="video">Videos</option>
                <option value="document">Documents</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Media Grid/List */}
          <div className="border border-border rounded-lg p-4 max-h-96 overflow-y-auto">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className={`relative border rounded-lg overflow-hidden cursor-pointer transition-all ${
                      isSelected(item)
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => toggleSelection(item)}
                  >
                    <div className="aspect-square bg-muted flex items-center justify-center">
                      {item.type === "image" ? (
                        <img
                          src={item.url || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        getFileIcon(item.type)
                      )}
                    </div>
                    <div className="p-2">
                      <p className="text-xs font-medium truncate">{item.name}</p>
                      <Badge className={`text-xs ${getFileTypeColor(item.type)}`}>{item.type}</Badge>
                    </div>
                    {isSelected(item) && (
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-4 p-3 border rounded-lg cursor-pointer transition-all ${
                      isSelected(item) ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => toggleSelection(item)}
                  >
                    <div className="flex-shrink-0">
                      {item.type === "image" ? (
                        <img
                          src={item.url || "/placeholder.svg"}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        getFileIcon(item.type)
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.size} • {item.dimensions} • {item.uploadDate}
                      </p>
                    </div>
                    <Badge className={getFileTypeColor(item.type)}>{item.type}</Badge>
                    {isSelected(item) && <Check className="h-5 w-5 text-primary" />}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upload Option */}
          <div className="border-t border-border pt-4">
            <Button variant="outline" className="w-full bg-transparent">
              <Upload className="mr-2 h-4 w-4" />
              Upload New Media
            </Button>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {selectedItems.length > 0 &&
                `${selectedItems.length} item${selectedItems.length > 1 ? "s" : ""} selected`}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSelect} disabled={selectedItems.length === 0}>
                Select {selectedItems.length > 0 && `(${selectedItems.length})`}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
