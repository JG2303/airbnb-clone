'use client'
import DatePicker from "react-datepicker";
export default  function DropdownCalendarioPc({startDate, setStartDate, endDate, fechasReservadas, setEndDate}){   
   
    return (
    <div className="flex  justify-center items-center gap-4 p-4">        
        <div className=" rounded-lg p-2 w-[50%]  ">            
            <DatePicker
                minDate={new Date()}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Fecha de entrada"
                className=" p-2 rounded-md border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <div className=" rounded-lg p-2 w-[50%]">
            
            <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="Fecha salida"
                className="p-2 rounded-md border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    </div>
);
}