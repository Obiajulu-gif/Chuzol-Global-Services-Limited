import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { sendOrderConfirmationEmail } from "@/lib/email"
import { paystack } from "@/lib/paystack"

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const orderData = await request.json()

    // Generate order number
    const orderCount = await db.collection("orders").countDocuments()
    const orderNumber = `CHZ-${String(orderCount + 1).padStart(4, "0")}`

    // Generate payment reference
    const paymentReference = paystack.generateReference()

    // Calculate total
    const subtotal = orderData.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
    const shippingCost = 25.0
    const taxRate = 0.08
    const taxAmount = subtotal * taxRate
    const total = subtotal + shippingCost + taxAmount

    // Create order in database
    const order = {
      orderNumber,
      paymentReference,
      customerEmail: orderData.email,
      customerPhone: orderData.phone,
      customerName: `${orderData.firstName} ${orderData.lastName}`,
      shippingAddress: {
        firstName: orderData.firstName,
        lastName: orderData.lastName,
        company: orderData.company || "",
        address: orderData.address,
        city: orderData.city,
        state: orderData.state,
        zipCode: orderData.zipCode,
        country: orderData.country,
      },
      items: orderData.items,
      subtotal,
      shippingCost,
      taxAmount,
      total,
      status: "pending",
      paymentStatus: "pending",
      orderNotes: orderData.orderNotes || "",
      subscribeNewsletter: orderData.subscribeNewsletter || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const result = await db.collection("orders").insertOne(order)

    // Initialize Paystack transaction
    const paystackData = await paystack.initializeTransaction({
      email: orderData.email,
      amount: total, // Paystack service will convert to kobo
      reference: paymentReference,
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/verify?reference=${paymentReference}`,
      metadata: {
        orderNumber,
        orderId: result.insertedId.toString(),
        customerName: order.customerName,
      },
    })

    // Send order confirmation email
    try {
      await sendOrderConfirmationEmail(orderData.email, {
        orderNumber,
        customerName: order.customerName,
        items: orderData.items,
        total,
        shippingAddress: `${orderData.address}, ${orderData.city}, ${orderData.state} ${orderData.zipCode}, ${orderData.country}`,
      })
    } catch (emailError) {
      console.error("Failed to send order confirmation email:", emailError)
      // Continue anyway - don't fail the order creation
    }

    return NextResponse.json({
      success: true,
      order: { ...order, _id: result.insertedId },
      paymentUrl: paystackData.data.authorization_url,
      paymentReference,
      message: "Order created successfully",
    })
  } catch (error) {
    console.error("Create order error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create order",
      },
      { status: 500 },
    )
  }
}
