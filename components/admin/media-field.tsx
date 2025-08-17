"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MediaPicker } from "./media-picker"
import { X, ImageIcon, Video, File } from "lucide-react"

interface MediaFieldProps {
  label: string
  value?: any
  onChange?: (media: any) => void
  multiple?: boolean
  acceptedTypes?: string[]
  placeholder?: string
}

export function MediaField({ label, value, onChange, multiple = false, acceptedTypes, placeholder }: MediaFieldProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false)

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      default:
        return <File className="h-4 w-4" />
    }
  }

  const handleSelect = (media: any[]) => {
    if (multiple) {
      onChange?.(media)
    } else {
      onChange?.(media[0] || null)
    }
  }

  const handleRemove = (id?: number) => {
    if (multiple && Array.isArray(value)) {
      onChange?.(value.filter((item: any) => item.id !== id))
    } else {
      onChange?.(null)
    }
  }

  const selectedItems = multiple ? (Array.isArray(value) ? value : []) : value ? [value] : []

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>

      {selectedItems.length > 0 ? (
        <div className="space-y-2">
          {selectedItems.map((item: any) => (
            <div key={item.id} className="flex items-center gap-3 p-3 border border-border rounded-lg">
              <div className="flex-shrink-0">
                {item.type === "image" ? (
                  <img
                    src={item.url || "/placeholder.svg"}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                    {getFileIcon(item.type)}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.size}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleRemove(item.id)} className="flex-shrink-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {multiple && (
            <Button variant="outline" onClick={() => setIsPickerOpen(true)}>
              Add More Media
            </Button>
          )}
        </div>
      ) : (
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <div className="text-muted-foreground mb-4">{placeholder || "No media selected"}</div>
          <Button onClick={() => setIsPickerOpen(true)}>Select Media</Button>
        </div>
      )}

      <MediaPicker
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onSelect={handleSelect}
        multiple={multiple}
        acceptedTypes={acceptedTypes}
      />
    </div>
  )
}
