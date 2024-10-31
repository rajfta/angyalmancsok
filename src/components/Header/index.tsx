import { useEffect, useState, type FC } from "react";
import { motion } from "framer-motion";
import logo from "~/assets/logo.png";
import Nav from "./Nav";
import NavLinks from "./NavLinks";
import Logo from "~/components/Logo";
import DonateButton from "../DonateButton";

const Header: FC = () => {
    const [pathname, setPathname] = useState<string>("");

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }
        setPathname(window.location.pathname);
    }, []);
    console.log("pathname", pathname);

    return (
        <header className="bg-bg-header fixed top-0 left-0 right-0 z-50 h-20 w-full px-4 py-2 flex items-center justify-between">
            <div className="max-w-[1200px] mx-auto w-full flex items-center justify-between h-full">
                <motion.div whileHover={{ scale: 1.05 }}>
                    <ResponsiveLogo />
                </motion.div>
                <div className="flex w-full h-full gap-4 items-center justify-end">
                    <DonateButton className="absolute hidden md:block top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    <Nav>
                        <NavLinks pathname={pathname} />
                    </Nav>
                </div>
            </div>
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
                        className="h-20 w-20 object-contain"
                        src={logo.src}
                        alt="Angyalmancsok logo"
                    />
                </a>
            </div>
            {/* desktop */}
            <div className="hidden lg:block">
                <Logo />
            </div>
        </>
    );
};

export default Header;
