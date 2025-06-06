import { MongoClient, type Db } from "mongodb"

// Connection URI
const uri = process.env.MONGODB_URI || ""
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local or environment variables with key "MONGODB_URI"')
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise

// Helper function to connect to the database
export async function connectToDatabase() {
  try {
    const client = await clientPromise
    const db = client.db("chuzol_global")
    return { client, db }
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error)
    throw new Error("Failed to connect to database")
  }
}

// Helper function to get the database instance
export async function getDatabase(): Promise<Db> {
  const { db } = await connectToDatabase()
  return db
}
