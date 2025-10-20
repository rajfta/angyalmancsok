import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import type { FC } from "react";
import { cn } from "~/lib/utils";

const VolunteerSection: FC = () => {
	const volunteerTasks = [
		"Adminisztrációs munkák",
		"Temperamentum vizsga felkészítés során segítőként tudsz jelen lenni",
		"Részvétel a rendezvényeken",
		'Vizsgákon a vizsgaanyag videós rögzítése, vagy "idegenként" belépni a terembe',
		"Fotó és videóanyag készítése",
		"Saját kölykök mellett szocializációban segítség",
		"Kommunikációs önkéntes: facebook posztok megosztása",
	];

	return (
		<section id="onkentesseg" className="relative py-16">
			<div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
				{/* Left Content */}
				<motion.div
					initial={{ opacity: 0, x: -50 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
					className="lg:text-right"
				>
					<div className="inline-block">
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
							className="inline-flex items-center gap-3 bg-accent-100 text-accent-700 px-6 py-3 rounded-full mb-6"
						>
							<Heart className="w-5 h-5" />
							<span className="font-semibold">Önkéntesség</span>
						</motion.div>

						<h2 className="text-3xl md:text-4xl font-bold text-primary-700 mb-6">
							Segíts Nekünk!
						</h2>

						<p className="text-text-description text-lg mb-8 max-w-xl lg:ml-auto">
							Egy motivációs beszélgetés után közösen fogunk dönteni arról, hogy
							tudsz-e nekünk segíteni.
						</p>

						{/* Task List */}
						<div className="space-y-3">
							<h3 className="font-semibold text-text-heading mb-4">
								Miben várunk segítséget?
							</h3>
							{volunteerTasks.map((task, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true, margin: "-50px" }}
									transition={{
										duration: 0.4,
										delay: 0.3 + index * 0.05,
									}}
									className={cn(
										"flex items-start gap-3 text-left lg:justify-end",
									)}
								>
									<div className="lg:order-2 flex-shrink-0 w-2 h-2 rounded-full bg-accent-400 mt-2" />
									<p className="text-text lg:order-1 lg:text-right">{task}</p>
								</motion.div>
							))}
						</div>
					</div>
				</motion.div>

				{/* Right Image - Hidden on mobile, visible on desktop */}
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="hidden lg:block relative"
				>
					<div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
						<div className="w-full h-full bg-gradient-to-br from-accent-200 to-accent-400 flex items-center justify-center">
							<Heart className="w-32 h-32 text-white opacity-20" />
						</div>
					</div>

					{/* Timeline Node */}
					<div className="absolute -left-8 top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-accent-500 border-4 border-white shadow-lg z-10" />
				</motion.div>
			</div>

			{/* Mobile Timeline Node */}
			<div className="lg:hidden flex justify-center mt-8">
				<div className="w-4 h-4 rounded-full bg-accent-500 border-4 border-white shadow-lg" />
			</div>
		</section>
	);
};

export default VolunteerSection;
