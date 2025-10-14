import { type FC, useId } from "react";

const Paw: FC = () => {
	const filterId1 = useId();
	const filterId2 = useId();
	const maskId = useId();

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="120"
			zoomAndPan="magnify"
			viewBox="0 0 90 89.999999"
			height="120"
			preserveAspectRatio="xMidYMid meet"
			version="1.0"
			role="img"
			aria-label="Paw icon"
		>
			<title>Paw icon</title>
			<defs>
				<filter x="0%" y="0%" width="100%" height="100%" id={filterId1}>
					<feColorMatrix
						values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
						color-interpolation-filters="sRGB"
					/>
				</filter>
				<filter x="0%" y="0%" width="100%" height="100%" id={filterId2}>
					<feColorMatrix
						values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0.2126 0.7152 0.0722 0 0"
						color-interpolation-filters="sRGB"
					/>
				</filter>
				<image
					x="0"
					y="0"
					width="758"
					height="795"
					preserveAspectRatio="xMidYMid meet"
				/>
				<mask id={maskId}>
					<g filter={`url(#${filterId1})`}>
						<g
							filter={`url(#${filterId2})`}
							transform="matrix(0.118734, 0, 0, 0.118868, 0.0000005, 0.000002)"
						>
							<image
								x="0"
								y="0"
								width="758"
								height="795"
								preserveAspectRatio="xMidYMid meet"
							/>
						</g>
					</g>
				</mask>
				<image
					x="0"
					y="0"
					width="758"
					height="795"
					preserveAspectRatio="xMidYMid meet"
				/>
			</defs>
			<g mask={`url(#${maskId})`}>
				<g transform="matrix(0.118734, 0, 0, 0.118868, 0.0000005, 0.000002)">
					<image
						x="0"
						y="0"
						width="758"
						height="795"
						preserveAspectRatio="xMidYMid meet"
					/>
				</g>
			</g>
		</svg>
	);
};

export default Paw;
