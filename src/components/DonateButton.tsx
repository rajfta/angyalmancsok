import { type ComponentPropsWithoutRef, type FC } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DonateButtonProps = ComponentPropsWithoutRef<typeof Button>;

const DonateButton: FC<DonateButtonProps> = ({ className }) => {
    return (
        <Button
            size="lg"
            className={cn("font-extrabold uppercase px-4", className)}
        >
            <a href="/tamogass">Támogass minket</a>
        </Button>
    );
};

export default DonateButton;
