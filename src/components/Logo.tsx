import logo from "~/assets/logo-without-text.png";
import { cn } from "~/lib/utils";

const Logo = ({
	className,
	hideText = false,
}: {
	className?: string;
	hideText?: boolean;
}) => {
	return (
		<a href="/">
			<div className={cn("flex items-center justify-center", className)}>
				<img
					className="h-20 w-20 object-contain"
					src={logo.src}
					alt="Angyalmancsok logo"
				/>
				{!hideText && (
					<div className="flex leading-tight flex-col">
						<span>Angyalmancsok</span>
						<span>Alapítvány</span>
					</div>
				)}
			</div>
		</a>
	);
};

export default Logo;
