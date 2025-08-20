import { supabase } from "@/lib/supabaseClient"
import { useState } from "react"

export default function useFavoritos(){
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)    
        const agregarFavoritos = async (idUsuario,idAlojamiento) => {
            setIsLoading(true)
            setError(null)            
            const {data,error} = await supabase
                .from('favoritos')
                .insert([{id_usuario:idUsuario, id_alojamiento:idAlojamiento}])
            setIsLoading(false)
            if(error) setError(error) 
            return{data, error}  
        }

        const cargarDataset = async ()=> {
            setIsLoading(true)
            setError(null)
            const {data, error} = await supabase  
                .from('alojamiento')
                .select('*')
                .limit(8)
            setIsLoading(false)
            if(error) setError(error)
            return{data, error}
        } 

        const eliminarFavoritos = async(idUsuario, idAlojamiento) =>{
            setIsLoading(true)
            setError(null)
            const {data, error} = await supabase
                .from('favoritos')
                .delete()
                .eq('id_alojamiento', idAlojamiento)
                .eq('id_usuario', idUsuario)
            setIsLoading(false)
            if(error) setError(error)
            return{data,error}
        }

        const favoritosUsuario = async (idUsuario) =>{            
            setIsLoading(true)
            setError(null)
            const {data, error} = await supabase
                .from('favoritos')
                .select(`id_alojamiento,
                    alojamiento(*)`)
                .eq('id_usuario', idUsuario )
            setIsLoading(false)            
            if(error) setError(error)
            return{data, error}
        }
        // ---------------------------------consultar todos los alojamientos-------------------------
        const alojamientos = async () => {
            setIsLoading(true)
            setError(null)
            const {data, error} = await supabase 
                .from('alojamiento')
                .select('*')
                
            setIsLoading(false)
            if(error) setError(error)
            return{data, error}
            
        }
        //----------------------------------insertar registro en alojamiento

        const insertAlojamiento = async (duplicado, registro) =>{
            setIsLoading(true)
            setError(null)
            const {data} = await supabase
                .from('alojamiento')
                .select('direccion')
                .eq('direccion',duplicado)
            if(data.length === 0){
                const {error} = await supabase
                    .from('alojamiento')
                    .insert(registro)
                setIsLoading(false)    
                if(error){
                    console.error('Error al registrar alojamiento: ', error.message)
                }else{
                    alert('Registro Exitoso')
                } 
                return{error}
            }else{
                alert('Direccion ya existe')
            }
        } 
        // -------------------------------cargar datos de alojamiento especifico--------------
        const alojamientoId = async (id) =>{
            setIsLoading(true)
            setError(null)
            const {data, error} = await supabase
                .from('alojamiento')
                .select('*')
                .eq('id', id)
                .single()
            setIsLoading(false)
            if(error) setError(error)
            return{data, error}
        } 
        // -------------------------------ver si el usuario tiene alojamientos(modo anfitrion)----
        const esAnfitrion = async(id) =>{
            setIsLoading(true)
            setError(null)
            const {data, error} = await supabase
                .from('alojamiento')
                .select('*')
                .eq('id_user', id)
            setIsLoading(false)
            return {data, error}
        }
        //--------------------------------obtener datos de reserva--------------------------

        const datosReserva = async(id) => {
            setIsLoading(true)
            setError(null)
            const {data, error} = await supabase
                .from('reservas')
                .select(`fecha_entrada,
                     fecha_salida`)
                .eq('id_alojamiento',id)
            setIsLoading(false)
            if(error) setError(error)
            return{data, error}
        }

        //----------------------------------consultar todas las ciudades ------------------------------
        const selectCiudades = async () => {
            setIsLoading(true)
            setError(null)
            const {data, error} = await supabase
                .from('alojamiento')
                .select('ciudad')                                
            setIsLoading(false)
            if(error) setError(error)
            return{data, error}
        } 
        // -----------------------------------consultar solo una ciudad-------------------------------
        const selectCiudad = async (ciudad) =>{
            setIsLoading(true)
            setError(null)
            const {data, error} = await supabase
                .from('alojamiento')
                .select('id')
                .eq('ciudad', ciudad)
            setIsLoading(false)
            if(error) setError(error)
            return{data, error}
        }
        // -----------------------------------consultar solo una ciudad alojamiento completo------------
        const selectAlojamientoCiudad = async (ciudad) =>{
            setIsLoading(true)
            setError(null)
            const {data, error} = await supabase
                .from('alojamiento')
                .select('*')
                .eq('ciudad', ciudad)
            setIsLoading(false)
            if(error) setError(error)
            return{data, error}
        }
        // ------------------------------------filtrar por numero de huespedes---------------------------------
        const selectHuespedes = async (cantidad) =>{
            setIsLoading(true)
            setError(null)
            const {data, error} = await supabase
                .from('alojamiento')
                .select('id')
                .gte('huespedes',cantidad)
            setIsLoading(false)
            if(error) setError(error)
            return{data, error}
        }
        // -------------------------------eliminar anuncio del usuario------------------------
         const deleteAlojamiento = async (id) =>{
            setIsLoading(true)
            setError(null)
            const {error} = await supabase
                .from('alojamiento')
                .delete()
                .eq('id',id)
            setIsLoading(false)
            if(error) setError(error)
            return{error}
         }  
        //  ----------------------------------eliminar reservacion-------------------------------
        const deleteReserva = async (id) =>{
            setIsLoading(true)
            setError(null)
            const {error} = await supabase 
                .from('reservas')
                .delete()
                .eq('id', id)
            setIsLoading(false)
            if(error) setError(error)
            return{error}
        }
        //  ------------------------------actualizar alojamiento/anuncio----------------------
        const updateAlojamiento = async (id, datos) =>{
            setIsLoading(true)
            setError(null)
            const {error} = await supabase
                .from('alojamiento')
                .update(datos)
                .eq('id', id)
            setIsLoading(false)
            if(error) setError(error)
            return{error}
        } 
        // ---------------------------------obtener reservaciones del usuario---------------------
        const selectReservas = async (user) => {
            setIsLoading(true)
            setError(null)
            const {data, error} = await supabase
                .from('reservas')
                .select(`
                    id,
                    id_alojamiento,
                    fecha_entrada, 
                    fecha_salida, 
                    adultos, 
                    costo_total,
                    alojamiento(
                       alojamiento,
                       baños,
                       camas,
                       ciudad,
                       codigo_postal,
                       departamento,
                       descripcion,
                       titulo,
                       direccion,
                       fotos,
                       habitaciones,
                       huespedes,
                       pais,
                       precio,
                       servicios,
                       tipo_alojamiento

                    )`)
                .eq('id_usuario', user) 
                           
            if(error)setError(error)
            setIsLoading(false)
            return{error, data}
            
        } 
        // ----------------------------------------filtrar ciudad y fecha ----------------------------
        const selectFechaCiudad = async (ciudad, fechaInicio, fechaFin) => {
            try {
                setIsLoading(true)
                setError(null)
                // -------------------- Traer alojamientos de la ciudad
                const { data: alojamientosCiudad, error: errorCiudad } = await selectCiudad(ciudad)
                if (errorCiudad) throw errorCiudad                
                const idsAlojamiento = alojamientosCiudad.map(a => a.id)

                // -------------------- Buscar reservas en ese rango de fechas
                const { data: reservasOcupadas, error: errorReservas } = await supabase
                    .from('reservas')
                    .select('id_alojamiento')
                    .in('id_alojamiento', idsAlojamiento)
                    .or(`and(fecha_entrada.lte.${fechaFin},fecha_salida.gte.${fechaInicio})`)
                if (errorReservas) throw errorReservas                
                // -------------------- Filtrar alojamientos disponibles (que no están reservados)
                const idsOcupados = reservasOcupadas.map(r => r.id_alojamiento)                
                const alojamientosDisponibles = alojamientosCiudad.filter(a => !idsOcupados.includes(a.id))                
                setIsLoading(false)
                return {data:alojamientosDisponibles, error}
        


            } catch (err) {                
                setError(err)
                setIsLoading(false)
            }
        }

    return{
        agregarFavoritos,
        eliminarFavoritos,
        favoritosUsuario,
        cargarDataset,
        alojamientos,
        insertAlojamiento,
        alojamientoId,
        datosReserva,
        selectCiudades,
        selectCiudad,
        selectHuespedes,
        selectFechaCiudad,
        selectAlojamientoCiudad,
        esAnfitrion,
        deleteAlojamiento,
        updateAlojamiento,
        selectReservas,
        deleteReserva,
        error,
        isLoading
    }
}