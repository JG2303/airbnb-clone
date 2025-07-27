'use client'
export default function DireccionAlojamiento({ubicacion, setUbicacion}){   
    const handleChange = (e) =>{
        const {id, value} = e.target
        setUbicacion({
            ...ubicacion,
            [id]: value
        })
    } 
    return(
        <fieldset className="direccion flex flex-col  gap-5 border p-5">
            <legend>Confirma tu dirección</legend>
            <div >
                <label htmlFor="pais">País</label>
                <select 
                    name="pais" 
                    id="pais"
                    value={ubicacion.pais}
                    onChange={handleChange}
                >
                        <option value="">Selecciona pais</option>
                        <option value="colombia">Colombia</option>
                        <option value="brazil">Brazil</option>
                        <option value="peru">Perú</option>
                        <option value="venezuela">Venezuela</option>
                        <option value="ecuador">Ecuador</option>
                        <option value="chile">Chile</option>
                        <option value="bolivia">Bolivia</option>                
                        <option value="argentina">Argentina</option>                
                </select>
            </div>
            <div className="flex flex-col">
                <label htmlFor="direccion">Dirección</label>
                <input 
                    id="direccion" 
                    className="w-[60%]" 
                    type="text" 
                    value={ubicacion.direccion}
                    onChange={handleChange}
                    placeholder="Aca va la direccion de api direccion " 
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="apartamento">Apartamento, piso, edificio</label>
                <input 
                    id="apartamento" 
                    className="w-[60%]" 
                    type="text" 
                    value={ubicacion.apartamento}
                    onChange={handleChange}
                    placeholder="Apartamento, piso, edificio " />
            </div>
            <div className="flex flex-col">
                <label htmlFor="ciudad">Ciudad </label>
                <input 
                    id="ciudad" 
                    className="w-[60%]" 
                    type="text"
                    value={ubicacion.ciudad}
                    onChange={handleChange} 
                    placeholder="Se toma la ciudad de la api direccion " />               
            </div>
            <div className="flex flex-col">
                <label htmlFor="departamento">departamento</label>
                <input 
                    id="departamento" 
                    className="w-[60%]" 
                    type="text" 
                    value={ubicacion.departamento}
                    onChange={handleChange}
                    placeholder="Se toma departamento de la api direccion " />
            </div>
            <div className="flex flex-col">
                <label htmlFor="postal">Codigo postal</label>
                <input 
                    id="postal" 
                    className="w-[60%]" 
                    type="text" 
                    value={ubicacion.postal}
                    onChange={handleChange}
                    placeholder="Se toma de la api direccion " />
            </div>
        </fieldset>
    )
}