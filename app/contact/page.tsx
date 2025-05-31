"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Facebook, Globe } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

const contactInfo = [
	{
		icon: <MapPin className="h-6 w-6 text-green-600" />,
		title: "Head Office",
		details: [
			"No 7 Amadi Ejekwu Close,",
			"Port-Harcourt, River State",
			"Nigeria",
		],
	},
	{
		icon: <Phone className="h-6 w-6 text-green-600" />,
		title: "Phone Numbers",
		details: ["+234 806 834 0120", "WhatsApp: +234 806 834 0120"],
	},
	{
		icon: <Mail className="h-6 w-6 text-green-600" />,
		title: "Email Addresses",
		details: ["chuzolglobal@gmail.com", "oliver@chuzolglobal.com"],
	},
	{
		icon: <Clock className="h-6 w-6 text-green-600" />,
		title: "Business Hours",
		details: [
			"Mon - Fri: 8:00 AM - 6:00 PM WAT",
			"Saturday: 8:00 AM - 6:00 PM WAT",
			"Sunday: 12:00 pm - 6:00 PM WAT",
		],
	},
];

const socialLinks = [
  {
    icon: <Facebook className="h-5 w-5" />,
    name: "Facebook",
    url: "#",
    color: "hover:text-blue-600",
  },
  {
    icon: <MessageCircle className="h-5 w-5" />,
    name: "WhatsApp",
    url: "#",
    color: "hover:text-green-600",
  },
  {
    icon: <Mail className="h-5 w-5" />,
    name: "Email",
    url: "#",
    color: "hover:text-red-600",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    name: "Website",
    url: "#",
    color: "hover:text-blue-500",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    inquiryType: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setShowSuccess(true)
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: "",
      inquiryType: "",
    })

    // Hide success message after 5 seconds
    setTimeout(() => setShowSuccess(false), 5000)
  }

  return (
		<div className="min-h-screen bg-white">
			<Navbar />

			{/* Hero Section */}
			<section className="relative bg-gradient-to-r from-green-700 to-green-800 text-white py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<Badge className="mb-4 bg-green-600 hover:bg-green-600 animate-pulse">
							Get in Touch
						</Badge>
						<h1 className="text-4xl lg:text-6xl font-bold mb-6">
							Contact
							<span className="block text-yellow-400">Us</span>
						</h1>
						<p className="text-xl text-green-100 max-w-3xl mx-auto">
							Ready to start your agricultural export journey? We're here to
							help you every step of the way.
						</p>
					</div>
				</div>
			</section>

			{/* Contact Information */}
			<section className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							Get in Touch
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Multiple ways to reach us. Choose the method that works best for
							you.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
						{contactInfo.map((info, index) => (
							<Card
								key={index}
								className="text-center hover:shadow-lg transition-all duration-300 group"
							>
								<CardContent className="pt-6">
									<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
										{info.icon}
									</div>
									<h3 className="text-lg font-semibold text-gray-900 mb-3">
										{info.title}
									</h3>
									<div className="space-y-1">
										{info.details.map((detail, detailIndex) => (
											<p key={detailIndex} className="text-sm text-gray-600">
												{detail}
											</p>
										))}
									</div>
								</CardContent>
							</Card>
						))}
					</div>

					{/* Contact Form and Map */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
						{/* Contact Form */}
						<Card>
							<CardHeader>
								<CardTitle className="text-2xl">Send us a Message</CardTitle>
								<CardDescription>
									Fill out the form below and we'll get back to you within 24
									hours.
								</CardDescription>
							</CardHeader>
							<CardContent>
								{showSuccess && (
									<Alert className="mb-6 border-green-200 bg-green-50">
										<AlertDescription className="text-green-800">
											Thank you for your message! We'll get back to you within
											24 hours.
										</AlertDescription>
									</Alert>
								)}

								<form onSubmit={handleSubmit} className="space-y-4">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<Label htmlFor="name">Full Name *</Label>
											<Input
												id="name"
												value={formData.name}
												onChange={(e) =>
													handleInputChange("name", e.target.value)
												}
												required
											/>
										</div>
										<div>
											<Label htmlFor="email">Email Address *</Label>
											<Input
												id="email"
												type="email"
												value={formData.email}
												onChange={(e) =>
													handleInputChange("email", e.target.value)
												}
												required
											/>
										</div>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<Label htmlFor="phone">Phone Number</Label>
											<Input
												id="phone"
												type="tel"
												value={formData.phone}
												onChange={(e) =>
													handleInputChange("phone", e.target.value)
												}
											/>
										</div>
										<div>
											<Label htmlFor="company">Company Name</Label>
											<Input
												id="company"
												value={formData.company}
												onChange={(e) =>
													handleInputChange("company", e.target.value)
												}
											/>
										</div>
									</div>

									<div>
										<Label htmlFor="inquiryType">Inquiry Type</Label>
										<Select
											value={formData.inquiryType}
											onValueChange={(value) =>
												handleInputChange("inquiryType", value)
											}
										>
											<SelectTrigger>
												<SelectValue placeholder="Select inquiry type" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="general">General Inquiry</SelectItem>
												<SelectItem value="quote">Request Quote</SelectItem>
												<SelectItem value="partnership">Partnership</SelectItem>
												<SelectItem value="support">
													Customer Support
												</SelectItem>
												<SelectItem value="bulk">Bulk Orders</SelectItem>
											</SelectContent>
										</Select>
									</div>

									<div>
										<Label htmlFor="subject">Subject *</Label>
										<Input
											id="subject"
											value={formData.subject}
											onChange={(e) =>
												handleInputChange("subject", e.target.value)
											}
											required
										/>
									</div>

									<div>
										<Label htmlFor="message">Message *</Label>
										<Textarea
											id="message"
											rows={5}
											value={formData.message}
											onChange={(e) =>
												handleInputChange("message", e.target.value)
											}
											placeholder="Tell us about your requirements..."
											required
										/>
									</div>

									<Button
										type="submit"
										className="w-full bg-green-700 hover:bg-green-800"
										size="lg"
										disabled={isSubmitting}
									>
										{isSubmitting ? (
											<div className="flex items-center gap-2">
												<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
												Sending...
											</div>
										) : (
											<div className="flex items-center gap-2">
												<Send className="h-4 w-4" />
												Send Message
											</div>
										)}
									</Button>
								</form>
							</CardContent>
						</Card>

						{/* Map and Additional Info */}
						<div className="space-y-8">
							{/* Map Placeholder */}
							<Card>
								<CardHeader>
									<CardTitle>Our Location</CardTitle>
									<CardDescription>
										Visit us at our head office in Lagos, Nigeria
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
										<div className="text-center">
											<MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-bounce" />
											<p className="text-gray-500">
												Interactive map would be integrated here
											</p>
											<p className="text-sm text-gray-400">
												Google Maps or similar service
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Social Media */}
							<Card>
								<CardHeader>
									<CardTitle>Connect with Us</CardTitle>
									<CardDescription>
										Follow us on social media for updates and news
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="flex space-x-4">
										{socialLinks.map((social, index) => (
											<a
												key={index}
												href={social.url}
												className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-all duration-300 hover:scale-110 ${social.color}`}
											>
												{social.icon}
											</a>
										))}
									</div>
								</CardContent>
							</Card>

							{/* Quick Contact */}
							<Card>
								<CardHeader>
									<CardTitle>Quick Contact</CardTitle>
									<CardDescription>Need immediate assistance?</CardDescription>
								</CardHeader>
								<CardContent className="space-y-3">
									<Button variant="outline" className="w-full justify-start">
										<Phone className="mr-2 h-4 w-4" />
										Call us: +234 806 834 0120
									</Button>
									<Button variant="outline" className="w-full justify-start">
										<MessageCircle className="mr-2 h-4 w-4" />
										WhatsApp: +234 806 834 0120
									</Button>
									<Button variant="outline" className="w-full justify-start">
										<Mail className="mr-2 h-4 w-4" />
										Email: chuzolglobal@gmail.com
									</Button>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section className="py-16 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							Frequently Asked Questions
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Quick answers to common questions about our services and
							processes.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<Card>
							<CardHeader>
								<CardTitle className="text-lg">
									What products do you export?
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600">
									We export a wide range of Nigerian agricultural products
									including bitter kola, shea butter, cashew nuts, hibiscus
									flowers, tiger nuts, and many more premium quality products.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-lg">
									What are your minimum order quantities?
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600">
									Minimum order quantities vary by 50kg to multiple tons. Generally, we
									require a minimum of 1 ton for most products. Contact us for
									specific requirements for your desired products.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-lg">
									What are your processing and packaging standard?
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600">
								  we process and package in accordance with customers specification
								  and in line with the regulatory standard of the receiving countries.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-lg">
									What are your payment terms?
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600">
									We offer flexible payment terms including Letter of Credit
									(LC), Telegraphic Transfer (TT), and other mutually agreed
									payment methods. Terms are discussed based on order size and
									customer relationship.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
