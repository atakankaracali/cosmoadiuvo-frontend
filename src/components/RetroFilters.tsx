import React, { useState, useEffect } from 'react';
import '../styles/RetroFilters.css';
import { useTranslation } from 'react-i18next';

interface Props {
  onFilterChange: (filters: { planet: string; year: string }) => void;
  years: string[];
}

const RetroFilters: React.FC<Props> = ({ onFilterChange, years }) => {
  const { t } = useTranslation();
  const [selectedPlanet, setSelectedPlanet] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  useEffect(() => {
    onFilterChange({ planet: selectedPlanet, year: selectedYear });
  }, [selectedPlanet, selectedYear, onFilterChange]);

  return (
    <div className="retro-filters">
      <div className="filter-group">
        <label htmlFor="planet">{t('retrogradelist.filterPlanet')}:</label>
        <select id="planet" value={selectedPlanet} onChange={(e) => setSelectedPlanet(e.target.value)}>
          <option value="all">{t('retrogradelist.allPlanets')}</option>
          <option value="mercury">{t('retrogradelist.mercury')}</option>
          <option value="venus">{t('retrogradelist.venus')}</option>
          <option value="mars">{t('retrogradelist.mars')}</option>
          <option value="jupiter">{t('retrogradelist.jupiter')}</option>
          <option value="saturn">{t('retrogradelist.saturn')}</option>
          <option value="uranus">{t('retrogradelist.uranus')}</option>
          <option value="neptune">{t('retrogradelist.neptune')}</option>
          <option value="pluto">{t('retrogradelist.pluto')}</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="year">{t('retrogradelist.filterYear')}:</label>
        <select id="year" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="all">{t('retrogradelist.allYears')}</option>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RetroFilters;
