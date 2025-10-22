import { motion } from "framer-motion";
import type { FC } from "react";

const AboutHero: FC = () => {
	return (
		<section className="relative container-padding py-20 md:py-24 overflow-hidden">
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

			<div className="relative max-w-4xl mx-auto text-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-700 mb-6">
						Rólunk
					</h1>
					<p className="text-lg md:text-xl text-text-description max-w-2xl mx-auto leading-relaxed">
						Ismerd meg az AngyalMancsok Alapítványt, küldetésünket,
						történetünket és azt a csodálatos csapatot, amely napról napra
						örömet és gyógyulást visz az emberek életébe.
					</p>
				</motion.div>
			</div>
		</section>
	);
};

export default AboutHero;
