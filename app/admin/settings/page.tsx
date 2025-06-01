"use client"

import { useState } from "react"
import { Save, Bell, Shield, CreditCard, Truck, Store, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

export default function SettingsPage() {
  const [storeSettings, setStoreSettings] = useState({
		storeName: "Chuzol Global Service Limited",
		storeDescription: "Premium African agricultural products and organic goods",
		storeEmail: "info@chuzolglobal.com",
		storePhone: "+234 123 456 7890",
		storeAddress: "Lagos, Nigeria",
		currency: "USD",
		timezone: "Africa/Lagos",
		language: "en",
	});

  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailCustomers: true,
    emailMarketing: false,
    pushOrders: true,
    pushInventory: true,
    pushReports: false,
  })

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordExpiry: "90",
    loginAttempts: "5",
  })

  const [shipping, setShipping] = useState({
    freeShippingThreshold: "100",
    domesticRate: "10",
    internationalRate: "25",
    processingTime: "2-3",
    returnWindow: "30",
  })

  const [payment, setPayment] = useState({
    paypalEnabled: true,
    stripeEnabled: true,
    bankTransferEnabled: true,
    cryptoEnabled: false,
    taxRate: "7.5",
  })

  const handleSaveSettings = (section: string) => {
    toast.success(`${section} settings saved successfully!`)
  }

  const handleStoreSettingChange = (field: string, value: string) => {
    setStoreSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [field]: value }))
  }

  const handleSecurityChange = (field: string, value: string | boolean) => {
    setSecurity((prev) => ({ ...prev, [field]: value }))
  }

  const handleShippingChange = (field: string, value: string) => {
    setShipping((prev) => ({ ...prev, [field]: value }))
  }

  const handlePaymentChange = (field: string, value: string | boolean) => {
    setPayment((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your store settings and preferences</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Payment
          </TabsTrigger>
          <TabsTrigger value="shipping" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Shipping
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Store Information
              </CardTitle>
              <CardDescription>Basic information about your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    value={storeSettings.storeName}
                    onChange={(e) => handleStoreSettingChange("storeName", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="storeEmail">Store Email</Label>
                  <Input
                    id="storeEmail"
                    type="email"
                    value={storeSettings.storeEmail}
                    onChange={(e) => handleStoreSettingChange("storeEmail", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="storeDescription">Store Description</Label>
                <Textarea
                  id="storeDescription"
                  value={storeSettings.storeDescription}
                  onChange={(e) => handleStoreSettingChange("storeDescription", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="storePhone">Phone Number</Label>
                  <Input
                    id="storePhone"
                    value={storeSettings.storePhone}
                    onChange={(e) => handleStoreSettingChange("storePhone", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="storeAddress">Address</Label>
                  <Input
                    id="storeAddress"
                    value={storeSettings.storeAddress}
                    onChange={(e) => handleStoreSettingChange("storeAddress", e.target.value)}
                  />
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={storeSettings.currency}
                    onValueChange={(value) => handleStoreSettingChange("currency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="NGN">NGN - Nigerian Naira</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={storeSettings.timezone}
                    onValueChange={(value) => handleStoreSettingChange("timezone", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Africa/Lagos">Africa/Lagos</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">America/New_York</SelectItem>
                      <SelectItem value="Europe/London">Europe/London</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={storeSettings.language}
                    onValueChange={(value) => handleStoreSettingChange("language", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings("General")} className="bg-green-700 hover:bg-green-800">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Notifications
              </CardTitle>
              <CardDescription>Configure when you want to receive email notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailOrders">Order Notifications</Label>
                  <p className="text-sm text-gray-500">Receive emails when new orders are placed</p>
                </div>
                <Switch
                  id="emailOrders"
                  checked={notifications.emailOrders}
                  onCheckedChange={(checked) => handleNotificationChange("emailOrders", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailCustomers">Customer Messages</Label>
                  <p className="text-sm text-gray-500">Receive emails when customers send messages</p>
                </div>
                <Switch
                  id="emailCustomers"
                  checked={notifications.emailCustomers}
                  onCheckedChange={(checked) => handleNotificationChange("emailCustomers", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailMarketing">Marketing Updates</Label>
                  <p className="text-sm text-gray-500">Receive marketing and promotional emails</p>
                </div>
                <Switch
                  id="emailMarketing"
                  checked={notifications.emailMarketing}
                  onCheckedChange={(checked) => handleNotificationChange("emailMarketing", checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Push Notifications
              </CardTitle>
              <CardDescription>Configure browser and mobile push notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="pushOrders">Order Updates</Label>
                  <p className="text-sm text-gray-500">Get notified about order status changes</p>
                </div>
                <Switch
                  id="pushOrders"
                  checked={notifications.pushOrders}
                  onCheckedChange={(checked) => handleNotificationChange("pushOrders", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="pushInventory">Inventory Alerts</Label>
                  <p className="text-sm text-gray-500">Get notified when products are low in stock</p>
                </div>
                <Switch
                  id="pushInventory"
                  checked={notifications.pushInventory}
                  onCheckedChange={(checked) => handleNotificationChange("pushInventory", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="pushReports">Weekly Reports</Label>
                  <p className="text-sm text-gray-500">Receive weekly performance reports</p>
                </div>
                <Switch
                  id="pushReports"
                  checked={notifications.pushReports}
                  onCheckedChange={(checked) => handleNotificationChange("pushReports", checked)}
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings("Notification")} className="bg-green-700 hover:bg-green-800">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Manage your account security and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <Switch
                  id="twoFactorAuth"
                  checked={security.twoFactorAuth}
                  onCheckedChange={(checked) => handleSecurityChange("twoFactorAuth", checked)}
                />
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Select
                    value={security.sessionTimeout}
                    onValueChange={(value) => handleSecurityChange("sessionTimeout", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                  <Select
                    value={security.passwordExpiry}
                    onValueChange={(value) => handleSecurityChange("passwordExpiry", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                <Select
                  value={security.loginAttempts}
                  onValueChange={(value) => handleSecurityChange("loginAttempts", value)}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 attempts</SelectItem>
                    <SelectItem value="5">5 attempts</SelectItem>
                    <SelectItem value="10">10 attempts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings("Security")} className="bg-green-700 hover:bg-green-800">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment */}
        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Methods
              </CardTitle>
              <CardDescription>Configure accepted payment methods for your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="paypalEnabled">PayPal</Label>
                  <p className="text-sm text-gray-500">Accept payments via PayPal</p>
                </div>
                <Switch
                  id="paypalEnabled"
                  checked={payment.paypalEnabled}
                  onCheckedChange={(checked) => handlePaymentChange("paypalEnabled", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="stripeEnabled">Stripe</Label>
                  <p className="text-sm text-gray-500">Accept credit and debit cards via Stripe</p>
                </div>
                <Switch
                  id="stripeEnabled"
                  checked={payment.stripeEnabled}
                  onCheckedChange={(checked) => handlePaymentChange("stripeEnabled", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="bankTransferEnabled">Bank Transfer</Label>
                  <p className="text-sm text-gray-500">Accept direct bank transfers</p>
                </div>
                <Switch
                  id="bankTransferEnabled"
                  checked={payment.bankTransferEnabled}
                  onCheckedChange={(checked) => handlePaymentChange("bankTransferEnabled", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="cryptoEnabled">Cryptocurrency</Label>
                  <p className="text-sm text-gray-500">Accept Bitcoin and other cryptocurrencies</p>
                </div>
                <Switch
                  id="cryptoEnabled"
                  checked={payment.cryptoEnabled}
                  onCheckedChange={(checked) => handlePaymentChange("cryptoEnabled", checked)}
                />
              </div>
              <Separator />
              <div>
                <Label htmlFor="taxRate">Tax Rate (%)</Label>
                <Input
                  id="taxRate"
                  type="number"
                  step="0.1"
                  value={payment.taxRate}
                  onChange={(e) => handlePaymentChange("taxRate", e.target.value)}
                  className="w-32"
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings("Payment")} className="bg-green-700 hover:bg-green-800">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shipping */}
        <TabsContent value="shipping" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Shipping Configuration
              </CardTitle>
              <CardDescription>Set up shipping rates and policies for your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="freeShippingThreshold">Free Shipping Threshold ($)</Label>
                <Input
                  id="freeShippingThreshold"
                  type="number"
                  value={shipping.freeShippingThreshold}
                  onChange={(e) => handleShippingChange("freeShippingThreshold", e.target.value)}
                  className="w-48"
                />
                <p className="text-sm text-gray-500 mt-1">Orders above this amount get free shipping</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="domesticRate">Domestic Shipping Rate ($)</Label>
                  <Input
                    id="domesticRate"
                    type="number"
                    value={shipping.domesticRate}
                    onChange={(e) => handleShippingChange("domesticRate", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="internationalRate">International Shipping Rate ($)</Label>
                  <Input
                    id="internationalRate"
                    type="number"
                    value={shipping.internationalRate}
                    onChange={(e) => handleShippingChange("internationalRate", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="processingTime">Processing Time (days)</Label>
                  <Input
                    id="processingTime"
                    value={shipping.processingTime}
                    onChange={(e) => handleShippingChange("processingTime", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="returnWindow">Return Window (days)</Label>
                  <Input
                    id="returnWindow"
                    type="number"
                    value={shipping.returnWindow}
                    onChange={(e) => handleShippingChange("returnWindow", e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings("Shipping")} className="bg-green-700 hover:bg-green-800">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
