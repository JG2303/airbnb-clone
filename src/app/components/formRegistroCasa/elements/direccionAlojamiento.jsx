export default function DireccionAlojamiento({ ubicacion, setUbicacion }) {
  const handleChange = (e) => {
    const { id, value } = e.target
    setUbicacion({
      ...ubicacion,
      [id]: value,
    })
  }

  return (
    <fieldset className="direccion w-full flex flex-col gap-6 p-6 bg-white rounded-2xl ">
        <legend className="text-lg font-semibold text-gray-800 mb-2">
            Confirma tu dirección
        </legend>

      {/* País */}
      <div className="flex flex-col gap-2">
        <label
            htmlFor="pais"
            className="text-sm font-medium text-gray-700"
        >
          País
        </label>
        <select
            name="pais"
            id="pais"
            value={ubicacion.pais}
            onChange={handleChange}
            className="rounded-xl border border-gray-300 focus:border-black focus:ring-1 focus:ring-black bg-gray-50 px-4 py-2 text-sm outline-none"
        >
            <option value="">Selecciona un país</option>
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

      {/* -----------------direccion--------------------- */}
      <div className="flex flex-col gap-2">
        <label htmlFor="direccion" className="text-sm font-medium text-gray-700">
             Dirección
        </label>
        <input
            id="direccion"
            type="text"
            required
            value={ubicacion.direccion}
            onChange={handleChange}
            placeholder="Ej. Calle 123 #45-67"
            className="rounded-xl border border-gray-300 focus:border-black focus:ring-1 focus:ring-black bg-gray-50 px-4 py-2 text-sm outline-none"
        />
      </div>

      {/* -----------------apartamento-------------------- */}
      <div className="flex flex-col gap-2">
        <label htmlFor="apartamento" className="text-sm font-medium text-gray-700">
            Apartamento, piso, edificio
        </label>
        <input
            id="apartamento"
            type="text"
            value={ubicacion.apartamento}
            onChange={handleChange}
            placeholder="Ej. Apto 502, Torre B"
            className="rounded-xl border border-gray-300 focus:border-black focus:ring-1 focus:ring-black bg-gray-50 px-4 py-2 text-sm outline-none"
        />
      </div>

      {/* --------------------------ciudad----------------*/}
      <div className="flex flex-col gap-2">
            <label htmlFor="ciudad" className="text-sm font-medium text-gray-700">
            Ciudad
            </label>
            <input
            id="ciudad"
            type="text"
            required
            value={ubicacion.ciudad}
            onChange={handleChange}
            placeholder="Ej. Medellín"
            className="rounded-xl border border-gray-300 focus:border-black focus:ring-1 focus:ring-black bg-gray-50 px-4 py-2 text-sm outline-none"
            />
      </div>

      {/*----------------------departamento------------------*/}
      <div className="flex flex-col gap-2">
            <label htmlFor="departamento" className="text-sm font-medium text-gray-700">
            Departamento
            </label>
            <input
            id="departamento"
            type="text"
            value={ubicacion.departamento}
            onChange={handleChange}
            placeholder="Ej. Antioquia"
            className="rounded-xl border border-gray-300 focus:border-black focus:ring-1 focus:ring-black bg-gray-50 px-4 py-2 text-sm outline-none"
            />
      </div>

      {/*-------------------postal-----------------------------*/}
      <div className="flex flex-col gap-2">
            <label htmlFor="postal" className="text-sm font-medium text-gray-700">
            Código postal
            </label>
            <input
            id="postal"
            type="number"
            required
            value={ubicacion.postal}
            onChange={handleChange}
            placeholder="Ej. 050001"
            className="rounded-xl border border-gray-300 focus:border-black focus:ring-1 focus:ring-black bg-gray-50 px-4 py-2 text-sm outline-none"
            />
      </div>
    </fieldset>
  )
}
