import { motion } from "framer-motion";
import { type FC } from "react";
import { MenuIcon, XIcon } from "lucide-react";

const MenuButton: FC<{ isOpen: boolean; onClick: () => void }> = ({
    isOpen,
    onClick,
}) => {
    return (
        <button
            className={`flex absolute z-50 items-center justify-center rounded-md h-10 w-12 hover:shadow-lg shadow-sm flex-col text-primary-900 ${
                isOpen ? "bg-primary-900 text-white border-none" : "border"
            }`}
            onClick={onClick}
        >
            {isOpen ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <XIcon className="size-6 stroke-[3px]" />
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <MenuIcon className="size-6 stroke-[3px]" />
                </motion.div>
            )}
        </button>
    );
};

export default MenuButton;
