import { type NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, role } = await request.json()

    console.log("Creating admin:", { email, name, role })

    if (!email || !password || !name || !role) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Check if admin already exists
    const existingAdmin = await adminDb.findByEmail(email)
    if (existingAdmin) {
      return NextResponse.json({ error: "Admin with this email already exists" }, { status: 400 })
    }

    // Create new admin
    const newAdmin = await adminDb.create({
      email,
      password, // In production, hash this password
      name,
      role,
    })

    console.log("Admin created successfully:", newAdmin.email)

    return NextResponse.json({
      success: true,
      admin: {
        id: newAdmin._id?.toString(),
        email: newAdmin.email,
        name: newAdmin.name,
        role: newAdmin.role,
        createdAt: newAdmin.createdAt,
      },
    })
  } catch (error) {
    console.error("Error creating admin:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
