import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import HoroscopeForm from '../components/HoroscopeForm';
import HoroscopeCard from '../components/HoroscopeCard';
import '../styles/dailyhoroscope.css';
import { HoroscopeResponse } from '../types/HoroscopeResponse';

const DailyHoroscope = () => {
    const [data, setData] = useState<HoroscopeResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    const handleGenerate = async (sign: string, date: string, lang: string) => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/generate-horoscope`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sign, date, lang })
            });
            const result = await res.json();
            setData(result);
        } catch (error) {
            console.error('Horoscope API error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="horoscope-container">
            <HoroscopeForm onGenerate={handleGenerate} />
            {loading && <p>{t('dailyhoroscope.loading')}</p>}
            {data && <HoroscopeCard data={data} />}
        </div>
    );
};

export default DailyHoroscope;
