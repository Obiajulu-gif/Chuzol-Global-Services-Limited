import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

// Sample orders data for seeding
const sampleOrders = [
  {
    orderNumber: "CHZ-0001",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    customerPhone: "+1 234 567 8900",
    items: [
      { name: "Premium Bitter Kola", quantity: 2, price: 25.99 },
      { name: "Organic Shea Butter", quantity: 1, price: 18.5 },
    ],
    total: 70.48,
    status: "completed",
    paymentStatus: "paid",
    shippingAddress: "123 Main St, New York, NY 10001",
    createdAt: new Date("2024-01-15").toISOString(),
    updatedAt: new Date("2024-01-16").toISOString(),
    shippedDate: new Date("2024-01-16").toISOString(),
    trackingNumber: "TRK123456789",
  },
  {
    orderNumber: "CHZ-0002",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    customerPhone: "+1 234 567 8901",
    items: [{ name: "Premium Cashew Nuts", quantity: 1, price: 32.0 }],
    total: 32.0,
    status: "processing",
    paymentStatus: "paid",
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
    createdAt: new Date("2024-01-15").toISOString(),
    updatedAt: new Date("2024-01-15").toISOString(),
    shippedDate: null,
    trackingNumber: null,
  },
  {
    orderNumber: "CHZ-0003",
    customerName: "Mike Johnson",
    customerEmail: "mike@example.com",
    customerPhone: "+1 234 567 8902",
    items: [
      { name: "Dried Hibiscus Flowers", quantity: 3, price: 12.75 },
      { name: "Tiger Nuts", quantity: 2, price: 22.0 },
    ],
    total: 82.25,
    status: "shipped",
    paymentStatus: "paid",
    shippingAddress: "789 Pine St, Chicago, IL 60601",
    createdAt: new Date("2024-01-14").toISOString(),
    updatedAt: new Date("2024-01-15").toISOString(),
    shippedDate: new Date("2024-01-15").toISOString(),
    trackingNumber: "TRK987654321",
  },
]

export async function GET() {
  try {
    const { db } = await connectToDatabase()

    // Check if orders collection already has data
    const existingOrders = await db.collection("orders").countDocuments()

    if (existingOrders > 0) {
      return NextResponse.json({
        success: true,
        message: `Orders collection already has ${existingOrders} documents. No seeding needed.`,
      })
    }

    // Insert sample orders
    const result = await db.collection("orders").insertMany(sampleOrders)

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${result.insertedCount} orders`,
    })
  } catch (error) {
    console.error("Error seeding orders:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to seed orders",
      },
      { status: 500 },
    )
  }
}
