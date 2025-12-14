import { motion, type Variants } from "framer-motion";
import type { FC } from "react";
import Facebook from "~/components/icons/Facebook";
import Instagram from "~/components/icons/Instagram";
import { cn } from "~/lib/utils";

const DEFAULT_INSTAGRAM_URL = "https://www.instagram.com/angyalmancsok/";
const DEFAULT_FACEBOOK_URL = "https://www.facebook.com/angyalmancsok";

interface SocialsProps {
	iconClassName?: string;
	noAnimation?: boolean;
	instagramUrl?: string;
	facebookUrl?: string;
}

const Socials: FC<SocialsProps> = ({
	iconClassName,
	noAnimation,
	instagramUrl,
	facebookUrl,
}) => {
	const socialLinks = [
		{
			href: instagramUrl || DEFAULT_INSTAGRAM_URL,
			label: "Instagram",
		},
		{ href: facebookUrl || DEFAULT_FACEBOOK_URL, label: "Facebook" },
	];

	return (
		<>
			{socialLinks.map((link, index) => (
				<motion.div
					variants={noAnimation ? {} : slideIn}
					initial="initial"
					animate="enter"
					exit="exit"
					key={link.href}
					custom={index}
				>
					<motion.div whileHover={{ y: -4 }}>
						<motion.a href={link.href}>
							{link.label === "Instagram" ? (
								<Instagram
									className={cn(
										"size-8 lg:size-10 text-accent-400",
										iconClassName,
									)}
								/>
							) : (
								<Facebook
									className={cn(
										"size-8 lg:size-10 text-accent-400",
										iconClassName,
									)}
								/>
							)}
						</motion.a>
					</motion.div>
				</motion.div>
			))}
		</>
	);
};

const slideIn: Variants = {
	initial: {
		opacity: 0,
		y: 20,
	},
	enter: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			delay: 1 + i * 0.1,
			ease: [0.215, 0.61, 0.355, 1],
		},
	}),
	exit: {
		opacity: 0,
		transition: {
			duration: 0.5,
			type: "tween",
			ease: "easeInOut",
		},
	},
};

export default Socials;
