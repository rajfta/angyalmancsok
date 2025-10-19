import { motion } from "framer-motion";
import { VolleyballIcon } from "lucide-react";
import type { FC } from "react";
import heroTransparent from "~/assets/hero-transparent.png";
import PerspectiveButton from "~/components/ui/PerspectiveButton";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import Socials from "../Socials";

const Hero: FC = () => {
	return (
		<div className="flex flex-col gap-4 items-center lg:items-stretch">
			<div className="flex flex-col md:flex-row md:gap-0 gap-4 items-center justify-between">
				<motion.div
					initial={{ x: -100, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{
						duration: 0.8,
						ease: [0.22, 1, 0.36, 1],
						delay: 0.4,
					}}
					className="order-1 md:max-w-80 md:order-2 md:flex-1 flex flex-col gap-4"
				>
					<h1 className="max-w-96 lg:text-5xl xl:text-6xl md:mb-4 md:mt-2 md:text-left">
						Üdvözlünk az Angyalmancsok Alapítvány oldalán!
						<motion.span
							initial={{ scale: 0, rotate: -180 }}
							animate={{ scale: 1, rotate: 0 }}
							transition={{
								type: "spring",
								stiffness: 200,
								damping: 12,
								delay: 1.2,
							}}
							className="text-accent md:mt-4 md:block inline-block"
						>
							🐾
						</motion.span>
					</h1>
					<Description className="order-4 hidden md:block" />
					<CTA className="order-4 hidden md:flex mt-12" />
				</motion.div>
				<motion.div
					initial={{ x: -50, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{
						duration: 0.6,
						ease: [0.22, 1, 0.36, 1],
						delay: 0.8,
					}}
					className="order-3 md:hidden w-full"
				>
					<Description />
				</motion.div>
				<Illustration />
			</div>
			<motion.div
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{
					duration: 0.6,
					ease: [0.22, 1, 0.36, 1],
					delay: 1.4,
				}}
			>
				<CTA className="md:hidden mt-4" />
			</motion.div>
		</div>
	);
};

const Illustration: FC = () => {
	return (
		<div className="-container-padding -z-10 relative md:order-2 order-2 aspect-square md:flex-1 lg:max-w-[720px]">
			<motion.div
				initial={{ clipPath: "circle(0% at 50% 50%)" }}
				animate={{ clipPath: "circle(100% at 50% 50%)" }}
				transition={{
					duration: 1,
					ease: [0.22, 1, 0.36, 1],
					delay: 0.2,
				}}
				className="relative w-full h-full"
			>
				<img
					src={heroTransparent.src}
					alt="Boldog kutya Enid"
					className="md:rounded-lg shadow-lg md:shadow-none object-contain scale-110 md:scale-100"
				/>
			</motion.div>
			<motion.div
				initial={{ scale: 0, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{
					type: "spring",
					stiffness: 100,
					damping: 15,
					delay: 0.1,
				}}
				className="absolute -z-20 rounded-full -top-4 left-0 w-full h-full bg-gradient-to-b from-accent-200 to-accent md:scale-90"
			/>
			<motion.div
				className="absolute -z-10 bottom-16 xl:bottom-36 right-4 w-1/6 h-1/6 text-enid"
				initial={{ opacity: 0, y: -200 }}
				animate={{
					y: 0,
					opacity: [1],
				}}
				transition={{
					delay: 1.3,
					duration: 0.3,
					ease: "easeIn",
				}}
			>
				<VolleyballIcon className="w-full h-full" />
			</motion.div>
		</div>
	);
};

const CTA: FC<{ className?: string }> = ({ className }) => {
	return (
		<div
			className={cn(
				"flex z-10 justify-center gap-4 md:justify-between",
				className,
			)}
		>
			<Popover>
				<PopoverTrigger>
					<PerspectiveButton
						className="w-36 h-10 static"
						labels={{
							closed: ["Kapcsolat", "Felvétel"],
						}}
					/>
				</PopoverTrigger>
				<PopoverContent className="bg-primary-50 flex gap-4 w-fit">
					<Socials noAnimation />
				</PopoverContent>
			</Popover>

			<a href="/rolunk">
				<PerspectiveButton
					className="w-36 h-10 static bg-transparent border border-primary"
					labels={{
						closed: ["Részletek", "Rólunk"],
					}}
				/>
			</a>
		</div>
	);
};

const Description: FC<{ className?: string }> = ({ className }) => {
	return <p className={cn("text-gray-500", className)}>{pText}</p>;
};

const pText = `Az AngyalMancsok Alapítványnál hiszünk a terápiás kutyák
                    csodálatos erejében, amely képes megváltoztatni és
                    gazdagítani az emberek életét. Küldetésünk, hogy terápiás
                    kutyáink segítségével örömet, vigaszt és gyógyulást hozzunk
                    azoknak, akiknek a legnagyobb szükségük van rá.`;

export default Hero;
