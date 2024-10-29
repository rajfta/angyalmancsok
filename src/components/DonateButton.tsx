import { type ComponentPropsWithoutRef, type FC } from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import PerspectiveButton from "~/components/ui/PerspectiveButton";
import logoBlack from "~/assets/logo-black.png";
import { HeartFilledIcon } from "@radix-ui/react-icons";

type DonateButtonProps = ComponentPropsWithoutRef<typeof Button>;

const DonateButton: FC<DonateButtonProps> = ({ className }) => {
    return (
        <a href="/tamogass">
            <PerspectiveButton
                labels={{
                    closed: [
                        <span className="flex px-2 w-full items-center text-text justify-between">
                            <img
                                src={logoBlack.src}
                                alt="Angyalmancsok"
                                className="w-12 h-12"
                            />
                            <span>Támogass Minket</span>
                            <img
                                src={logoBlack.src}
                                alt="Angyalmancsok"
                                className="w-12 h-12"
                            />
                        </span>,
                        <span className="flex translate-y-1 px-4 w-full items-center text-text justify-between">
                            <HeartFilledIcon className="w-8 h-8" />
                            <span>Köszönjük</span>
                            <HeartFilledIcon className="w-8 h-8" />
                        </span>,
                    ],
                }}
                className={cn(
                    "font-extrabold bg-secondary-500 z-10 w-72 h-14",
                    className,
                )}
            />
        </a>
    );
};

export default DonateButton;
