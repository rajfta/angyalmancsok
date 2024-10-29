import { motion, type Variants } from "framer-motion";
import type { ReactNode, FC } from "react";
import { SiInstagram, SiFacebook } from "@icons-pack/react-simple-icons";

const links = [
    { href: "/", label: "Főoldal" },
    { href: "/rolunk", label: "Rólunk" },
    { href: "/szolgaltatasok", label: "Szolgáltatások" },
    { href: "/kapcsolat", label: "Kapcsolat" },
];

const socialLinks = [
    { href: "https://www.instagram.com/angyalmancsok/", label: "Instagram" },
    { href: "https://www.facebook.com/angyalmancsok", label: "Facebook" },
];

const NavLinks: FC = () => {
    return (
        <nav className="w-full pl-4 pb-12 lg:pb-0 h-full flex flex-col justify-between">
            <ul className="flex pt-[88px] gap-4 lg:gap-0 lg:pt-0 lg:pl-0 flex-col lg:flex-row items-start lg:items-center justify-center">
                {links.map((link, index) => (
                    <Link key={link.href} href={link.href} index={index}>
                        {link.label}
                    </Link>
                ))}
            </ul>
            <div className="lg:hidden ml-4 flex items-center gap-4">
                {socialLinks.map((link, index) => (
                    <motion.div
                        variants={slideIn}
                        initial="initial"
                        animate="enter"
                        exit="exit"
                        key={link.href}
                        custom={index}
                    >
                        <a href={link.href}>
                            {link.label === "Instagram" ? (
                                <SiInstagram className="size-8" />
                            ) : (
                                <SiFacebook className="size-8" />
                            )}
                        </a>
                    </motion.div>
                ))}
            </div>
        </nav>
    );
};

const Link: FC<{ href: string; children: ReactNode; index: number }> = ({
    href,
    children,
    index,
}) => (
    <div
        className={`px-4 lg:px-2 lg:py-2 hover:translate-x-1 lg:hover:translate-x-0 lg:hover:-translate-y-0.5 transition duration-300" ${
            index === 0 ? "lg:hidden" : ""
        }`}
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
            <a
                href={href}
                className="text-text hover:-translate-y-full transition duration-300 text-3xl font-medium"
            >
                {children}
            </a>
        </motion.div>
    </div>
);

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
        transition: { duration: 0.5, type: "tween", ease: "easeInOut" },
    },
};

export default NavLinks;
