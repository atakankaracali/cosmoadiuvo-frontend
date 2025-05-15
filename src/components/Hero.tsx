import "../styles/hero.css";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">{t("hero.title")}</h1>
        <p className="hero-subtitle">{t("hero.subtitle")}</p>
        <div className="hero-buttons">
          <a href="#astro" className="hero-button">
            {t("hero.button")}
          </a>
          <a href="/solar-system" className="hero-button secondary">
            🪐 {t("hero.exploreSolarSystem")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
