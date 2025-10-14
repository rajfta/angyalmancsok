import { useEffect } from "react";

export const usePreventScroll = ({ enabled }: { enabled: boolean }) => {
	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		document.body.style.overflow = enabled ? "hidden" : "unset";
	}, [enabled]);
};
