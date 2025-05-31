import { type NextRequest, NextResponse } from "next/server"
import { orderDb } from "@/lib/database"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const updates = await request.json()

    // Auto-generate tracking number when status changes to shipped
    if (updates.status === "shipped" && !updates.trackingNumber) {
      updates.trackingNumber = `TRK${Date.now()}`
      updates.shippedDate = new Date().toISOString().split("T")[0]
    }

    const order = orderDb.update(id, updates)

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      order,
      message: "Order updated successfully",
    })
  } catch (error) {
    console.error("Update order error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
