import { type NextRequest, NextResponse } from "next/server"

// In-memory mock services data
let services = [
  {
    id: 1,
    title: "Film & TV Production",
    slug: "film-tv-production",
    shortDescription: "High-quality video content that amplifies your audience",
    fullDescription: "Professional film and television production services including scripting, filming, editing, and post-production.",
    icon: "Film",
    orderPosition: 1,
    status: "active",
  },
]

export async function GET(request: NextRequest) {
  return NextResponse.json({ services })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const id = Date.now()
    const newService = { id, ...body }
    services.unshift(newService)
    return NextResponse.json({ success: true, service: newService })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const id = Number(body.id)
    const idx = services.findIndex((s) => s.id === id)
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 })
    services[idx] = { ...services[idx], ...body }
    return NextResponse.json({ success: true, service: services[idx] })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = Number(searchParams.get("id"))
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 })
  services = services.filter((s) => s.id !== id)
  return NextResponse.json({ success: true })
}
