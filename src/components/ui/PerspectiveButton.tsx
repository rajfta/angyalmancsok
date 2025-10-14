import { motion } from "framer-motion";
import type { FC, ReactNode } from "react";
import { cn } from "~/lib/utils";
import styles from "./styles.module.css";

const PerspectiveButton: FC<{
	isOpen?: boolean;
	onClick?: () => void;
	labels: {
		open?: [ReactNode, ReactNode];
		closed: [ReactNode, ReactNode];
	};
	className?: string;
}> = ({ isOpen, onClick, labels, className }) => {
	return (
		<button
			type="button"
			className={cn(
				"bg-primary-200",
				isOpen ? "text-primary-200" : "text-text",
				styles.button,
				className,
			)}
			onClick={onClick}
		>
			<motion.div
				className={styles.slider}
				animate={{ top: isOpen ? "-100%" : "0%" }}
				transition={{
					duration: 0.5,
					type: "tween",
					ease: [0.76, 0, 0.24, 1],
				}}
			>
				{labels.open && (
					<div className={styles.el}>
						<PerspectiveText labels={labels.open} />
					</div>
				)}
				<div className={styles.el}>
					<PerspectiveText labels={labels.closed} />
				</div>
			</motion.div>
		</button>
	);
};

const PerspectiveText: FC<{ labels: [ReactNode, ReactNode] }> = ({
	labels,
}) => {
	return (
		<div className={styles.perspectiveText}>
			<p className="w-full">{labels[0]}</p>
			<p className="w-full">{labels[1]}</p>
		</div>
	);
};

export default PerspectiveButton;
