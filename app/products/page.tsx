"use client"

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Filter, Grid, List, Star, ShoppingCart, Eye, Package } from "lucide-react"
// Fix the import path for useCart
import { useCart } from "@/lib/cart-context"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

// Remove the static products array and replace with:
const categories = [
  "All Categories",
  "Nuts & Seeds",
  "Organic Products",
  "Herbs & Spices",
  "Dried Fruits",
  "Mineral Resources",
  "Animal Products",
]

const ProductsPage = () => {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { dispatch } = useCart() // Declare useCart

  // Add useEffect to fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products")
        const data = await response.json()
        setProducts(data.products || [])
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [showInStockOnly, setShowInStockOnly] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null)

  const addToCart = (product: any) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        unit: product.unit,
        image: product.image,
        category: product.category,
        inStock: product.inStock,
      },
    })
  }

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory
      const matchesFeatured = !showFeaturedOnly || product.featured
      const matchesStock = !showInStockOnly || product.inStock

      return matchesSearch && matchesCategory && matchesFeatured && matchesStock
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        default:
          return 0
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, sortBy, showFeaturedOnly, showInStockOnly, products])

  const ProductCard = ({ product }: { product: any }) => (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${!product.inStock ? "opacity-75" : ""}`}>
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            <Badge className="bg-green-600">{product.category}</Badge>
            {product.featured && <Badge variant="secondary">Featured</Badge>}
            {!product.inStock && <Badge variant="destructive">Out of Stock</Badge>}
          </div>
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 rounded px-2 py-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{product.rating}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2 line-clamp-1">{product.name}</CardTitle>
        <CardDescription className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</CardDescription>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-green-700">${product.price}</span>
            <span className="text-sm text-gray-500 ml-1">{product.unit}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1" onClick={() => setSelectedProduct(product)}>
                <Eye className="h-4 w-4 mr-1" />
                View Details
              </Button>
            </DialogTrigger>
          </Dialog>
          <Button
            size="sm"
            className="flex-1 bg-green-700 hover:bg-green-800"
            disabled={!product.inStock}
            onClick={() => addToCart(product)}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const ProductListItem = ({ product }: { product: any }) => (
    <Card className={`hover:shadow-md transition-shadow duration-300 ${!product.inStock ? "opacity-75" : ""}`}>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative flex-shrink-0">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={120}
              height={120}
              className="w-24 h-24 object-cover rounded-lg"
              loading="lazy"
              sizes="(max-width: 640px) 96px, 120px"
            />
            {!product.inStock && (
              <Badge variant="destructive" className="absolute -top-1 -right-1 text-xs">
                Out of Stock
              </Badge>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-green-600 text-xs">{product.category}</Badge>
                  {product.featured && (
                    <Badge variant="secondary" className="text-xs">
                      Featured
                    </Badge>
                  )}
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs">{product.rating}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-green-700">${product.price}</div>
                <div className="text-sm text-gray-500">{product.unit}</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" onClick={() => setSelectedProduct(product)}>
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </DialogTrigger>
              </Dialog>
              <Button
                size="sm"
                className="bg-green-700 hover:bg-green-800"
                disabled={!product.inStock}
                onClick={() => addToCart(product)}
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  // Add loading state in the component return
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
              <p className="text-gray-600 mt-1">Premium Nigerian agricultural exports</p>
            </div>
            <Link href="/">
              <Button variant="outline">← Back to Home</Button>
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode & Filters */}
            <div className="flex gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden">
                    <Filter className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>Filter products by your preferences</SheetDescription>
                  </SheetHeader>
                  <div className="space-y-4 mt-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="featured" checked={showFeaturedOnly} onCheckedChange={setShowFeaturedOnly} />
                      <label htmlFor="featured" className="text-sm">
                        Featured products only
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="instock" checked={showInStockOnly} onCheckedChange={setShowInStockOnly} />
                      <label htmlFor="instock" className="text-sm">
                        In stock only
                      </label>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <div className="hidden lg:flex items-center gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="featured-desktop" checked={showFeaturedOnly} onCheckedChange={setShowFeaturedOnly} />
                  <label htmlFor="featured-desktop" className="text-sm">
                    Featured
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="instock-desktop" checked={showInStockOnly} onCheckedChange={setShowInStockOnly} />
                  <label htmlFor="instock-desktop" className="text-sm">
                    In Stock
                  </label>
                </div>
              </div>

              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <ProductListItem key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Update the empty state message */}
        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {products.length === 0 ? "No products available yet." : "No products found matching your criteria."}
            </p>
            {products.length === 0 ? (
              <p className="text-gray-400 text-sm mt-2">Products will appear here once added by administrators.</p>
            ) : (
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All Categories")
                  setShowFeaturedOnly(false)
                  setShowInStockOnly(false)
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedProduct.name}</DialogTitle>
              <DialogDescription>
                <Badge className="bg-green-600 mr-2">{selectedProduct.category}</Badge>
                {selectedProduct.featured && <Badge variant="secondary">Featured Product</Badge>}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Image
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  width={400}
                  height={400}
                  className="w-full h-80 object-cover rounded-lg"
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{selectedProduct.rating}</span>
                  </div>
                  <span className="text-gray-500">•</span>
                  <span className={`text-sm ${selectedProduct.inStock ? "text-green-600" : "text-red-600"}`}>
                    {selectedProduct.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                <p className="text-gray-700 mb-6">{selectedProduct.description}</p>

                <div className="mb-6">
                  <div className="text-3xl font-bold text-green-700 mb-1">${selectedProduct.price}</div>
                  <div className="text-gray-500">{selectedProduct.unit}</div>
                </div>

                <div className="space-y-4 mb-6">
                  <h4 className="font-semibold text-lg">Specifications</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-green-700 hover:bg-green-800"
                    disabled={!selectedProduct.inStock}
                    onClick={() => addToCart(selectedProduct)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {selectedProduct.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                  <Button variant="outline">Request Quote</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      <Footer />
    </div>
  )
}

export default ProductsPage
