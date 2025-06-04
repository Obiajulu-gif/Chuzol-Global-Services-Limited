import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"
import { initializeDatabase } from "@/lib/database"

// Add this after the imports and before the metadata
if (typeof window === "undefined") {
  // Only run on server side
  initializeDatabase()
}

export const metadata: Metadata = {
	title:
		"Chuzol Global Service Limited - Premium Nigerian Agricultural Exports",
	description:
		"Leading exporter of premium Nigerian agricultural products including bitter kola, shea butter, cashew nuts, and more. Quality guaranteed, globally delivered.",
	icons: {
		icon: [
			{ url: "/images/chuzollogo.png" },
			{ url: "/images/chuzollogo.png", type: "image/png" },
		],
		apple: [{ url: "/images/chuzollogo.png" }],
	},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
