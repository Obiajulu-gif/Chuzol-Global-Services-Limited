import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function POST() {
  try {
    const { db } = await connectToDatabase()

    // Check if customers already exist
    const existingCustomers = await db.collection("customers").countDocuments()
    if (existingCustomers > 0) {
      return NextResponse.json({
        message: "Sample customers already exist",
        count: existingCustomers,
      })
    }

    // Sample customers data
    const sampleCustomers = [
      {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 234 567 8900",
        location: "New York, USA",
        totalOrders: 5,
        totalSpent: 1250.89,
        lastOrder: "2024-01-15",
        status: "active",
        joinDate: "2023-06-15",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+1 234 567 8901",
        location: "Los Angeles, USA",
        totalOrders: 8,
        totalSpent: 890.45,
        lastOrder: "2024-01-14",
        status: "active",
        joinDate: "2023-08-22",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        name: "Mike Johnson",
        email: "mike.johnson@example.com",
        phone: "+1 234 567 8902",
        location: "Chicago, USA",
        totalOrders: 15,
        totalSpent: 2150.67,
        lastOrder: "2024-01-13",
        status: "vip",
        joinDate: "2023-03-10",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        name: "Sarah Wilson",
        email: "sarah.wilson@example.com",
        phone: "+1 234 567 8903",
        location: "Houston, USA",
        totalOrders: 3,
        totalSpent: 245.3,
        lastOrder: "2023-12-20",
        status: "inactive",
        joinDate: "2023-11-05",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        name: "David Brown",
        email: "david.brown@example.com",
        phone: "+1 234 567 8904",
        location: "Miami, USA",
        totalOrders: 25,
        totalSpent: 3890.12,
        lastOrder: "2024-01-16",
        status: "vip",
        joinDate: "2023-01-15",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]

    // Insert sample customers
    const result = await db.collection("customers").insertMany(sampleCustomers)

    return NextResponse.json({
      success: true,
      message: `${result.insertedCount} sample customers created successfully`,
      count: result.insertedCount,
    })
  } catch (error) {
    console.error("Seed customers error:", error)
    return NextResponse.json({ error: "Failed to create sample customers" }, { status: 500 })
  }
}
