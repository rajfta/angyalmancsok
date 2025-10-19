import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import type { FC } from "react";

interface VisionSectionProps {
	title: string;
	content: string;
	image?: string;
}

const VisionSection: FC<VisionSectionProps> = ({ title, content, image }) => {
	return (
		<section className="bg-gradient-to-br from-primary-100 to-primary-200 py-20 md:py-32">
			<div className="container-padding">
				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
						{/* Text Content - Left */}
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, margin: "-100px" }}
							transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
							className="order-2 lg:order-1"
						>
							<div className="flex items-center gap-4 mb-6">
								<div className="p-4 bg-primary-500 rounded-2xl shadow-lg">
									<Eye className="w-8 h-8 text-white" />
								</div>
								<h2 className="text-primary-800 text-3xl md:text-4xl lg:text-5xl font-bold">
									{title}
								</h2>
							</div>
							<p className="text-lg md:text-xl text-primary-900/80 leading-relaxed">
								{content}
							</p>
						</motion.div>

						{/* Image - Right */}
						<motion.div
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, margin: "-100px" }}
							transition={{
								duration: 0.8,
								ease: [0.22, 1, 0.36, 1],
								delay: 0.2,
							}}
							className="order-1 lg:order-2"
						>
							<div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
								{image ? (
									<img
										src={image}
										alt={title}
										className="w-full h-full object-cover"
									/>
								) : (
									<div className="w-full h-full bg-gradient-to-br from-primary-300 to-primary-500 flex items-center justify-center">
										<Eye className="w-24 h-24 text-white/30" />
									</div>
								)}
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default VisionSection;
