import { useEffect, useState } from 'react';
import '../styles/eclipsecalendar.css';
import { useTranslation } from 'react-i18next';

interface EclipseEvent {
    date: string;
    type: 'solar' | 'lunar';
    subtype: 'total' | 'partial' | 'annular' | 'penumbral';
    visibility: string;
    year: string;
}

const EclipseCalendar = () => {
    const { t } = useTranslation();
    const [eclipses, setEclipses] = useState<EclipseEvent[]>([]);
    const [typeFilter, setTypeFilter] = useState<'all' | 'solar' | 'lunar'>('all');
    const [yearFilter, setYearFilter] = useState<'all' | string>('all');

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/eclipses`);
            const data = await res.json();
            const parsed: EclipseEvent[] = data.eclipses.map((e: any) => ({
                date: e.date,
                year: e.date.split('-')[0],
                type: e.solar ? 'solar' : 'lunar',
                subtype: e.type.toLowerCase(),
                visibility: e.visibleIn,
            }));
            setEclipses(parsed);
            calculateDaysToNextEclipse(parsed);
        };
        fetchData();
    }, []);

    const filteredEclipses = eclipses.filter((e) => {
        const matchType = typeFilter === 'all' || e.type === typeFilter;
        const matchYear = yearFilter === 'all' || e.year === yearFilter;
        return matchType && matchYear;
    });

    const availableYears = Array.from(new Set(eclipses.map(e => e.year))).sort();

    const [nextEclipse, setNextEclipse] = useState<EclipseEvent | null>(null);
    const [daysRemaining, setDaysRemaining] = useState<number | null>(null);

    const calculateDaysToNextEclipse = (eclipseList: EclipseEvent[]) => {
        const today = new Date();
        const futureEclipses = eclipseList
            .filter(e => new Date(e.date) > today)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        if (futureEclipses.length > 0) {
            const next = futureEclipses[0];
            const diff = Math.ceil(
                (new Date(next.date).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
            );
            setNextEclipse(next);
            setDaysRemaining(diff);
        }
    };


    return (
        <div className="eclipse-calendar-container">
            <h1 className="eclipse-title">{t('eclipse.title')}</h1>
            {nextEclipse && daysRemaining !== null && (
                <div className="next-eclipse-banner">
                    {nextEclipse.type === 'solar' ? '🌞' : '🌕'}
                    <strong> {t(`eclipse.${nextEclipse.type}`)} </strong>
                    – {t('eclipse.date')}: {nextEclipse.date} →
                    <span className="countdown"> {daysRemaining} {t('eclipse.daysLeft')}</span>
                </div>
            )}
            <div className="eclipse-filters">
                <button className={typeFilter === 'all' ? 'active' : ''} onClick={() => setTypeFilter('all')}>
                    {t('eclipse.all')}
                </button>
                <button className={typeFilter === 'solar' ? 'active' : ''} onClick={() => setTypeFilter('solar')}>
                    {t('eclipse.solar')}
                </button>
                <button className={typeFilter === 'lunar' ? 'active' : ''} onClick={() => setTypeFilter('lunar')}>
                    {t('eclipse.lunar')}
                </button>

                <select
                    className="year-dropdown"
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                >
                    <option value="all">{t('eclipse.allYears')}</option>
                    {availableYears.map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>

            <div className="eclipse-list">
                {filteredEclipses.map((eclipse, index) => (
                    <div key={index} className={`eclipse-card ${eclipse.type}`}>
                        <h3>
                            {eclipse.type === 'solar' ? '🌞' : '🌕'} {t(`eclipse.type.${eclipse.subtype}`)} {t(`eclipse.${eclipse.type}`)}
                        </h3>
                        <p>{t('eclipse.date')}: {eclipse.date}</p>
                        <p>
                            {t("eclipse.visibleIn")}: {
                                eclipse.visibility
                                    .split(",")
                                    .map(loc => t(`eclipse.locations.${loc.trim()}`))
                                    .join(", ")
                            }
                        </p>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default EclipseCalendar;
