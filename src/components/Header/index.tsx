import { type FC } from "react";
import { motion } from "framer-motion";
import logo from "~/assets/logo.png";
import Nav from "./Nav";
import NavLinks from "./NavLinks";
import Logo from "~/components/Logo";
import DonateButton from "../DonateButton";

const Header: FC = () => {
    return (
        <header className="bg-bg-header mb-12 md:mb-24 relative h-20 w-full px-4 py-2 flex items-center justify-between">
            <motion.div whileHover={{ scale: 1.05 }}>
                <ResponsiveLogo />
            </motion.div>
            <div className="flex w-full h-full gap-4 items-center justify-end">
                <DonateButton className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                <Nav>
                    <NavLinks />
                </Nav>
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
                    <img src={logo.src} alt="Angyalmancsok logo" />
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
