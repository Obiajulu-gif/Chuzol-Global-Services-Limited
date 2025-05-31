"use client"

import Image from "next/image"
import { Award, Users, Globe, Target, Eye, Heart, Truck, Shield, CheckCircle, Building, Handshake } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
  const values = [
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Quality Assurance",
      description: "We maintain the highest standards in processing and packaging to ensure premium quality products.",
    },
    {
      icon: <Globe className="h-8 w-8 text-green-600" />,
      title: "Global Reach",
      description: "Our extensive network spans across continents, connecting Nigerian agriculture to world markets.",
    },
    {
      icon: <Heart className="h-8 w-8 text-green-600" />,
      title: "Sustainability",
      description: "We promote sustainable farming practices and support local communities in Nigeria.",
    },
    {
      icon: <Truck className="h-8 w-8 text-green-600" />,
      title: "Reliable Delivery",
      description: "Timely and secure delivery of products to our customers worldwide.",
    },
  ]

  const team = [
    {
      name: "Adebayo Ogundimu",
      position: "Chief Executive Officer",
      image: "/placeholder.svg?height=300&width=300",
      description: "20+ years experience in agricultural export and international trade.",
    },
    {
      name: "Fatima Abdullahi",
      position: "Head of Operations",
      image: "/placeholder.svg?height=300&width=300",
      description: "Expert in supply chain management and quality control processes.",
    },
    {
      name: "Emeka Okafor",
      position: "International Sales Director",
      image: "/placeholder.svg?height=300&width=300",
      description: "Specialist in global market development and customer relations.",
    },
    {
      name: "Aisha Mohammed",
      position: "Quality Assurance Manager",
      image: "/placeholder.svg?height=300&width=300",
      description: "Ensures all products meet international quality standards.",
    },
  ]

  const achievements = [
    { icon: <Award className="h-6 w-6" />, text: "CAC Licensed Company - July 2024" },
    { icon: <Globe className="h-6 w-6" />, text: "Exporting to 25+ Countries" },
    { icon: <Users className="h-6 w-6" />, text: "500+ Satisfied Customers" },
    { icon: <CheckCircle className="h-6 w-6" />, text: "ISO Quality Certified" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-green-700 via-green-800 to-green-900 text-white py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=\"60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><g fill="#ffffff" fillOpacity="0.1"><circle cx="30" cy="30" r="2"/></g></g></svg>')]"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-16 h-16 bg-yellow-400/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-10 right-10 w-12 h-12 bg-green-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-white/10 rounded-full animate-ping"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-yellow-500 hover:bg-yellow-500 text-black font-semibold animate-pulse inline-flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Established 2024
                </Badge>
                
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="block">About</span>
                  <span className="block text-yellow-400">Chuzol Global</span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-green-100 leading-relaxed">
                  Leading the way in premium Nigerian agricultural exports with a commitment to quality, sustainability, 
                  and global excellence. Our story is one of passion, dedication, and unwavering commitment to connecting 
                  Nigeria's agricultural heritage with the world.
                </p>
              </div>

              {/* Key Highlights */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Handshake className="h-5 w-5 text-yellow-400" />
                    <span className="font-semibold">Trusted Partner</span>
                  </div>
                  <p className="text-sm text-green-100">500+ satisfied customers worldwide</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Globe className="h-5 w-5 text-yellow-400" />
                    <span className="font-semibold">Global Reach</span>
                  </div>
                  <p className="text-sm text-green-100">Exporting to 25+ countries</p>
                </div>
              </div>
            </div>

            {/* Enhanced Hero Image */}
            <div className="relative lg:h-[500px] h-[350px]">
              <div className="relative z-10 h-full">
                <Image
                  src="/images/about-hero.png"
                  alt="Chuzol Global - Our Story and Mission"
                  fill
                  className="object-cover rounded-2xl shadow-2xl"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Overlay with company highlights */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl"></div>
                
                {/* Floating Achievement Cards */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="text-center">
                    <Award className="h-6 w-6 text-green-600 mx-auto mb-1" />
                    <div className="text-sm font-semibold text-gray-800">CAC Licensed</div>
                    <div className="text-xs text-gray-600">July 2024</div>
                  </div>
                </div>
                
                <div className="absolute top-6 right-6 bg-green-600/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="text-center">
                    <CheckCircle className="h-6 w-6 text-white mx-auto mb-1" />
                    <div className="text-sm font-semibold text-white">ISO Certified</div>
                    <div className="text-xs text-green-100">Quality Assured</div>
                  </div>
                </div>
              </div>
              
              {/* Background decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-yellow-500/20 rounded-2xl transform rotate-2 scale-105"></div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400/30 rounded-full animate-spin-slow"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-400/30 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg className="relative block w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div>
                <Badge className="mb-4 bg-green-100 text-green-800">Our Journey</Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              </div>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  Founded in 2024 and officially licensed by the Nigeria Corporate Affairs Commission (CAC) in July,
                  Chuzol Global Service Limited emerged from a vision to bridge the gap between Nigeria's rich
                  agricultural heritage and global markets.
                </p>
                <p>
                  Our founders recognized the immense potential of Nigerian agricultural products and the need for a
                  reliable, quality-focused export company that could meet international standards while supporting
                  local farmers and communities.
                </p>
                <p>
                  Today, we stand as a testament to Nigerian excellence in agricultural exports, serving customers
                  across 25+ countries with our premium range of processed and packaged agricultural products.
                </p>
              </div>
              
              {/* Story highlights */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-700 mb-1">2024</div>
                  <div className="text-sm text-gray-600">Company Founded</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-yellow-700 mb-1">July</div>
                  <div className="text-sm text-gray-600">CAC Licensed</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="/images/company-story.png"
                  alt="Chuzol Global Facility and Operations"
                  width={600}
                  height={500}
                  className="rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-yellow-100 rounded-2xl transform rotate-3 scale-105 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800">Our Purpose</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Mission & Vision</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Driven by purpose, guided by values, and committed to excellence in everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Target className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed text-lg">
                  To be the leading exporter of premium Nigerian agricultural products, connecting local farmers to
                  global markets while maintaining the highest standards of quality, sustainability, and customer
                  satisfaction. We strive to showcase the best of Nigerian agriculture to the world.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Eye className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed text-lg">
                  To become the most trusted and recognized Nigerian agricultural export company globally, known for our
                  commitment to quality, innovation, and sustainable practices. We envision a future where Nigerian
                  agricultural products are synonymous with excellence worldwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800">Our Foundation</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do and define who we are as a company.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-2">
                <CardContent className="pt-8 pb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-green-700 transition-colors">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-green-700 text-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-green-400/20 rounded-full animate-pulse"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-500 hover:bg-yellow-500 text-black">Milestones</Badge>
            <h2 className="text-4xl font-bold mb-4">Our Achievements</h2>
            <p className="text-xl text-green-100">Milestones that mark our journey to excellence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-6 hover:scale-110 transition-transform duration-300 group-hover:bg-green-500">
                  {achievement.icon}
                </div>
                <p className="text-green-100 text-lg font-medium group-hover:text-white transition-colors">{achievement.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-100 text-orange-800">Our People</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The dedicated professionals driving our mission forward with expertise and passion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-2">
                <CardContent className="pt-8">
                  <div className="relative mb-6">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={200}
                      height={200}
                      className="w-32 h-32 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform duration-300 shadow-lg"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-green-700 transition-colors">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-4">{member.position}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <Badge className="mb-4 bg-green-100 text-green-800">Join Us</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Partner with Us?</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Join our growing network of satisfied customers and experience the quality and reliability that sets us
                apart. Let's build a successful partnership together.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Handshake className="mr-2 h-5 w-5" />
                Get in Touch
              </a>
              <a
                href="/products"
                className="inline-flex items-center px-8 py-4 border-2 border-green-700 text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-all duration-300 transform hover:scale-105"
              >
                <Globe className="mr-2 h-5 w-5" />
                View Our Products
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  )
}
