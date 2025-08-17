'use client'
import RegistrarCasaE from "@/app/components/formRegistroCasa/registrarCasa-O"
import useFavoritos from "@/hooks/useFavoritos"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function editar(){
    const {id} = useParams()
    const {alojamientoId} = useFavoritos()
    const [datos, setDatos] = useState(null)
    const router = useRouter()
    const datosAnuncio = async() =>{
        const {data, error} = await alojamientoId(id)
        if(error){
            console.error('Error al leer los datos del Anuncio', error.message)
            return
        }
        setDatos(data)
    } 
    const handleVolver =() =>{
        router.push('/anfitrion')
    }
    useEffect(()=>{
        datosAnuncio()
    },[])
    console.log(datos?.servicios)
    return(
        
        datos &&(
            <div className="flex flex-col justify-center items-center">
                <button
                    className="bg-red-400 px-4 py-2 rounded-xl cursor-pointer text-white font-bold "
                    onClick={()=>handleVolver()}

                >
                    volver
                </button>
                <h2>Datos de Anuncio</h2>
                <RegistrarCasaE data={datos}/>
            </div>

        )
        
    )
    
}