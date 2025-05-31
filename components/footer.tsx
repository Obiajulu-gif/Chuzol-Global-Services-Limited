"use client"

import Link from "next/link"
import { Facebook, Mail, MessageCircle, Phone, MapPin, Globe, Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Chuzol Global Service Limited</h3>
            <p className="text-gray-400 mb-4">Licensed by Nigeria Corporate Affairs Commission (CAC) - July 2024</p>
            <p className="text-gray-400">Your trusted partner for premium Nigerian agricultural exports.</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400">Bitter Kola</span>
              </li>
              <li>
                <span className="text-gray-400">Shea Butter</span>
              </li>
              <li>
                <span className="text-gray-400">Cashew Nuts</span>
              </li>
              <li>
                <span className="text-gray-400">Hibiscus</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-500" />
                <span className="text-gray-400">Lagos, Nigeria</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-green-500" />
                <span className="text-gray-400">info@chuzolglobal.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-500" />
                <span className="text-gray-400">+234 123 456 7890</span>
              </div>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-6 w-6 hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <MessageCircle className="h-6 w-6 hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Mail className="h-6 w-6 hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Globe className="h-6 w-6 hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left">
              © 2024 Chuzol Global Service Limited. All rights reserved.
            </p>

            {/* Admin Access in Footer */}
            <div className="mt-4 md:mt-0">
              <Link
                href="/admin-guide"
                className="flex items-center space-x-2 text-gray-500 hover:text-gray-300 transition-colors text-sm"
              >
                <Shield className="h-4 w-4" />
                <span>Admin Access Guide</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
