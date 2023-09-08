import { ReactNode } from "react";
import styles from "./OnboardingTemplate.module.css";
import mufo from "../../../assets/mufo.webp";
import muship from "../../../assets/muship.webp";
import astroo from "../../../assets/astroo.webp";
import astro from "../../../assets/astro.webp";
import planet from "../../../assets/planet.webp";

type TemplateProps = {
    children: ReactNode;
};

export default function OnboardingTemplate({ children }: TemplateProps) {
    return (
        <div className={styles.template}>
            <img className={styles.templatePlanet} src={planet} alt="" />
            <img className={styles.templateAstro} src={astro} alt="" />
            <img className={styles.templateAstroo} src={astroo} alt="" />
            <img className={styles.templateMufo} src={mufo} alt="" />
            <img className={styles.templateMuship} src={muship} alt="" />
            {children}
        </div>
    );
}
