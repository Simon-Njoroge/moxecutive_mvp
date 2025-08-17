import { type NextRequest, NextResponse } from "next/server"

let users = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    createdAt: "2024-01-01",
  },
]

export async function GET(request: NextRequest) {
  return NextResponse.json({ users })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const id = Date.now()
    const newUser = { id, ...body }
    users.unshift(newUser)
    return NextResponse.json({ success: true, user: newUser })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const id = Number(body.id)
    const idx = users.findIndex((u) => u.id === id)
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 })
    users[idx] = { ...users[idx], ...body }
    return NextResponse.json({ success: true, user: users[idx] })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = Number(searchParams.get("id"))
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 })
  users = users.filter((u) => u.id !== id)
  return NextResponse.json({ success: true })
}
