import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendPasswordResetEmail(email: string, name: string, resetLink: string, token: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Chuzol Global <noreply@chuzolglobal.com>",
      to: [email],
      subject: "Password Reset Request - Chuzol Global Admin",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Password Reset</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #16a34a, #15803d); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0;">Chuzol Global</h1>
              <p style="color: #dcfce7; margin: 10px 0 0 0;">Premium Nigerian Agricultural Exports</p>
            </div>
            
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
              <h2 style="color: #16a34a; margin-top: 0;">Password Reset Request</h2>
              
              <p>Hello ${name},</p>
              
              <p>We received a request to reset your password for your Chuzol Global admin account.</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetLink}" 
                   style="background: #16a34a; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                  Reset Password
                </a>
              </div>
              
              <p>Or copy and paste this link in your browser:</p>
              <p style="background: #e5e7eb; padding: 10px; border-radius: 5px; word-break: break-all; font-family: monospace;">
                ${resetLink}
              </p>
              
              <p><strong>This link will expire in 1 hour for security reasons.</strong></p>
              
              <p>If you didn't request this password reset, please ignore this email. Your password will remain unchanged.</p>
              
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
              
              <p style="color: #6b7280; font-size: 14px;">
                Best regards,<br>
                The Chuzol Global Team<br>
                <a href="mailto:admin@chuzolglobal.com" style="color: #16a34a;">admin@chuzolglobal.com</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      throw new Error("Failed to send email")
    }

    console.log("Password reset email sent successfully:", data)
    return data
  } catch (error) {
    console.error("Email sending error:", error)
    throw error
  }
}

export async function sendContactEmail(formData: {
  name: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
  inquiryType?: string
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Chuzol Contact Form <noreply@chuzolglobal.com>",
      to: ["anigbomosesstan@gmail.com"],
      replyTo: [formData.email],
      subject: `New Contact Form Submission: ${formData.subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Form Submission</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #16a34a, #15803d); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0;">New Contact Form Submission</h1>
              <p style="color: #dcfce7; margin: 10px 0 0 0;">Chuzol Global Website</p>
            </div>
            
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
              <h2 style="color: #16a34a; margin-top: 0;">Contact Details</h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; width: 30%;">Name:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${formData.name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Email:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">
                    <a href="mailto:${formData.email}" style="color: #16a34a;">${formData.email}</a>
                  </td>
                </tr>
                ${
                  formData.phone
                    ? `
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Phone:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${formData.phone}</td>
                </tr>
                `
                    : ""
                }
                ${
                  formData.company
                    ? `
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Company:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${formData.company}</td>
                </tr>
                `
                    : ""
                }
                ${
                  formData.inquiryType
                    ? `
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Inquiry Type:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${formData.inquiryType}</td>
                </tr>
                `
                    : ""
                }
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Subject:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${formData.subject}</td>
                </tr>
              </table>
              
              <h3 style="color: #16a34a; margin-top: 30px;">Message:</h3>
              <div style="background: white; padding: 20px; border-radius: 5px; border-left: 4px solid #16a34a;">
                ${formData.message.replace(/\n/g, "<br>")}
              </div>
              
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
              
              <p style="color: #6b7280; font-size: 14px;">
                This message was sent from the Chuzol Global website contact form.<br>
                Submitted on: ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      throw new Error("Failed to send contact email")
    }

    console.log("Contact email sent successfully:", data)
    return data
  } catch (error) {
    console.error("Contact email sending error:", error)
    throw error
  }
}

export async function sendOrderConfirmationEmail(
  email: string,
  orderData: {
    orderNumber: string
    customerName: string
    items: Array<{ name: string; quantity: number; price: number }>
    total: number
    shippingAddress: string
  },
) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Chuzol Global <orders@chuzolglobal.com>",
      to: [email],
      subject: `Order Confirmation - ${orderData.orderNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Order Confirmation</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #16a34a, #15803d); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0;">Order Confirmation</h1>
              <p style="color: #dcfce7; margin: 10px 0 0 0;">Order #${orderData.orderNumber}</p>
            </div>
            
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
              <h2 style="color: #16a34a; margin-top: 0;">Thank you for your order, ${orderData.customerName}!</h2>
              
              <p>We've received your order and will process it shortly. You'll receive another email once payment is confirmed.</p>
              
              <h3 style="color: #16a34a;">Order Details:</h3>
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <thead>
                  <tr style="background: #e5e7eb;">
                    <th style="padding: 12px; text-align: left; border-bottom: 2px solid #d1d5db;">Product</th>
                    <th style="padding: 12px; text-align: center; border-bottom: 2px solid #d1d5db;">Qty</th>
                    <th style="padding: 12px; text-align: right; border-bottom: 2px solid #d1d5db;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${orderData.items
                    .map(
                      (item) => `
                    <tr>
                      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.name}</td>
                      <td style="padding: 12px; text-align: center; border-bottom: 1px solid #e5e7eb;">${item.quantity}</td>
                      <td style="padding: 12px; text-align: right; border-bottom: 1px solid #e5e7eb;">$${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  `,
                    )
                    .join("")}
                  <tr style="background: #f3f4f6; font-weight: bold;">
                    <td colspan="2" style="padding: 12px; border-top: 2px solid #d1d5db;">Total:</td>
                    <td style="padding: 12px; text-align: right; border-top: 2px solid #d1d5db;">$${orderData.total.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
              
              <h3 style="color: #16a34a;">Shipping Address:</h3>
              <p style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #16a34a;">
                ${orderData.shippingAddress}
              </p>
              
              <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 5px; padding: 15px; margin: 20px 0;">
                <p style="margin: 0; color: #92400e;">
                  <strong>Next Steps:</strong> Please complete your payment to confirm this order. You'll receive a payment link shortly.
                </p>
              </div>
              
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
              
              <p style="color: #6b7280; font-size: 14px;">
                Questions about your order? Contact us at:<br>
                <a href="mailto:orders@chuzolglobal.com" style="color: #16a34a;">orders@chuzolglobal.com</a><br>
                Phone: +234 123 456 7890
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      throw new Error("Failed to send order confirmation email")
    }

    console.log("Order confirmation email sent successfully:", data)
    return data
  } catch (error) {
    console.error("Order confirmation email sending error:", error)
    throw error
  }
}

export async function sendPaymentSuccessEmail(
  email: string,
  orderData: {
    orderNumber: string
    customerName: string
    items: Array<{ name: string; quantity: number; price: number }>
    total: number
    paymentReference: string
  },
) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Chuzol Global <orders@chuzolglobal.com>",
      to: [email],
      subject: `Payment Confirmed - Order ${orderData.orderNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Payment Confirmed</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #16a34a, #15803d); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0;">✅ Payment Confirmed!</h1>
              <p style="color: #dcfce7; margin: 10px 0 0 0;">Order #${orderData.orderNumber}</p>
            </div>
            
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
              <h2 style="color: #16a34a; margin-top: 0;">Thank you ${orderData.customerName}!</h2>
              
              <p>Your payment has been successfully processed and your order is now confirmed. We'll begin preparing your items for shipment.</p>
              
              <div style="background: #dcfce7; border: 1px solid #16a34a; border-radius: 5px; padding: 15px; margin: 20px 0;">
                <p style="margin: 0; color: #15803d;">
                  <strong>Status:</strong> Payment Confirmed - Pending Delivery<br>
                  <strong>Payment Reference:</strong> ${orderData.paymentReference}
                </p>
              </div>
              
              <h3 style="color: #16a34a;">Order Summary:</h3>
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <thead>
                  <tr style="background: #e5e7eb;">
                    <th style="padding: 12px; text-align: left; border-bottom: 2px solid #d1d5db;">Product</th>
                    <th style="padding: 12px; text-align: center; border-bottom: 2px solid #d1d5db;">Qty</th>
                    <th style="padding: 12px; text-align: right; border-bottom: 2px solid #d1d5db;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${orderData.items
                    .map(
                      (item) => `
                    <tr>
                      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.name}</td>
                      <td style="padding: 12px; text-align: center; border-bottom: 1px solid #e5e7eb;">${item.quantity}</td>
                      <td style="padding: 12px; text-align: right; border-bottom: 1px solid #e5e7eb;">$${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  `,
                    )
                    .join("")}
                  <tr style="background: #f3f4f6; font-weight: bold;">
                    <td colspan="2" style="padding: 12px; border-top: 2px solid #d1d5db;">Total Paid:</td>
                    <td style="padding: 12px; text-align: right; border-top: 2px solid #d1d5db;">$${orderData.total.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
              
              <h3 style="color: #16a34a;">What's Next?</h3>
              <ul style="color: #374151;">
                <li>We'll prepare your order for shipment within 1-2 business days</li>
                <li>You'll receive tracking information once your order ships</li>
                <li>Estimated delivery: 5-7 business days</li>
              </ul>
              
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
              
              <p style="color: #6b7280; font-size: 14px;">
                Questions about your order? Contact us at:<br>
                <a href="mailto:orders@chuzolglobal.com" style="color: #16a34a;">orders@chuzolglobal.com</a><br>
                Phone: +234 123 456 7890
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      throw new Error("Failed to send payment success email")
    }

    console.log("Payment success email sent successfully:", data)
    return data
  } catch (error) {
    console.error("Payment success email sending error:", error)
    throw error
  }
}
