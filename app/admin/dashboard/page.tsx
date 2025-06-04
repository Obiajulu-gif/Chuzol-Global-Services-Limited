"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  TrendingUp,
  TrendingDown,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  Eye,
  MoreHorizontal,
  Plus,
  Upload,
  X,
  ImageIcon,
  Loader2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data
const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up" as const,
    icon: DollarSign,
  },
  {
    title: "Orders",
    value: "2,350",
    change: "+180.1%",
    trend: "up" as const,
    icon: ShoppingCart,
  },
  {
    title: "Products",
    value: "12,234",
    change: "+19%",
    trend: "up" as const,
    icon: Package,
  },
  {
    title: "Active Customers",
    value: "573",
    change: "+201",
    trend: "up" as const,
    icon: Users,
  },
]

const recentOrders = [
  {
    id: "CHZ-001",
    customer: "John Doe",
    product: "Premium Bitter Kola",
    amount: "$250.00",
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "CHZ-002",
    customer: "Jane Smith",
    product: "Organic Shea Butter",
    amount: "$185.50",
    status: "processing",
    date: "2024-01-15",
  },
  {
    id: "CHZ-003",
    customer: "Mike Johnson",
    product: "Premium Cashew Nuts",
    amount: "$320.00",
    status: "shipped",
    date: "2024-01-14",
  },
  {
    id: "CHZ-004",
    customer: "Sarah Wilson",
    product: "Dried Hibiscus Flowers",
    amount: "$127.75",
    status: "pending",
    date: "2024-01-14",
  },
  {
    id: "CHZ-005",
    customer: "David Brown",
    product: "Tiger Nuts",
    amount: "$220.00",
    status: "completed",
    date: "2024-01-13",
  },
]

const topProducts = [
  { name: "Premium Bitter Kola", sales: 234, revenue: "$5,850", growth: 12 },
  { name: "Organic Shea Butter", sales: 189, revenue: "$3,496.50", growth: 8 },
  { name: "Premium Cashew Nuts", sales: 156, revenue: "$4,992", growth: 15 },
  { name: "Dried Hibiscus Flowers", sales: 143, revenue: "$1,823.25", growth: -3 },
  { name: "Tiger Nuts", sales: 98, revenue: "$2,156", growth: 22 },
]

const categories = [
  "Nuts & Seeds",
  "Organic Products",
  "Herbs & Spices",
  "Dried Fruits",
  "Mineral Resources",
  "Animal Products",
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800"
    case "processing":
      return "bg-blue-100 text-blue-800"
    case "shipped":
      return "bg-purple-100 text-purple-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

// Sample product images for selection
const sampleProductImages = [
  { name: "Bitter Kola", path: "/images/bitter-kola.png" },
  { name: "Shea Butter", path: "/images/shea-butter.png" },
  { name: "Cashew Nuts", path: "/images/cashew-nuts.png" },
  { name: "Hibiscus", path: "/images/hibiscus.png" },
]

export default function AdminDashboard() {
  const router = useRouter()
  const [timeRange, setTimeRange] = useState("7d")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string>("")
  const [imageSource, setImageSource] = useState<"upload" | "url" | "sample">("upload")
  const [selectedSampleImage, setSelectedSampleImage] = useState<string>("")
  const [uploadingImage, setUploadingImage] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    unit: "per kg",
    stock: "",
    description: "",
    sku: "",
    specifications: {
      Origin: "",
      "Moisture Content": "",
      Purity: "",
      "Shelf Life": "",
      Packaging: "",
    },
    featured: false,
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Only JPEG, PNG, and WebP are allowed.")
      return
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      toast.error("File too large. Maximum size is 5MB.")
      return
    }

    setSelectedImage(file)

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setImagePreview(result)
    }
    reader.readAsDataURL(file)

    // Upload file to Vercel Blob
    setUploadingImage(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setImageUrl(data.imageUrl) // This will now be the full Vercel Blob URL
        toast.success("Image uploaded successfully to cloud storage!")
      } else {
        toast.error(data.error || "Upload failed")
        setSelectedImage(null)
        setImagePreview(null)
      }
    } catch (error) {
      console.error("Upload error:", error)
      toast.error("Upload failed. Please try again.")
      setSelectedImage(null)
      setImagePreview(null)
    } finally {
      setUploadingImage(false)
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value)
    setImagePreview(e.target.value)
  }

  const handleSampleImageSelect = (path: string) => {
    setSelectedSampleImage(path)
    setImagePreview(path)
    setImageUrl(path)
  }

  const getImageForProduct = () => {
    if (imageSource === "upload" && imageUrl) {
      return imageUrl // Full Vercel Blob URL
    } else if (imageSource === "url" && imageUrl) {
      return imageUrl // External URL
    } else if (imageSource === "sample" && selectedSampleImage) {
      return selectedSampleImage // Local sample image
    }
    return "/placeholder.svg?height=300&width=300&text=Product+Image"
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    setImageUrl("")
    setSelectedSampleImage("")
  }

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.stock || !newProduct.sku) {
      toast.error("Please fill in all required fields")
      return
    }

    if (!imageUrl && !selectedSampleImage) {
      toast.error("Please add a product image")
      return
    }

    setIsLoading(true)

    try {
      const productData = {
        ...newProduct,
        image: getImageForProduct(),
      }

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      })

      const data = await response.json()

      if (data.success) {
        toast.success("Product added successfully!")
        setNewProduct({
          name: "",
          category: "",
          price: "",
          unit: "per kg",
          stock: "",
          description: "",
          sku: "",
          specifications: {
            Origin: "",
            "Moisture Content": "",
            Purity: "",
            "Shelf Life": "",
            Packaging: "",
          },
          featured: false,
        })
        setSelectedImage(null)
        setImagePreview(null)
        setImageUrl("")
        setSelectedSampleImage("")
        setIsAddProductOpen(false)
      } else {
        toast.error(data.error || "Failed to add product")
      }
    } catch (error) {
      console.error("Error adding product:", error)
      toast.error("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "add-product":
        setIsAddProductOpen(true)
        break
      case "process-orders":
        router.push("/admin/orders")
        break
      case "manage-customers":
        router.push("/admin/customers")
        break
      default:
        break
    }
  }

  const handleViewOrder = (orderId: string) => {
    toast.info(`Viewing order ${orderId}`)
  }

  const handleUpdateOrderStatus = (orderId: string) => {
    toast.info(`Updating status for order ${orderId}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => toast.info("Exporting data...")}>
            Export Data
          </Button>
          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-700 hover:bg-green-800">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>Add a new product to your catalog from the dashboard</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Image Upload Section */}
                <div>
                  <Label className="text-base font-semibold">Product Image *</Label>
                  <Tabs defaultValue="upload" className="mt-2" onValueChange={(value) => setImageSource(value as any)}>
                    <TabsList className="grid grid-cols-3 mb-4">
                      <TabsTrigger value="upload">Upload Image</TabsTrigger>
                      <TabsTrigger value="url">Image URL</TabsTrigger>
                      <TabsTrigger value="sample">Sample Images</TabsTrigger>
                    </TabsList>
                    <TabsContent value="upload">
                      <div className="flex items-center space-x-4">
                        {imagePreview && imageSource === "upload" ? (
                          <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg">
                            <img
                              src={imagePreview || "/placeholder.svg"}
                              alt="Product preview"
                              className="w-full h-full object-cover rounded-lg"
                            />
                            {uploadingImage && (
                              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                                <Loader2 className="h-6 w-6 text-white animate-spin" />
                              </div>
                            )}
                            <button
                              onClick={removeImage}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                              disabled={uploadingImage}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-green-400 transition-colors">
                            <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                              {uploadingImage ? (
                                <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
                              ) : (
                                <Upload className="h-8 w-8 text-gray-400" />
                              )}
                              <span className="text-sm text-gray-500 mt-1">
                                {uploadingImage ? "Uploading..." : "Upload Image"}
                              </span>
                            </label>
                            <input
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              disabled={uploadingImage}
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 mb-2">
                            Upload a high-quality image of your product. Recommended size: 800x800px.
                          </p>
                          <p className="text-xs text-gray-500">
                            Supported formats: JPG, PNG, WebP. Maximum file size: 5MB.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="url">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          {imageUrl && imageSource === "url" ? (
                            <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg">
                              <img
                                src={imageUrl || "/placeholder.svg"}
                                alt="Product preview"
                                className="w-full h-full object-cover rounded-lg"
                              />
                              <button
                                onClick={() => {
                                  setImageUrl("")
                                  setImagePreview(null)
                                }}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ) : (
                            <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                              <ImageIcon className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                          <div className="flex-1">
                            <Input
                              placeholder="Enter image URL (https://...)"
                              value={imageUrl}
                              onChange={handleUrlChange}
                            />
                            <p className="text-xs text-gray-500 mt-2">
                              Enter a direct link to an image. Make sure the URL starts with https:// and points
                              directly to an image file.
                            </p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="sample">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {sampleProductImages.map((img) => (
                          <div
                            key={img.path}
                            className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
                              selectedSampleImage === img.path ? "border-green-500" : "border-transparent"
                            }`}
                            onClick={() => handleSampleImageSelect(img.path)}
                          >
                            <Image
                              src={img.path || "/placeholder.svg"}
                              alt={img.name}
                              width={120}
                              height={120}
                              className="w-full h-24 object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              <span className="text-white text-sm font-medium">{img.name}</span>
                            </div>
                            {selectedSampleImage === img.path && (
                              <div className="absolute top-1 right-1 bg-green-500 rounded-full p-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3 w-3 text-white"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Select a sample image from our library. These are optimized for the product catalog.
                      </p>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sku">SKU *</Label>
                    <Input
                      id="sku"
                      value={newProduct.sku}
                      onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                      placeholder="Enter SKU"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={newProduct.category}
                      onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="price">Price ($) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Unit</Label>
                    <Select
                      value={newProduct.unit}
                      onValueChange={(value) => setNewProduct({ ...newProduct, unit: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="per kg">per kg</SelectItem>
                        <SelectItem value="per piece">per piece</SelectItem>
                        <SelectItem value="per 100g">per 100g</SelectItem>
                        <SelectItem value="per ton">per ton</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="stock">Stock Quantity *</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    placeholder="Enter product description"
                    rows={3}
                  />
                </div>

                {/* Specifications */}
                <div>
                  <Label className="text-base font-semibold">Specifications</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {Object.entries(newProduct.specifications).map(([key, value]) => (
                      <div key={key}>
                        <Label htmlFor={key}>{key}</Label>
                        <Input
                          id={key}
                          value={value}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              specifications: {
                                ...newProduct.specifications,
                                [key]: e.target.value,
                              },
                            })
                          }
                          placeholder={`Enter ${key.toLowerCase()}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Featured Product Toggle */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={newProduct.featured}
                    onChange={(e) => setNewProduct({ ...newProduct, featured: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="featured">Featured Product</Label>
                </div>

                {/* Preview */}
                <div>
                  <Label className="text-base font-semibold">Product Preview</Label>
                  <div className="mt-2 border rounded-lg p-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={getImageForProduct() || "/placeholder.svg"}
                          alt="Product preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">
                          {newProduct.name || "Product Name"}
                          {newProduct.featured && (
                            <Badge variant="secondary" className="ml-2">
                              Featured
                            </Badge>
                          )}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {newProduct.description || "Product description will appear here..."}
                        </p>
                        <div className="mt-2">
                          <span className="font-bold text-green-700">
                            ${newProduct.price || "0.00"} <span className="text-sm font-normal">{newProduct.unit}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleAddProduct}
                  className="bg-green-700 hover:bg-green-800"
                  disabled={isLoading || uploadingImage}
                >
                  {isLoading ? "Adding..." : "Add Product"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.trend === "up" ? (
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                )}
                <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from your customers</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)} variant="secondary">
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.amount}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewOrder(order.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateOrderStatus(order.id)}>
                            Update Status
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Sending invoice for ${order.id}`)}>
                            Send Invoice
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best performing products this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-green-700">{index + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                  <p className="text-xs text-gray-500">
                    {product.sales} sales • {product.revenue}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16">
                    <Progress value={Math.abs(product.growth) * 5} className="h-2" />
                  </div>
                  <span className={`text-xs font-medium ${product.growth > 0 ? "text-green-600" : "text-red-600"}`}>
                    {product.growth > 0 ? "+" : ""}
                    {product.growth}%
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-green-50 hover:border-green-200 transition-colors"
              onClick={() => handleQuickAction("add-product")}
            >
              <Package className="h-6 w-6" />
              <span>Add New Product</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-blue-50 hover:border-blue-200 transition-colors"
              onClick={() => handleQuickAction("process-orders")}
            >
              <ShoppingCart className="h-6 w-6" />
              <span>Process Orders</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-purple-50 hover:border-purple-200 transition-colors"
              onClick={() => handleQuickAction("manage-customers")}
            >
              <Users className="h-6 w-6" />
              <span>Manage Customers</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
