
import DropdownFiltros from "../dropdown/dropdownFiltro"
import DropdownCantidad from "../dropdown/dropdownCantidad"
import { useState } from "react"

export default function FiltrosHeader(){  
    const [filtro, setFiltro] = useState({
        lugar: '',
        fechaIn: null,
        fechaOut: null,
        cantidad: 1
    })  
    console.log('filtro: ',filtro )
    return(       
            <div className=" flex ">
                <DropdownFiltros filtro={filtro} setFiltro={setFiltro}/>
                <DropdownFiltros />
                <DropdownFiltros />
                <DropdownCantidad />
                
            </div>
            
            
     

    )
}