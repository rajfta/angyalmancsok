import { motion } from "framer-motion";
import type { FC } from "react";

interface PartnersProps {
	partners: {
		id: string;
		name: string;
		logo: string;
		website?: string | undefined;
	}[];
}

const Partners: FC<PartnersProps> = ({ partners }) => {
	return (
		<section className="container-padding py-16 md:py-24 bg-bg">
			<motion.h2
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				className="text-center mb-12 text-primary-700"
			>
				Partnereink és Támogatóink
			</motion.h2>

			<div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{partners.map((partner, index) => {
					const CardWrapper = partner.website ? "a" : "div";
					const cardProps = partner.website
						? {
								href: partner.website,
								target: "_blank",
								rel: "noopener noreferrer",
							}
						: {};

					return (
						<motion.div
							key={partner.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							<CardWrapper
								{...cardProps}
								className="bg-bg-highlight rounded-xl p-6 shadow-md border border-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl h-full flex flex-col items-center justify-center group"
							>
								<div className="w-full aspect-square flex items-center justify-center mb-4">
									<img
										src={partner.logo}
										alt={partner.name}
										className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
									/>
								</div>
								<h3 className="text-center text-sm font-medium text-text-description group-hover:text-primary-600 transition-colors">
									{partner.name}
								</h3>
							</CardWrapper>
						</motion.div>
					);
				})}
			</div>
		</section>
	);
};

export default Partners;
