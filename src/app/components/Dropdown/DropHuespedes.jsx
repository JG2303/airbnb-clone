

/**
 * Componente DropdownHuespedes para seleccionar la cantidad de huéspedes (adultos, niños, bebés y mascotas).
 *
 * Este componente muestra un menú desplegable que permite al usuario ajustar el número de cada tipo de huésped,
 * respetando el límite máximo permitido. Los cambios se comunican al componente padre mediante la función setDataHuespedes.
 *
 * Props:
 * @param {number} [huespedesPermitidos=15] - Número máximo de huéspedes permitidos (adultos + niños).
 * @param {function} setDataHuespedes - Función para actualizar los datos de huéspedes en el componente padre.
 * @param {string} [lugar="reserva"] - Contexto de uso del dropdown ("reserva" para reservas, "filtros" para filtros de búsqueda).
 *
 * @returns {JSX.Element} Menú desplegable para seleccionar la cantidad de huéspedes.
 */
'use client'
import { useEffect, useState } from "react";
import CantidadBoton from "../formRegistroCasa/elements/cantidadBoton";
import DropdownBase from "./dropdownBase";
export default function DropdownHuespedes({huespedesPermitidos=15,setDataHuespedes, lugar="reserva" }) {  
    let tope = huespedesPermitidos - 1 
    const [maximo, setMaximo] = useState(tope)
    const [adultos, setAdultos] = useState(1);
    const [niños, setNiños] = useState(0);
    const [bebes, setBebes] = useState(0);
    const [mascotas, setMascotas] = useState(0);  
    let huespedes = adultos + niños    
    let HuespedValido = adultos + niños
    // -------------------------boton que abre el menu dropdown------------------
    const menuBotonReserva = (
        <div role="button" className=" text-left p-2">
        <p>HUÉSPEDES</p>
        <p className="text-sm text-gray-500">
            {huespedes} Huespedes · {bebes} Bebés · {mascotas} mascotas
        </p>
        </div>
    ) 
    // --------------------------menu para filtros-------------------------------  
    const menuBotonFiltro = (
        <div role="button" className=" flex flex-col justify-center text-left p-2  h-18  ">
        <p>Quién</p>
        <p className="text-sm text-gray-500">
            {huespedes} Huespedes 
        </p>
        </div>
    ) 
    const menuBoton = lugar==="filtros" ? menuBotonFiltro : menuBotonReserva
    
    // ---------------------------------------------------------------------------------
    // ----------------------------------botones que usa el menu---------------------------
    const dataBotones = [
        {nombre: "Adultos", descripcion : " Edad: 13 o más",estado:adultos, setEstado:setAdultos, tope },
        {nombre:"Niños", descripcion:" De 2 a 12 años", estado:niños, setEstado:setNiños, tope},
        {nombre:"Bebes", descripcion:"Menos de 2 años", estado:bebes, setEstado:setBebes},
        {nombre:"Mascotas", descripcion:"¿Traes un animal de servicio?", estado:mascotas, setEstado:setMascotas},    
    ]
    
    useEffect(()=>{
        setDataHuespedes({
        adultos,
        niños,
        bebes,
        mascotas
        }
        )
    },[adultos, niños, bebes, mascotas])
    return (
        
        <DropdownBase menuBoton={menuBoton}>
        <div className="p-4 space-y-2">
            {           
            dataBotones.map((boton,i)=>{
                const disableAgregar = HuespedValido >= huespedesPermitidos &&
                                    (boton.nombre === "Adultos" || boton.nombre === "Niños")

                const disableQuitar = (boton.nombre === "Adultos" && boton.estado === 1) ||
                                    (boton.estado === 0);
                return(
                <div role="button" key={i} className="flex justify-between">                
                <div>
                    <p className="text-[18px] text-gray-700 font-bold">{boton.nombre}</p>
                    <p className="text-gray-500">{boton.descripcion}</p>
                </div>
                <div>                
                    <CantidadBoton 
                    disableQuitar={disableQuitar}                  
                    disableAgregar={disableAgregar}
                    tope={tope}
                    maximo={maximo} 
                    setMaximo={setMaximo}
                    cantidad={boton.estado} 
                    setCantidad={boton.setEstado}  />
                </div>
                
                </div>
                
                )
            })
            }        
        </div>
        
        </DropdownBase>
    );
}
