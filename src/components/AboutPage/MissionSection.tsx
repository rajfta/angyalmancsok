import { motion } from "framer-motion";
import { Heart, Shield, Sparkles, Users } from "lucide-react";
import type { FC } from "react";

interface MissionSectionProps {
	title: string;
	content: string;
	image?: string;
}

const MissionSection: FC<MissionSectionProps> = ({ title, content, image }) => {
	const values = [
		{
			icon: Heart,
			label: "Szeretet",
			color: "text-accent-600",
			bgColor: "bg-accent-100",
		},
		{
			icon: Shield,
			label: "Professzionalitás",
			color: "text-primary-600",
			bgColor: "bg-primary-100",
		},
		{
			icon: Sparkles,
			label: "Minőség",
			color: "text-amber-600",
			bgColor: "bg-amber-100",
		},
		{
			icon: Users,
			label: "Közösség",
			color: "text-green-600",
			bgColor: "bg-green-100",
		},
	];

	return (
		<section className="bg-gradient-to-br from-accent-50 via-accent-100 to-accent-200 py-20 md:py-32">
			<div className="container-padding">
				<div className="max-w-5xl mx-auto">
					{/* Centered Content */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-100px" }}
						transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
						className="text-center mb-16"
					>
						<div className="flex items-center justify-center gap-4 mb-6">
							<div className="p-4 bg-accent rounded-2xl shadow-lg">
								<Heart className="w-8 h-8 text-white" />
							</div>
							<h2 className="text-accent-900 text-3xl md:text-4xl lg:text-5xl font-bold">
								{title}
							</h2>
						</div>
						<p className="text-lg md:text-xl text-accent-900/80 leading-relaxed max-w-3xl mx-auto">
							{content}
						</p>
					</motion.div>

					{/* Optional Image */}
					{image && (
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true, margin: "-100px" }}
							transition={{
								duration: 0.8,
								ease: [0.22, 1, 0.36, 1],
								delay: 0.2,
							}}
							className="mb-16"
						>
							<div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl">
								<img
									src={image}
									alt={title}
									className="w-full h-full object-cover"
								/>
							</div>
						</motion.div>
					)}

					{/* Values Grid */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-100px" }}
						transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
						className="grid grid-cols-2 md:grid-cols-4 gap-6"
					>
						{values.map((value, index) => (
							<motion.div
								key={value.label}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-50px" }}
								transition={{
									duration: 0.5,
									ease: [0.22, 1, 0.36, 1],
									delay: 0.4 + index * 0.1,
								}}
								className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
							>
								<div className={`p-3 ${value.bgColor} rounded-xl mb-3`}>
									<value.icon className={`w-6 h-6 ${value.color}`} />
								</div>
								<span className="font-semibold text-text">{value.label}</span>
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default MissionSection;
