"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { UserPlus, Users, CheckCircle, AlertCircle, ShieldCheck, Loader2, Lock } from "lucide-react"
import Link from "next/link"
import { useAdmin } from "@/lib/admin-context"

interface Admin {
  id: string
  email: string
  name: string
  role: string
  createdAt: string
}

export default function AdminSetupPage() {
  const { user, isAuthenticated } = useAdmin()
  const [admins, setAdmins] = useState<Admin[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [isFirstAdmin, setIsFirstAdmin] = useState(false)

  // Form state for creating new admin
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "manager",
  })

  const fetchAdmins = async () => {
    try {
      console.log("Fetching admins...")
      const response = await fetch("/api/admin/list")
      const data = await response.json()

      console.log("Admin list response:", data)

      if (data.success) {
        setAdmins(data.admins || [])
        setIsFirstAdmin((data.admins || []).length === 0)
      } else {
        console.error("Failed to fetch admins:", data.error)
        setIsFirstAdmin(true) // Assume first admin if error
        setAdmins([])
      }
    } catch (error) {
      console.error("Error fetching admins:", error)
      setIsFirstAdmin(true) // Assume first admin if error
      setAdmins([])
    } finally {
      setIsInitialLoading(false)
    }
  }

  useEffect(() => {
    fetchAdmins()
  }, [])

  const createAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setMessage("")

    try {
      console.log("Creating admin with data:", { ...formData, password: "[HIDDEN]" })

      const response = await fetch("/api/admin/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      console.log("Create admin response:", data)

      if (data.success) {
        setMessage(`Admin "${data.admin.name}" created successfully!`)
        setFormData({ email: "", password: "", name: "", role: "manager" })
        fetchAdmins() // Refresh the list
      } else {
        setError(data.error || "Failed to create admin")
      }
    } catch (error) {
      console.error("Network error:", error)
      setError("Network error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-600"
      case "manager":
        return "bg-blue-600"
      case "staff":
        return "bg-green-600"
      default:
        return "bg-gray-600"
    }
  }

  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-green-600" />
          <p className="mt-2 text-gray-600">Loading admin setup...</p>
        </div>
      </div>
    )
  }

  // If admins exist but user is not authenticated, require login
  if (!isFirstAdmin && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader className="text-center">
              <Lock className="mx-auto h-12 w-12 text-yellow-600" />
              <CardTitle className="text-yellow-800">Authentication Required</CardTitle>
              <CardDescription className="text-yellow-700">
                Admin accounts already exist. Please login to manage admin accounts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-yellow-300 bg-yellow-100">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  Only authenticated admins can create additional admin accounts.
                </AlertDescription>
              </Alert>
              <div className="flex flex-col gap-2">
                <Link href="/admin/login" className="w-full">
                  <Button className="w-full">Login to Admin Panel</Button>
                </Link>
                <Link href="/" className="w-full">
                  <Button variant="outline" className="w-full">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <ShieldCheck className="mx-auto h-12 w-12 text-green-600" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Admin Setup</h1>
          <p className="mt-2 text-gray-600">
            {isFirstAdmin ? "Create your first admin account" : "Manage admin accounts"}
          </p>
          {isAuthenticated && (
            <p className="text-sm text-green-600">
              Logged in as: {user?.name} ({user?.role})
            </p>
          )}
        </div>

        {/* Debug Info */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-sm">Debug Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs space-y-1">
              <p>Admin count: {admins.length}</p>
              <p>Is first admin: {isFirstAdmin ? "Yes" : "No"}</p>
              <p>Is authenticated: {isAuthenticated ? "Yes" : "No"}</p>
              <p>Current user: {user?.email || "None"}</p>
            </div>
          </CardContent>
        </Card>

        {/* First Admin Setup */}
        {isFirstAdmin && (
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-green-600" />
                Create First Admin Account
              </CardTitle>
              <CardDescription>
                No admin accounts found. Create your first admin account to get started.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={createAdmin} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="admin@chuzol.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Enter secure password"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Select value="admin" onValueChange={() => {}}>
                      <SelectTrigger>
                        <SelectValue placeholder="Admin (Full Access)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin (Full Access)</SelectItem>
                      </SelectContent>
                    </Select>
                    <input type="hidden" name="role" value="admin" />
                  </div>
                </div>

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create First Admin Account"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Current Admins */}
        {admins.length > 0 && isAuthenticated && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Current Admin Accounts ({admins.length})
              </CardTitle>
              <CardDescription>Existing admin accounts in the database</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {admins.map((admin) => (
                  <div key={admin.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{admin.name}</h3>
                      <p className="text-sm text-gray-600">{admin.email}</p>
                      <p className="text-xs text-gray-500">Created: {new Date(admin.createdAt).toLocaleDateString()}</p>
                    </div>
                    <Badge className={getRoleBadgeColor(admin.role)}>{admin.role.toUpperCase()}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Create Additional Admin */}
        {admins.length > 0 && isAuthenticated && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Create Additional Admin
              </CardTitle>
              <CardDescription>Add another admin account to the system</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={createAdmin} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name2">Full Name</Label>
                    <Input
                      id="name2"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email2">Email Address</Label>
                    <Input
                      id="email2"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@chuzol.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="password2">Password</Label>
                    <Input
                      id="password2"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Enter secure password"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="role2">Role</Label>
                    <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin (Full Access)</SelectItem>
                        <SelectItem value="manager">Manager (Limited Access)</SelectItem>
                        <SelectItem value="staff">Staff (Basic Access)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Admin Account"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Messages */}
        {message && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Navigation */}
        <div className="text-center space-y-4">
          <Separator />
          <div className="flex justify-center gap-4">
            {isAuthenticated ? (
              <Link href="/admin/dashboard">
                <Button variant="outline">Go to Dashboard</Button>
              </Link>
            ) : (
              <Link href="/admin/login">
                <Button variant="outline">Go to Admin Login</Button>
              </Link>
            )}
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
