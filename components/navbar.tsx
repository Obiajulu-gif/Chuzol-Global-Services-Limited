"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Home, Package, Users, Briefcase, Phone, Shield } from "lucide-react"
import { CartIcon } from "@/components/cart-icon"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    {
      name: "Home",
      href: "/",
      icon: <Home className="h-4 w-4" />,
    },
    {
      name: "Products",
      href: "/products",
      icon: <Package className="h-4 w-4" />,
    },
    {
      name: "About Us",
      href: "/about",
      icon: <Users className="h-4 w-4" />,
    },
    {
      name: "Services",
      href: "/services",
      icon: <Briefcase className="h-4 w-4" />,
    },
    {
      name: "Contact",
      href: "/contact",
      icon: <Phone className="h-4 w-4" />,
    },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-green-50 group ${
                  isActive(item.href) ? "text-green-700 bg-green-50 shadow-sm" : "text-gray-600 hover:text-green-700"
                }`}
              >
                <span
                  className={`transition-transform duration-200 group-hover:scale-110 ${
                    isActive(item.href) ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            ))}

            {/* Admin Access Button */}
            {/* <Link href="/admin/login">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 text-gray-500 hover:text-green-700 hover:bg-green-50 transition-all duration-200"
              >
                <Shield className="h-4 w-4" />
                <span className="hidden lg:inline">Admin</span>
              </Button>
            </Link> */}

            {/* Enhanced Cart Button */}
            <div className="relative ml-4">
              <CartIcon />
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <div className="relative">
              <CartIcon />
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 transform rotate-180 transition-transform duration-200" />
              ) : (
                <Menu className="h-6 w-6 transition-transform duration-200" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-3 text-base font-medium transition-all duration-200 rounded-lg ${
                  isActive(item.href)
                    ? "text-green-700 bg-green-50 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <span className={`${isActive(item.href) ? "text-green-600" : "text-gray-500"}`}>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}

            {/* Mobile Admin Access */}
            {/* <Link
              href="/admin/login"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-3 px-3 py-3 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 rounded-lg border-t mt-2 pt-4"
            >
              <Shield className="h-5 w-5 text-gray-500" />
              <span>Admin Portal</span>
              <Badge variant="secondary" className="ml-auto text-xs">
                Owner
              </Badge>
            </Link> */}
          </div>
        </div>
      </div>
    </header>
  )
}
