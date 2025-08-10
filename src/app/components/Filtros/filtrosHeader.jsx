'use client'
import { Search } from "lucide-react"
import dynamic from "next/dynamic"
import { useState } from "react"
import useFavoritos from "@/hooks/useFavoritos"
import DropdownHuespedes from "../dropdown/DropHuespedes"
import DropdownFiltros from "../dropdown/dropdownFiltro"

export default function FiltrosHeader(){  
    const {selectCiudad, selectHuespedes , selectFechaCiudad} = useFavoritos()
    const [dataHuespedes, setDataHuespedes] = useState()
    
    const [filtro, setFiltro] = useState({
        lugar: '',
        fechaIn: null,
        fechaOut: null,
        cantidad: 0
    })  
    // --------------------------------------aplicar los filtros----------------------------
    const handleCantidad = async ()=>{        
        const {data, error} = await selectHuespedes(filtro.cantidad)
        if(error) console.error('error al filtrar por cantidad', error.message)
        
    }

    const handleFiltroCiudad = async ()=>{
        // ------------------------filtro por ciudad------------------------
        const {data, error} = await selectCiudad(filtro.lugar)
        if(error) console.error('Error al buscar la ciudad', error.message)       
    }
    // ----------------aplicar los filtros al darle al boton buscar------------------------
    const handleFiltros = (e)=>{
        handleFiltroCiudad(filtro.lugar)
        handleCantidad()
    }
    // -----------------------------buscar los alojamiento de X ciudad que esten disponible en x fecha---
    const handlefechasCiudad = async () => {
        const {data, error} = await selectFechaCiudad(filtro.lugar, filtro.fechaIn, filtro.fechaOut)
        if(error) console.error('error', error.message)
        
    }    
    return(       
            <div className=" grid grid-cols-3 gap-1">
                <div className="">                    
                    <DropdownFiltros filtro={filtro} setFiltro={setFiltro} />
                </div>
                {/* -----------------------------seleccionar fechas---------------------- */}
                <div className="grid grid-cols-2 gap-1  text-[11px]">
                    <div className="flex flex-col justify-center rounded-full   px-2 hover:bg-gray-200">
                        <label htmlFor="in">Check-in </label>
                        <input type="date" name="" id="in" onChange={(e)=>setFiltro({...filtro, fechaIn:e.target.value})} />
                    </div>
                    <div className="flex flex-col justify-center rounded-full   px-2 hover:bg-gray-200">
                        <label htmlFor="out">Check-out</label>
                        <input type="date" name="" id="out" onChange={(e)=>setFiltro({...filtro, fechaOut:e.target.value})} />
                    </div>
                </div>
                {/* -------------------------seleccionar cantidad de huespedes------------- */}
                <div className=" flex justify-between   hover:bg-gray-200 w-full "> 
                    <div className="w-full">
                        <DropdownHuespedes  setDataHuespedes={setDataHuespedes} lugar="filtros" />                    
                    </div>                                      
                    <div className="px-3 rounded-full py-1 flex justify-center items-center">
                        <button 
                            className=" bg-red-500 w-[90%] h-[90%] rounded-full px-[21px] cursor-pointer hover:bg-red-700"
                            onClick={(e)=>handleFiltros(e)}
                        >
                            <Search color="white" size={20}/>
                        </button> 
                    </div>
                    {/* --------------------boton de buscar(aplicar filtros) */}
                </div>
                {/* <button 
                    type="button hidden"
                    className="bg-amber-600 p-5 cursor-pointer rounded-full"
                    onClick={handlefechasCiudad}
                > fechas </button>             */}
                
            </div>
            
            
     

    )
}