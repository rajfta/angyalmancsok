import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type FC, useEffect, useState } from "react";

interface Testimonial {
	id: string;
	quote: string;
	author: string;
	dogName: string;
	handlerName: string;
	dogPhoto: string;
}

interface TestimonialsProps {
	testimonials: Testimonial[];
}

const Testimonials: FC<TestimonialsProps> = ({ testimonials }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [slidesPerView, setSlidesPerView] = useState(3);

	// Calculate slides per view based on screen width
	useEffect(() => {
		const updateSlidesPerView = () => {
			if (window.innerWidth < 768) {
				setSlidesPerView(1);
			} else if (window.innerWidth < 1024) {
				setSlidesPerView(2);
			} else {
				setSlidesPerView(3);
			}
		};

		updateSlidesPerView();
		window.addEventListener("resize", updateSlidesPerView);
		return () => window.removeEventListener("resize", updateSlidesPerView);
	}, []);

	const maxIndex = Math.max(0, testimonials.length - slidesPerView);

	const handlePrev = () => {
		setCurrentIndex((prev) => Math.max(0, prev - 1));
	};

	const handleNext = () => {
		setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
	};

	const goToSlide = (index: number) => {
		setCurrentIndex(Math.min(index, maxIndex));
	};

	// Calculate total pages for pagination
	const totalPages = maxIndex + 1;

	return (
		<section className="container-padding py-16 md:py-24 bg-bg-highlight">
			<motion.h2
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				className="text-center mb-12 text-primary-700"
			>
				Amit Rólunk Mondanak
			</motion.h2>

			<div className="max-w-7xl mx-auto relative">
				{/* Navigation Arrows */}
				<button
					type="button"
					onClick={handlePrev}
					disabled={currentIndex === 0}
					className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-primary-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
					aria-label="Previous testimonial"
				>
					<ChevronLeft className="w-6 h-6 text-primary-600" />
				</button>

				<button
					type="button"
					onClick={handleNext}
					disabled={currentIndex === maxIndex}
					className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-primary-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
					aria-label="Next testimonial"
				>
					<ChevronRight className="w-6 h-6 text-primary-600" />
				</button>

				{/* Carousel Container */}
				<div className="overflow-hidden">
					<motion.div
						className="flex gap-6"
						animate={{
							x: `calc(-${currentIndex * (100 / slidesPerView)}% - ${currentIndex * 1.5}rem)`,
						}}
						transition={{
							type: "spring",
							stiffness: 300,
							damping: 30,
						}}
					>
						{testimonials.map((testimonial) => (
							<div
								key={testimonial.id}
								className="flex-shrink-0"
								style={{
									width: `calc(${100 / slidesPerView}% - ${((slidesPerView - 1) * 1.5) / slidesPerView}rem)`,
								}}
							>
								<TestimonialCard testimonial={testimonial} />
							</div>
						))}
					</motion.div>
				</div>

				{/* Pagination Dots */}
				<div className="flex justify-center gap-2 mt-8">
					{Array.from({ length: totalPages }, (_, i) => i).map((pageIndex) => (
						<button
							key={`page-${pageIndex}`}
							type="button"
							onClick={() => goToSlide(pageIndex)}
							className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
								pageIndex === currentIndex
									? "bg-primary-600 w-8"
									: "bg-primary-200 hover:bg-primary-400"
							}`}
							aria-label={`Go to slide ${pageIndex + 1}`}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

const TestimonialCard: FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
	return (
		<div className="bg-bg-highlight rounded-xl p-6 shadow-md border border-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-center h-full">
			{/* Dog Photo */}
			<div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 border-4 border-primary-100">
				<img
					src={testimonial.dogPhoto}
					alt={testimonial.dogName}
					className="w-full h-full object-cover"
				/>
			</div>

			{/* Paw Icon */}
			<div className="text-primary-400 text-2xl mb-4">🐾</div>

			{/* Quote */}
			<blockquote className="text-center text-text-description italic mb-6 flex-1">
				<span className="text-primary-300">"</span>
				{testimonial.quote}
				<span className="text-primary-300">"</span>
			</blockquote>

			{/* Attribution */}
			<p className="text-sm text-gray-500 text-center">
				— {testimonial.author}, {testimonial.dogName} &{" "}
				{testimonial.handlerName}
			</p>
		</div>
	);
};

export default Testimonials;
