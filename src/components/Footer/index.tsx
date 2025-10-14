import { Mail, Phone } from "lucide-react";
import type { FC } from "react";
import Logo from "~/components/Logo";
import Socials from "~/components/Socials";

const Footer: FC = () => {
	return (
		<footer className="container-padding bg-primary-900 text-white rounded-t-3xl text-xs mt-auto py-4">
			<div className="flex flex-col relative gap-2 justify-center">
				<h3 className="text-lg text-primary-200 font-bold">Elérhetőségeink</h3>
				<p className="flex items-center gap-2">
					<Mail className="size-4" />
					<a href="mailto:angyalmancsokalapitvany@gmail.com">
						angyalmancsokalapitvany@gmail.com
					</a>
				</p>
				<p className="flex items-center gap-2">
					<Phone className="size-4" />
					<a href="tel:+36209326333">+36 20 93 26 333</a>
				</p>
				<div className="flex mt-6 items-center gap-4">
					<Socials iconClassName="size-6 lg:size-8" />
				</div>
				<div className="absolute top-1/2 -translate-y-1/2 -right-6">
					<Logo hideText />
				</div>
			</div>

			{/* Divider */}
			<div className="h-[1px] my-4 -container-padding bg-white/30" />
			{/*TODO: Dokumentumok */}
			<div className="flex flex-col relative gap-2 justify-center">
				<h3 className="text-lg text-primary-200 font-bold">Dokumentumok</h3>
				<div className="flex flex-col gap-1">
					{/* biome-ignore lint/a11y/useValidAnchor: Placeholder link, will be updated later */}
					<a href="#" className="hover:text-primary-200 transition-colors">
						Adatkezelési tájékoztató
					</a>
					{/* biome-ignore lint/a11y/useValidAnchor: Placeholder link, will be updated later */}
					<a href="#" className="hover:text-primary-200 transition-colors">
						Alapító okirat
					</a>
					{/* biome-ignore lint/a11y/useValidAnchor: Placeholder link, will be updated later */}
					<a href="#" className="hover:text-primary-200 transition-colors">
						Közhasznúsági jelentés 2023
					</a>
					{/* biome-ignore lint/a11y/useValidAnchor: Placeholder link, will be updated later */}
					<a href="#" className="hover:text-primary-200 transition-colors">
						SZMSZ
					</a>
				</div>
			</div>
			{/* Divider */}
			<div className="h-[1px] my-4 -container-padding bg-white/30" />
			<p className="text-slate-200 text-xs text-[10px]">
				Angyalmancsok Alapítvány 2024. Minden jog fenntartva.
			</p>
		</footer>
	);
};

export default Footer;
