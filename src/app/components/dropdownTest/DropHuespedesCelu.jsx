'use client'
import { useEffect, useState } from "react";
import CantidadBoton from "../formRegistroCasa/elements/cantidadBoton";
export default function DropdownHuespedesCelu({huespedesPermitidos=15,setDataHuespedes, lugar="reserva" }) {  
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
    
      <div className="md:p-4 space-y-2 flex flex-col items-center justify-center">
        {           
          dataBotones.map((boton,i)=>{
            const disableAgregar = HuespedValido >= huespedesPermitidos &&
                                  (boton.nombre === "Adultos" || boton.nombre === "Niños")

            const disableQuitar = (boton.nombre === "Adultos" && boton.estado === 1) ||
                                  (boton.estado === 0);
            return(
            <div role="button" key={i} className="grid grid-cols-2 items-center w-full">                
              <div className="flex flex-col items-start ">
                <p className="text-[16px] text-gray-700 font-bold">{boton.nombre}</p>
                <p className="text-[14px] text-gray-500">{boton.descripcion}</p>
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
      
    
  );
}
