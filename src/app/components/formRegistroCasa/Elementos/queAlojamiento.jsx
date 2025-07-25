export default function QueAlojamiento(){
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
        <fieldset className="border p-5">
            <legend>¿De qué tipo de alojamiento dispondrán los huéspedes?</legend>
            {
                opciones.map((tipo)=>(
                            <div key={tipo.id} >
                                <label                                 
                                    className="  flex flex-col gap-3 items-start w-full p-4 border rounded-lg bg-gray-300  cursor-pointer  transition"
                                    htmlFor={tipo.id}
                                >                                
                                    <input 
                                        type="radio" 
                                        id={tipo.id} 
                                        name="tipo"
                                        value={tipo.nombre} 
                                        // className="hidden" 
                                    />
                                    <p className="font-medium">{tipo.nombre}</p>
                                    <p>{tipo.descripcion}</p>
                                </label>
                            </div>
                ))
            }
        </fieldset>
    )
}