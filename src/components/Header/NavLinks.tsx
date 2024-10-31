import { motion } from "framer-motion";
import { type ReactNode, type FC } from "react";
import DonateButton from "~/components/DonateButton";
import Socials from "~/components/Socials";

const links = [
    { href: "/", label: "Főoldal" },
    { href: "/rolunk", label: "Rólunk" },
    { href: "/szolgaltatasok", label: "Szolgáltatások" },
    { href: "/kapcsolat", label: "Kapcsolat" },
];

const NavLinks: FC<{ pathname: string }> = ({ pathname }) => {
    return (
        <nav className="w-full pl-4 pb-12 lg:pb-16 h-full flex flex-col justify-between">
            <ul className="flex pt-[88px] lg:pt-[120px] gap-5 lg:gap-8 flex-col justify-center">
                {links.map((link, index) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        index={index}
                        isActive={pathname === link.href}
                    >
                        {link.label}
                    </Link>
                ))}
                <motion.div
                    initial={{
                        opacity: 0,
                        rotateX: 90,
                        translateY: 50,
                        translateX: -20,
                    }}
                    animate={{
                        opacity: 1,
                        rotateX: 0,
                        translateY: 0,
                        translateX: 0,
                    }}
                    transition={{
                        duration: 0.65,
                        delay: 0.5 + links.length * 0.1,
                        ease: [0.215, 0.61, 0.355, 1],
                    }}
                    exit={{
                        opacity: 0,
                        transition: {
                            duration: 0.5,
                            type: "linear",
                            ease: [0.76, 0, 0.24, 1],
                        },
                    }}
                >
                    {/* <DonateButton className="md:hidden h-20 relative rounded-none bg-secondary-300 -mx-4 w-[calc(100%+16px)]" /> */}
                    <DonateButton className="md:hidden h-20 bg-accent-400 relative" />
                </motion.div>
            </ul>
            <div className="ml-4 flex items-center gap-4 lg:gap-8">
                <Socials />
            </div>
        </nav>
    );
};

const Link: FC<{
    href: string;
    children: ReactNode;
    index: number;
    isActive: boolean;
}> = ({ href, children, index, isActive }) => (
    <div
        className="px-4"
        style={{ perspective: "120px", perspectiveOrigin: "bottom" }}
    >
        <motion.div
            initial={{
                opacity: 0,
                rotateX: 90,
                translateY: 50,
                translateX: -20,
            }}
            animate={{ opacity: 1, rotateX: 0, translateY: 0, translateX: 0 }}
            transition={{
                duration: 0.65,
                delay: 0.5 + index * 0.1,
                ease: [0.215, 0.61, 0.355, 1],
            }}
            exit={{
                opacity: 0,
                transition: {
                    duration: 0.5,
                    type: "linear",
                    ease: [0.76, 0, 0.24, 1],
                },
            }}
        >
            <motion.div whileHover={isActive ? {} : { x: 4 }}>
                <div className="flex gap-2 items-center">
                    {isActive && (
                        <div className="w-2 h-2 rounded-full bg-text-description" />
                    )}
                    <a
                        href={isActive ? undefined : href}
                        className={`text-3xl lg:text-4xl font-medium ${
                            isActive
                                ? "cursor-default pointer-events-none text-text-description"
                                : "text-text"
                        }`}
                    >
                        {children}
                    </a>
                </div>
            </motion.div>
        </motion.div>
    </div>
);

export default NavLinks;
