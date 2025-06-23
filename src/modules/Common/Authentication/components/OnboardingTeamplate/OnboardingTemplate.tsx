import { ReactNode } from "react";
import styles from "./OnboardingTemplate.module.css";
import { cdnUrl } from "@/modules/utils/cdn";

type TemplateProps = {
    children: ReactNode;
};

export default function OnboardingTemplate({ children }: TemplateProps) {
    return (
        <div className={styles.template}>
            <img className={styles.templatePlanet} src={cdnUrl("/src/modules/Common/Authentication/assets/planet.webp")} alt="Planet" />
            <img className={styles.templateAstro} src={cdnUrl("src/modules/Common/Authentication/assets/astro.webp")} alt="Astro" />
            <img className={styles.templateAstroo} src={cdnUrl("src/modules/Common/Authentication/assets/astroo.webp")} alt="Astroo" />
            <img className={styles.templateMufo} src={cdnUrl("src/modules/Common/Authentication/assets/mufo.webp")} alt="Mufo" />
            <img className={styles.templateMuship} src={cdnUrl("src/modules/Common/Authentication/assets/muship.webp")} alt="Muship" />

            <div className={styles.templateContent}>{children}</div>
        </div>
    );
}
