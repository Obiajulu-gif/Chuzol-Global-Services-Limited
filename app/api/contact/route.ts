import { type NextRequest, NextResponse } from "next/server"
import { sendContactEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Send email to your Gmail
    await sendContactEmail(formData)

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully. We'll get back to you within 24 hours.",
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to send message. Please try again later." }, { status: 500 })
  }
}
