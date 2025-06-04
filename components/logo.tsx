"use client"

import { Globe, ArrowRight } from "lucide-react"
import Image from "next/image";
interface LogoProps {
  className?: string
  showText?: boolean
  size?: "sm" | "md" | "lg"
}

export function Logo({ className = "", showText = true, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }

  return (
		<div className={`flex items-center group ${className}`}>
			<div
				className={`flex items-center space-x-3 ${
					!showText ? "space-x-0" : ""
				}`}
			>
				{/* Logo Icon with Globe and Circling Arrow */}
				<div className="relative">
					<div
						className={`${sizeClasses[size]} bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105`}
					>
						<Image
							src="/images/chuzollogo.png"
							alt="Globe image"
							width={20}
							height={20}
							className="text-white object-contain"
						/>
					</div>
					{/* Circling Arrow Animation */}
					<div className="absolute -top-1 -right-1">
						<div
							className={`${
								size === "sm"
									? "w-4 h-4"
									: size === "md"
										? "w-5 h-5"
										: "w-6 h-6"
							} bg-yellow-400 rounded-full flex items-center justify-center animate-spin-slow`}
						>
							<ArrowRight
								className={`${
									size === "sm"
										? "h-2 w-2"
										: size === "md"
											? "h-2.5 w-2.5"
											: "h-3 w-3"
								} text-green-800 transform rotate-45`}
							/>
						</div>
					</div>
					{/* Pulsing Ring */}
					<div className="absolute inset-0 rounded-lg border-2 border-green-400 animate-pulse opacity-50"></div>
				</div>

				{/* Logo Text */}
				{showText && (
					<div className="flex flex-col">
						<h1
							className={`${textSizeClasses[size]} font-bold text-green-700 hover:text-green-800 transition-colors group-hover:scale-105 transform duration-200`}
						>
							Chuzol Global
						</h1>
						<p
							className={`${
								size === "sm" ? "text-xs" : "text-xs"
							} text-gray-600 font-medium`}
						>
							Services Limited
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
