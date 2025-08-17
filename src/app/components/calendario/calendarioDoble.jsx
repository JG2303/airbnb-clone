"use client";
import { useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isAfter, addDays, isSameDay } from "date-fns";
import "@/app/estilos/calendario.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarioDoble({
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    fechasReservadas,
}) {
    const monthsShown = useMemo(() => 2, []);

    const fechasPlanas = useMemo(() => {
        return fechasReservadas.flat().map((f) => new Date(f));
    }, [fechasReservadas]);

    const maxSelectableDate = useMemo(() => {
        if (!startDate || endDate) return null;

        const proximas = fechasPlanas
            .filter((f) => isAfter(f, startDate))
            .sort((a, b) => a - b);

        if (proximas.length === 0) return null;

        return addDays(proximas[0], -1);
    }, [startDate, endDate, fechasPlanas]);

    const handleChange = (dates) => {
        const [start, end] = dates;

        //  Evitar seleccionar mismo día como inicio y fin
        if (start && end && isSameDay(start, end)) {
            setStartDate(null);
            setEndDate(null);
            return;
        }

        // Evitar seleccionar como inicio un día que está justo antes de una fecha reservada
        if (start && !end) {
            const diaSiguiente = addDays(start, 1);
            const siguienteReservada = fechasPlanas.some((f) => isSameDay(f, diaSiguiente));
            if (siguienteReservada) {
                alert("No puedes iniciar una reserva un día antes de una fecha ocupada.");
                setStartDate(null);
                setEndDate(null);
                return;
            }
        }

        setStartDate(start);
        setEndDate(end);
    };

    // Agregamos clase personalizada a días que están justo antes de una fecha reservada
    const dayClassName = (date) => {
        const diaSiguiente = addDays(date, 1);
        const siguienteReservada = fechasPlanas.some((f) => isSameDay(f, diaSiguiente));
        return siguienteReservada ? "dia-bloqueo-previo" : "";
    };

    return (
        <DatePicker
            inline
            monthsShown={monthsShown}
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            maxDate={maxSelectableDate}
            onChange={handleChange}
            selectsRange
            excludeDates={fechasPlanas}
            selectsDisabledDaysInRange
            calendarClassName="scale-125"
            dayClassName={dayClassName}
            renderCustomHeader={({
                monthDate,
                customHeaderCount,
                decreaseMonth,
                increaseMonth,
            }) => (
                <div className="flex items-center justify-between px-3 py-2">
                    <button
                        aria-label="Previous Month"
                        className="p-1 rounded-md hover:bg-gray-100"
                        onClick={decreaseMonth}
                        style={{
                            visibility: customHeaderCount === 0 ? "visible" : "hidden",
                        }}
                    >
                        <ChevronLeft />
                    </button>

                    <span className="text-sm font-semibold text-gray-800">
                        {monthDate.toLocaleString("es-ES", {
                            month: "long",
                            year: "numeric",
                        })}
                    </span>

                    <button
                        aria-label="Next Month"
                        className="p-1 rounded-md hover:bg-gray-100"
                        onClick={increaseMonth}
                        style={{
                            visibility:
                                customHeaderCount === monthsShown - 1 ? "visible" : "hidden",
                        }}
                    >
                        <ChevronRight />
                    </button>
                </div>
            )}
        />
    );
}
