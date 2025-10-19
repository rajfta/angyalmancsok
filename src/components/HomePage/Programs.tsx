import { motion } from "framer-motion";
import {
	Building2,
	Heart,
	Home,
	type LucideIcon,
	School,
	Sparkles,
	Sun,
	Users,
} from "lucide-react";
import { type FC, useId, useState } from "react";
import { cn } from "~/lib/utils";

interface Program {
	id: string;
	title: string;
	icon: string | LucideIcon;
	description: string;
	imageUrl?: string;
}

interface ProgramsProps {
	programs: { id: string; title: string; icon: string; description: string; imageUrl?: string }[];
}

const iconMap: Record<string, LucideIcon> = {
	Heart,
	School,
	Sun,
	Sparkles,
	Building2,
	Users,
	Home,
};

const Programs: FC<ProgramsProps> = ({ programs: programsData }) => {
	// Map icon names to components
	const programs: Program[] = programsData.map((p) => ({
		...p,
		icon: iconMap[p.icon] || Heart,
		imageUrl: p.imageUrl,
	}));

	const [selectedId, setSelectedId] = useState(programs[0]?.id);
	const selectId = useId();
	const selectedProgram = programs.find((p) => p.id === selectedId);

	return (
		<section className="container-paddin my-40 py-16 md:py-24">
			<motion.h2
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				className="text-center mb-12 text-primary-700"
			>
				Programtípusaink
			</motion.h2>

			{/* Desktop: Split Screen */}
			<div className="hidden lg:grid lg:grid-cols-[320px_1fr] gap-8 max-w-7xl mx-auto">
				{/* Left: Program List */}
				<div className="space-y-2">
					{programs.map((program, index) => {
						const Icon = program.icon;
						return (
							<motion.button
								key={program.id}
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: index * 0.1 }}
								onClick={() => setSelectedId(program.id)}
								className={cn(
									"w-full text-left p-4 rounded-lg transition-all duration-300 flex items-center gap-3 group",
									selectedId === program.id
										? "bg-primary-500 text-white shadow-lg scale-105"
										: "bg-bg-highlight hover:bg-primary-50 text-text",
								)}
							>
								<Icon
									className={cn(
										"w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110",
										selectedId === program.id
											? "text-white"
											: "text-primary-500",
									)}
								/>
								<span className="font-medium text-sm leading-tight">
									{program.title}
								</span>
							</motion.button>
						);
					})}
				</div>

				{/* Right: Program Details */}
				<motion.div
					key={selectedId}
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					className="bg-bg-highlight rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex min-h-[400px]"
				>
					{/* Left: Image */}
					{selectedProgram?.imageUrl && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.1 }}
							className="w-[45%] h-full overflow-hidden"
						>
							<img
								src={selectedProgram.imageUrl}
								alt={selectedProgram.title}
								className="w-full h-full object-cover"
							/>
						</motion.div>
					)}

					{/* Right: Content */}
					<div className="flex-1 p-8 flex flex-col">
						<div className="flex items-center gap-4 mb-6">
							{selectedProgram && (
								<>
									<div className="p-3 bg-primary-100 rounded-xl">
										<selectedProgram.icon className="w-8 h-8 text-primary-600" />
									</div>
									<div>
										<h3 className="text-2xl font-bold text-primary-700 mb-2">
											{selectedProgram.title}
										</h3>
									</div>
								</>
							)}
						</div>
						<p className="text-text-description leading-relaxed">
							{selectedProgram?.description}
						</p>
					</div>
				</motion.div>
			</div>

			{/* Mobile: Dropdown + Details */}
			<div className="lg:hidden max-w-2xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="mb-6"
				>
					<label
						htmlFor={selectId}
						className="block text-sm font-medium text-text-description mb-2"
					>
						Válassz programot:
					</label>
					<div className="relative">
						<select
							id={selectId}
							value={selectedId}
							onChange={(e) => setSelectedId(e.target.value)}
							className="w-full p-4 pr-10 bg-bg-highlight border-2 border-primary-200 rounded-lg appearance-none cursor-pointer text-text font-medium focus:outline-none focus:border-primary-500 transition-colors"
						>
							{programs.map((program) => (
								<option key={program.id} value={program.id}>
									{program.title}
								</option>
							))}
						</select>
						<div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
							<svg
								className="w-5 h-5 text-primary-500"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<title>Chevron Down</title>
								<path d="M19 9l-7 7-7-7" />
							</svg>
						</div>
					</div>
				</motion.div>

				<motion.div
					key={selectedId}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
					className="bg-bg-highlight rounded-2xl shadow-xl p-6 border border-gray-100 min-h-[320px]"
				>
					{selectedProgram && (
						<>
							<div className="flex items-center gap-3 mb-4">
								<div className="p-3 bg-primary-100 rounded-xl">
									<selectedProgram.icon className="w-6 h-6 text-primary-600" />
								</div>
								<h3 className="text-xl font-bold text-primary-700">
									{selectedProgram.title}
								</h3>
							</div>
							<p className="text-text-description leading-relaxed">
								{selectedProgram.description}
							</p>
						</>
					)}
				</motion.div>
			</div>
		</section>
	);
};

export default Programs;
