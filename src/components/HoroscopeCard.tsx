import { useTranslation } from 'react-i18next';
import { HoroscopeResponse } from '../types/HoroscopeResponse';

const renderStars = (count: number) => {
  return '⭐️'.repeat(count) + '☆'.repeat(5 - count);
};

const HoroscopeCard = ({ data }: { data: HoroscopeResponse }) => {
  const { t } = useTranslation();

  return (
    <div className="horoscope-card">
      <h3>{t(`astroform.sunSigns.${data.sign}`)} – {data.date}</h3>
      <p style={{ marginBottom: '1rem' }}>{data.generalMessage}</p>

      <div>
        <p>❤️ {t('dailyhoroscope.ratings.love')}: {renderStars(data.ratings.love)}</p>
        <p>🍀 {t('dailyhoroscope.ratings.luck')}: {renderStars(data.ratings.luck)}</p>
        <p>💼 {t('dailyhoroscope.ratings.career')}: {renderStars(data.ratings.career)}</p>
        <p>🩺 {t('dailyhoroscope.ratings.health')}: {renderStars(data.ratings.health)}</p>
      </div>
    </div>
  );
};

export default HoroscopeCard;
