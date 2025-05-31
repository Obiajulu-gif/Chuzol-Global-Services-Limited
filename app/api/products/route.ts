import { type NextRequest, NextResponse } from "next/server"
import { productDb, initializeDatabase } from "@/lib/database"

export async function GET() {
  try {
    await initializeDatabase()
    const products = await productDb.getAll()
    return NextResponse.json({ products })
  } catch (error) {
    console.error("Get products error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json()

    // Validate required fields
    const requiredFields = ["name", "category", "price", "unit", "stock", "sku"]
    for (const field of requiredFields) {
      if (!productData[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    // Set default values
    const product = await productDb.create({
      ...productData,
      price: Number.parseFloat(productData.price),
      stock: Number.parseInt(productData.stock),
      inStock: Number.parseInt(productData.stock) > 0,
      rating: 4.5, // Default rating
      specifications: productData.specifications || {},
      featured: productData.featured || false,
    })

    return NextResponse.json({
      success: true,
      product,
      message: "Product created successfully",
    })
  } catch (error) {
    console.error("Create product error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
