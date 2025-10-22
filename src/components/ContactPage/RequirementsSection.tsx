import { motion } from "framer-motion";
import { Dog } from "lucide-react";
import type { FC } from "react";
import Paw from "~/components/icons/Paw";

interface Requirement {
	title: string;
	description: string;
}

interface RequirementsSectionProps {
	title?: string | undefined;
	description?: string | undefined;
	requirements?: Requirement[] | undefined;
	image?: string | undefined;
}

const RequirementsSection: FC<RequirementsSectionProps> = ({
	title = "Hogyan Csatlakozhatsz?",
	description = "Az AngyalMancsok Terápiás és Segítőkutya Alapítvány célja, hogy minél több ember életébe hozza el a terápiás kutyák csodálatos hatását.",
	requirements: customRequirements,
	image,
}) => {
	// Default requirements if not provided
	const defaultRequirements = [
		{
			title: "Angels for Therapy Kennelből",
			description:
				"Alapítványunk keretein belül működő kennelünkből származó kutyák. ENS programon és előzetes karaktertesztelésen átesett kölykök. Garantált genetikai háttér és viselkedési jellemzők. Szigorú követelményeknek megfelelő kölykök.",
		},
		{
			title: "Saját Kutya",
			description:
				"Egyedi elbírálás során döntünk a csatlakozás lehetőségéről. Személyes beszélgetés és ismerkedés. A kutya tesztelése szükséges. Közösen megbeszéljük a lehetőségeket.",
		},
	];

	const requirementsToUse = customRequirements || defaultRequirements;

	const requirements = requirementsToUse.map((req, index) => ({
		...req,
		icon: index === 0 ? Paw : Dog,
		gradient:
			index === 0
				? "from-primary-100 to-primary-200"
				: "from-secondary-100 to-secondary-200",
		borderColor: index === 0 ? "border-primary-300" : "border-secondary-300",
	}));

	return (
		<section id="jelentkezes" className="relative py-16">
			<div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
				{/* Left Image - Hidden on mobile, visible on desktop */}
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="hidden lg:block relative"
				>
					<div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
						{image ? (
							<img
								src={image}
								alt={title}
								className="w-full h-full object-cover"
							/>
						) : (
							<div className="w-full h-full bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center">
								<Paw className="w-32 h-32 text-white opacity-20" />
							</div>
						)}
					</div>

					{/* Timeline Node */}
					<div className="absolute -right-8 top-1/2 -translate-y-1/2 translate-x-1/2 w-6 h-6 rounded-full bg-primary-500 border-4 border-white shadow-lg z-10" />
				</motion.div>

				{/* Right Content */}
				<motion.div
					initial={{ opacity: 0, x: 50 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
						className="inline-flex items-center gap-3 bg-primary-100 text-primary-700 px-6 py-3 rounded-full mb-6"
					>
						<Paw className="w-5 h-5" />
						<span className="font-semibold">Jelentkezési Feltételek</span>
					</motion.div>

					<h2 className="text-3xl md:text-4xl font-bold text-primary-700 mb-6">
						{title}
					</h2>

					<p className="text-text-description text-lg mb-8 max-w-xl">
						{description}
					</p>

					{/* Requirement Cards */}
					<div className="space-y-6">
						{requirements.map((req, index) => (
							<motion.div
								key={req.title}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-50px" }}
								transition={{
									duration: 0.5,
									delay: 0.3 + index * 0.1,
								}}
								className={`bg-gradient-to-br ${req.gradient} rounded-xl p-6 border-2 ${req.borderColor} shadow-lg`}
							>
								<div className="flex items-start gap-4 mb-4">
									<div className="p-2 bg-white rounded-lg">
										<req.icon className="w-6 h-6 text-primary-600" />
									</div>
									<h3 className="text-xl font-bold text-text-heading flex-1">
										{req.title}
									</h3>
								</div>

								<p className="text-text text-sm leading-relaxed">
									{req.description}
								</p>
							</motion.div>
						))}
					</div>

					<motion.p
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ delay: 0.6 }}
						className="mt-6 text-text-description italic"
					>
						Amennyiben szeretne hozzánk csatlakozni, vegye fel a kapcsolatot
						velünk az alábbi űrlap kitöltésével!
					</motion.p>
				</motion.div>
			</div>

			{/* Mobile Timeline Node */}
			<div className="lg:hidden flex justify-center mt-8">
				<div className="w-4 h-4 rounded-full bg-primary-500 border-4 border-white shadow-lg" />
			</div>
		</section>
	);
};

export default RequirementsSection;
