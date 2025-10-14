import { SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons";
import { motion, type Variants } from "framer-motion";
import type { FC } from "react";
import { cn } from "~/lib/utils";

const socialLinks = [
	{ href: "https://www.instagram.com/angyalmancsok/", label: "Instagram" },
	{ href: "https://www.facebook.com/angyalmancsok", label: "Facebook" },
];

const Socials: FC<{
	iconClassName?: string;
	noAnimation?: boolean;
}> = ({ iconClassName, noAnimation }) => {
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
								<SiInstagram
									className={cn(
										"size-8 lg:size-10 text-accent-400",
										iconClassName,
									)}
								/>
							) : (
								<SiFacebook
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
