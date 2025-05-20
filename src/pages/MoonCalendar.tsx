import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MoonFilters from '../components/MoonFilters';
import '../styles/mooncalendar.css';
import { getMoonImageFromPhase } from '../utils/getMoonImageFromPhase';
import { useTranslation } from 'react-i18next';

interface MoonData {
  date: string;
  phase: string;
  illumination: string;
}

const MoonCalendar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [allData, setAllData] = useState<MoonData[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [filterPhase, setFilterPhase] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'daily' | 'monthly'>('daily');
  const [isMonthlyLoaded, setIsMonthlyLoaded] = useState<boolean>(false);

  const today = new Date();
  const selectedDateStr = selectedDate.toISOString().split('T')[0];

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (viewMode === 'monthly' && !isMonthlyLoaded) {
      fetchData();
    }
  }, [viewMode]);

  const fetchData = async () => {
    try {
      const response = await axios.get<MoonData[]>(`${import.meta.env.VITE_BACKEND_URL}/api/moon`);
      setAllData(response.data);
      setIsMonthlyLoaded(true);
    } catch (error) {
      console.error('❌ Moon data fetch failed:', error);
    }
  };

  const dailyData = allData.find((item) => item.date === selectedDateStr);

  const filteredMonthlyData =
    filterPhase === 'All'
      ? allData.filter((item) => item.date.startsWith(selectedDateStr.slice(0, 7)))
      : allData.filter(
        (item) =>
          item.phase.toLowerCase().includes(filterPhase.toLowerCase()) &&
          item.date.startsWith(selectedDateStr.slice(0, 7))
      );

  const getLocalizedDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(i18n.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="calendar-container">
      <h1 className="calendar-title">{t("mooncalendar.title")}</h1>

      <MoonFilters selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      {viewMode === 'daily' && selectedDateStr !== today.toISOString().split('T')[0] && (
        <div className="return-today-wrapper">
          <button onClick={() => setSelectedDate(today)} className="return-today-button">
            {t("mooncalendar.returnToday")}
          </button>
        </div>
      )}

      <div className="view-toggle-wrapper">
        <button
          onClick={() => setViewMode(viewMode === 'daily' ? 'monthly' : 'daily')}
          className="toggle-button"
        >
          {viewMode === 'daily' ? t("mooncalendar.toggleToMonthly") : t("mooncalendar.toggleToDaily")}
        </button>
      </div>

      {viewMode === 'daily' && dailyData && (
        <div className="moon-info-card">
          <h2>{getLocalizedDate(dailyData.date)}</h2>
          <img
            src={getMoonImageFromPhase(dailyData.phase)}
            alt={dailyData.phase}
            className="moon-phase-img"
          />
          <p>
            <strong>{t("mooncalendar.phase")}:</strong>{' '}
            {t(`mooncalendar.phases.${dailyData.phase}`)}
          </p>
          <p>
            <strong>{t("mooncalendar.illumination")}:</strong> {dailyData.illumination}
          </p>
        </div>
      )}

      {viewMode === 'monthly' && isMonthlyLoaded && (
        <>
          <div className="phase-filter">
            <label>{t("mooncalendar.filterLabel")}</label>
            <select value={filterPhase} onChange={(e) => setFilterPhase(e.target.value)}>
              {Object.keys(t("mooncalendar.phases", { returnObjects: true }) as Record<string, string>).map(
                (key) => (
                  <option key={key} value={key}>
                    {t(`mooncalendar.phases.${key}`)}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="monthly-grid">
            {filteredMonthlyData.map((item) => (
              <div
                key={item.date}
                className="moon-day-card"
                onClick={() => {
                  setSelectedDate(new Date(item.date));
                  setViewMode('daily');
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedDate(new Date(item.date))}
              >
                <p>{getLocalizedDate(item.date)}</p>
                <img
                  src={getMoonImageFromPhase(item.phase)}
                  alt={item.phase}
                  className="moon-phase-img"
                />
                <p>{t(`mooncalendar.phases.${item.phase}`)}</p>
                <p>{item.illumination}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MoonCalendar;
