import {
  Target,
  Rocket,
  Brain,
  Shield,
  Zap,
  CheckCircle,
} from "lucide-react";
import { useState, useEffect } from "react";

const features = [
	{
		icon: Brain,
		title: "AI-Powered Analysis",
		description:
			"Advanced machine learning algorithms analyze your spending patterns and provide personalized insights.",
		gradient: "from-blue-400 to-cyan-300",
		delay: "0ms",
	},
	{
		icon: Target,
		title: "Financial Runway",
		description:
			"Calculate exactly how long your money will last based on current spending habits and income.",
		gradient: "from-indigo-400 to-purple-400",
		delay: "100ms",
	},
	{
		icon: Rocket,
		title: "Smart Recommendations",
		description:
			"Get actionable insights to optimize spending and accelerate your savings growth.",
		gradient: "from-purple-400 to-pink-300",
		delay: "200ms",
	},
	{
		icon: Shield,
		title: "Bank-Level Security",
		description:
			"Your data is encrypted and processed securely. We never store your financial information.",
		gradient: "from-green-400 to-emerald-300",
		delay: "300ms",
	},
	{
		icon: Zap,
		title: "Instant Processing",
		description:
			"Upload your statement and get comprehensive analysis in seconds, not hours.",
		gradient: "from-yellow-400 to-orange-300",
		delay: "400ms",
	},
	{
		icon: CheckCircle,
		title: "Actionable Reports",
		description:
			"Detailed reports with specific steps you can take to improve your financial health.",
		gradient: "from-teal-400 to-cyan-300",
		delay: "500ms",
	},
];

export function FeaturesSection() {
	const [scrollY, setScrollY] = useState(0);
	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<section
			id="features"
			className="relative px-6 py-14 overflow-hidden bg-white"
			style={{ transform: `translateY(${scrollY * 0.04}px)` }}
		>
			{/* checkered background like Hero */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 -z-10"
				style={{
					backgroundImage:
						"repeating-linear-gradient(0deg, rgba(2,6,23,0.03) 0 1px, transparent 2px 120px), repeating-linear-gradient(90deg, rgba(2,6,23,0.03) 0 1px, transparent 2px 120px)",
					backgroundSize: "120px 120px, 120px 120px",
				}}
			>
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="w-full max-w-7xl px-6 py-8 h-full">
						<div className="grid grid-cols-8 gap-4 h-full">
							{Array.from({ length: 8 * 4 }).map((_, i) => {
								const isBlue = i % 4 === 0;
								return (
									<div
										key={i}
										className={`rounded-lg w-full pointer-events-none transition-all transform ${
											isBlue
												? "bg-gradient-to-br from-blue-400/20 to-cyan-200/10 border border-blue-200/30 shadow-sm"
												: "bg-white/40 border border-slate-100/40"
										}`}
										style={{ height: "120px" }}
									/>
								);
							})}
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto relative">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Powerful Features for
						<span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent block">
							Smart Money Management
						</span>
					</h2>
					<p className="text-md text-slate-600 max-w-3xl mx-auto">
						Our AI analyzes your spending patterns and provides actionable
						insights to help you make better financial decisions.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{features.map((feature, index) => (
						<div
							key={index}
							className="group bg-white/90 border border-slate-100 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300"
							style={{ animationDelay: feature.delay }}
						>
							<div
								className={`bg-gradient-to-r ${feature.gradient} p-3 rounded-xl w-fit mb-5 text-white shadow-sm`}
							>
								<feature.icon className="h-5 w-5 text-white" />
							</div>
							<h3 className="text-xl font-semibold text-slate-800 mb-3">
								{feature.title}
							</h3>
							<p className="text-slate-600 leading-relaxed">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
