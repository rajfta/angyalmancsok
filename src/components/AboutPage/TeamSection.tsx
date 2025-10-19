import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { FC } from "react";
import { useState } from "react";

interface Member {
	id: string;
	name: string;
	picture: string;
	role: string;
	dogs?: string[] | undefined;
	titles?: string | undefined;
	priority: number;
	body?: string | undefined;
}

interface Dog {
	id: string;
	name: string;
	thumbnail: string;
}

interface TeamSectionProps {
	members: Member[];
	dogs: Dog[];
}

const TeamSection: FC<TeamSectionProps> = ({ members, dogs }) => {
	const [selectedMember, setSelectedMember] = useState<Member | null>(null);

	// Create a lookup map for dogs
	const dogLookup = new Map(dogs.map((dog) => [dog.id, dog]));

	// Get dog details for a member
	const getMemberDogs = (member: Member): Dog[] => {
		if (!member.dogs) return [];
		return member.dogs
			.map((dogId) => dogLookup.get(dogId))
			.filter((dog): dog is Dog => dog !== undefined);
	};

	return (
		<section className="bg-bg-highlight py-20 md:py-32">
			<div className="container-padding">
				<div className="max-w-7xl mx-auto">
					{/* Section Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-100px" }}
						transition={{ duration: 0.6 }}
						className="text-center mb-16"
					>
						<h2 className="text-primary-700 mb-4">Csapatunk</h2>
						<p className="text-lg text-text-description max-w-2xl mx-auto">
							Találkozz azzal az elkötelezett csapattal, amely minden nap azon
							dolgozik, hogy terápiás kutyáinkkal örömet vigyünk az emberek
							életébe.
						</p>
					</motion.div>

					{/* Team Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
						{members.map((member, index) => (
							<MemberCard
								key={member.id}
								member={member}
								index={index}
								onClick={() => setSelectedMember(member)}
							/>
						))}
					</div>
				</div>
			</div>

			{/* Member Detail Modal */}
			<AnimatePresence>
				{selectedMember && (
					<MemberModal
						member={selectedMember}
						memberDogs={getMemberDogs(selectedMember)}
						onClose={() => setSelectedMember(null)}
					/>
				)}
			</AnimatePresence>
		</section>
	);
};

interface MemberCardProps {
	member: Member;
	index: number;
	onClick: () => void;
}

const MemberCard: FC<MemberCardProps> = ({ member, index, onClick }) => {
	return (
		<motion.button
			type="button"
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-50px" }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			onClick={onClick}
			className="group cursor-pointer text-left"
		>
			{/* Circular Photo */}
			<div className="relative text-center mb-4 mx-auto w-48 h-48 md:w-full md:h-auto md:aspect-square">
				<div className="relative w-full text-center h-full rounded-full overflow-hidden border-4 border-primary shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
					<img
						src={member.picture}
						alt={member.name}
						className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
					/>
				</div>

				{/* Hover Overlay */}
				<div className="absolute inset-0 rounded-full bg-primary-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
					<span className="text-white font-semibold text-sm px-4 text-center">
						Részletek
					</span>
				</div>
			</div>

			{/* Name & Role */}
			<div className="text-center">
				<h3 className="text-xl mx-auto font-bold text-text mb-1 group-hover:text-primary-600 transition-colors">
					{member.name}
				</h3>
				<p className="text-sm text-text-description">{member.role}</p>

				{/* Dog Count Badge */}
				{member.dogs && member.dogs.length > 0 && (
					<div className="mt-2 inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
						{member.dogs.length} kutya
					</div>
				)}
			</div>
		</motion.button>
	);
};

interface MemberModalProps {
	member: Member;
	memberDogs: Dog[];
	onClose: () => void;
}

const MemberModal: FC<MemberModalProps> = ({ member, memberDogs, onClose }) => {
	return (
		<>
			{/* Backdrop */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				onClick={onClose}
				className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
			/>

			{/* Modal */}
			<button
				type="button"
				className="fixed inset-0 z-50 flex items-center justify-center p-4"
				onClick={onClose}
				aria-label="Bezárás"
			>
				<motion.div
					initial={{ opacity: 0, scale: 0.95, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.95, y: 20 }}
					transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
					className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
					onClick={(e) => e.stopPropagation()}
				>
					{/* Close Button */}
					<button
						type="button"
						onClick={onClose}
						className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
						aria-label="Bezárás"
					>
						<X className="w-5 h-5 text-gray-600" />
					</button>

					{/* Content */}
					<div className="p-8">
						{/* Photo & Basic Info */}
						<div className="flex flex-col md:flex-row gap-6 mb-6">
							<div className="flex-shrink-0">
								<img
									src={member.picture}
									alt={member.name}
									className="w-32 h-32 rounded-full object-cover object-top border-4 border-primary-200 shadow-lg mx-auto md:mx-0"
								/>
							</div>
							<div className="flex-1 text-center md:text-left">
								<h3 className="text-2xl md:text-3xl font-bold text-primary-700 mb-2">
									{member.name}
								</h3>
								<p className="text-lg text-text-description mb-3">
									{member.role}
								</p>
								{member.titles && (
									<p className="text-sm text-text bg-primary-50 px-3 py-2 rounded-lg inline-block">
										{member.titles}
									</p>
								)}
							</div>
						</div>

						{/* Member Introduction */}
						{member.body && (
							<div className="border-t border-gray-200 pt-6 mt-6">
								<p className="text-text-description leading-relaxed whitespace-pre-line">
									{member.body}
								</p>
							</div>
						)}

						{/* Dogs Section */}
						{memberDogs.length > 0 && (
							<div className="border-t border-gray-200 pt-6">
								<h4 className="text-lg font-bold text-text mb-4">
									Kutyái ({memberDogs.length})
								</h4>
								<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
									{memberDogs.map((dog) => (
										<div
											key={dog.id}
											className="flex flex-col items-center text-center"
										>
											<img
												src={dog.thumbnail}
												alt={dog.name}
												className="w-20 h-20 rounded-full object-cover object-top border-2 border-primary-200 mb-2"
											/>
											<span className="text-sm font-medium text-text">
												{dog.name}
											</span>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</motion.div>
			</button>
		</>
	);
};

export default TeamSection;
