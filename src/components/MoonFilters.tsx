import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import '../styles/moonfilters.css';

interface Props {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const MoonFilters: React.FC<Props> = ({ selectedDate, setSelectedDate }) => {

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
      />
    </div>
  );
};

export default MoonFilters;
