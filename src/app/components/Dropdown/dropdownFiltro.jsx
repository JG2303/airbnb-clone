'use client'
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions} from '@headlessui/react'
import { useEffect, useState } from 'react'
import useFavoritos from '@/hooks/useFavoritos'
import { Hotel } from 'lucide-react'
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
					className="border border-gray-400 rounded-xl py-3 px-1 md:border-none md:px-5 w-full md:h-18 md:rounded-full outline-0 cursor-pointer hover:bg-gray-200"
				/>
				{/* -----------------------------------ventana que contiene las ciudades------------------------- */}
				<ComboboxOptions 
					anchor="bottom" 
					transition 
					className="  w-full  md:w-120 z-99999  bg-white rounded-4xl mt-1  overflow-auto shadow-md origin-top transition duration-200 ease-out empty:invisible data-closed:scale-95 data-closed:opacity-0 ">
						<div className='p-3 m-auto'>destinaciones sugeridas</div>
						{/* --------------------------------mostrar cada ciudad que se trajo de supabase------------------- */}
						{filteredCiudades.map((ciudad) => (
							<ComboboxOption
								key={ciudad}
								value={ciudad}
								className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-200 rounded-xl"
							>
								
								<div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100">
									<Hotel />
								</div>
								
								<div className="flex flex-col">
									<p className="font-medium text-gray-900">{ciudad}</p>
									<p className="text-sm text-gray-500">
										Explora los mejores lugares para descansar en  {ciudad}
									</p>
								</div>
							</ComboboxOption>

				))}
				</ComboboxOptions>
			</Combobox>
			</>
	)
}
