import {
	AnimatePresence,
	motion,
	type Transition,
	type Variants,
} from "framer-motion";
import { type FC, type ReactNode, useCallback, useState } from "react";
import { usePreventScroll } from "~/hooks/usePreventScroll";
import PerspectiveButton from "../ui/PerspectiveButton";

const Nav: FC<{ children: ReactNode }> = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = useCallback(() => {
		setIsOpen(!isOpen);
	}, [isOpen]);
	usePreventScroll({ enabled: isOpen });

	return (
		<div className="relative h-10 w-12">
			<PerspectiveButton
				isOpen={isOpen}
				onClick={handleClick}
				labels={{
					open: ["Menü", "Menü"],
					closed: ["Bezárás", "Bezárás"],
				}}
			/>

			{/* Background shadow */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={tweenTransition}
						className="fixed z-10 inset-0 bg-black/85"
						aria-hidden="true"
						onClick={() => setIsOpen(false)}
					/>
				)}
			</AnimatePresence>

			{/* Small menu */}
			<motion.div
				variants={menu}
				initial="closed"
				animate={isOpen ? "open" : "closed"}
				className="absolute lg:hidden z-10 -top-3 -right-2 flex justify-start flex-col overflow-hidden rounded-md items-center"
			>
				<AnimatePresence>{isOpen && <>{children}</>}</AnimatePresence>
			</motion.div>

			{/* Big menu */}
			<motion.div
				variants={bigMenu}
				initial="closed"
				animate={isOpen ? "open" : "closed"}
				className="absolute hidden lg:flex z-10 -top-3 -right-2  justify-start flex-col overflow-hidden rounded-md items-center"
			>
				<AnimatePresence>{isOpen && <>{children}</>}</AnimatePresence>
			</motion.div>
		</div>
	);
};

const tweenTransition: Transition = {
	duration: 0.75,
	type: "tween",
	ease: [0.76, 0, 0.24, 1],
};

const menu: Variants = {
	open: {
		width: "320px",
		height: "540px",
		top: "-16px",
		right: "-8px",
		// NOTE: Keep this in sync with tailwind.config.mjs
		backgroundColor: "#bed8e3",
		transition: tweenTransition,
	},
	closed: {
		width: "100px",
		height: "40px",
		borderRadius: "25px",
		top: "0px",
		right: "0px",
		backgroundColor: "transparent",
		transition: {
			...tweenTransition,
			delay: 0.35,
			backgroundColor: {
				delay: 1.1,
				duration: tweenTransition.duration,
				ease: "linear",
			},
		},
	},
};

const bigMenu: Variants = {
	...menu,
	open: {
		...menu.open,
		width: "540px",
		height: "620px",
	},
};

export default Nav;
