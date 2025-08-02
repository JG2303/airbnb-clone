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
    return{
        agregarFavoritos,
        eliminarFavoritos,
        favoritosUsuario,
        cargarDataset,
        error,
        isLoading
    }
}