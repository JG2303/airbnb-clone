'use client'
import { Home } from "lucide-react"
import { useState } from "react"

export default function TipoAlojamiento(){
    const opciones = [
        {id:"casa", nombre:"Casa"},
        {id:"apartamento", nombre:"Apartamento"},
        {id:"granero", nombre:"Granero"},
        {id:"barco", nombre:"Barco"},
        {id:"cabañas", nombre:"Cabañas"},
        {id:"casa-rodante", nombre:"Casa Rodante"},
        {id:"casa particula", nombre:"Casa particula"},
        {id:"castillo", nombre:"Castillo"},
        {id:"cueva", nombre:"Cueva"},
        {id:"contenedores", nombre:"Contenedores"},
        {id:"casa-ciclada", nombre:"Casa cíclada"},
        {id:"domo", nombre:"Domo"},
        {id:"casa-ecologica", nombre:"Casa ecológica"},
        {id:"granja", nombre:"Granja"},
        {id:"casa-huespedes", nombre:"Casa de huéspedes"},
        {id:"hotel", nombre:"Hotel"},
        {id:"casa-flotante", nombre:"Casa flotante"},
    ]
    const [seleccionado, setSeleccionado] = useState("")
    const handleseleccion = (id) =>{
        setSeleccionado(id)
    }
    console.log(seleccionado)
    return(
        <fieldset className="grid grid-cols-4 gap-4 p-10 border-1">
            <legend>¿Cuál de estas opciones describe mejor tu espacio?</legend>
            {               
               opciones.map((tipo)=>(
                    <div key={tipo.id}>
                        <button
                            type="button"
                            role="radio"
                            className={`flex flex-col items-center justify-center cursor-pointer w-full h-30 hover:border-black hover:border-4 rounded-md  transition-all duration-100 
                                    ${
                                        seleccionado === tipo.id
                                        ? "border-3 border-black  "
                                        : "border border-gray-300 "
                                    }`}
                            onClick={()=>handleseleccion(tipo.id)}
                        >
                            <div><Home /> </div>
                            <div>{tipo.nombre}</div>

                        </button>
                    </div>                    
                ))
            }
        </fieldset>
    )
}