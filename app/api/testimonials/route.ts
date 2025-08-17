import { type NextRequest, NextResponse } from "next/server"

let testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "Tech Innovations Ltd",
    role: "Marketing Director",
    message: "Moxecutive Media transformed our brand presence.",
    rating: 5,
    status: "active",
    photo: "/placeholder.svg",
    createdAt: "2024-01-15",
  },
]

export async function GET(request: NextRequest) {
  return NextResponse.json({ testimonials })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const id = Date.now()
    const newItem = { id, ...body }
    testimonials.unshift(newItem)
    return NextResponse.json({ success: true, testimonial: newItem })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const id = Number(body.id)
    const idx = testimonials.findIndex((t) => t.id === id)
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 })
    testimonials[idx] = { ...testimonials[idx], ...body }
    return NextResponse.json({ success: true, testimonial: testimonials[idx] })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = Number(searchParams.get("id"))
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 })
  testimonials = testimonials.filter((t) => t.id !== id)
  return NextResponse.json({ success: true })
}
