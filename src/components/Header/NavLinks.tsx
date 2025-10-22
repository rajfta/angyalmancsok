import type { FC } from "react";
import { cn } from "~/lib/utils";

export const links = [
	{ href: "/", label: "Főoldal" },
	{ href: "/rolunk", label: "Rólunk" },
	{ href: "/cikkek", label: "Újdonságok" },
	{ href: "/kapcsolat", label: "Kapcsolat" },
];

const NavLinks: FC<{ pathname: string }> = ({ pathname }) => {
	return (
		<ul className="space-y-6 text-base">
			{links.map((link) => (
				<li key={link.href}>
					<a
						href={link.href}
						className={cn(
							"block duration-150 hover:text-primary-600",
							pathname === link.href
								? "text-primary-600 font-semibold"
								: "text-text-description",
						)}
					>
						<span>{link.label}</span>
					</a>
				</li>
			))}
		</ul>
	);
};

export default NavLinks;
