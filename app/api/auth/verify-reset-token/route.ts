import { type NextRequest, NextResponse } from "next/server"
import { passwordResetDb } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 })
    }

    const resetToken = passwordResetDb.findByToken(token)

    if (!resetToken) {
      return NextResponse.json({ error: "Invalid or expired reset token" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      email: resetToken.email,
    })
  } catch (error) {
    console.error("Verify reset token error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
