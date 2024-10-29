import { type FC } from "react";
import logo from "~/assets/logo.png";
import DonateButton from "~/components/DonateButton";
import MobileNav from "~/components/navigation/MobileNav";
import NavLinks from "~/components/navigation/NavLinks";

const Header: FC = () => {
    return (
        <header className="bg-bg-header mb-12 md:mb-24 relative h-20 w-full px-4 py-2 flex items-center justify-between">
            <div className="h-full aspect-square hover:scale-110 transition-all duration-300">
                <a href="/">
                    <img src={logo.src} alt="Angyalmancsok logo" />
                </a>
            </div>
            <div className="flex w-full h-full gap-4 items-center justify-end">
                <DonateButton className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                <Navigation />
            </div>
        </header>
    );
};

const Navigation: FC = () => {
    return (
        <>
            <div className="lg:hidden">
                <MobileNav>
                    <NavLinks />
                </MobileNav>
            </div>

            <div className="hidden lg:block">
                <NavLinks />
            </div>
        </>
    );
};

export default Header;
