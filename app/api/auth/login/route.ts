import { type NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    console.log("Login attempt for email:", email)

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const admin = await adminDb.findByEmail(email)
    console.log("Admin found:", admin ? "Yes" : "No")

    if (!admin) {
      console.log("Admin not found for email:", email)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    console.log("Comparing passwords:", { provided: password, stored: admin.password })

    if (admin.password !== password) {
      console.log("Password mismatch")
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // In production, you'd use proper JWT tokens and secure sessions
    const adminData = {
      id: admin._id?.toString() || admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    }

    console.log("Login successful for:", adminData.email)

    return NextResponse.json({
      success: true,
      admin: adminData,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
