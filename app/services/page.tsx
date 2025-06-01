"use client"
import {
  Package,
  Globe,
  Truck,
  Shield,
  Factory,
  Leaf,
  Users,
  CheckCircle,
  ArrowRight,
  Clock,
  Award,
  Target,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const services = [
	{
		icon: <Factory className="h-12 w-12 text-green-600" />,
		title: "Processing & Packaging",
		description:
			"State-of-the-art processing facilities with modern equipment for cleaning, sorting, and packaging.",
		features: [
			"Advanced cleaning and sorting technology",
			"Hygienic processing environments",
			"Custom packaging solutions",
			"Quality control at every stage",
		],
		image: "/placeholder.svg?height=300&width=400",
	},
	{
		icon: <Globe className="h-12 w-12 text-green-600" />,
		title: "International Export",
		description:
			"Comprehensive export services connecting Nigerian agriculture to global markets.",
		features: [
			"Export documentation handling",
			"International shipping coordination",
			"Customs clearance assistance",
			"Global market penetration",
		],
		image: "/placeholder.svg?height=300&width=400",
	},
	{
		icon: <Truck className="h-12 w-12 text-green-600" />,
		title: "Local Distribution",
		description:
			"Efficient distribution network covering all major cities and regions across Africa.",
		features: [
			"Nationwide delivery network",
			"Cold chain logistics",
			"Real-time tracking",
			"Flexible delivery options",
		],
		image: "/placeholder.svg?height=300&width=400",
	},
	{
		icon: <Shield className="h-12 w-12 text-green-600" />,
		title: "Quality Assurance",
		description:
			"Rigorous quality control processes ensuring products meet international standards.",
		features: [
			"ISO certified processes",
			"Laboratory testing",
			"Traceability systems",
			"Continuous monitoring",
		],
		image: "/placeholder.svg?height=300&width=400",
	},
	{
		icon: <Leaf className="h-12 w-12 text-green-600" />,
		title: "Sustainable Sourcing",
		description:
			"Ethical sourcing practices supporting local farmers and sustainable agriculture.",
		features: [
			"Direct farmer partnerships",
			"Sustainable farming practices",
			"Fair trade principles",
			"Community development",
		],
		image: "/placeholder.svg?height=300&width=400",
	},
	{
		icon: <Users className="h-12 w-12 text-green-600" />,
		title: "Consultation Services",
		description:
			"Expert consultation on agricultural export processes and market entry strategies.",
		features: [
			"Market analysis and research",
			"Export strategy development",
			"Regulatory compliance guidance",
			"Business development support",
		],
		image: "/placeholder.svg?height=300&width=400",
	},
];

const processSteps = [
	{
		step: "01",
		title: "Sourcing",
		description:
			"We source premium quality raw materials directly from trusted farmers across Africa.",
		icon: <Leaf className="h-8 w-8 text-green-600" />,
	},
	{
		step: "02",
		title: "Processing",
		description:
			"Advanced processing techniques ensure optimal quality while preserving natural properties.",
		icon: <Factory className="h-8 w-8 text-green-600" />,
	},
	{
		step: "03",
		title: "Quality Control",
		description:
			"Rigorous testing and quality assurance at every stage of the production process.",
		icon: <Shield className="h-8 w-8 text-green-600" />,
	},
	{
		step: "04",
		title: "Packaging",
		description:
			"Professional packaging designed to maintain product integrity during transportation.",
		icon: <Package className="h-8 w-8 text-green-600" />,
	},
	{
		step: "05",
		title: "Export",
		description:
			"Efficient export processes with full documentation and logistics support.",
		icon: <Globe className="h-8 w-8 text-green-600" />,
	},
];

const certifications = [
  { name: "ISO 9001:2015", description: "Quality Management System" },
  { name: "HACCP", description: "Hazard Analysis Critical Control Points" },
  { name: "CAC Licensed", description: "Nigeria Corporate Affairs Commission" },
  { name: "Export License", description: "Nigerian Export Promotion Council" },
]

export default function ServicesPage() {
  return (
		<div className="min-h-screen bg-white">
			<Navbar />

			{/* Hero Section */}
			<section className="relative bg-gradient-to-r from-green-700 to-green-800 text-white py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<Badge className="mb-4 bg-green-600 hover:bg-green-600 animate-bounce">
							Comprehensive Solutions
						</Badge>
						<h1 className="text-4xl lg:text-6xl font-bold mb-6">
							Our
							<span className="block text-yellow-400">Services</span>
						</h1>
						<p className="text-xl text-green-100 max-w-3xl mx-auto">
							End-to-end agricultural export services from sourcing to global
							delivery, ensuring quality and reliability at every step.
						</p>
					</div>
				</div>
			</section>

			{/* Services Grid */}
			<section className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							What We Offer
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Comprehensive services designed to meet all your agricultural
							export needs with excellence and reliability.
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{services.map((service, index) => (
							<Card
								key={index}
								className="hover:shadow-xl transition-all duration-300 group"
							>
								<CardContent className="p-6">
									<div className="flex items-start space-x-4">
										<div className="flex-shrink-0">
											<div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
												{service.icon}
											</div>
										</div>
										<div className="flex-1">
											<h3 className="text-xl font-semibold text-gray-900 mb-2">
												{service.title}
											</h3>
											<p className="text-gray-600 mb-4">
												{service.description}
											</p>
											<ul className="space-y-2">
												{service.features.map((feature, featureIndex) => (
													<li
														key={featureIndex}
														className="flex items-center text-sm text-gray-600"
													>
														<CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
														{feature}
													</li>
												))}
											</ul>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Process Section */}
			<section className="py-16 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							Our Process
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							A systematic approach ensuring quality and efficiency from farm to
							global markets.
						</p>
					</div>

					<div className="relative">
						{/* Process Steps */}
						<div className="grid grid-cols-1 md:grid-cols-5 gap-8">
							{processSteps.map((step, index) => (
								<div key={index} className="text-center relative">
									<div className="relative">
										<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300">
											{step.icon}
										</div>
										<div className="absolute -top-2 -right-2 w-8 h-8 bg-green-700 text-white rounded-full flex items-center justify-center text-sm font-bold">
											{step.step}
										</div>
									</div>
									<h3 className="text-lg font-semibold text-gray-900 mb-2">
										{step.title}
									</h3>
									<p className="text-sm text-gray-600">{step.description}</p>
									
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Certifications */}
			<section className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							Certifications & Standards
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Our commitment to quality is backed by international
							certifications and compliance standards.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{certifications.map((cert, index) => (
							<Card
								key={index}
								className="text-center hover:shadow-lg transition-all duration-300 group"
							>
								<CardContent className="pt-6">
									<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
										<Award className="h-8 w-8 text-green-600" />
									</div>
									<h3 className="text-lg font-semibold text-gray-900 mb-2">
										{cert.name}
									</h3>
									<p className="text-sm text-gray-600">{cert.description}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Why Choose Us */}
			<section className="py-16 bg-green-700 text-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold mb-4">
							Why Choose Chuzol Global?
						</h2>
						<p className="text-xl text-green-100 max-w-3xl mx-auto">
							Experience the difference of working with Africa's premier
							agricultural export company.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="text-center">
							<div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300">
								<Clock className="h-8 w-8" />
							</div>
							<h3 className="text-xl font-semibold mb-3">Timely Delivery</h3>
							<p className="text-green-100">
								Reliable delivery schedules with real-time tracking and updates
								throughout the shipping process.
							</p>
						</div>

						<div className="text-center">
							<div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300">
								<Target className="h-8 w-8" />
							</div>
							<h3 className="text-xl font-semibold mb-3">Quality Focus</h3>
							<p className="text-green-100">
								Unwavering commitment to quality with rigorous testing and
								quality assurance at every stage.
							</p>
						</div>

						<div className="text-center">
							<div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300">
								<Users className="h-8 w-8" />
							</div>
							<h3 className="text-xl font-semibold mb-3">Expert Support</h3>
							<p className="text-green-100">
								Dedicated customer support team with deep expertise in
								agricultural exports and international trade.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">
						Ready to Get Started?
					</h2>
					<p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
						Contact us today to discuss your agricultural export needs and
						discover how we can help your business grow.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button size="lg" className="bg-green-700 hover:bg-green-800">
							Request Quote
						</Button>
						<Button size="lg" variant="outline">
							Download Brochure
						</Button>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
