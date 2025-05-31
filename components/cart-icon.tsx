"use client"

import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import Link from "next/link"

export function CartIcon() {
  const { state } = useCart()

  return (
    <Link href="/cart">
      <Button
        variant="outline"
        size="sm"
        className="relative group hover:bg-green-50 hover:border-green-300 transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <div className="relative">
          <ShoppingBag className="h-5 w-5 text-green-600 group-hover:scale-110 transition-transform duration-200" />
          {state.itemCount > 0 && (
            <>
              {/* Animated Badge */}
              <Badge className="absolute -top-3 -right-3 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg animate-bounce">
                {state.itemCount > 99 ? "99+" : state.itemCount}
              </Badge>

              {/* Pulse Effect */}
              <div className="absolute -top-3 -right-3 h-6 w-6 rounded-full bg-green-600 animate-ping opacity-20"></div>
            </>
          )}
        </div>

        <span className="ml-2 hidden sm:inline font-medium text-green-700 group-hover:text-green-800">Cart</span>

        {/* Cart Total (Desktop) */}
        {state.itemCount > 0 && (
          <span className="ml-2 hidden lg:inline text-xs text-gray-500 font-medium">${state.total.toFixed(2)}</span>
        )}
      </Button>
    </Link>
  )
}
