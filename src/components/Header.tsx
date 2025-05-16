import React, { useState } from "react";
import "../styles/header.css";
import { FiMenu, FiX } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
    document.documentElement.lang = lang;
  };

  return (
    <header className="header-container">
      <div className="header-top">
        <a href="/" className="logo">
          CosmoAdiuvo
        </a>

        <div className="header-right">
          <div className="lang-switcher">
            <select value={i18n.language} onChange={handleLanguageChange}>
              <option value="en">English</option>
              <option value="tr">Türkçe</option>
              <option value="lv">Latviešu</option>
              <option value="ru">Русский</option>
            </select>
          </div>

          <button
            className="burger-btn"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <a href="/solar-system">{t("header.menu.solarSystem")}</a>
        <a href="/moon-calendar">{t("header.menu.moonCalendar")}</a>
        <a href="/daily-horoscope">{t("header.menu.dailyHoroscope")}</a>
        <a href="/retro-planets">{t("header.menu.retroPlanets")}</a>
        <a href="/eclipse-calendar">{t("header.menu.eclipseCalendar")}</a>
      </nav>
    </header>
  );
};

export default Header;