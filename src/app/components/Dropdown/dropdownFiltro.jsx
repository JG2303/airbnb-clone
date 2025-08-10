
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
export default function DropdownFiltros({filtro, setFiltro}) {
  const [ciudades, setCiudades] = useState([])
  const [inputValue, setInputValue] = useState('') 
  const [selectedCiudad, setSelectedCiudad] = useState(null)
  const {selectCiudades} = useFavoritos()
  // --------------------------------buscar las ciudades de supabase----------------------
  const BuscarCiudades = async () =>{
    const {data, error} = await selectCiudades()
    if(error) console.log('Error al cargar ciudades: ', error.message)
    const ciudades = [...new Set(data.map(c=>c.ciudad))]    
    setCiudades(ciudades)  
  }  
  const filteredCiudades =
    inputValue === ''
      ? ciudades
      : ciudades.filter((ciudad) =>
          ciudad.toLowerCase().includes(inputValue.toLowerCase())
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
        lugar:selectedCiudad
      })
          
    }
  },[selectedCiudad,])
  
  return (
    <>  
      <Combobox
        immediate
        value={selectedCiudad}
        onChange={setSelectedCiudad}
        onClose={() => setInputValue('')}      
      >
        {/* ------------------------------------------el input--------------------------- */}
        <ComboboxInput
          aria-label="Ciudad"        
          placeholder="Explora destinos"
          displayValue={''}
          onChange={(e) => setInputValue(e.target.value)}
          className="px-5 w-full h-18 rounded-full outline-0 cursor-pointer hover:bg-gray-200"
        />
        {/* -----------------------------------ventana que contiene las ciudades------------------------- */}
        <ComboboxOptions anchor="bottom" transition className="  w-120 z-3000  bg-white rounded-4xl mt-1  overflow-auto shadow-md origin-top transition duration-200 ease-out empty:invisible data-closed:scale-95 data-closed:opacity-0 ">
          <div className='p-3'>destinaciones sugeridas</div>
          {/* --------------------------------mostrar cada ciudad que se trajo de supabase------------------- */}
          {filteredCiudades.map((ciudad) => (
            <ComboboxOption
              key={ciudad}
              value={ciudad}
              className="px-4 flex g-5 py-2 cursor-pointer hover:bg-blue-100"
            >     
              <div className='flex flex-col gap-1'>
                <p>{ciudad}</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique ducimus .</p>
              </div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </>
  )
}
