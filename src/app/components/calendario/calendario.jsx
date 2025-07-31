"use client";
import { useState, useRef, useEffect } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isBefore,
  isAfter,
} from "date-fns";
export default function CalendarioRango({fechaInicio, fechaFin, setFechaInicio, setFechaFin, open, setOpen}) {
  const [hover, setHover] = useState(null);
  const [mesPrincipal, setMesPrincipal] = useState(new Date());
  const contenedorRef = useRef(null);   
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contenedorRef.current && !contenedorRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const seleccionarFecha = (fecha) => {
    if (!fechaInicio || (fechaInicio && fechaFin)) {
      setFechaInicio(fecha);
      setFechaFin(null);
    } else if (isBefore(fecha, fechaInicio)) {
      setFechaInicio(fecha);
    } else {
      setFechaFin(fecha);
      setOpen(false);
    }
  };

  const estaEnRango = (fecha) => {
    if (!fechaInicio || (!fechaFin && !hover)) return false;
    const fin = fechaFin || hover;
    return isAfter(fecha, fechaInicio) && isBefore(fecha, fin);
  };

  const esIgual = (f1, f2) => f1 && f2 && isSameDay(f1, f2);

  const resetear = () => {
    setFechaInicio(null);
    setFechaFin(null);
    setHover(null);
  };

  const generarCeldas = (mes) => {
    const primerDiaMes = startOfMonth(mes);
    const ultimoDiaMes = endOfMonth(mes);
    const primerDiaSemana = primerDiaMes.getDay() || 7;

    const diasEnMes = eachDayOfInterval({
      start: primerDiaMes,
      end: ultimoDiaMes,
    });
    const espaciosAntes = primerDiaSemana - 1;
    const totalCeldas = Math.ceil((espaciosAntes + diasEnMes.length) / 7) * 7;
    const espaciosDespues = totalCeldas - (espaciosAntes + diasEnMes.length);
    const celdas = [];
    for (let i = 0; i < espaciosAntes; i++) {
      celdas.push(
        <div key={`empty-before-${mes}-${i}`} className="h-10 w-10" />
      );
    }
    diasEnMes.forEach((fecha) => {
      const enRango = estaEnRango(fecha);
      const esInicio = esIgual(fecha, fechaInicio);
      const esFin = esIgual(fecha, fechaFin);
      const deshabilitado = isBefore(
        fecha,
        new Date(new Date().setHours(0, 0, 0, 0))
      );
      celdas.push(
        <button
          key={fecha.toISOString()}
          disabled={deshabilitado}
          onClick={() => seleccionarFecha(fecha)}
          onMouseEnter={() => setHover(fecha)}
          onMouseLeave={() => setHover(null)}
          className={`
            h-10 w-10 rounded-full transition-all duration-200 text-sm
            ${deshabilitado ? "opacity-30 cursor-not-allowed" : ""}
            ${enRango ? "bg-blue-200 text-white" : ""}
            ${esInicio || esFin ? "bg-blue-500 text-white font-bold" : ""}
            ${!deshabilitado && !esInicio && !esFin && "hover:bg-blue-100"}
          `}
        >
          {fecha.getDate()}
        </button>
      );
    });

    for (let i = 0; i < espaciosDespues; i++) {
      celdas.push(
        <div key={`empty-after-${mes}-${i}`} className="h-10 w-10" />
      );
    }

    return celdas;
  };

  const renderCalendario = (mes, control = false) => (
    <div className="p-2 min-w-[250px]">
      <div className="flex justify-between items-center mb-2">
        {control ? (
          <button
            onClick={() => setMesPrincipal(subMonths(mesPrincipal, 1))}
            className="text-lg px-2"
          >
            &lt;
          </button>
        ) : (
          <span />
        )}
        <span className="font-semibold capitalize text-sm">
          {format(mes, "MMMM yyyy")}
        </span>
        {control ? (
          <button
            onClick={() => setMesPrincipal(addMonths(mesPrincipal, 1))}
            className="text-lg px-2"
          >
            &gt;
          </button>
        ) : (
          <span />
        )}
      </div>
      <div className="grid grid-cols-7 text-xs text-center text-gray-500 mb-1">
        <div>L</div>
        <div>M</div>
        <div>X</div>
        <div>J</div>
        <div>V</div>
        <div>S</div>
        <div>D</div>
      </div>
      <div className="grid grid-cols-7 gap-1">{generarCeldas(mes)}</div>
    </div>
  );

  return (
    <div ref={contenedorRef} className="relative inline-block text-left w-full">
      <div className="flex w-full border-b border-gray-400 ">
        {/* ----------------------------------boton llegada-------------------------------------- */}
        <div className="w-[50%] ">
          <button
            onClick={() => setOpen(true)}
            className=" px-4 py-2  w-full h-full rounded-tl-xl hover:bg-gray-500 cursor-pointer"
          >
            {fechaInicio && fechaFin
              ? `${format(fechaInicio, "dd/MM/yyyy")}`
              : "Agrega una fecha"}
          </button>
        </div>
        {/* ------------------------------boton salida---------------------------------------- */}
        <div className="w-[50%] ">
          <button
            onClick={() => setOpen(true)}
            className=" w-full h-full px-4 py-2 rounded-tr-xl border-l border-gray-400 hover:bg-gray-500 cursor-pointer"
          >
            {fechaInicio && fechaFin
              ? `${format(fechaFin, "dd/MM/yyyy")}`
              : "Agrega una fecha"}
          </button>
        </div>
      </div>
      {/* -------------------------------calendario abierto---------------------------------------- */}
      {open && (
        <div className="absolute z-20 mt-2 bg-white border p-6 rounded-xl shadow-lg flex flex-row gap-x-8">
          {renderCalendario(mesPrincipal, true)}
          {renderCalendario(addMonths(mesPrincipal, 1))}

          <div className="absolute bottom-2 left-6 flex gap-4 mt-4">
            <button
              onClick={resetear}
              className="text-sm text-red-500 hover:underline"
            >
              Resetear
            </button>
            <button
              onClick={() => setOpen(false)}
              className="text-sm text-blue-500 hover:underline"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
