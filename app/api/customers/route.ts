import { type NextRequest, NextResponse } from "next/server"
import { customerDb } from "@/lib/database"

export async function GET() {
  try {
    const customers = customerDb.getAll()
    return NextResponse.json({ customers })
  } catch (error) {
    console.error("Get customers error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const customerData = await request.json()

    const customer = customerDb.create({
      ...customerData,
      totalOrders: 0,
      totalSpent: 0,
      lastOrder: "",
      status: "active",
    })

    return NextResponse.json({
      success: true,
      customer,
      message: "Customer created successfully",
    })
  } catch (error) {
    console.error("Create customer error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
