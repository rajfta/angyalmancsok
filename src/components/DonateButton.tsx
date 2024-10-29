import { type FC } from "react";
import { cn } from "~/lib/utils";
import PerspectiveButton from "~/components/ui/PerspectiveButton";
import logoBlack from "~/assets/logo-black.png";
import { HeartFilledIcon } from "@radix-ui/react-icons";

type DonateButtonProps = {
    className?: string;
    hideIcons?: boolean;
    smallIcons?: boolean;
};

const DonateButton: FC<DonateButtonProps> = ({
    className,
    hideIcons,
    smallIcons,
}) => {
    return (
        <a href="/tamogass">
            <PerspectiveButton
                labels={{
                    closed: [
                        <span
                            className={`flex px-2 w-full items-center text-text ${
                                hideIcons ? "justify-center" : "justify-between"
                            }`}
                        >
                            {!hideIcons && (
                                <img
                                    src={logoBlack.src}
                                    alt="Angyalmancsok"
                                    className={cn(
                                        "w-12 h-12",
                                        smallIcons && "w-8 h-8",
                                    )}
                                />
                            )}
                            <span>Támogass Minket</span>
                            {!hideIcons && (
                                <img
                                    src={logoBlack.src}
                                    alt="Angyalmancsok"
                                    className={cn(
                                        "w-12 h-12",
                                        smallIcons && "w-8 h-8",
                                    )}
                                />
                            )}
                        </span>,
                        <span
                            className={`flex px-4 w-full items-center text-text ${
                                hideIcons ? "justify-center" : "justify-between"
                            }`}
                        >
                            {!hideIcons && (
                                <HeartFilledIcon
                                    className={cn(
                                        "w-8 h-8",
                                        smallIcons
                                            ? "w-6 h-6 translate-y-0"
                                            : "translate-y-1",
                                    )}
                                />
                            )}
                            <span
                                className={cn(!smallIcons && "translate-y-1")}
                            >
                                Köszönjük
                            </span>
                            {!hideIcons && (
                                <HeartFilledIcon
                                    className={cn(
                                        "w-8 h-8",
                                        smallIcons
                                            ? "w-6 h-6 translate-y-0"
                                            : "translate-y-1",
                                    )}
                                />
                            )}
                        </span>,
                    ],
                }}
                className={cn(
                    "font-extrabold bg-accent-300 z-10 w-72 h-14",
                    className,
                )}
            />
        </a>
    );
};

export default DonateButton;
