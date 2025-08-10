import { useState } from "react";
import DropdownBase from "./dropdownBase";
import DatePicker from "react-datepicker";
import CalendarioFechas from "../calendario/calendarioFechas";

export default  function DropdownCalendarioPc(){
    const [startDate, setStartDate] = useState(new Date("2014/02/08"));
    const [endDate, setEndDate] = useState(new Date("2014/02/10"));
    const menuBotonFiltro = (
        <div role="button" className=" flex flex-col justify-center text-left p-2  h-18  ">
        <p>Selecciona fechas</p>
        <p className="text-sm text-gray-500">         
        </p>
        </div>
    ) 
    return (
        <DropdownBase menuBoton={menuBotonFiltro}>
            hola
        </DropdownBase>
    );
}