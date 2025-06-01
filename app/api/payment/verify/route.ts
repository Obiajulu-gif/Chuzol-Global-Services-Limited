import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { paystack } from "@/lib/paystack"
import { sendPaymentSuccessEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const { reference } = await request.json()

    if (!reference) {
      return NextResponse.json({ error: "Payment reference is required" }, { status: 400 })
    }

    // Verify payment with Paystack
    const verification = await paystack.verifyTransaction(reference)

    if (!verification.status || verification.data.status !== "success") {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Find and update order
    const order = await db.collection("orders").findOne({ paymentReference: reference })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Update order status
    await db.collection("orders").updateOne(
      { paymentReference: reference },
      {
        $set: {
          paymentStatus: "paid",
          status: "confirmed",
          paidAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          paystackData: verification.data,
        },
      },
    )

    // Update product quantities
    for (const item of order.items) {
      await db.collection("products").updateOne(
        { _id: item.id },
        {
          $inc: { quantity: -item.quantity },
          $set: { updatedAt: new Date().toISOString() },
        },
      )
    }

    // Send payment success email
    try {
      await sendPaymentSuccessEmail(order.customerEmail, {
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        items: order.items,
        total: order.total,
        paymentReference: reference,
      })
    } catch (emailError) {
      console.error("Failed to send payment success email:", emailError)
      // Continue anyway - payment is still successful
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      order: {
        orderNumber: order.orderNumber,
        status: "confirmed",
        paymentStatus: "paid",
      },
    })
  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 })
  }
}
