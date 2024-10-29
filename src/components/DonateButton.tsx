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
                        <div className="flex px-2 w-full items-center text-text justify-between">
                            <img
                                src={logoBlack.src}
                                alt="Angyalmancsok"
                                className="w-12 h-12"
                            />
                            <p>Támogass Minket</p>
                            <img
                                src={logoBlack.src}
                                alt="Angyalmancsok"
                                className="w-12 h-12"
                            />
                        </div>,
                        <div className="flex px-4 w-full items-center text-text justify-between">
                            <HeartFilledIcon className="w-8 h-8" />
                            <div>Köszönjük</div>
                            <HeartFilledIcon className="w-8 h-8" />
                        </div>,
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
