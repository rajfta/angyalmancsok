import { motion } from "framer-motion";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "~/styles/lightbox.css";
import type { FC } from "react";

interface GalleryLightboxProps {
	images: string[];
	title: string;
}

const GalleryLightbox: FC<GalleryLightboxProps> = ({ images, title }) => {
	const [open, setOpen] = useState(false);
	const [index, setIndex] = useState(0);

	if (!images || images.length === 0) return null;

	// Transform images to lightbox slides format
	const slides = images.map((src) => ({
		src,
		alt: title,
	}));

	return (
		<section className="mb-12">
			<motion.h2
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5 }}
				className="text-3xl font-bold text-text-heading mb-6"
			>
				Galéria
			</motion.h2>

			<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
				{images.map((imageUrl, idx) => (
					<motion.button
						key={imageUrl}
						type="button"
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.4, delay: idx * 0.1 }}
						onClick={() => {
							setIndex(idx);
							setOpen(true);
						}}
						className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-400"
					>
						<img
							src={imageUrl}
							alt={`${title} - kép ${idx + 1}`}
							className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
						/>
						{/* Overlay with icon */}
						<div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/30 transition-colors duration-300 flex items-center justify-center">
							<div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-12 h-12 text-white drop-shadow-lg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2"
								>
									<title>Nagyítás</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
									/>
								</svg>
							</div>
						</div>

						{/* Image counter badge */}
						<div className="absolute bottom-3 right-3 bg-primary-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
							{idx + 1} / {images.length}
						</div>
					</motion.button>
				))}
			</div>

			{/* Lightbox */}
			<Lightbox
				open={open}
				close={() => setOpen(false)}
				index={index}
				slides={slides}
				styles={{
					container: {
						backgroundColor: "rgba(0, 0, 0, 0.95)",
					},
					button: {
						filter: "none",
					},
				}}
				carousel={{
					finite: false,
					preload: 2,
				}}
				animation={{
					fade: 250,
					swipe: 500,
				}}
				controller={{
					closeOnBackdropClick: true,
					closeOnPullDown: true,
					closeOnPullUp: true,
				}}
				{...(images.length <= 1 && {
					render: {
						buttonPrev: () => null,
						buttonNext: () => null,
					},
				})}
			/>
		</section>
	);
};

export default GalleryLightbox;
