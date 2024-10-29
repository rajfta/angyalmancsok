import {
    AnimatePresence,
    motion,
    type Transition,
    type Variants,
} from "framer-motion";
import { type FC, type ReactNode, useState, useCallback } from "react";
import MenuButton from "~/components/navigation/MenuButton";
import { usePreventScroll } from "~/hooks/usePreventScroll";

const MobileNav: FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);
    usePreventScroll({ enabled: isOpen });

    return (
        <div className="relative h-10 w-12">
            <MenuButton isOpen={isOpen} onClick={handleClick} />
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={tweenTransition}
                        className="fixed z-10 inset-0 bg-slate-950/50"
                        aria-hidden="true"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>
            <motion.div
                variants={menu}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                className="absolute z-10 -top-3 -right-2 flex justify-start flex-col overflow-hidden rounded-md items-center"
            >
                <AnimatePresence>{isOpen && <>{children}</>}</AnimatePresence>
            </motion.div>
        </div>
    );
};

const tweenTransition: Transition = {
    duration: 0.75,
    type: "tween",
    ease: [0.76, 0, 0.24, 1],
};

const menu: Variants = {
    open: {
        width: "320px",
        height: "480px",
        top: "-16px",
        right: "-8px",
        // NOTE: Keep this in sync with tailwind.config.mjs
        backgroundColor: "#bed8e3",
        transition: tweenTransition,
    },
    closed: {
        width: "48px",
        height: "40px",
        top: "0px",
        right: "0px",
        backgroundColor: "transparent",
        transition: {
            ...tweenTransition,
            delay: 0.35,
            backgroundColor: {
                delay: 1.1,
                duration: tweenTransition.duration,
                ease: "linear",
            },
        },
    },
};

export default MobileNav;
