import { useState, type FC, type ReactNode } from "react";
import { Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";

import logo from "../assets/logo.png";

const Header: FC = () => {
    return (
        <header className="bg-bg-header relative h-20 w-full px-4 py-2 flex items-center justify-between">
            <div className="h-full aspect-square hover:scale-110 transition-all duration-300">
                <a href="/">
                    <img src={logo.src} alt="Angyalmancsok logo" />
                </a>
            </div>
            <div className="flex md:flex-row-reverse gap-4 items-center justify-between">
                <Button
                    size="large"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:static md:transform-none"
                    type="primary"
                >
                    <a href="/adomanyozas">Adományozás</a>
                </Button>
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
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="text" onClick={showDrawer} icon={<MenuOutlined />} />
            <Drawer size="default" onClose={onClose} open={open}>
                <NavLinks />
            </Drawer>
        </>
    );
};

const NavLinks: FC = () => {
    return (
        <nav>
            <ul className="flex flex-col md:flex-row gap-4 items-center justify-center">
                <li>
                    <Link href="/">Főoldal</Link>
                </li>
                <li>
                    <Link href="/rolunk">Rólunk</Link>
                </li>
                <li>
                    <Link href="/szolgaltatasok">Szolgáltatások</Link>
                </li>
                <li>
                    <Link href="/kapcsolat">Kapcsolat</Link>
                </li>
            </ul>
        </nav>
    );
};

const Link: FC<{ href: string; children: ReactNode }> = ({
    href,
    children,
}) => (
    <a
        href={href}
        className="text-text-primary hover:text-primary transition-colors duration-300 text-lg"
    >
        {children}
    </a>
);

export default Header;
