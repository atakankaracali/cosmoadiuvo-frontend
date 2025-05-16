import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/dailyhoroscope.css';

const zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

interface Props {
    onGenerate: (sign: string, date: string, lang: string) => void;
}

const HoroscopeForm = ({ onGenerate }: Props) => {
    const { t, i18n } = useTranslation();
    const [sign, setSign] = useState('Aries');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [lang, setLang] = useState(i18n.language);

    return (
        <div className="horoscope-container">
            <h2>{t('dailyhoroscope.title')}</h2>
            <label>{t('dailyhoroscope.selectSign')}</label>
            <select value={sign} onChange={(e) => setSign(e.target.value)}>
                {zodiacSigns.map((s) => (
                    <option key={s} value={s}>
                        {t(`astroform.sunSigns.${s}`)}
                    </option>
                ))}
            </select>

            <label>{t('dailyhoroscope.selectDate')}</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

            <label>{t('dailyhoroscope.selectLanguage')}</label>
            <select value={lang} onChange={(e) => setLang(e.target.value)}>
                <option value="en">English</option>
                <option value="tr">Türkçe</option>
                <option value="lv">Latviešu</option>
                <option value="ru">Русский</option>
            </select>

            <button onClick={() => onGenerate(sign, date, lang)}>
                {t('dailyhoroscope.generate')}
            </button>
            <p className="horoscope-disclaimer">
                {t("dailyhoroscope.disclaimer")}
            </p>
        </div>
    );
};

export default HoroscopeForm;
