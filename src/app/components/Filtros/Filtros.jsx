'use client'
import { useState } from "react"
import DropdownBase from "../dropdown/dropdownBase"
import DropdownFiltros from "../dropdown/dropdownFiltro"
export const Filtros = ({id,label, texto,tipo = "text", children}) =>{
    const [itemClick, setItemClick] = useState(null)
    const [isAbierto, setIsAbierto] = useState(false)
    function handleItemClick(id){
        if(itemClick === id && isAbierto) return;
        setItemClick(id) 
        setIsAbierto(true) 
    }
    const menuBoton = (
        <div role="button" className=" text-left p-2">
        <p>HUÉSPEDES</p>        
        </div>
    ) 
    return(   
                <div 
                    id={id}                     
                    onClick={(e)=>  handleItemClick(e.currentTarget.id)} 
                    className="flex hover:bg-stone-100 rounded-full cursor-pointer "
                >
                    <div  className="flex flex-col px-5 h-full justify-center  ">
                        <label  className="cursor-pointer" htmlFor={id}>{label}</label>
                        <input 
                            id={id}
                            className="border-none cursor-pointer focus:outline-none focus:border-none"
                            type={tipo}
                            placeholder={texto}  />
                    </div>    
                        {children}                        
                        {itemClick === "donde" && isAbierto && (
                                <div className="absolute top-full mt-2 z-10">  
                                    <DropdownFiltros />                                    
                                </div>
                        )}                        
                        {itemClick === "in" && isAbierto && (
                                <div className="absolute top-full mt-2 z-10">                                    
                                    <DropdownBase estado={isAbierto} onClose={()=>setIsAbierto(false)}>
                                        <p>aca debe ir el calendario</p>
                                    </DropdownBase>
                                </div>
                        )}                        
                        {itemClick === "out" && isAbierto && (
                                <div className="absolute top-full mt-2 z-10">                                    
                                    <DropdownBase estado={isAbierto}  onClose={()=>setIsAbierto(false)} width="950px">
                                        <p>contenido</p>
                                    </DropdownBase>
                                </div>
                        )}                        
                        {itemClick === "quien" && isAbierto && (
                                <div className="absolute top-full mt-2 z-10">                                    
                                    <DropdownBase estado={isAbierto} onClose={()=>setIsAbierto(false)}>
                                        <p>contenido</p>
                                    </DropdownBase>
                                </div>
                        )}                        
                </div>
          
        
    )
} 