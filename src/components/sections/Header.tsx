import { type FC, type ReactNode } from "react";

import logo from "~/assets/logo.png";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTrigger,
} from "~/components/ui/drawer";
import { Button } from "~/components/ui/button";
import { MenuIcon, XIcon } from "lucide-react";
import DonateButton from "~/components/DonateButton";

const Header: FC = () => {
    return (
        <header className="bg-bg-header relative h-20 w-full px-4 py-2 flex items-center justify-between">
            <div className="h-full aspect-square hover:scale-110 transition-all duration-300">
                <a href="/">
                    <img src={logo.src} alt="Angyalmancsok logo" />
                </a>
            </div>
            <div className="flex md:flex-row-reverse gap-4 items-center justify-between">
                <DonateButton className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:static md:transform-none" />
                <Navigation />
            </div>
        </header>
    );
};

const Navigation: FC = () => {
    return (
        <>
            <div className="block md:hidden">
                <MobileNav />
            </div>

            <div className="hidden md:block">
                <NavLinks />
            </div>
        </>
    );
};

const MobileNav: FC = () => {
    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <MenuIcon className="size-8 stroke-[3] text-primary-700" />
            </DrawerTrigger>
            <DrawerContent>
                <div className="h-full w-full flex flex-col bg-bg-primary/20">
                    <div className="mb-4 mt-12">
                        <NavLinks />
                    </div>
                    <DrawerClose asChild>
                        <Button
                            variant="outline"
                            className="absolute top-4 right-4"
                        >
                            <XIcon />
                        </Button>
                    </DrawerClose>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

const NavLinks: FC = () => {
    return (
        <nav>
            <ul className="flex flex-col md:flex-row gap-1 md:gap-0 items-center justify-center">
                <Link href="/">Főoldal</Link>
                <Link href="/rolunk">Rólunk</Link>
                <Link href="/szolgaltatasok">Szolgáltatások</Link>
                <Link href="/kapcsolat">Kapcsolat</Link>
            </ul>
        </nav>
    );
};

const Link: FC<{ href: string; children: ReactNode }> = ({
    href,
    children,
}) => (
    <li className="px-4 md:px-2 py-2 text-text-primary">
        <a
            href={href}
            className="text-text-primary  hover:text-primary transition-colors duration-300 text-lg"
        >
            {children}
        </a>
    </li>
);

export default Header;
