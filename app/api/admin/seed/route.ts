import { NextResponse } from "next/server"
import { adminDb, initializeDatabase } from "@/lib/database"

export async function POST() {
  try {
    // Initialize database with default data
    await initializeDatabase()

    // Check if admins were created
    const admins = await adminDb.getAll()

    return NextResponse.json({
      success: true,
      message: "Database initialized successfully",
      admins: admins.map((admin) => ({
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        createdAt: admin.createdAt,
      })),
    })
  } catch (error) {
    console.error("Database initialization error:", error)
    return NextResponse.json({ error: "Failed to initialize database" }, { status: 500 })
  }
}
