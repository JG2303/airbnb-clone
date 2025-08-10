import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

export default function CalendarioFechas({ escala, startDate, setStartDate, endDate, fechasReservadas, setEndDate}) {
  
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const dia = new Date()  
  return (
    <DatePicker
        selected={startDate}
        onChange={onChange}
        minDate={new Date()}        
        startDate={startDate}
        endDate={endDate}
        excludeDates={fechasReservadas}
        // highlightDates={fechasReservadas}
        // includeDates={fechasReservadas}
        selectsRange
        selectsDisabledDaysInRange
        inline        
        calendarClassName={`scale-${escala}`}
    />
  );
}
