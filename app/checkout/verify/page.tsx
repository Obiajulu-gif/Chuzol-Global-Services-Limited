"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function VerifyPaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const reference = searchParams.get("reference")

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [orderData, setOrderData] = useState<any>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!reference) {
      setStatus("error")
      setError("No payment reference found")
      return
    }

    verifyPayment(reference)
  }, [reference])

  const verifyPayment = async (ref: string) => {
    try {
      const response = await fetch("/api/payment/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reference: ref }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Payment verification failed")
      }

      setStatus("success")
      setOrderData(data.order)
    } catch (error) {
      console.error("Payment verification error:", error)
      setStatus("error")
      setError(error instanceof Error ? error.message : "Payment verification failed")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              {status === "loading" && <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />}
              {status === "success" && <CheckCircle className="h-16 w-16 text-green-600" />}
              {status === "error" && <XCircle className="h-16 w-16 text-red-600" />}
            </div>

            <CardTitle className="text-2xl">
              {status === "loading" && "Verifying Payment..."}
              {status === "success" && "Payment Successful!"}
              {status === "error" && "Payment Failed"}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {status === "loading" && (
              <p className="text-gray-600">Please wait while we verify your payment with Paystack...</p>
            )}

            {status === "success" && orderData && (
              <div className="space-y-4">
                <p className="text-gray-600">Thank you for your purchase! Your payment has been confirmed.</p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="font-semibold text-green-800">Order Number: {orderData.orderNumber}</p>
                  <p className="text-green-700">
                    Status: {orderData.status} - {orderData.paymentStatus}
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  You'll receive an email confirmation shortly with your order details and tracking information.
                </p>
                <div className="flex gap-4 justify-center">
                  <Link href="/products">
                    <Button variant="outline">Continue Shopping</Button>
                  </Link>
                  <Link href="/">
                    <Button className="bg-green-700 hover:bg-green-800">Back to Home</Button>
                  </Link>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="space-y-4">
                <p className="text-red-600">{error}</p>
                <p className="text-gray-600">If you believe this is an error, please contact our support team.</p>
                <div className="flex gap-4 justify-center">
                  <Link href="/contact">
                    <Button variant="outline">Contact Support</Button>
                  </Link>
                  <Link href="/cart">
                    <Button className="bg-green-700 hover:bg-green-800">Back to Cart</Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
