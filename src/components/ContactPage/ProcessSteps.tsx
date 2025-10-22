import { motion } from "framer-motion";
import type { LucideProps } from "lucide-react";
import { Mail, MapPin, Phone, Sparkles } from "lucide-react";
import type { ComponentType, FC } from "react";

interface Step {
	title: string;
	description: string;
}

interface ProcessStep extends Step {
	number: number;
	icon: ComponentType<LucideProps>;
	gradient: string;
}

interface ProcessStepsProps {
	title?: string | undefined;
	description?: string | undefined;
	steps?: Step[] | undefined;
	content?: string | undefined;
}

const ProcessSteps: FC<ProcessStepsProps> = ({
	title = "4 Lépésben Hozzánk",
	description = "Egyszerű folyamat, amely során végig támogatunk és segítünk minden lépésben.",
	steps: customSteps,
	content,
}) => {
	const defaultSteps = [
		{
			title: "Kapcsolatfelvétel",
			description:
				"Vegye fel velünk a kapcsolatot az alapítvány weboldalán található űrlap kitöltésével vagy az alábbi elérhetőségek valamelyikén.",
		},
		{
			title: "Konzultáció",
			description:
				"Egy személyes konzultáció keretében megbeszéljük a részleteket, bemutatjuk a programot és válaszolunk minden felmerülő kérdésére.",
		},
		{
			title: "Kölyök Kiválasztása és Vásárlása",
			description:
				"Segítünk kiválasztani a legmegfelelőbb kölyköt az alapítvány által tesztelt kennelek kínálatából. A kölyök megvásárlását követően kezdődik a képzés.",
		},
		{
			title: "Képzés Kezdete",
			description:
				"A kiválasztott kölyök és gazdája részt vesz a képzési programban, amely során a terápiás kutyává válás minden lépését közösen teljesítik.",
		},
	];

	const stepsToUse = customSteps || defaultSteps;
	const icons = [Mail, Phone, MapPin, Sparkles];
	const gradients = [
		"from-primary-400 to-primary-600",
		"from-accent-400 to-accent-600",
		"from-secondary-400 to-secondary-600",
		"from-primary-400 to-accent-500",
	];

	const steps: ProcessStep[] = stepsToUse.map((step, index) => {
		const iconIndex = index % icons.length;
		const gradientIndex = index % gradients.length;
		return {
			number: index + 1,
			...step,
			icon: icons[iconIndex] ?? Mail,
			gradient: gradients[gradientIndex] ?? "from-primary-400 to-primary-600",
		};
	});

	return (
		<section className="relative py-16">
			<div className="lg:grid lg:grid-cols-2 lg:gap-16 items-start">
				{/* Left Content */}
				<motion.div
					initial={{ opacity: 0, x: -50 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
					className="lg:text-right mb-12 lg:mb-0"
				>
					{/* Icon Badge */}
					<motion.div
						initial={{ scale: 0 }}
						whileInView={{ scale: 1 }}
						viewport={{ once: true }}
						transition={{
							type: "spring",
							stiffness: 200,
							damping: 15,
							delay: 0.2,
						}}
						className="inline-flex items-center gap-3 bg-secondary-100 text-secondary-700 px-6 py-3 rounded-full mb-6"
					>
						<MapPin className="w-5 h-5" />
						<span className="font-semibold">Jelentkezés Menete</span>
					</motion.div>

					<h2 className="text-3xl md:text-4xl font-bold text-primary-700 mb-6">
						{title}
					</h2>

					<p className="text-text-description text-lg mb-8 max-w-xl lg:ml-auto">
						{description}
					</p>

					{content && (
						<div className="text-text-description text-sm lg:text-right max-w-xl lg:ml-auto">
							<p className="whitespace-pre-line">{content}</p>
						</div>
					)}
				</motion.div>

				{/* Right - Step Cards */}
				<div className="relative space-y-8">
					{/* Connecting Line */}
					<div className="hidden lg:block absolute left-10 top-12 bottom-12 w-0.5 bg-gradient-to-b from-primary-300 via-accent-300 to-secondary-300" />

					{steps.map((step, index) => (
						<motion.div
							key={step.number}
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{
								duration: 0.5,
								delay: 0.2 + index * 0.1,
								ease: [0.22, 1, 0.36, 1],
							}}
							className="relative"
						>
							{/* Step Card */}
							<div className="flex gap-6 items-start">
								{/* Number Badge */}
								<motion.div
									initial={{ scale: 0 }}
									whileInView={{ scale: 1 }}
									viewport={{ once: true }}
									transition={{
										type: "spring",
										stiffness: 200,
										damping: 15,
										delay: 0.3 + index * 0.1,
									}}
									className={`relative z-10 flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}
								>
									<span className="text-3xl font-bold text-white">
										{step.number}
									</span>
								</motion.div>

								{/* Content Card */}
								<motion.div
									whileHover={{ y: -4 }}
									className="flex-1 bg-bg-highlight rounded-xl p-6 shadow-md border border-gray-100"
								>
									<div className="flex items-start gap-3 mb-3">
										<div
											className={`p-2 bg-gradient-to-br ${step.gradient} rounded-lg`}
										>
											<step.icon className="w-5 h-5 text-white" />
										</div>
										<h3 className="text-xl font-bold text-text-heading flex-1">
											{step.title}
										</h3>
									</div>
									<p className="text-text-description">{step.description}</p>
								</motion.div>
							</div>
						</motion.div>
					))}

					{/* Timeline Node for Desktop */}
					<div className="hidden lg:block absolute -left-8 top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-secondary-500 border-4 border-white shadow-lg z-10" />
				</div>
			</div>

			{/* Mobile Timeline Node */}
			<div className="lg:hidden flex justify-center mt-8">
				<div className="w-4 h-4 rounded-full bg-secondary-500 border-4 border-white shadow-lg" />
			</div>
		</section>
	);
};

export default ProcessSteps;
