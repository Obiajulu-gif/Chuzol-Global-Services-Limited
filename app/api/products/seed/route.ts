import { NextResponse } from "next/server"
import { productDb } from "@/lib/database"

const sampleProducts = [
  {
    name: "Premium Bitter Kola",
    category: "Nuts & Seeds",
    price: 25.0,
    unit: "per kg",
    image: "/images/bitter-kola.png",
    description:
      "High-quality bitter kola nuts sourced directly from Nigerian farms. Known for their medicinal properties and cultural significance.",
    specifications: {
      Origin: "Nigeria",
      "Moisture Content": "< 12%",
      Purity: "99%",
      "Shelf Life": "24 months",
      Packaging: "Vacuum sealed bags",
    },
    inStock: true,
    featured: true,
    rating: 4.8,
    sku: "BK-001",
    stock: 500,
    status: "active" as const,
  },
  {
    name: "Organic Shea Butter",
    category: "Organic Products",
    price: 18.5,
    unit: "per kg",
    image: "/images/shea-butter.png",
    description: "Pure, unrefined shea butter from Ghana. Perfect for cosmetic and skincare applications.",
    specifications: {
      Origin: "Ghana",
      "Moisture Content": "< 8%",
      Purity: "100% Pure",
      "Shelf Life": "36 months",
      Packaging: "Food-grade containers",
    },
    inStock: true,
    featured: true,
    rating: 4.9,
    sku: "SB-001",
    stock: 300,
    status: "active" as const,
  },
  {
    name: "Premium Cashew Nuts",
    category: "Nuts & Seeds",
    price: 32.0,
    unit: "per kg",
    image: "/images/cashew-nuts.png",
    description: "Grade A cashew nuts from Ivory Coast. Perfectly roasted and ready for export.",
    specifications: {
      Origin: "Ivory Coast",
      "Moisture Content": "< 5%",
      Purity: "98%",
      "Shelf Life": "12 months",
      Packaging: "Nitrogen flushed bags",
    },
    inStock: true,
    featured: true,
    rating: 4.7,
    sku: "CN-001",
    stock: 200,
    status: "active" as const,
  },
  {
    name: "Dried Hibiscus Flowers",
    category: "Herbs & Spices",
    price: 12.75,
    unit: "per kg",
    image: "/images/hibiscus.png",
    description: "Premium dried hibiscus flowers perfect for teas and natural beverages.",
    specifications: {
      Origin: "Sudan",
      "Moisture Content": "< 10%",
      Purity: "95%",
      "Shelf Life": "18 months",
      Packaging: "Moisture-proof bags",
    },
    inStock: true,
    featured: false,
    rating: 4.6,
    sku: "HF-001",
    stock: 150,
    status: "active" as const,
  },
]

export async function POST() {
  try {
    // Check if products already exist
    const existingProducts = await productDb.getAll()
    if (existingProducts.length > 0) {
      return NextResponse.json({
        message: "Products already exist in database",
        count: existingProducts.length,
      })
    }

    // Create sample products
    const createdProducts = []
    for (const productData of sampleProducts) {
      const product = await productDb.create(productData)
      createdProducts.push(product)
    }

    return NextResponse.json({
      success: true,
      message: `Successfully created ${createdProducts.length} sample products`,
      products: createdProducts,
    })
  } catch (error) {
    console.error("Error seeding products:", error)
    return NextResponse.json({ error: "Failed to seed products" }, { status: 500 })
  }
}
