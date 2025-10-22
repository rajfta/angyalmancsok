import { motion } from "framer-motion";
import { Heart, Mail, Sparkles } from "lucide-react";
import type { FC } from "react";

interface ContactHeroProps {
	title?: string | undefined;
	description?: string | undefined;
}

const ContactHero: FC<ContactHeroProps> = ({
	title = "Csatlakozz Hozzánk!",
	description = "Legyél része egy különleges közösségnek, ahol együtt segíthetünk másokon"
}) => {
	const ctaCards = [
		{
			icon: Sparkles,
			title: "Jelentkezés",
			description: "Szeretnél terápiás kutyát képezni?",
			gradient: "from-primary-400 to-primary-600",
			iconBg: "bg-primary-100",
			iconColor: "text-primary-600",
			href: "#jelentkezes",
		},
		{
			icon: Heart,
			title: "Önkéntesség",
			description: "Segíts nekünk a munkánkban!",
			gradient: "from-accent-400 to-accent-600",
			iconBg: "bg-accent-100",
			iconColor: "text-accent-600",
			href: "#onkentesseg",
		},
		{
			icon: Mail,
			title: "Kapcsolat",
			description: "Írj nekünk bármilyen kérdéssel",
			gradient: "from-secondary-400 to-secondary-600",
			iconBg: "bg-secondary-100",
			iconColor: "text-secondary-700",
			href: "#kapcsolat-form",
		},
	];

	const scrollToSection = (href: string) => {
		const element = document.querySelector(href);
		element?.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<section className="relative container-padding py-24 md:py-24 overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 -z-10 opacity-5">
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 15 Q35 20, 30 25 Q25 20, 30 15 M20 25 Q22 28, 20 30 Q18 28, 20 25 M40 25 Q42 28, 40 30 Q38 28, 40 25 M30 30 Q32 35, 30 40 Q28 35, 30 30' fill='%2381b3c9' opacity='0.4'/%3E%3C/svg%3E")`,
						backgroundSize: "60px 60px",
					}}
				/>
			</div>

			{/* Content */}
			<div className="max-w-6xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-700 mb-4">
						{title}
					</h1>
					<p className="text-lg md:text-xl text-text-description max-w-2xl mx-auto">
						{description}
					</p>
				</motion.div>

				{/* CTA Cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
					{ctaCards.map((card, index) => (
						<motion.button
							key={card.title}
							type="button"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.5,
								delay: 0.2 + index * 0.1,
								ease: [0.22, 1, 0.36, 1],
							}}
							whileHover={{ y: -8, scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onClick={() => scrollToSection(card.href)}
							className="group relative bg-bg-highlight rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden text-left"
						>
							{/* Gradient Background on Hover */}
							<div
								className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
							/>

							{/* Icon */}
							<div
								className={`${card.iconBg} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
							>
								<card.icon className={`w-8 h-8 ${card.iconColor}`} />
							</div>

							{/* Content */}
							<h3 className="text-2xl font-bold text-text-heading mb-2 group-hover:text-primary-700 transition-colors">
								{card.title}
							</h3>
							<p className="text-text-description">{card.description}</p>

							{/* Arrow Icon */}
							<div className="mt-4 flex items-center gap-2 text-primary-500 font-medium group-hover:gap-3 transition-all">
								<span>Tovább</span>
								<svg
									className="w-5 h-5 group-hover:translate-x-1 transition-transform"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17 8l4 4m0 0l-4 4m4-4H3"
									/>
								</svg>
							</div>
						</motion.button>
					))}
				</div>
			</div>
		</section>
	);
};

export default ContactHero;
