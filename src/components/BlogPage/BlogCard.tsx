import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import type { FC } from "react";

interface BlogCardProps {
	post: {
		title: string;
		slug: string;
		thumbnail?: string | undefined;
		description?: string | undefined;
		date: string;
	};
	index: number;
}

const BlogCard: FC<BlogCardProps> = ({ post, index }) => {
	return (
		<motion.article
			initial={{ opacity: 0, y: 40 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-50px" }}
			transition={{
				duration: 0.5,
				delay: index * 0.1,
				ease: [0.22, 1, 0.36, 1],
			}}
			className="group"
		>
			<a
				href={`/cikkek/${post.slug}`}
				className="block h-full bg-bg-highlight rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
			>
				{/* Image */}
				{post.thumbnail && (
					<div className="relative aspect-[16/10] overflow-hidden bg-primary-50">
						<motion.img
							src={post.thumbnail}
							alt={post.title}
							className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
					</div>
				)}

				{/* Content */}
				<div className="p-6">
					{/* Date */}
					<div className="flex items-center gap-2 text-sm text-text-muted mb-3">
						<Calendar className="w-4 h-4" />
						<time dateTime={post.date}>{post.date}</time>
					</div>

					{/* Title */}
					<h3 className="text-xl md:text-2xl font-bold text-text-heading mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300">
						{post.title}
					</h3>

					{/* Description */}
					{post.description && (
						<p className="text-text-description mb-4 line-clamp-3 leading-relaxed">
							{post.description}
						</p>
					)}

					{/* Read more */}
					<div className="flex items-center gap-2 text-primary-600 font-semibold group-hover:gap-4 transition-all duration-300">
						<span>Tovább olvasom</span>
						<ArrowRight className="w-5 h-5" />
					</div>
				</div>
			</a>
		</motion.article>
	);
};

export default BlogCard;
