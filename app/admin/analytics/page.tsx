"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package, Calendar, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock analytics data
const salesData = {
  "7d": {
    revenue: 12450.89,
    orders: 156,
    customers: 89,
    avgOrderValue: 79.81,
    growth: {
      revenue: 12.5,
      orders: 8.3,
      customers: 15.2,
      avgOrderValue: 4.1,
    },
  },
  "30d": {
    revenue: 45231.89,
    orders: 567,
    customers: 234,
    avgOrderValue: 79.81,
    growth: {
      revenue: 20.1,
      orders: 18.5,
      customers: 12.8,
      avgOrderValue: 1.4,
    },
  },
  "90d": {
    revenue: 128450.67,
    orders: 1456,
    customers: 678,
    avgOrderValue: 88.23,
    growth: {
      revenue: 25.3,
      orders: 22.1,
      customers: 18.9,
      avgOrderValue: 3.2,
    },
  },
}

const topProducts = [
  { name: "Premium Bitter Kola", sales: 234, revenue: 5850, growth: 12 },
  { name: "Organic Shea Butter", sales: 189, revenue: 3496.5, growth: 8 },
  { name: "Premium Cashew Nuts", sales: 156, revenue: 4992, growth: 15 },
  { name: "Dried Hibiscus Flowers", sales: 143, revenue: 1823.25, growth: -3 },
  { name: "Tiger Nuts", sales: 98, revenue: 2156, growth: 22 },
]

const customerSegments = [
  { segment: "New Customers", count: 145, percentage: 35, revenue: 12450 },
  { segment: "Returning Customers", count: 189, percentage: 45, revenue: 23890 },
  { segment: "VIP Customers", count: 34, percentage: 20, revenue: 18900 },
]

const recentActivity = [
  { type: "order", description: "New order #CHZ-156 from John Doe", time: "2 minutes ago" },
  { type: "customer", description: "New customer registration: Jane Smith", time: "15 minutes ago" },
  { type: "product", description: "Low stock alert: Premium Cashew Nuts", time: "1 hour ago" },
  { type: "order", description: "Order #CHZ-155 shipped to Mike Johnson", time: "2 hours ago" },
  { type: "review", description: "New 5-star review for Organic Shea Butter", time: "3 hours ago" },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")
  const currentData = salesData[timeRange as keyof typeof salesData]

  const stats = [
    {
      title: "Total Revenue",
      value: `$${currentData.revenue.toLocaleString()}`,
      change: `+${currentData.growth.revenue}%`,
      trend: "up" as const,
      icon: DollarSign,
    },
    {
      title: "Orders",
      value: currentData.orders.toLocaleString(),
      change: `+${currentData.growth.orders}%`,
      trend: "up" as const,
      icon: ShoppingCart,
    },
    {
      title: "Customers",
      value: currentData.customers.toLocaleString(),
      change: `+${currentData.growth.customers}%`,
      trend: "up" as const,
      icon: Users,
    },
    {
      title: "Avg Order Value",
      value: `$${currentData.avgOrderValue.toFixed(2)}`,
      change: `+${currentData.growth.avgOrderValue}%`,
      trend: "up" as const,
      icon: Package,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Track your business performance and insights</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
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
                <span className="ml-1">from last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best performing products by sales</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Growth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product, index) => (
                  <TableRow key={product.name}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-green-700">{index + 1}</span>
                        </div>
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{product.sales}</TableCell>
                    <TableCell>${product.revenue.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className={`text-sm font-medium ${product.growth > 0 ? "text-green-600" : "text-red-600"}`}>
                        {product.growth > 0 ? "+" : ""}
                        {product.growth}%
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Customer Segments */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Segments</CardTitle>
            <CardDescription>Customer distribution and revenue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {customerSegments.map((segment) => (
              <div key={segment.segment} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{segment.segment}</span>
                  <span className="text-sm text-gray-500">{segment.count} customers</span>
                </div>
                <Progress value={segment.percentage} className="h-2" />
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{segment.percentage}% of total</span>
                  <span>${segment.revenue.toLocaleString()} revenue</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sales Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
          <CardDescription>Revenue trends over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Sales chart visualization would go here</p>
              <p className="text-sm text-gray-400">Integration with charting library needed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
