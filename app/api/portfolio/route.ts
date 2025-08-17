import { type NextRequest, NextResponse } from "next/server"

let items = [
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
    externalLink: "",
    createdAt: "2024-01-15",
  },
]

export async function GET(request: NextRequest) {
  return NextResponse.json({ items })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const id = Date.now()
    const newItem = { id, ...body }
    items.unshift(newItem)
    return NextResponse.json({ success: true, item: newItem })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const id = Number(body.id)
    const idx = items.findIndex((i) => i.id === id)
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 })
    items[idx] = { ...items[idx], ...body }
    return NextResponse.json({ success: true, item: items[idx] })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = Number(searchParams.get("id"))
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 })
  items = items.filter((i) => i.id !== id)
  return NextResponse.json({ success: true })
}
