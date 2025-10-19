import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { type FC, useId, useMemo, useState } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "~/components/ui/accordion";
import { cn } from "~/lib/utils";

// TypeScript Interfaces
type CertificateType = "SEGÍTŐ" | "TANULÓ" | "TERÁPIÁS";

interface Dog {
	id: string;
	name: string;
	thumbnail: string;
	photoWithOwner?: string | undefined;
	nicknames?: string[] | undefined;
	workplaces?: string[] | undefined;
	owner?: string | undefined;
	certificates?: CertificateType[] | undefined;
	priority: number;
	body: string | React.ReactNode | undefined;
}

interface Member {
	id: string;
	name: string;
	picture: string;
	role: string;
	dogs?: string[] | undefined;
	titles?: string | undefined;
	priority: number;
}

interface OurDogsProps {
	dogs: Dog[];
	members: Member[];
}

// Certificate badge colors
const certificateConfig: Record<CertificateType, string> = {
	SEGÍTŐ: "bg-blue-100 text-blue-700 border-blue-200",
	TANULÓ: "bg-green-100 text-green-700 border-green-200",
	TERÁPIÁS: "bg-purple-100 text-purple-700 border-purple-200",
};

interface FilterSidebarProps {
	nameFilter: string;
	setNameFilter: (value: string) => void;
	selectedOwners: string[];
	toggleOwner: (ownerId: string) => void;
	selectedCertificates: string[];
	toggleCertificate: (cert: string) => void;
	memberLookup: Map<string, { name: string; dogCount: number }>;
	availableCertificates: CertificateType[];
	hasActiveFilters: boolean;
	clearAllFilters: () => void;
	inputId?: string;
}

// Filter sidebar component (extracted to avoid React hooks warning)
const FilterSidebar: FC<FilterSidebarProps> = ({
	nameFilter,
	setNameFilter,
	selectedOwners,
	toggleOwner,
	selectedCertificates,
	toggleCertificate,
	memberLookup,
	availableCertificates,
	hasActiveFilters,
	clearAllFilters,
	inputId,
}) => {
	const searchId = useId();
	const finalInputId = inputId || searchId;

	return (
		<div className="space-y-6">
			{/* Name Search */}
			<div>
				<label
					htmlFor={finalInputId}
					className="block text-sm font-semibold text-text mb-2"
				>
					Keresés név alapján
				</label>
				<div className="relative">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
					<input
						id={finalInputId}
						type="text"
						value={nameFilter}
						onChange={(e) => setNameFilter(e.target.value)}
						placeholder="Kutya neve..."
						className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
					/>
					{nameFilter && (
						<button
							type="button"
							onClick={() => setNameFilter("")}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
							aria-label="Keresés törlése"
						>
							<X className="w-4 h-4" />
						</button>
					)}
				</div>
			</div>

			{/* Owner Filter */}
			<div>
				<h3 className="text-sm font-semibold text-text mb-3">Gazda szerint</h3>
				<div className="space-y-2">
					{Array.from(memberLookup.entries()).map(
						([ownerId, { name, dogCount }]) => (
							<label
								key={ownerId}
								className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
							>
								<input
									type="checkbox"
									checked={selectedOwners.includes(ownerId)}
									onChange={() => toggleOwner(ownerId)}
									className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 cursor-pointer"
								/>
								<span className="text-sm text-text flex-1 group-hover:text-primary-700">
									{name}
								</span>
								<span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
									{dogCount}
								</span>
							</label>
						),
					)}
				</div>
			</div>

			{/* Certificates Filter */}
			<div>
				<h3 className="text-sm font-semibold text-text mb-3">Tanúsítványok</h3>
				<div className="flex flex-wrap gap-2">
					{availableCertificates.map((cert) => (
						<button
							type="button"
							key={cert}
							onClick={() => toggleCertificate(cert)}
							className={cn(
								"px-3 py-1.5 rounded-lg text-sm font-medium border transition-all",
								selectedCertificates.includes(cert)
									? certificateConfig[cert]
									: "bg-white text-gray-700 border-gray-300 hover:border-primary-300 hover:bg-primary-50",
							)}
						>
							{cert}
						</button>
					))}
				</div>
			</div>

			{/* Clear Filters */}
			{hasActiveFilters && (
				<button
					type="button"
					onClick={clearAllFilters}
					className="mt-4 w-full py-2 px-4 text-sm font-medium text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
				>
					Szűrők törlése
				</button>
			)}
		</div>
	);
};

interface DogCardProps {
	dog: Dog;
	index: number;
	memberLookup: Map<string, { name: string; dogCount: number }>;
}

// Dog card component with toggle functionality
const DogCard: FC<DogCardProps> = ({ dog, index, memberLookup }) => {
	const [showDetails, setShowDetails] = useState(true);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, scale: 0.9 }}
			transition={{ duration: 0.3, delay: index * 0.05 }}
			className="bg-bg-highlight rounded-xl shadow-md border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden flex flex-col"
		>
			{/* Full-bleed image */}
			<img
				src={dog.thumbnail}
				alt={dog.name}
				className="w-full aspect-square object-cover"
			/>

			{/* Content with padding */}
			<div className="p-6 flex flex-col flex-1">
				{/* Name - Always visible */}
				<h3 className="text-2xl font-bold text-primary-700 mb-2">{dog.name}</h3>

				{/* Nicknames - Always visible if present */}
				{dog.nicknames && dog.nicknames.length > 0 && (
					<div className="mb-3">
						<span className="font-semibold text-sm">Becenevek: </span>
						<span className="text-gray-600 text-sm">
							{dog.nicknames.join(", ")}
						</span>
					</div>
				)}

				{/* Conditional Content: Details vs Body */}
				<AnimatePresence mode="wait">
					{showDetails ? (
						<motion.div
							key="details"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="space-y-2 flex-1 flex flex-col"
						>
							{/* Gazda */}
							{dog.owner && memberLookup.has(dog.owner) && (
								<div>
									<span className="font-semibold text-sm">Gazda: </span>
									<span className="text-gray-600 text-sm">
										{memberLookup.get(dog.owner)?.name}
									</span>
								</div>
							)}

							{/* Munkahely */}
							{dog.workplaces && dog.workplaces.length > 0 && (
								<div>
									<span className="font-semibold text-sm">Munkahely: </span>
									<ul className="text-gray-600 text-sm ml-4 mt-1">
										{dog.workplaces.map((workplace) => (
											<li key={workplace}>• {workplace}</li>
										))}
									</ul>
								</div>
							)}

							{/* Spacer to push content to bottom */}
							<div className="flex-1" />

							{/* Tanúsítványok - Only visible with details */}
							{dog.certificates && dog.certificates.length > 0 && (
								<div className="mt-4">
									<span className="font-semibold text-sm block mb-2">
										Tanúsítványok:
									</span>
									<div className="flex flex-wrap gap-2">
										{dog.certificates.map((cert) => (
											<span
												key={cert}
												className={cn(
													"px-2 py-1 rounded text-xs font-medium border",
													certificateConfig[cert],
												)}
											>
												{cert}
											</span>
										))}
									</div>
								</div>
							)}
						</motion.div>
					) : (
						<motion.div
							key="body"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="prose prose-sm text-gray-700 leading-relaxed flex-1"
						>
							{dog.body}
						</motion.div>
					)}
				</AnimatePresence>

				{/* Toggle Button */}
				<button
					type="button"
					onClick={() => setShowDetails(!showDetails)}
					className="mt-4 w-full py-2 px-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium text-sm"
				>
					{showDetails ? "Bemutatkozás" : "Alapadatok"}
				</button>
			</div>
		</motion.div>
	);
};

const OurDogs: FC<OurDogsProps> = ({ dogs, members }) => {
	// Filter state
	const [nameFilter, setNameFilter] = useState("");
	const [selectedOwners, setSelectedOwners] = useState<string[]>([]);
	const [selectedCertificates, setSelectedCertificates] = useState<string[]>(
		[],
	);

	const desktopSearchId = useId();
	const mobileSearchId = useId();

	// Get unique certificates from all dogs
	const availableCertificates: CertificateType[] = useMemo(() => {
		const certs = new Set<CertificateType>();
		for (const dog of dogs) {
			if (dog.certificates) {
				for (const cert of dog.certificates) {
					certs.add(cert);
				}
			}
		}
		return Array.from(certs).sort();
	}, [dogs]);

	// Create member lookup with dog counts
	const memberLookup = useMemo(() => {
		const lookup = new Map<string, { name: string; dogCount: number }>();
		for (const member of members) {
			const dogCount = dogs.filter((dog) => dog.owner === member.id).length;
			if (dogCount > 0) {
				lookup.set(member.id, { name: member.name, dogCount });
			}
		}
		return lookup;
	}, [members, dogs]);

	// Filtered dogs
	const filteredDogs = useMemo(() => {
		return dogs.filter((dog) => {
			// Name filter
			if (
				nameFilter &&
				!dog.name.toLowerCase().includes(nameFilter.toLowerCase())
			) {
				return false;
			}

			// Owner filter
			if (selectedOwners.length > 0 && dog.owner) {
				if (!selectedOwners.includes(dog.owner)) {
					return false;
				}
			}

			// Certificates filter
			if (selectedCertificates.length > 0) {
				if (!dog.certificates || dog.certificates.length === 0) {
					return false;
				}
				// Check if dog has at least one of the selected certificates
				const hasMatchingCert = dog.certificates.some((cert) =>
					selectedCertificates.includes(cert),
				);
				if (!hasMatchingCert) {
					return false;
				}
			}

			return true;
		});
	}, [dogs, nameFilter, selectedOwners, selectedCertificates]);

	// Toggle functions
	const toggleOwner = (ownerId: string) => {
		setSelectedOwners((prev) =>
			prev.includes(ownerId)
				? prev.filter((id) => id !== ownerId)
				: [...prev, ownerId],
		);
	};

	const toggleCertificate = (cert: string) => {
		setSelectedCertificates((prev) =>
			prev.includes(cert) ? prev.filter((c) => c !== cert) : [...prev, cert],
		);
	};

	const clearAllFilters = () => {
		setNameFilter("");
		setSelectedOwners([]);
		setSelectedCertificates([]);
	};

	const hasActiveFilters =
		nameFilter !== "" ||
		selectedOwners.length > 0 ||
		selectedCertificates.length > 0;

	return (
		<section className="container-padding py-16 md:py-24">
			<motion.h2
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				className="text-center mb-12 text-primary-700"
			>
				Kutyáink
			</motion.h2>

			{/* Desktop: Split Layout */}
			<div className="hidden lg:grid lg:grid-cols-[220px_1fr] gap-8 max-w-7xl mx-auto">
				{/* Left: Filter Sidebar */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="sticky top-24 self-start"
				>
					<div className="bg-bg-highlight rounded-xl p-6 shadow-md border border-gray-100">
						<h3 className="text-lg font-bold text-primary-700 mb-4">
							Szűrők ({filteredDogs.length})
						</h3>
						<FilterSidebar
							nameFilter={nameFilter}
							setNameFilter={setNameFilter}
							selectedOwners={selectedOwners}
							toggleOwner={toggleOwner}
							selectedCertificates={selectedCertificates}
							toggleCertificate={toggleCertificate}
							memberLookup={memberLookup}
							availableCertificates={availableCertificates}
							hasActiveFilters={hasActiveFilters}
							clearAllFilters={clearAllFilters}
							inputId={desktopSearchId}
						/>
					</div>
				</motion.div>

				{/* Right: Dog Grid */}
				<div>
					{/* Results count */}
					<div className="mb-6 flex items-center justify-between">
						<p className="text-sm text-gray-600">
							{filteredDogs.length} kutya{" "}
							{filteredDogs.length !== dogs.length && `(${dogs.length}-ból)`}
						</p>
						{hasActiveFilters && (
							<div className="flex flex-wrap gap-2 items-center">
								<span className="text-xs text-gray-500">Aktív szűrők:</span>
								{nameFilter && (
									<span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
										Név: {nameFilter}
									</span>
								)}
								{selectedOwners.map((ownerId) => (
									<span
										key={ownerId}
										className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full"
									>
										{memberLookup.get(ownerId)?.name}
									</span>
								))}
								{selectedCertificates.map((cert) => (
									<span
										key={cert}
										className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full"
									>
										{cert}
									</span>
								))}
							</div>
						)}
					</div>

					{/* Dog Grid */}
					<AnimatePresence mode="sync">
						{filteredDogs.length > 0 ? (
							<motion.div
								layout
								className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(226px,1fr))] gap-6"
							>
								{filteredDogs.map((dog, index) => (
									<DogCard
										key={dog.id}
										dog={dog}
										index={index}
										memberLookup={memberLookup}
									/>
								))}
							</motion.div>
						) : (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="text-center py-16"
							>
								<p className="text-gray-500 text-lg mb-4">
									Nincs találat a megadott szűrőkkel
								</p>
								<button
									type="button"
									onClick={clearAllFilters}
									className="text-primary-600 hover:text-primary-700 font-medium"
								>
									Szűrők törlése
								</button>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>

			{/* Mobile/Tablet: Accordion Filters + Grid */}
			<div className="lg:hidden max-w-4xl mx-auto">
				{/* Name Search (Always Visible) */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="mb-4"
				>
					<div className="relative">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
						<input
							id={mobileSearchId}
							type="text"
							value={nameFilter}
							onChange={(e) => setNameFilter(e.target.value)}
							placeholder="Keresés kutya neve alapján..."
							className="w-full pl-11 pr-10 py-3 border-2 border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base"
						/>
						{nameFilter && (
							<button
								type="button"
								onClick={() => setNameFilter("")}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
								aria-label="Keresés törlése"
							>
								<X className="w-5 h-5" />
							</button>
						)}
					</div>
				</motion.div>

				{/* Collapsible Filters */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.1 }}
					className="mb-6 bg-bg-highlight rounded-xl shadow-md border border-gray-100 overflow-hidden"
				>
					<Accordion type="single" collapsible>
						<AccordionItem value="filters">
							<AccordionTrigger className="px-4">
								<span>Szűrők ({filteredDogs.length})</span>
							</AccordionTrigger>
							<AccordionContent className="px-4">
								<div className="space-y-6">
									{/* Owner Filter */}
									<div>
										<h3 className="text-sm font-semibold text-text mb-3">
											Gazda szerint
										</h3>
										<div className="space-y-2">
											{Array.from(memberLookup.entries()).map(
												([ownerId, { name, dogCount }]) => (
													<label
														key={ownerId}
														className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
													>
														<input
															type="checkbox"
															checked={selectedOwners.includes(ownerId)}
															onChange={() => toggleOwner(ownerId)}
															className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
														/>
														<span className="text-sm text-text flex-1">
															{name}
														</span>
														<span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
															{dogCount}
														</span>
													</label>
												),
											)}
										</div>
									</div>

									{/* Certificates Filter */}
									<div>
										<h3 className="text-sm font-semibold text-text mb-3">
											Tanúsítványok
										</h3>
										<div className="flex flex-wrap gap-2">
											{availableCertificates.map((cert) => (
												<button
													type="button"
													key={cert}
													onClick={() => toggleCertificate(cert)}
													className={cn(
														"px-3 py-1.5 rounded-lg text-sm font-medium border transition-all",
														selectedCertificates.includes(cert)
															? certificateConfig[cert]
															: "bg-white text-gray-700 border-gray-300 hover:border-primary-300",
													)}
												>
													{cert}
												</button>
											))}
										</div>
									</div>

									{/* Clear Filters */}
									{hasActiveFilters && (
										<button
											type="button"
											onClick={clearAllFilters}
											className="mt-4 w-full py-2 px-4 text-sm font-medium text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
										>
											Szűrők törlése
										</button>
									)}
								</div>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</motion.div>

				{/* Results count */}
				<div className="mb-4">
					<p className="text-sm text-gray-600">
						{filteredDogs.length} kutya{" "}
						{filteredDogs.length !== dogs.length && `(${dogs.length}-ból)`}
					</p>
				</div>

				{/* Dog Grid */}
				<AnimatePresence mode="sync">
					{filteredDogs.length > 0 ? (
						<motion.div
							layout
							className="grid grid-cols-1 md:grid-cols-2 gap-6"
						>
							{filteredDogs.map((dog, index) => (
								<DogCard
									key={dog.id}
									dog={dog}
									index={index}
									memberLookup={memberLookup}
								/>
							))}
						</motion.div>
					) : (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="text-center py-16"
						>
							<p className="text-gray-500 text-lg mb-4">
								Nincs találat a megadott szűrőkkel
							</p>
							<button
								type="button"
								onClick={clearAllFilters}
								className="text-primary-600 hover:text-primary-700 font-medium"
							>
								Szűrők törlése
							</button>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</section>
	);
};

export default OurDogs;
