"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Eye, MoreHorizontal, Package, Truck, CheckCircle, Clock, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "processing":
      return "bg-blue-100 text-blue-800"
    case "shipped":
      return "bg-purple-100 text-purple-800"
    case "delivered":
      return "bg-green-100 text-green-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <Clock className="h-4 w-4" />
    case "processing":
      return <Package className="h-4 w-4" />
    case "shipped":
      return <Truck className="h-4 w-4" />
    case "delivered":
      return <CheckCircle className="h-4 w-4" />
    case "cancelled":
      return <AlertCircle className="h-4 w-4" />
    default:
      return <Clock className="h-4 w-4" />
  }
}

const statusOptions = ["All Status", "pending", "processing", "shipped", "delivered", "cancelled"]

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All Status")

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/orders")

      if (!response.ok) {
        const errorText = await response.text()
        console.error("API Error Response:", errorText)
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("Orders API response:", data)

      // Ensure we always set an array
      const ordersArray = Array.isArray(data.orders) ? data.orders : []
      setOrders(ordersArray)
    } catch (error) {
      console.error("Error fetching orders:", error)
      setError(error instanceof Error ? error.message : "Failed to fetch orders")
      setOrders([]) // Ensure orders is always an array
    } finally {
      setLoading(false)
    }
  }

  // Ensure orders is always an array before filtering
  const safeOrders = Array.isArray(orders) ? orders : []

  const filteredOrders = safeOrders.filter((order) => {
    if (!order) return false

    const matchesSearch =
      (order.orderNumber || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.customerEmail || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.customerName || "").toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "All Status" || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      const data = await response.json()

      if (data.success) {
        await fetchOrders() // Refresh the list
      } else {
        console.error("Error updating order:", data.error)
        setError("Failed to update order status")
      }
    } catch (error) {
      console.error("Error updating order:", error)
      setError("Failed to update order status")
    }
  }

  const seedSampleOrders = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/orders/seed")

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("Seed response:", data)

      // Refresh orders list
      await fetchOrders()
    } catch (error) {
      console.error("Error seeding orders:", error)
      setError(error instanceof Error ? error.message : "Failed to seed sample orders")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600">Manage customer orders and track shipments</p>
        </div>
        <Button onClick={seedSampleOrders} className="bg-green-700 hover:bg-green-800">
          Add Sample Orders
        </Button>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-red-800">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search orders by number, customer email, or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === "All Status" ? status : status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={fetchOrders}>
              <Filter className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders ({filteredOrders.length})</CardTitle>
          <CardDescription>A list of all customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                {safeOrders.length === 0 ? "No orders found" : "No orders match your search"}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                {safeOrders.length === 0
                  ? "Orders will appear here when customers place them."
                  : "Try adjusting your search criteria."}
              </p>
              <Button onClick={seedSampleOrders} variant="outline" className="mt-4">
                Add Sample Orders
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order Number</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Tracking</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order._id || order.id || Math.random().toString()}>
                    <TableCell className="font-mono text-sm">{order.orderNumber || "N/A"}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customerName || "Unknown"}</div>
                        <div className="text-sm text-gray-500">{order.customerEmail || "No email"}</div>
                      </div>
                    </TableCell>
                    <TableCell>{order.items?.length || 0} items</TableCell>
                    <TableCell>${order.total?.toFixed(2) || "0.00"}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status || "pending")} variant="secondary">
                        <span className="flex items-center gap-1">
                          {getStatusIcon(order.status || "pending")}
                          {(order.status || "pending").charAt(0).toUpperCase() + (order.status || "pending").slice(1)}
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}</TableCell>
                    <TableCell className="font-mono text-sm">{order.trackingNumber || "N/A"}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusUpdate(order._id || order.id, "processing")}>
                            <Package className="mr-2 h-4 w-4" />
                            Mark as Processing
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusUpdate(order._id || order.id, "shipped")}>
                            <Truck className="mr-2 h-4 w-4" />
                            Mark as Shipped
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusUpdate(order._id || order.id, "delivered")}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark as Delivered
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
