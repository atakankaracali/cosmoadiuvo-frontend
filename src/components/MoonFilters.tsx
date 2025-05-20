import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import '../styles/moonfilters.css';
import { useTranslation } from 'react-i18next';
import { enUS, tr, ru, lv } from "date-fns/locale";

interface Props {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const MoonFilters: React.FC<Props> = ({ selectedDate, setSelectedDate }) => {
  const { i18n } = useTranslation();
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

  return (
    <div className="calendar-container">
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={(date) => date && setSelectedDate(date)}
        captionLayout="dropdown"
        fromYear={1920}
        toYear={2035}
        weekStartsOn={1}
        locale={getLocale()}
      />
    </div>
  );
};

export default MoonFilters;
