'use client'
export default function QueAlojamiento({tipoAlojamiento, setTipoAlojamiento}){    
    const opciones = [
        {
            id:"completo",             
            nombre:"Un alojamiento entero", 
            descripcion:"Los huéspedes disponen del alojamiento entero para ellos."
        },
        {
            id:"habitacion",             
            nombre:"Una habitación", 
            descripcion: "Los huéspedes tienen su propia habitación en un alojamiento, mas acceso a espacios compartidos."
        },
        {
            id:"compartida",             
            nombre:"Una habitación compartida en un hostal", 
            descripcion: "Los huéspedes duermen en una habitación compartida en un hostal administrado por profesionales y con personal disponible 24/7."
        }
    ]
    
    return(
        <fieldset className="border p-4 flex flex-col gap-2">
            <legend>¿De qué tipo de alojamiento dispondrán los huéspedes?</legend>
            {
                opciones.map((tipo)=>(
                            <div key={tipo.id} className="  flex gap-3 items-start w-full  cursor-pointer transition" >
                                <label htmlFor={tipo.id} className={`w-full outline hover:outline-3 hover:outline-black  h-full p-5 rounded-xl cursor-pointer 
                                                                                                    ${tipo.id === tipoAlojamiento 
                                                                                                    ? ("outline-3 outline-black")
                                                                                                    : ("outline outline-gray-300")}`}>
                                    <p className="font-medium ">{tipo.nombre}</p>
                                    <p>{tipo.descripcion}</p>
                                </label>                               
                                <input 
                                    type="radio" 
                                    id={tipo.id} 
                                    name="tipo"
                                    value={tipo.nombre} 
                                    onChange={(e)=>setTipoAlojamiento(e.target.id)}
                                    className="hidden" 
                                />
                            </div>
                ))
            }
        </fieldset>
    )
}