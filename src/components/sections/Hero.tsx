import { type FC } from "react";
import heroTransparent from "~/assets/hero-transparent.png";
import PerspectiveButton from "~/components/ui/PerspectiveButton";
import { VolleyballIcon } from "lucide-react";

const Hero: FC = () => {
    return (
        <div className="flex flex-col gap-4 items-center">
            <div className="flex flex-col md:flex-row md:gap-16 gap-4 items-center justify-between">
                <div className="order-1 md:pl-12 md:order-2 md:flex-1 flex flex-col gap-4">
                    <h1 className="max-w-96 md:mb-12">
                        Üdvözlünk az Angyalmancsok Alapítvány oldalán! <br /> 🐾
                    </h1>
                    <p className="mb-4 order-3 md:block hidden">{pText}</p>
                </div>
                <p className="mb-4 order-3 md:hidden">{pText}</p>
                {/* <div className="-container-padding md:order-1 order-2 aspect-square ">
                    <img
                        src={heroImage.src}
                        alt="Boldog kutya Enid"
                        className=" md:rounded-lg h-full w-full shadow-lg object-cover object-center"
                    />
                </div> */}
                <div className="-container-padding relative md:order-1 order-2 aspect-square ">
                    <img
                        src={heroTransparent.src}
                        alt="Boldog kutya Enid"
                        className=" md:rounded-lg shadow-lg md:shadow-none object-contain scale-110"
                    />
                    <div className="absolute -z-20 rounded-full scale-[112%] -top-4 left-0 w-full h-full bg-gradient-to-b from-accent-200 to-accent" />
                    <VolleyballIcon className="absolute -z-10 bottom-12 right-4 w-1/5 h-1/5 text-enid" />
                </div>
            </div>
            <a href="/rolunk" className="order-4 md:self-end">
                <PerspectiveButton
                    className="z-10 w-36 static"
                    labels={{
                        closed: ["Részletek", "Részletek"],
                    }}
                />
            </a>
        </div>
    );
};

const pText = `Az AngyalMancsok Alapítványnál hiszünk a terápiás kutyák
                    csodálatos erejében, amely képes megváltoztatni és
                    gazdagítani az emberek életét. Küldetésünk, hogy terápiás
                    kutyáink segítségével örömet, vigaszt és gyógyulást hozzunk
                    azoknak, akiknek a legnagyobb szükségük van rá.`;

export default Hero;
