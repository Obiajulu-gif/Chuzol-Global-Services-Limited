import { type NextRequest, NextResponse } from "next/server"
import { adminDb, passwordResetDb } from "@/lib/database"
import { sendPasswordResetEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const admin = await adminDb.findByEmail(email)

    if (!admin) {
      // Don't reveal if email exists or not for security
      return NextResponse.json({
        success: true,
        message: "If an account with that email exists, a password reset link has been sent.",
      })
    }

    // Create password reset token
    const resetToken = await passwordResetDb.create(email)

    // Send password reset email
    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/reset-password?token=${resetToken.token}`

    try {
      await sendPasswordResetEmail(email, admin.name, resetLink, resetToken.token)
      console.log("Password reset email sent successfully to:", email)
    } catch (emailError) {
      console.error("Failed to send password reset email:", emailError)
      // Continue anyway - don't reveal email sending failures
    }

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
