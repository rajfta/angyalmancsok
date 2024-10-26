import { type FC } from "react";

import heroImage from "~/assets/hero.jpg";
import { Button } from "~/components/ui/button";

const Hero: FC = () => {
    return (
        <div className="py-12 md:py-24 flex flex-col gap-4 items-center">
            <div className="flex flex-col md:flex-row md:gap-16 gap-4 items-center justify-between">
                <div className="order-1 md:pl-12 md:order-2 md:flex-1 flex flex-col gap-4">
                    <h1 className="max-w-96 md:mb-12">
                        Üdvözlünk az Angyalmancsok oldalán! <br /> 🐾
                    </h1>
                    <p className="mb-4 order-3 md:block hidden">{pText}</p>
                </div>
                <p className="mb-4 order-3 md:hidden">{pText}</p>
                <div className="md:order-1 order-2 aspect-[3/2] md:aspect-square -container-padding">
                    <img
                        src={heroImage.src}
                        alt="Boldog kutya Enid"
                        className="md:rounded-lg w-full h-full shadow-lg object-cover object-center"
                    />
                </div>
            </div>
            <Button className="order-4 md:self-end">
                <a href="/rolunk">Részletek</a>
            </Button>
        </div>
    );
};

const pText = `Az AngyalMancsok Alapítványnál hiszünk a terápiás kutyák
                    csodálatos erejében, amely képes megváltoztatni és
                    gazdagítani az emberek életét. Küldetésünk, hogy terápiás
                    kutyáink segítségével örömet, vigaszt és gyógyulást hozzunk
                    azoknak, akiknek a legnagyobb szükségük van rá.`;

export default Hero;
