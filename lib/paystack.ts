export interface PaystackConfig {
  publicKey: string
  secretKey: string
}

export interface PaystackInitializeData {
  email: string
  amount: number // in kobo (multiply by 100)
  reference?: string
  callback_url?: string
  metadata?: Record<string, any>
  currency?: string
}

export interface PaystackResponse {
  status: boolean
  message: string
  data: {
    authorization_url: string
    access_code: string
    reference: string
  }
}

export interface PaystackVerificationResponse {
  status: boolean
  message: string
  data: {
    id: number
    domain: string
    status: string
    reference: string
    amount: number
    message: string | null
    gateway_response: string
    paid_at: string
    created_at: string
    channel: string
    currency: string
    ip_address: string
    metadata: Record<string, any>
    log: any
    fees: number
    fees_split: any
    authorization: {
      authorization_code: string
      bin: string
      last4: string
      exp_month: string
      exp_year: string
      channel: string
      card_type: string
      bank: string
      country_code: string
      brand: string
      reusable: boolean
      signature: string
      account_name: string | null
    }
    customer: {
      id: number
      first_name: string | null
      last_name: string | null
      email: string
      customer_code: string
      phone: string | null
      metadata: Record<string, any>
      risk_action: string
      international_format_phone: string | null
    }
    plan: any
    split: any
    order_id: any
    paidAt: string
    createdAt: string
    requested_amount: number
    pos_transaction_data: any
    source: any
    fees_breakdown: any
  }
}

export class PaystackService {
  private secretKey: string
  private publicKey: string
  private baseUrl = "https://api.paystack.co"

  constructor() {
    this.secretKey = process.env.PAYSTACK_SECRET_KEY || ""
    this.publicKey = process.env.PAYSTACK_PUBLIC_KEY || ""

    if (!this.secretKey || !this.publicKey) {
      throw new Error("Paystack keys are required")
    }
  }

  async initializeTransaction(data: PaystackInitializeData): Promise<PaystackResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/transaction/initialize`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          amount: Math.round(data.amount * 100), // Convert to kobo
          currency: data.currency || "NGN",
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Failed to initialize transaction")
      }

      return result
    } catch (error) {
      console.error("Paystack initialization error:", error)
      throw error
    }
  }

  async verifyTransaction(reference: string): Promise<PaystackVerificationResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/transaction/verify/${reference}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
          "Content-Type": "application/json",
        },
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Failed to verify transaction")
      }

      return result
    } catch (error) {
      console.error("Paystack verification error:", error)
      throw error
    }
  }

  generateReference(): string {
    return `CHZ_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  getPublicKey(): string {
    return this.publicKey
  }
}

export const paystack = new PaystackService()
