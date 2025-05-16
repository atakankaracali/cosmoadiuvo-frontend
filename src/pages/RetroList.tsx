import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import '../styles/RetroList.css';
import RetroFilters from '../components/RetroFilters';
import RetroTable from '../components/RetroTable';
import { useTranslation } from 'react-i18next';
import { RetrogradeData, RetrogradeItem } from '../types/retrograde';

const RetroList: React.FC = () => {
  const { t } = useTranslation();
  const [retrogrades, setRetrogrades] = useState<RetrogradeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<{ planet: string; year: string }>({ planet: 'all', year: 'all' });
  const [filteredRetrogrades, setFilteredRetrogrades] = useState<RetrogradeData | null>(null);

  const fetchRetrogradeData = async () => {
    try {
      const response = await axios.get<RetrogradeData>(`${import.meta.env.VITE_BACKEND_URL}/api/retro`);
      setRetrogrades(response.data);
      setLoading(false);
    } catch (err: any) {
      setError(t('retrogradelist.fetchError', { error: err.message }));
      setLoading(false);
    }
  };

  const handleFilterChange = useCallback((newFilters: { planet: string; year: string }) => {
    setFilters(newFilters);
  }, []);

  const getUniqueYears = () => {
    if (!retrogrades) return [];
    const years = new Set<string>();
    for (const planet in retrogrades) {
      const planetData = retrogrades[planet as keyof RetrogradeData];
      planetData?.forEach((retrograde: RetrogradeItem) => {
        years.add(retrograde.start_date.substring(0, 4));
        years.add(retrograde.end_date.substring(0, 4));
      });
    }
    return Array.from(years).sort();
  };

  const filterRetrogrades = () => {
    if (!retrogrades) return;
    const filtered: RetrogradeData = {};
    for (const planet in retrogrades) {
      const planetData = retrogrades[planet as keyof RetrogradeData];
      filtered[planet as keyof RetrogradeData] = planetData?.filter((r) => {
        const yearMatch = filters.year === 'all' || r.start_date.startsWith(filters.year) || r.end_date.startsWith(filters.year);
        const planetMatch = filters.planet === 'all' || filters.planet === planet;
        return yearMatch && planetMatch;
      });
    }
    setFilteredRetrogrades(filtered);
  };

  useEffect(() => {
    fetchRetrogradeData();
  }, []);

  useEffect(() => {
    if (retrogrades) {
      filterRetrogrades();
    }
  }, [retrogrades, filters]);

  if (loading) return <div>{t('retrogradelist.loading')}...</div>;
  if (error) return <div>{t('retrogradelist.error')}: {error}</div>;

  return (
    <div className="retro-list-container">
      <h1>{t('retrogradelist.title')}</h1>
      <RetroFilters onFilterChange={handleFilterChange} years={getUniqueYears()} />
      {filteredRetrogrades && Object.values(filteredRetrogrades).some(arr => arr && arr.length > 0) ? (
        <RetroTable retrogrades={filteredRetrogrades} />
      ) : (
        <p>{t('retrogradelist.noRetrogrades')}</p>
      )}
    </div>
  );
};

export default RetroList;
