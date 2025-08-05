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
        //-----------------------------------obtener datos de reserva--------------------------

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

        //----------------------------------consultar por ciudadad------------------------------
        const selectCiudad = async () => {
            setIsLoading(true)
            setError(null)
            const {data, error} = await supabase
                .from('alojamiento')
                .select('ciudad')                
            setIsLoading(false)
            if(error) setError(error)
            return{data, error}
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
        selectCiudad,
        error,
        isLoading
    }
}