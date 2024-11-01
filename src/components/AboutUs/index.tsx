import { useState, type FC } from "react";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "~/components/ui/accordion";
import visionImage from "~/assets/about-us/vision.jpg";
import storyImage from "~/assets/about-us/story.jpg";
import missionImage from "~/assets/about-us/mission.jpg";
import { motion } from "framer-motion";

const imageMap: Record<string, ImageMetadata> = {
    vision: visionImage,
    story: storyImage,
    mission: missionImage,
};

const AboutUs: FC = () => {
    const [activeSection, setActiveSection] = useState<string>("vision");

    return (
        <div className="flex flex-col gap-4 items-center justify-center md:items-stretch">
            <h2>Rólunk</h2>
            <div className="aspect-[133/100] w-full relative">
                {Object.entries(imageMap).map(([key, image]) => (
                    <motion.div
                        key={key}
                        className="absolute inset-0 w-full h-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: activeSection === key ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src={image.src}
                            alt="Angyalmancsok"
                            className="w-full h-full rounded-xl overflow-hidden object-contain"
                        />
                    </motion.div>
                ))}
            </div>
            <div className="w-full">
                <Accordion
                    className="w-full"
                    defaultValue="vision"
                    type="single"
                    onValueChange={(value) => {
                        setActiveSection(value ?? "vision");
                    }}
                >
                    <AccordionItem value="vision">
                        <AccordionTrigger>Jövőképünk</AccordionTrigger>
                        <AccordionContent>{vision}</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="story">
                        <AccordionTrigger>Történetünk</AccordionTrigger>
                        <AccordionContent>{story}</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="mission">
                        <AccordionTrigger>Küldetésünk</AccordionTrigger>
                        <AccordionContent>{mission}</AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
};

const vision = `
Alapítványunk hosszú távú célja, hogy még több emberhez eljuttassuk a terápiás kutyák által nyújtott segítséget és örömöt. Hiszünk abban, hogy a kutyák képesek jelentősen javítani az emberek életminőségét, és ezért folyamatosan bővítjük és fejlesztjük szolgáltatásainkat.

Küldetésünk, hogy a felelős állattartás, az állatvédelem és a szemléletformálás révén egy elfogadóbb, empatikusabb és együttérzőbb társadalmat hozzunk létre. Terápiás kutyáink nem csak a közvetlen támogatást nyújtják a rászorulóknak, hanem inspirációként is szolgálnak mindenki számára, akikkel kapcsolatba kerülnek.`;

const story = `Az AngyalMancsok Alapítvány 2023-ban alakult, miután a Béndekpuszta Mosoly Völgye Alapítvány kutyás terápiával foglalkozó ágát átvezettük ide, minden két- és négylábú résztvevővel együtt. A kuratórium jelenlegi elnöke, Gémesi Rita, 2018 óta vezette a terápiás kutyás munkavonalat, itt tulajdonképpen csak folytatjuk és magasabb szintre emeljük a megkezdett munkát.

Az AngyalMancsok Alapítvány egy szívhez szóló és inspiráló utazás, amely Enid, az első terápiás kutyánk történetével kezdődött. Enid indított el mindannyiunkat ezen az úton. Az alapítvány Enid leszármazottainak gazdijaiból alakult, akik terápiás kutya felvezetőkké, habilitációs kiképzőkké vagy segítő kutya tulajdonosokká váltak. Az ő közös munkájuk és elhivatottságuk hozta létre az alapítványt.

Az AngyalMancsok Alapítvány céljait úgy éri el leghatékonyabban, hogy a jelenlegi terápiás kutyás állományból tenyészti a következő generációs segítő kutyákat. Tenyésztési tevékenységünket az „Angels for Therapy” border collie kennelben végezzük, ahol különös figyelmet fordítunk a kutyák megfelelő temperamentumára és képességeire.

Szakmai Csapatunk az alábbi tagokból áll:

– 3 habilitációs kutyakiképző

– 1 mozgássérültet és személyi segítő kutya kiképző

– 2 gyógypedagógus

– 2 pszichológus

– 1 szociális gondozó

– 12 terápiás kutya felvezető

Együtt dolgozunk azon, hogy a lehető legjobb szolgáltatást nyújtsuk a különböző terápiás igényekkel rendelkező gyerekek és felnőttek számára. Fontos szempont, hogy bár nagyon elhivatottak vagyunk, ez a tevékenység hobbi és társadalmi felelősségvállalás számunkra.`;

const mission = `
Csapatunk 14 intézményben dolgozik heti rendszerességgel, segítve fogyatékkal élő, pszichés betegséggel küzdő, tartós beteg, részképesség-zavaros, valamint gyermekvédelmi szakellátásban élő gyermekek és felnőttek terápiáját. Ezen kívül állami és privát óvodákban és általános iskolákban is tevékenykedünk, az intézmények egyedi igényei szerint.

Küldetésünk egy elfogadóbb, empatikusabb és együttérzőbb társadalom létrehozása a felelős állattartás, az állatvédelem és a szemléletformálás révén, amelyet terápiás kutyáink aktív részvételével érünk el. Terápiás kutyáink nemcsak közvetlen támogatást nyújtanak a rászorulóknak, hanem inspirációként is szolgálnak mindenki számára, akivel kapcsolatba kerülnek.

Az AngyalMancsok Alapítvány elkötelezett abban, hogy terápiás kutyák segítségével javítsa a rászorulók életét, és elősegítse a felelős állattartás és az állatvédelem fontosságának felismerését. Továbbra is azon dolgozunk, hogy széles körben elérhetővé tegyük szolgáltatásainkat, minél több embernek nyújtva segítséget és támogatást.`;
export default AboutUs;
