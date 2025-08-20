'use client'
import { Search } from "lucide-react"
import { useState } from "react"
import DropdownHuespedes from "../dropdownTest/DropHuespedes"
import DropdownFiltros from "../dropdownTest/dropdownFiltro"
import { useStoreSearch } from "@/app/stores/storeSearch"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function FiltrosHeader(){      
    const [dataHuespedes, setDataHuespedes] = useState(1)    
    const setSearchData = useStoreSearch((state)=>state.setSearchData)
    const searchData = useStoreSearch((state)=>state.searchData)
    const router = useRouter()
    const [filtro, setFiltro] = useState({
        lugar: '',
        fechaIn: null,
        fechaOut: null,
        cantidad: 1
    })  
    
    // ----------------aplicar los filtros al darle al boton buscar------------------------
    const handleFiltros = async (e) => {
        e.preventDefault()       
        
        try {
            let query = supabase
                .from("alojamiento")
                .select("*")

            // Filtro ciudad
            if (filtro.lugar) {
            query = query.eq("ciudad", filtro.lugar)
            }

            // Filtro huéspedes
            if (filtro.cantidad > 0) {                
                query = query.gte("huespedes", filtro.cantidad)
            }

            // Ejecutar consulta base
            const { data: alojamientos, error } = await query
            if (error) throw error

            let disponibles = alojamientos

            // Filtrar por fechas usando reservas
            if (filtro.fechaIn && filtro.fechaOut) {
            const { data: reservas, error: errorReservas } = await supabase
                .from("reservas")
                .select("id_alojamiento, fecha_entrada, fecha_salida")

            if (errorReservas) throw errorReservas

            // Excluir alojamientos que tengan choque de fechas
            const ocupados = reservas
                .filter(r =>
                r.fecha_entrada <= filtro.fechaOut &&
                r.fecha_salida >= filtro.fechaIn
                )
                .map(r => r.alojamiento_id)

            disponibles = alojamientos.filter(a => !ocupados.includes(a.id))
            }

            setSearchData(disponibles)
            router.push('/resultadosFiltro')
        } catch (error) {
            console.error("Error en la búsqueda:", error.message)
        }
    }
    return( 
        <> 
            <div className=" grid grid-cols-1 py-5 md:py-0 gap-4 md:grid-cols-3 md:gap-1">
                {/* ---------------------------ciudades------------------------ */}
                <div >
                    <h2 className="text-[30px] font-bold md:hidden">¿Dónde?</h2>                    
                    <DropdownFiltros filtro={filtro} setFiltro={setFiltro} />
                </div>
                {/* -----------------------------seleccionar fechas---------------------- */}
                <h2 className="text-[30px] font-bold md:hidden">¿Cuándo?</h2>
                <div className="grid grid-cols-2 gap-1  text-[11px]">
                    <div className="flex flex-col justify-center rounded-full   px-2 hover:bg-gray-200">
                        <label htmlFor="in">Check-in </label>
                        <input type="date" name="" id="in" onChange={(e)=>setFiltro({...filtro, fechaIn:e.target.value})} />
                    </div>
                    <div className="flex flex-col justify-center rounded-full   px-2 hover:bg-gray-200">
                        <label htmlFor="out">Check-out</label>
                        <input type="date" name="" id="out" onChange={(e)=>setFiltro({...filtro, fechaOut:e.target.value})} />
                    </div>
                </div>
                {/* -------------------------seleccionar cantidad de huespedes------------- */}
                <h2 className="text-[30px] font-bold md:hidden">Quién</h2>
                <div className=" flex justify-between rounded-full  hover:bg-gray-200 w-full "> 
                    <div className="w-full">
                        <DropdownHuespedes 
                            setDataHuespedes={(data) => {
                                setDataHuespedes(data)  // guardas el objeto completo (adultos, niños)
                                const total = (data.adultos || 0) + (data.niños || 0)
                                setFiltro({ ...filtro, cantidad: total })
                            }}
                            lugar="filtros" 
                        />                 
                    </div>                                      
                    <div className="px-3 rounded-full py-1 flex justify-center items-center">
                        <button 
                            className=" bg-red-500 p-4 rounded-full  cursor-pointer hover:bg-red-700"
                            onClick={(e)=>handleFiltros(e)}
                        >
                            <Search color="white" size={20}/>
                        </button> 
                    </div>
                    {/* --------------------boton de buscar(aplicar filtros) */}
                </div>                      
                
            </div>
            
        </>      
    )
}