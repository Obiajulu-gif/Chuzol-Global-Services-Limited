import { getDatabase } from "./mongodb"
import { ObjectId } from "mongodb"

export interface Admin {
  _id?: ObjectId
  id?: string
  email: string
  password: string
  name: string
  role: "admin" | "manager" | "staff"
  createdAt: string
  updatedAt: string
}

export interface Product {
  _id?: ObjectId
  id?: number
  name: string
  category: string
  price: number
  unit: string
  image: string
  description: string
  specifications: Record<string, string>
  inStock: boolean
  featured: boolean
  rating: number
  sku: string
  stock: number
  createdAt: string
  updatedAt: string
  status: "active" | "out_of_stock" | "low_stock"
}

export interface Order {
  _id?: ObjectId
  id?: string
  customer: {
    name: string
    email: string
    phone: string
  }
  items: Array<{
    id: number
    name: string
    quantity: number
    price: number
  }>
  total: number
  status: "pending" | "processing" | "shipped" | "completed" | "cancelled"
  paymentStatus: "pending" | "paid" | "failed"
  shippingAddress: string
  orderDate: string
  shippedDate: string | null
  trackingNumber: string | null
}

export interface Customer {
  _id?: ObjectId
  id?: number
  name: string
  email: string
  phone: string
  totalOrders: number
  totalSpent: number
  lastOrder: string
  status: "active" | "inactive" | "vip"
  joinDate: string
  location: string
}

export interface PasswordResetToken {
  _id?: ObjectId
  id?: string
  email: string
  token: string
  expiresAt: string
  used: boolean
  createdAt: string
}

// Admin operations
export const adminDb = {
  findByEmail: async (email: string): Promise<Admin | null> => {
    const db = await getDatabase()
    return await db.collection<Admin>("admins").findOne({ email })
  },

  findById: async (id: string): Promise<Admin | null> => {
    const db = await getDatabase()
    return await db.collection<Admin>("admins").findOne({ _id: new ObjectId(id) })
  },

  create: async (adminData: Omit<Admin, "_id" | "createdAt" | "updatedAt">): Promise<Admin> => {
    const db = await getDatabase()
    const admin: Admin = {
      ...adminData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const result = await db.collection<Admin>("admins").insertOne(admin)
    return { ...admin, _id: result.insertedId }
  },

  update: async (id: string, updates: Partial<Omit<Admin, "_id" | "createdAt">>): Promise<Admin | null> => {
    const db = await getDatabase()
    const result = await db.collection<Admin>("admins").findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updates,
          updatedAt: new Date().toISOString(),
        },
      },
      { returnDocument: "after" },
    )
    return result.value
  },

  updatePassword: async (email: string, newPassword: string): Promise<boolean> => {
    const db = await getDatabase()
    const result = await db.collection<Admin>("admins").updateOne(
      { email },
      {
        $set: {
          password: newPassword, // In production, hash this
          updatedAt: new Date().toISOString(),
        },
      },
    )
    return result.modifiedCount > 0
  },

  getAll: async (): Promise<Admin[]> => {
    const db = await getDatabase()
    return await db.collection<Admin>("admins").find({}).toArray()
  },
}

// Product operations
export const productDb = {
  getAll: async (): Promise<Product[]> => {
    const db = await getDatabase()
    return await db.collection<Product>("products").find({}).sort({ createdAt: -1 }).toArray()
  },

  findById: async (id: string): Promise<Product | null> => {
    const db = await getDatabase()
    return await db.collection<Product>("products").findOne({ _id: new ObjectId(id) })
  },

  create: async (productData: Omit<Product, "_id" | "createdAt" | "updatedAt">): Promise<Product> => {
    const db = await getDatabase()
    const stock = Number.parseInt(productData.stock.toString())
    let status = "active"

    if (stock === 0) {
      status = "out_of_stock"
    } else if (stock < 10) {
      status = "low_stock"
    }

    const product: Product = {
      ...productData,
      stock,
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const result = await db.collection<Product>("products").insertOne(product)
    return { ...product, _id: result.insertedId }
  },

  update: async (id: string, updates: Partial<Omit<Product, "_id" | "createdAt">>): Promise<Product | null> => {
    const db = await getDatabase()

    // Handle stock and status updates
    if (updates.stock !== undefined) {
      const stock = Number.parseInt(updates.stock.toString())
      updates.stock = stock

      if (stock === 0) {
        updates.status = "out_of_stock"
      } else if (stock < 10) {
        updates.status = "low_stock"
      } else {
        updates.status = "active"
      }
    }

    const result = await db.collection<Product>("products").findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updates,
          updatedAt: new Date().toISOString(),
        },
      },
      { returnDocument: "after" },
    )
    return result.value
  },

  delete: async (id: string): Promise<boolean> => {
    const db = await getDatabase()
    const result = await db.collection<Product>("products").deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount > 0
  },

  getFeatured: async (): Promise<Product[]> => {
    const db = await getDatabase()
    return await db.collection<Product>("products").find({ featured: true }).toArray()
  },

  getByCategory: async (category: string): Promise<Product[]> => {
    const db = await getDatabase()
    return await db.collection<Product>("products").find({ category }).toArray()
  },
}

// Order operations
export const orderDb = {
  getAll: async (): Promise<Order[]> => {
    const db = await getDatabase()
    return await db.collection<Order>("orders").find({}).sort({ orderDate: -1 }).toArray()
  },

  findById: async (id: string): Promise<Order | null> => {
    const db = await getDatabase()
    return await db.collection<Order>("orders").findOne({ id })
  },

  create: async (orderData: Omit<Order, "_id" | "id" | "orderDate">): Promise<Order> => {
    const db = await getDatabase()
    const order: Order = {
      ...orderData,
      id: `CHZ-${Date.now().toString().slice(-6)}`,
      orderDate: new Date().toISOString().split("T")[0],
    }
    const result = await db.collection<Order>("orders").insertOne(order)
    return { ...order, _id: result.insertedId }
  },

  update: async (id: string, updates: Partial<Omit<Order, "_id" | "id" | "orderDate">>): Promise<Order | null> => {
    const db = await getDatabase()
    const result = await db
      .collection<Order>("orders")
      .findOneAndUpdate({ id }, { $set: updates }, { returnDocument: "after" })
    return result.value
  },

  getByStatus: async (status: Order["status"]): Promise<Order[]> => {
    const db = await getDatabase()
    return await db.collection<Order>("orders").find({ status }).toArray()
  },
}

// Customer operations
export const customerDb = {
  getAll: async (): Promise<Customer[]> => {
    const db = await getDatabase()
    return await db.collection<Customer>("customers").find({}).sort({ joinDate: -1 }).toArray()
  },

  findById: async (id: string): Promise<Customer | null> => {
    const db = await getDatabase()
    return await db.collection<Customer>("customers").findOne({ _id: new ObjectId(id) })
  },

  findByEmail: async (email: string): Promise<Customer | null> => {
    const db = await getDatabase()
    return await db.collection<Customer>("customers").findOne({ email })
  },

  create: async (customerData: Omit<Customer, "_id" | "joinDate">): Promise<Customer> => {
    const db = await getDatabase()
    const customer: Customer = {
      ...customerData,
      joinDate: new Date().toISOString().split("T")[0],
    }
    const result = await db.collection<Customer>("customers").insertOne(customer)
    return { ...customer, _id: result.insertedId }
  },

  update: async (id: string, updates: Partial<Omit<Customer, "_id" | "joinDate">>): Promise<Customer | null> => {
    const db = await getDatabase()
    const result = await db
      .collection<Customer>("customers")
      .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updates }, { returnDocument: "after" })
    return result.value
  },
}

// Password reset token operations
export const passwordResetDb = {
  create: async (email: string): Promise<PasswordResetToken> => {
    const db = await getDatabase()
    const token: PasswordResetToken = {
      email,
      token: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour
      used: false,
      createdAt: new Date().toISOString(),
    }
    const result = await db.collection<PasswordResetToken>("password_reset_tokens").insertOne(token)
    return { ...token, _id: result.insertedId }
  },

  findByToken: async (token: string): Promise<PasswordResetToken | null> => {
    const db = await getDatabase()
    return await db.collection<PasswordResetToken>("password_reset_tokens").findOne({
      token,
      used: false,
      expiresAt: { $gt: new Date().toISOString() },
    })
  },

  markAsUsed: async (token: string): Promise<boolean> => {
    const db = await getDatabase()
    const result = await db
      .collection<PasswordResetToken>("password_reset_tokens")
      .updateOne({ token }, { $set: { used: true } })
    return result.modifiedCount > 0
  },

  cleanup: async (): Promise<void> => {
    const db = await getDatabase()
    await db.collection<PasswordResetToken>("password_reset_tokens").deleteMany({
      $or: [{ expiresAt: { $lt: new Date().toISOString() } }, { used: true }],
    })
  },
}

// Initialize database with sample data
export const initializeDatabase = async () => {
  try {
    const db = await getDatabase()

    // Check if admins exist, if not create default ones
    const adminCount = await db.collection("admins").countDocuments()
    if (adminCount === 0) {
      // No hardcoded credentials - use environment variables or setup page
      console.log("No admin accounts found. Please use the setup page to create the first admin account.")
    }

    // Check if customers exist, if not create sample ones
    const customerCount = await db.collection("customers").countDocuments()
    if (customerCount === 0) {
      await db.collection("customers").insertMany([
        {
          name: "John Doe",
          email: "john@example.com",
          phone: "+1 234 567 8900",
          totalOrders: 12,
          totalSpent: 1250.89,
          lastOrder: "2024-01-15",
          status: "active",
          joinDate: "2023-06-15",
          location: "New York, USA",
        },
        {
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "+1 234 567 8901",
          totalOrders: 8,
          totalSpent: 890.45,
          lastOrder: "2024-01-14",
          status: "active",
          joinDate: "2023-08-22",
          location: "Los Angeles, USA",
        },
      ])
    }

    console.log("Database initialized successfully")
  } catch (error) {
    console.error("Error initializing database:", error)
  }
}
