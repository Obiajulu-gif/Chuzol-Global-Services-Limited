import { type NextRequest, NextResponse } from "next/server"
import { adminDb, passwordResetDb } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const admin = adminDb.findByEmail(email)

    if (!admin) {
      // Don't reveal if email exists or not for security
      return NextResponse.json({
        success: true,
        message: "If an account with that email exists, a password reset link has been sent.",
      })
    }

    // Create password reset token
    const resetToken = passwordResetDb.create(email)

    // In production, you'd send an actual email here
    // For demo purposes, we'll just log the reset link
    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/admin/reset-password?token=${resetToken.token}`

    console.log("Password reset link:", resetLink)
    console.log("Reset token:", resetToken.token)

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      message: "If an account with that email exists, a password reset link has been sent.",
      // In development, include the token for testing
      ...(process.env.NODE_ENV === "development" && {
        resetToken: resetToken.token,
        resetLink,
      }),
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
