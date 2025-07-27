'use client'
import  * as iconosLucide from "lucide-react"
export default function TipoAlojamiento({tipo, setTipo}){
    const opciones = [
        { id: "casa", nombre: "Casa", icono: "Home" },
        { id: "apartamento", nombre: "Apartamento", icono: "Building2" },
        { id: "granero", nombre: "Granero", icono: "Warehouse" },
        { id: "barco", nombre: "Barco", icono: "Ship" },
        { id: "cabañas", nombre: "Cabañas", icono: "Trees" },
        { id: "casa-rodante", nombre: "Casa Rodante", icono: "Bus" },
        { id: "casa particula", nombre: "Casa particular", icono: "Home" },
        { id: "castillo", nombre: "Castillo", icono: "Castle" }, 
        { id: "cueva", nombre: "Cueva", icono: "Mountain" },
        { id: "contenedores", nombre: "Contenedores", icono: "Box" },
        { id: "casa-ciclada", nombre: "Casa cíclada", icono: "Recycle" },
        { id: "domo", nombre: "Domo", icono: "Circle" },
        { id: "casa-ecologica", nombre: "Casa ecológica", icono: "Leaf" },
        { id: "granja", nombre: "Granja", icono: "Tractor" },
        { id: "casa-huespedes", nombre: "Casa de huéspedes", icono: "Hotel" },
        { id: "hotel", nombre: "Hotel", icono: "BedDouble" },
        { id: "casa-flotante", nombre: "Casa flotante", icono: "Waves"}
    ];
    const handleseleccion = (id) =>{
        setTipo(id)
    }    
    return(
        <fieldset className="grid grid-cols-3 gap-4 p-10 border">
            <legend className="col-span-4 text-lg  mb-4">¿Cuál de estas opciones describe mejor tu espacio?</legend>
            { 
                opciones.map((opcion)=>{
                    const Icono = iconosLucide[opcion.icono] || iconosLucide.HelpCircle
                    return(
                        <button
                            key={opcion.id}
                            type="button"
                            role="radio"
                            onClick={()=>handleseleccion(opcion.id)}
                            className={`h-full flex flex-col gap-2 items-start justify-between p-5 cursor-pointer w-full text-left  hover:outline-black hover:outline-3 rounded-md  transition-all duration-100 
                                    ${
                                        tipo === opcion.id
                                        ? "outline-3 outline-black  "
                                        : "outline outline-gray-200 "
                                    }`}
                        >
                            <div> <Icono size={30} /> </div>
                            <div className='font-medium text-[18px]'>{opcion.nombre}</div>
                        </button>
                    )
                })                
            }
        </fieldset>
    )
}