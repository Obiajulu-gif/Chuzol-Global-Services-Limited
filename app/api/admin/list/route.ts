import { type NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    console.log("Fetching all admins...")

    const admins = await adminDb.getAll()
    console.log("Found admins:", admins.length)

    const formattedAdmins = admins.map((admin) => ({
      id: admin._id?.toString() || admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      createdAt: admin.createdAt,
    }))

    return NextResponse.json({
      success: true,
      admins: formattedAdmins,
    })
  } catch (error) {
    console.error("Error fetching admins:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch admins",
        admins: [],
      },
      { status: 500 },
    )
  }
}
