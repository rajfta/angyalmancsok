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
				<div className="order-1 md:max-w-80 md:order-2 md:flex-1 flex flex-col gap-4">
					<h1 className="max-w-96 lg:text-5xl xl:text-6xl md:mb-4 md:mt-2 md:text-left">
						Üdvözlünk az Angyalmancsok Alapítvány oldalán!
						<span className="text-accent md:mt-4 md:block">🐾</span>
					</h1>
					<Description className="order-4 hidden md:block" />
					<CTA className="order-4 hidden md:flex mt-12" />
				</div>
				<Description className="order-3 md:hidden" />
				<Illustration />
			</div>
			<CTA className="md:hidden mt-4" />
		</div>
	);
};

const Illustration: FC = () => {
	return (
		<div className="-container-padding -z-10 relative md:order-2 order-2 aspect-square md:flex-1 lg:max-w-[920px]">
			<img
				src={heroTransparent.src}
				alt="Boldog kutya Enid"
				className=" md:rounded-lg shadow-lg md:shadow-none object-contain scale-110 md:scale-100"
			/>
			<motion.div
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{
					type: "spring",
					stiffness: 100,
					damping: 15,
					delay: 0.2,
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
					delay: 0.8,
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
						className="w-36 static"
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
					className="w-36 static bg-transparent border border-primary"
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
