"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Award,
  ArrowRight,
  CheckCircle,
  Leaf,
  Globe,
  Package,
  Truck,
  Shield,
  Star,
  Heart,
  Zap,
  Mail,
  MessageCircle,
  Facebook,
  Plane,
  Ship,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const productsRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up")
        }
      })
    }, observerOptions)

    const elements = [heroRef.current, statsRef.current, productsRef.current, servicesRef.current]
    elements.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const featuredProducts = [
    {
      name: "Premium Bitter Kola",
      image: "/images/bitter-kola.png",
      description: "High-quality bitter kola sourced from Nigerian forests",
      category: "Nuts & Seeds",
      price: "$25.99",
      rating: 4.8,
    },
    {
      name: "Organic Shea Butter",
      image: "/images/shea-butter.png",
      description: "Pure, unrefined shea butter from Northern Nigeria",
      category: "Organic Products",
      price: "$18.50",
      rating: 4.9,
    },
    {
      name: "Premium Cashew Nuts",
      image: "/images/cashew-nuts.png",
      description: "Grade A cashew nuts for international markets",
      category: "Nuts & Seeds",
      price: "$32.00",
      rating: 4.7,
    },
    {
      name: "Dried Hibiscus Flowers",
      image: "/images/hibiscus.png",
      description: "Premium quality hibiscus for tea and beverages",
      category: "Herbs & Spices",
      price: "$12.75",
      rating: 4.6,
    },
  ]

  const services = [
    {
      icon: <Package className="h-8 w-8" />,
      title: "Processing & Packaging",
      description: "State-of-the-art processing facilities with modern equipment for cleaning, sorting, and packaging.",
      image: "/images/processing-facility.png",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "International Export",
      description: "Comprehensive export services connecting Nigerian agriculture to global markets.",
      image: "/images/global-shipping.png",
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Local Distribution",
      description: "Efficient distribution network covering all major cities and regions across Nigeria.",
      image: "/images/global-shipping.png",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Quality Assurance",
      description: "Rigorous quality control processes ensuring products meet international standards.",
      image: "/images/quality-control.png",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "Global Foods Ltd",
      content: "Chuzol Global has been our trusted partner for premium Nigerian products. Their quality is unmatched.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      company: "Asian Markets Inc",
      content: "Excellent service and consistent quality. They've helped us expand our product range significantly.",
      rating: 5,
    },
    {
      name: "Emma Williams",
      company: "Organic Traders",
      content: "Professional team, reliable delivery, and authentic products. Highly recommended!",
      rating: 5,
    },
  ]

  const certifications = [
    { name: "ISO 9001", description: "Quality Management" },
    { name: "HACCP", description: "Food Safety" },
    { name: "Organic", description: "Certified Organic" },
    { name: "Fair Trade", description: "Ethical Sourcing" },
  ]

  return (
		<div className="min-h-screen bg-white">
			<Navbar />

			{/* Enhanced Hero Section */}
			<section
				ref={heroRef}
				className="relative bg-gradient-to-br from-green-700 via-green-800 to-green-900  overflow-hidden min-h-[90vh]"
			>
				{/* Background Pattern */}
				<div className="absolute inset-0 opacity-10">
					<div className="absolute top-0 left-0 w-full h-full">
						<div
							className="w-full h-full bg-repeat opacity-20"
							style={{
								backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
							}}
						></div>
					</div>
				</div>

				{/* Floating Elements */}
				<div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full animate-bounce"></div>
				<div className="absolute bottom-20 right-10 w-16 h-16 bg-green-400/20 rounded-full animate-pulse"></div>
				<div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-ping"></div>
				<div className="absolute top-1/3 right-1/3 w-8 h-8 bg-yellow-300/30 rounded-full animate-bounce delay-1000"></div>

				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
						<div className="space-y-8 z-10">
							<div className="space-y-6">
								<Badge className="bg-yellow-500 hover:bg-yellow-500 text-black font-semibold animate-pulse inline-flex items-center gap-2">
									<Award className="h-4 w-4" />
									Licensed by CAC - July 2024
								</Badge>

								<h1 className="text-5xl lg:text-7xl font-bold leading-tight">
									<span className="block text-white">Premium</span>
									<span className="text-yellow-400 animate-fade-in-right">
										Africa's
									</span>
									<span className="block text-white">Exports</span>
								</h1>

								<p className="text-xl lg:text-2xl text-green-100 leading-relaxed max-w-2xl">
									Connecting Africa's finest agricultural products, Agro
									Industrial Raw Material and Food ingredient to global markets
									with uncompromising quality and reliable international
									shipping solutions.
								</p>
							</div>

							<div className="flex flex-col sm:flex-row gap-4">
								<Link href="/products">
									<Button
										size="lg"
										className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-4 text-lg group transform hover:scale-105 transition-all duration-300 shadow-lg"
									>
										<Package className="mr-2 h-5 w-5" />
										Explore Products
										<ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
									</Button>
								</Link>
								<Link href="/contact">
									<Button
										size="lg"
										variant="outline"
										className="border-2 border-white text-green hover:bg-white hover:text-green-800 px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
									>
										<Globe className="mr-2 h-5 w-5" />
										Get Export Quotes
									</Button>
								</Link>
							</div>

							{/* Enhanced Trust Indicators */}
							<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8 text-white">
								<div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-3">
									<CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
									<span className="text-sm font-medium">ISO Certified</span>
								</div>
								<div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-3">
									<Leaf className="h-5 w-5 text-green-400 flex-shrink-0" />
									<span className="text-sm font-medium">100% Organic</span>
								</div>
								<div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-3">
									<Ship className="h-5 w-5 text-green-400 flex-shrink-0" />
									<span className="text-sm font-medium">Global Shipping</span>
								</div>
								<div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-3">
									<Plane className="h-5 w-5 text-green-400 flex-shrink-0" />
									<span className="text-sm font-medium">Air Freight</span>
								</div>
							</div>
						</div>

						{/* Enhanced Hero Image */}
						<div className="relative lg:h-[600px] h-[400px]">
							<div className="relative z-10 h-full">
								<Image
									src="/images/export-hero.png"
									alt="Global Export - Nigerian Agricultural Products"
									fill
									className="object-cover rounded-2xl shadow-2xl"
									priority
									sizes="(max-width: 768px) 100vw, 50vw"
								/>

								{/* Overlay with export statistics */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl"></div>

								{/* Floating Stats Cards */}
								<div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
									<div className="text-center">
										<div className="text-2xl font-bold text-green-700">25+</div>
										<div className="text-sm text-gray-600">Countries</div>
									</div>
								</div>

								<div className="absolute top-6 right-6 bg-yellow-500/95 backdrop-blur-sm rounded-xl p-4 shadow-lg animate-pulse">
									<div className="text-center">
										<div className="text-2xl font-bold text-black">1000+</div>
										<div className="text-sm text-black">Tons Exported</div>
									</div>
								</div>
							</div>

							{/* Background decorative elements */}
							<div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-yellow-500/20 rounded-2xl transform rotate-3 scale-105"></div>
							<div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400/30 rounded-full animate-spin-slow"></div>
							<div className="absolute -bottom-4 -left-4 w-20 h-20 bg-green-400/30 rounded-full animate-pulse"></div>
						</div>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section ref={statsRef} className="py-16 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
						{[
							{ value: "15+", label: "Product Categories", icon: Package },
							{ value: "25+", label: "Countries Served", icon: Globe },
							{ value: "1000+", label: "Tons Exported", icon: Truck },
							{ value: "100%", label: "Quality Assured", icon: Shield },
						].map((stat, index) => (
							<div key={index} className="text-center group cursor-pointer">
								<div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 group-hover:bg-green-200 transition-colors">
									<stat.icon className="h-8 w-8 text-green-600" />
								</div>
								<div className="text-3xl font-bold text-green-700 mb-2 group-hover:scale-110 transition-transform">
									{stat.value}
								</div>
								<div className="text-gray-600">{stat.label}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Featured Products */}
			<section ref={productsRef} className="py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<Badge className="mb-4 bg-green-100 text-green-800">
							Premium Quality
						</Badge>
						<h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
							Featured Products
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Discover our premium selection of Nigerian agricultural products,
							carefully processed and packaged for global markets with
							guaranteed quality and authenticity.
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
						{featuredProducts.map((product, index) => (
							<Card
								key={index}
								className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
							>
								<CardHeader className="p-0">
									<div className="relative overflow-hidden rounded-t-lg">
										<Image
											src={product.image || "/placeholder.svg"}
											alt={product.name}
											width={300}
											height={300}
											className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
											loading="lazy"
										/>
										<div className="absolute top-2 left-2 flex flex-col gap-1">
											<Badge className="bg-green-600">{product.category}</Badge>
										</div>
										<div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 rounded px-2 py-1">
											<Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
											<span className="text-xs font-medium">
												{product.rating}
											</span>
										</div>
										<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
									</div>
								</CardHeader>
								<CardContent className="p-6">
									<CardTitle className="text-lg mb-2 group-hover:text-green-700 transition-colors">
										{product.name}
									</CardTitle>
									<CardDescription className="text-sm text-gray-600 mb-4 line-clamp-2">
										{product.description}
									</CardDescription>
									<div className="flex items-center justify-between">
										<span className="text-lg font-bold text-green-700">
											{product.price}
										</span>
										<Button
											variant="outline"
											size="sm"
											className="group-hover:bg-green-50 group-hover:border-green-200"
										>
											View Details
										</Button>
									</div>
								</CardContent>
							</Card>
						))}
					</div>

					<div className="text-center mt-12">
						<Link href="/products">
							<Button
								size="lg"
								className="bg-green-700 hover:bg-green-800 group transform hover:scale-105 transition-all duration-200"
							>
								View All Products
								<ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
							</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* Services Section */}
			<section ref={servicesRef} className="py-20 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<Badge className="mb-4 bg-blue-100 text-blue-800">
							Our Expertise
						</Badge>
						<h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
							Our Services
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Comprehensive solutions for agro-industrial raw materials from
							processing to global distribution with unmatched quality and
							reliability.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{services.map((service, index) => (
							<Card
								key={index}
								className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
							>
								<div className="relative h-48 overflow-hidden">
									<Image
										src={service.image || "/placeholder.svg"}
										alt={service.title}
										width={600}
										height={300}
										className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
										loading="lazy"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
									<div className="absolute bottom-4 left-4">
										<div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full">
											{service.icon}
										</div>
									</div>
								</div>
								<CardContent className="p-6">
									<h3 className="text-xl font-semibold mb-3 group-hover:text-green-700 transition-colors">
										{service.title}
									</h3>
									<p className="text-gray-600 leading-relaxed">
										{service.description}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className="py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<Badge className="mb-4 bg-purple-100 text-purple-800">
							Client Success
						</Badge>
						<h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
							What Our Clients Say
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Trusted by businesses worldwide for our commitment to quality and
							exceptional service.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{testimonials.map((testimonial, index) => (
							<Card
								key={index}
								className="hover:shadow-lg transition-shadow duration-300"
							>
								<CardContent className="p-6">
									<div className="flex items-center mb-4">
										{[...Array(testimonial.rating)].map((_, i) => (
											<Star
												key={i}
												className="h-4 w-4 fill-yellow-400 text-yellow-400"
											/>
										))}
									</div>
									<p className="text-gray-600 mb-4 italic">
										"{testimonial.content}"
									</p>
									<div>
										<p className="font-semibold text-gray-900">
											{testimonial.name}
										</p>
										<p className="text-sm text-gray-500">
											{testimonial.company}
										</p>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Certifications Section */}
			<section className="py-16 bg-green-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							Quality Certifications
						</h2>
						<p className="text-gray-600">
							Certified excellence in every aspect of our operations
						</p>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
						{certifications.map((cert, index) => (
							<div key={index} className="text-center group">
								<div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md group-hover:shadow-lg transition-shadow">
									<Award className="h-10 w-10 text-green-600" />
								</div>
								<h3 className="font-semibold text-gray-900">{cert.name}</h3>
								<p className="text-sm text-gray-600">{cert.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-gradient-to-r from-green-700 to-green-800 text-white relative overflow-hidden">
				<div className="absolute inset-0 bg-black/10"></div>
				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<div className="space-y-8">
						<div>
							<h2 className="text-4xl lg:text-5xl font-bold mb-6">
								Ready to Partner with Us?
							</h2>
							<p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
								Join our global network of partners and access premium Nigerian
								agricultural products with guaranteed quality and reliable
								delivery. Let's grow together.
							</p>
						</div>

						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link href="/contact">
								<Button
									size="lg"
									className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transform hover:scale-105 transition-all duration-200 group"
								>
									<Heart className="mr-2 h-5 w-5" />
									Request Quote
									<Zap className="ml-2 h-5 w-5 group-hover:animate-pulse" />
								</Button>
							</Link>
							<Button
								size="lg"
								variant="outline"
								className="border-white text-green-800 hover:bg-white hover:text-green-800 transform hover:scale-105 transition-all duration-200"
							>
								Download Catalog
							</Button>
						</div>

						{/* Contact Info */}
						<div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 pt-8">
							<div className="flex items-center space-x-2">
								<Mail className="h-5 w-5" />
								<span>chuzolglobal@gmail.com</span>
							</div>
							<div className="flex items-center space-x-2">
								<MessageCircle className="h-5 w-5" />
								<span>+234 806 834 0120</span>
							</div>
						</div>
					</div>
				</div>

				{/* Floating Animation Elements */}
				<div className="absolute top-10 left-10 w-6 h-6 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
				<div className="absolute bottom-10 right-10 w-8 h-8 bg-green-400 rounded-full animate-bounce opacity-60"></div>
			</section>

			<Footer />

			{/* Fixed Contact Buttons (Mobile) */}
			<div className="fixed bottom-4 right-4 flex flex-col space-y-2 md:hidden z-50">
				<Button
					size="sm"
					className="bg-green-600 hover:bg-green-700 rounded-full p-3 animate-bounce shadow-lg"
				>
					<MessageCircle className="h-5 w-5" />
				</Button>
				<Button
					size="sm"
					className="bg-blue-600 hover:bg-blue-700 rounded-full p-3 hover:scale-110 transition-transform shadow-lg"
				>
					<Facebook className="h-5 w-5" />
				</Button>
				<Button
					size="sm"
					className="bg-gray-600 hover:bg-gray-700 rounded-full p-3 hover:scale-110 transition-transform shadow-lg"
				>
					<Mail className="h-5 w-5" />
				</Button>
			</div>

			{/* Custom CSS for animations */}
			<style jsx>{`
				@keyframes fade-in-up {
					from {
						opacity: 0;
						transform: translateY(30px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes fade-in-right {
					from {
						opacity: 0;
						transform: translateX(-30px);
					}
					to {
						opacity: 1;
						transform: translateX(0);
					}
				}

				@keyframes spin-slow {
					from {
						transform: rotate(0deg);
					}
					to {
						transform: rotate(360deg);
					}
				}

				.animate-fade-in-up {
					animation: fade-in-up 0.8s ease-out forwards;
				}

				.animate-fade-in-right {
					animation: fade-in-right 0.8s ease-out 0.3s forwards;
					opacity: 0;
				}

				.animate-spin-slow {
					animation: spin-slow 3s linear infinite;
				}
			`}</style>
		</div>
	);
}
