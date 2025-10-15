import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { type FC, useEffect, useState } from "react";
import logo from "~/assets/logo.png";
import Logo from "~/components/Logo";
import { cn } from "~/lib/utils";
import DonateButton from "../DonateButton";
import NavLinks from "./NavLinks";

const menuItems = [
	{ href: "/", name: "Főoldal" },
	{ href: "/rolunk", name: "Rólunk" },
	{ href: "/szolgaltatasok", name: "Szolgáltatások" },
	{ href: "/kapcsolat", name: "Kapcsolat" },
];

const Header: FC = () => {
	const [pathname, setPathname] = useState<string>("");
	const [menuState, setMenuState] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}
		setPathname(window.location.pathname);

		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header>
			<nav
				data-state={menuState && "active"}
				className="group fixed z-20 w-full px-2"
			>
				<div
					className={cn(
						"mx-auto max-w-6xl px-6 transition-all duration-300 lg:px-12",
						isScrolled &&
							"max-w-4xl rounded-2xl border bg-bg-header/80 backdrop-blur-lg lg:px-5",
					)}
				>
					<div className="flex flex-wrap relative items-center justify-between gap-4 lg:flex-nowrap lg:gap-6">
						{/* Logo */}
						<div className="flex items-center lg:flex-1">
							<motion.div whileHover={{ scale: 1.05 }}>
								<ResponsiveLogo />
							</motion.div>
						</div>

						{/* Desktop Navigation - Center */}
						<nav className="hidden lg:flex lg:flex-1 lg:justify-center">
							<ul className="flex items-center gap-8 text-sm">
								{menuItems.map((item) => (
									<li key={item.href}>
										<a
											href={item.href}
											className={cn(
												"block duration-150 hover:text-primary-600",
												pathname === item.href
													? "text-primary-600 font-semibold"
													: "text-text-description",
											)}
										>
											<span>{item.name}</span>
										</a>
									</li>
								))}
							</ul>
						</nav>

						{/* Right Side: Donate Button + Mobile Menu */}
						<div className="flex items-center gap-4 lg:flex-1 lg:justify-end">
							{/* Desktop Donate Button */}
							<div className="hidden h-fit w-fit lg:block">
								<DonateButton className="font-extrabold bg-accent-300 z-10 w-64 h-12" />
							</div>

							{/* Mobile Menu Toggle */}
							<button
								type="button"
								onClick={() => setMenuState(!menuState)}
								aria-label={menuState ? "Close Menu" : "Open Menu"}
								className="relative z-20 block cursor-pointer p-2.5 lg:hidden"
							>
								<Menu className="m-auto size-6 duration-200 group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0" />
								<X className="-rotate-180 absolute inset-0 m-auto size-6 scale-0 opacity-0 duration-200 group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100" />
							</button>
						</div>

						{/* Mobile Menu Dropdown */}
						<div className="w-full rounded-3xl border bg-bg-header p-6 shadow-2xl shadow-zinc-300/20 group-data-[state=active]:block lg:hidden">
							<NavLinks pathname={pathname} />
							<div className="mt-6">
								<DonateButton className="font-extrabold bg-accent-300 z-10 w-full h-14" />
							</div>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};

const ResponsiveLogo = () => {
	return (
		<>
			{/* mobile until lg */}
			<div className="lg:hidden aspect-square">
				<a href="/">
					<img
						className="h-12 w-12 object-contain"
						src={logo.src}
						alt="Angyalmancsok logo"
					/>
				</a>
			</div>
			{/* desktop */}
			<div className="hidden lg:block">
				<a href="/">
					<Logo />
				</a>
			</div>
		</>
	);
};

export default Header;
