export default function DireccionAlojamiento(){
    return(
        <fieldset className="border p-5">
            <legend>Confirma tu dirección</legend>
            <div>
                <label htmlFor="pais">País</label>
                <select name="pais" id="pais">
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
            <div >
                <label htmlFor="direccion">Dirección</label>
                <input  className="w-[60%]" type="text" placeholder="Aca va la direccion de api direccion " />
            </div>
            <div>
                <label htmlFor="apartamento">Apartamento, piso, edificio</label>
                <input  className="w-[60%]" type="text" placeholder="Apartamento, piso, edificio " />
            </div>
            <div>
                <label htmlFor="ciudad">Ciudad</label>
                <input  className="w-[60%]" type="text" placeholder="Se toma la ciudad de la api direccion " />
            </div>
            <div>
                <label htmlFor="departamento">departamento</label>
                <input  className="w-[60%]" type="text" placeholder="Se toma departamento de la api direccion " />
            </div>
            <div>
                <label htmlFor="postal">Codigo postal</label>
                <input  className="w-[60%]" type="text" placeholder="Se toma de la api direccion " />
            </div>
        </fieldset>
    )
}