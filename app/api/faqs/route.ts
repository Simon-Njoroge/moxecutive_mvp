import { type NextRequest, NextResponse } from "next/server"

let faqs = [
  {
    id: 1,
    category: "General",
    question: "What services does Moxecutive Media offer?",
    answer: "We offer comprehensive media solutions...",
    status: "active",
    orderPosition: 1,
    createdAt: "2024-01-15",
  },
]

export async function GET(request: NextRequest) {
  return NextResponse.json({ faqs })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const id = Date.now()
    const newItem = { id, ...body }
    faqs.unshift(newItem)
    return NextResponse.json({ success: true, faq: newItem })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const id = Number(body.id)
    const idx = faqs.findIndex((f) => f.id === id)
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 })
    faqs[idx] = { ...faqs[idx], ...body }
    return NextResponse.json({ success: true, faq: faqs[idx] })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = Number(searchParams.get("id"))
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 })
  faqs = faqs.filter((f) => f.id !== id)
  return NextResponse.json({ success: true })
}
