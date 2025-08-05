
/**
 * Componente DropdownHuespedes para seleccionar el número de huéspedes, bebés y mascotas.
 *
 * @componente
 * @param {Object} props - Propiedades del componente.
 * @param {number} props.huespedesPermitidos - Número máximo de huéspedes permitidos (adultos + niños).
 * @param {function} props.setDataHuespedes - Callback para actualizar el objeto de datos de huéspedes.
 * @returns {JSX.Element} Dropdown para seleccionar huéspedes, bebés y mascotas.
 */
"use client";
import { useEffect, useState } from "react";
import CantidadBoton from "../formRegistroCasa/elements/cantidadBoton";
import DropdownBase from "./dropdownBase";
export default function DropdownHuespedes({huespedesPermitidos,setDataHuespedes}) {
  let tope = huespedesPermitidos - 1
  const [maximo, setMaximo] = useState(tope)
  const [adultos, setAdultos] = useState(1);
  const [niños, setNiños] = useState(0);
  const [bebes, setBebes] = useState(0);
  const [mascotas, setMascotas] = useState(0);  
  let huespedes = adultos + niños    
  let HuespedValido = adultos + niños
  // -------------------------boton que abre el menu dropdown-----------------------
  const menuBoton = (
    <div role="button" className=" text-left p-2">
      <p>HUÉSPEDES</p>
      <p className="text-sm text-gray-500">
        {huespedes} Huespedes · {bebes} Bebés · {mascotas} mascotas
      </p>
    </div>
  ) 
  // ---------------------------------------------------------------------------------
  // ----------------------------------botones que usa el menu---------------------------
  const dataBotones = [
    {nombre: "Adultos", descripcion : " Edad: 13 o más",estado:adultos, setEstado:setAdultos, tope },
    {nombre:"Niños", descripcion:" De 2 a 12 años", estado:niños, setEstado:setNiños, tope},
    {nombre:"Bebes", descripcion:"Menos de 2 años", estado:bebes, setEstado:setBebes},
    {nombre:"Mascotas", descripcion:"¿Traes un animal de servicio?", estado:mascotas, setEstado:setMascotas}
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
                <p>{boton.nombre}</p>
                <p>{boton.descripcion}</p>
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
