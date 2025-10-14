import type { FC, ReactNode } from "react";

const FlipCard: FC<{ FrontSide: ReactNode; BackSide: ReactNode }> = ({
	FrontSide,
	BackSide,
}) => {
	return (
		<div className="w-80 h-[820px] [perspective:1000px] group">
			<div className="relative rounded-lg shadow-lg w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
				<div className="w-full h-full absolute [backface-visibility:hidden]">
					{FrontSide}
				</div>
				<div className="w-full h-full absolute [backface-visibility:hidden] [transform:rotateY(180deg)]">
					{BackSide}
				</div>
			</div>
		</div>
	);
};

export default FlipCard;
