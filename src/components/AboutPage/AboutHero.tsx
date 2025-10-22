import { motion } from "framer-motion";
import type { FC } from "react";

const AboutHero: FC = () => {
	return (
		<section className="relative overflow-hidden">
			{/* Gradient Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-accent-200 via-primary-200 to-accent -z-10" />

			{/* Content */}
			<div className="container-padding py-24 md:py-32 lg:py-40">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
					className="max-w-4xl mx-auto text-center"
				>
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
						className="text-text mb-6 text-4xl"
					>
						Rólunk
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
						className="text-lg md:text-xl text-text/90 leading-relaxed"
					>
						Ismerd meg az AngyalMancsok Alapítványt, küldetésünket,
						történetünket és azt a csodálatos csapatot, amely napról napra
						örömet és gyógyulást visz az emberek életébe.
					</motion.p>
				</motion.div>
			</div>

			{/* Decorative Wave at Bottom */}
			<div className="absolute bottom-0 left-0 right-0">
				<svg
					viewBox="0 0 1440 120"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="w-full h-auto"
				>
					<title>Decorative Wave</title>
					<path
						d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
						fill="#f3ede1"
					/>
				</svg>
			</div>
		</section>
	);
};

export default AboutHero;
