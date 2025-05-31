import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const { db } = await connectToDatabase()

    // Fetch all orders from MongoDB
    const orders = await db.collection("orders").find({}).toArray()

    console.log("Fetched orders from DB:", orders.length)

    return NextResponse.json({
      success: true,
      orders: orders || [],
      count: orders.length,
    })
  } catch (error) {
    console.error("Get orders error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch orders",
        orders: [], // Always return an empty array on error
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const orderData = await request.json()

    // Generate order number
    const orderCount = await db.collection("orders").countDocuments()
    const orderNumber = `CHZ-${String(orderCount + 1).padStart(4, "0")}`

    const order = {
      ...orderData,
      orderNumber,
      status: "pending",
      paymentStatus: "pending",
      shippedDate: null,
      trackingNumber: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const result = await db.collection("orders").insertOne(order)

    return NextResponse.json({
      success: true,
      order: { ...order, _id: result.insertedId },
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
