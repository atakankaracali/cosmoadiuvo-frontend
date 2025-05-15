import { useState } from "react";
import { motion } from "framer-motion";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "../styles/astroform.css";
import { useTranslation } from "react-i18next";
import { enUS, tr, ru, lv } from "date-fns/locale";

const calculateSunSignKey = (date: Date): string => {
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
  return "Capricorn";
};

const AstroForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [sunSign, setSunSign] = useState("");
  const [loading, setLoading] = useState(false);

  const { i18n, t } = useTranslation();

  const getLocale = () => {
    switch (i18n.language) {
      case "tr":
        return tr;
      case "ru":
        return ru;
      case "lv":
        return lv;
      default:
        return enUS;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return;
    setLoading(true);

    setTimeout(() => {
      const signKey = calculateSunSignKey(selectedDate);
      const translatedSign = t(`astroform.sunSigns.${signKey}`);
      setSunSign(translatedSign);
      setLoading(false);
    }, 500);
  };

  return (
    <section id="astro" className="astroform-section">
      <h2 className="astroform-title">🔮 {t("astroform.title")}</h2>
      <form onSubmit={handleSubmit} className="astroform-form">
        <div className="calendar-container">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            captionLayout="dropdown"
            fromYear={1920}
            toYear={2027}
            weekStartsOn={1}
            locale={getLocale()}
          />
        </div>

        <button type="submit" className="astroform-button">
          {t("astroform.reveal")}
        </button>
      </form>

      {loading && <p className="astroform-loading">{t("astroform.loading")}</p>}

      {sunSign && (
        <motion.div
          className="astroform-result-glow"
          initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          🌞 {t("astroform.resultPrefix")}: {sunSign}
        </motion.div>
      )}
    </section>
  );
};

export default AstroForm;
