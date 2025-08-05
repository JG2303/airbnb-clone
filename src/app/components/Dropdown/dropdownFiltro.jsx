
/**
 * BuscadorCiudades es un componente React que muestra un desplegable (combobox) con búsqueda
 * para seleccionar ciudades. Obtiene los datos de las ciudades usando un hook personalizado y
 * muestra resultados filtrados según la entrada del usuario.
 *
 * @component
 * @returns {JSX.Element} El combobox renderizado para la selección de ciudades.
 *
 * @example
 * <BuscadorCiudades />
 *
 * @description
 * - Obtiene datos de ciudades desde Supabase usando el hook `useFavoritos`.
 * - Permite a los usuarios buscar y seleccionar una ciudad del desplegable.
 * - Filtra las ciudades según la consulta ingresada por el usuario.
 */
'use client'
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions} from '@headlessui/react'
import { useEffect, useState } from 'react'
import useFavoritos from '@/hooks/useFavoritos'
export default function BuscadorCiudades({filtro, setFiltro}) {
  const [ciudades, setCiudades] = useState([])
  const [query, setQuery] = useState('')
  const [selectedCiudad, setSelectedCiudad] = useState(null)
  const {selectCiudad} = useFavoritos()
  const BuscarCiudades = async () =>{
    const {data, error} = await selectCiudad()
    if(error) console.log('Error al cargar ciudades: ', error.message)
    // -----------------crear un array de objectos y eliminar espacios en blanco---------------------------
    const ciudadesFiltradas = data
      .map((item, i) => ({
        id: i,
        name: item.ciudad,
      }))
      .filter((item) => item.name && item.name.trim() !== '')
    setCiudades(ciudadesFiltradas)
    
  }
  
  const filteredCiudades =
    query === ''
      ? ciudades
      : ciudades.filter((ciudad) =>
          ciudad.name.toLowerCase().includes(query.toLowerCase())
        )
  // -------------------------------------ejecuta funcion de cargar las ciudades al abrir la pagina------------
  useEffect(()=>{
    BuscarCiudades()
  },[])
  // --------------------------------guarda la ciudad seleccionado en el estado filtro------------------
  useEffect(()=>{    
    if(selectedCiudad){
      setFiltro({
        ...filtro,
        lugar:selectedCiudad.name
      })
    }
  },[selectedCiudad])
  
  return (
    <Combobox
      immediate
      value={selectedCiudad}
      onChange={setSelectedCiudad}
      onClose={() => setQuery('')}      
    >
      <ComboboxInput
        aria-label="Ciudad"
        placeholder="Buscar ciudad..."
        displayValue={(ciudad) => ciudad?.name || ''}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2  w-full h-18 rounded-full outline-0 cursor-pointer hover:bg-gray-200"
      />
      <ComboboxOptions anchor="bottom" className=" w-120 z-3000  bg-white rounded-4xl mt-1  overflow-auto   shadow-md ">
        <div className='p-3'>destinaciones sugeridas</div>
        {filteredCiudades.map((ciudad) => (
          <ComboboxOption
            key={ciudad.id}
            value={ciudad}
            className="px-4 flex g-5 py-2 cursor-pointer hover:bg-blue-100"
          >     
            <div className='flex flex-col gap-1'>
               <p>{ciudad.name}</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique ducimus .</p>
            </div>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  )
}
