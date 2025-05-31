import { type NextRequest, NextResponse } from "next/server"
import { adminDb, passwordResetDb } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { token, newPassword } = await request.json()

    if (!token || !newPassword) {
      return NextResponse.json({ error: "Token and new password are required" }, { status: 400 })
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 })
    }

    const resetToken = passwordResetDb.findByToken(token)

    if (!resetToken) {
      return NextResponse.json({ error: "Invalid or expired reset token" }, { status: 400 })
    }

    // Update admin password
    const success = adminDb.updatePassword(resetToken.email, newPassword)

    if (!success) {
      return NextResponse.json({ error: "Failed to update password" }, { status: 500 })
    }

    // Mark token as used
    passwordResetDb.markAsUsed(token)

    return NextResponse.json({
      success: true,
      message: "Password has been reset successfully",
    })
  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
