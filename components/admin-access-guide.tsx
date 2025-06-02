"use client"

import { useState } from "react"
import { Shield, Eye, EyeOff, Copy, Check, ExternalLink, Lock, User, Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export function AdminAccessGuide() {
  const [showCredentials, setShowCredentials] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const adminCredentials = {
    email: "admin@chuzol.com",
    password: "admin123",
    role: "Admin (Full Access)",
  }

  const managerCredentials = {
    email: "manager@chuzol.com",
    password: "manager123",
    role: "Manager (Limited Access)",
  }

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
          <Shield className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Panel Access Guide</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Complete instructions for accessing and using the Chuzol Global administrative interface
        </p>
      </div>

      {/* Quick Access */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <ExternalLink className="h-5 w-5" />
            Quick Access
          </CardTitle>
          <CardDescription className="text-green-700">Direct link to the admin panel</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1">
              <p className="text-sm text-green-700 mb-2">Admin Panel URL:</p>
              <code className="bg-white px-3 py-2 rounded border text-green-800 font-mono text-sm">/admin/login</code>
            </div>
            <Link href="/admin/login">
              <Button className="bg-green-700 hover:bg-green-800 text-white">
                <Shield className="h-4 w-4 mr-2" />
                Access Admin Panel
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            How to Access the Admin Panel
          </CardTitle>
          <CardDescription>Multiple ways to reach the administrative interface</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Method 1: Navbar Access</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                <li>Look for the "Admin" button in the top navigation bar</li>
                <li>
                  Click the <Shield className="h-4 w-4 inline mx-1" /> Admin button
                </li>
                <li>You'll be redirected to the login page</li>
              </ol>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Method 2: Direct URL</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                <li>
                  Navigate to: <code className="bg-gray-100 px-1 rounded">/admin/login</code>
                </li>
                <li>Or use the full URL in your browser</li>
                <li>Bookmark this page for quick access</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Login Credentials */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Login Credentials
          </CardTitle>
          <CardDescription>Use these credentials to access the admin panel</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Credentials Visibility</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCredentials(!showCredentials)}
              className="flex items-center gap-2"
            >
              {showCredentials ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showCredentials ? "Hide" : "Show"} Credentials
            </Button>
          </div>

          {showCredentials && (
            <div className="space-y-4">
              {/* Admin Credentials */}
              <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-blue-600">Owner/Admin Account</Badge>
                  <span className="text-sm text-blue-700">Full administrative access</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email:</label>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="bg-white px-3 py-2 rounded border flex-1 text-sm">{adminCredentials.email}</code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(adminCredentials.email, "admin-email")}
                      >
                        {copiedField === "admin-email" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Password:</label>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="bg-white px-3 py-2 rounded border flex-1 text-sm">
                        {adminCredentials.password}
                      </code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(adminCredentials.password, "admin-password")}
                      >
                        {copiedField === "admin-password" ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Manager Credentials */}
              <div className="border rounded-lg p-4 bg-orange-50 border-orange-200">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="bg-orange-600 text-white">
                    Manager Account
                  </Badge>
                  <span className="text-sm text-orange-700">Limited administrative access</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email:</label>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="bg-white px-3 py-2 rounded border flex-1 text-sm">
                        {managerCredentials.email}
                      </code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(managerCredentials.email, "manager-email")}
                      >
                        {copiedField === "manager-email" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Password:</label>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="bg-white px-3 py-2 rounded border flex-1 text-sm">
                        {managerCredentials.password}
                      </code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(managerCredentials.password, "manager-password")}
                      >
                        {copiedField === "manager-password" ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Login Process */}
      <Card>
        <CardHeader>
          <CardTitle>Step-by-Step Login Process</CardTitle>
          <CardDescription>Follow these steps to successfully log into the admin panel</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-green-600">1</span>
              </div>
              <div>
                <h4 className="font-semibold">Navigate to Admin Login</h4>
                <p className="text-sm text-gray-600">Click the Admin button in the navbar or go to /admin/login</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-green-600">2</span>
              </div>
              <div>
                <h4 className="font-semibold">Enter Credentials</h4>
                <p className="text-sm text-gray-600">Use the admin email and password provided above</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-green-600">3</span>
              </div>
              <div>
                <h4 className="font-semibold">Click Sign In</h4>
                <p className="text-sm text-gray-600">You'll be automatically redirected to the admin dashboard</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-green-600">4</span>
              </div>
              <div>
                <h4 className="font-semibold">Access Admin Features</h4>
                <p className="text-sm text-gray-600">
                  Navigate through products, orders, analytics, customers, and settings
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Admin Features */}
      <Card>
        <CardHeader>
          <CardTitle>Available Admin Features</CardTitle>
          <CardDescription>Overview of administrative capabilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">📊 Dashboard</h4>
              <p className="text-sm text-gray-600">Overview of sales, orders, and key metrics</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">📦 Products</h4>
              <p className="text-sm text-gray-600">Manage product catalog, inventory, and pricing</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">🛒 Orders</h4>
              <p className="text-sm text-gray-600">Process orders, update status, and manage fulfillment</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">📈 Analytics</h4>
              <p className="text-sm text-gray-600">View sales reports and business insights</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">👥 Customers</h4>
              <p className="text-sm text-gray-600">Manage customer accounts and relationships</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">⚙️ Settings</h4>
              <p className="text-sm text-gray-600">Configure system settings and preferences</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Alert>
        <Lock className="h-4 w-4" />
        <AlertDescription>
          <strong>Security Notice:</strong> These are demo credentials for development purposes. In a production
          environment, ensure you change these credentials and implement proper security measures including strong
          passwords, two-factor authentication, and regular security audits.
        </AlertDescription>
      </Alert>

      {/* Quick Action */}
      <div className="text-center">
        <Link href="/admin/login">
          <Button size="lg" className="bg-green-700 hover:bg-green-800">
            <Shield className="h-5 w-5 mr-2" />
            Access Admin Panel Now
          </Button>
        </Link>
      </div>
    </div>
  )
}
