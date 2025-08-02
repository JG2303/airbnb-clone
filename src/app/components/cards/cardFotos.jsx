'use client'
import { SignUp, useUser } from "@clerk/nextjs"
import { Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import Modal from "../modals/modal"
import useFavoritos from "@/hooks/useFavoritos"
export default function CardFotos({lugar="todos"}){ 
    const [dataAlojamiento, setDataAlojamiento] = useState([])  
    const [error, setError] = useState(null)
    const [favorito, setFavorito] = useState([])    
    const {user} = useUser()   
    const {favoritosUsuario, agregarFavoritos, eliminarFavoritos, isLoadin, cargarDataset} = useFavoritos()     
    const [mostrarModal, setMostrarModal]=useState(false)     
    //  ---------------carga de datos iniciales---------------------
    const mostrarDatos = async () =>{ 
        // --------------------------pagina home-------------------
        if(lugar==="todos"){            
            const {data, error} = await cargarDataset()
            if(error) console.error('Error al cargar datos: ', error.message)
            setDataAlojamiento(data)            
        }
        // -----------------------pagina favoritos para cards-----------------
        if(lugar==="favoritos"){ 
            const {data, error} = await favoritosUsuario(user.id)           
            const lista = data?.map(obj => obj.alojamiento)
            setDataAlojamiento(lista)            
            if(error) console.log('error con favoritos:', error)
        }
        // -----------------------lista favoritos -----------------------
        if(user){
            const {data, error} = await favoritosUsuario(user.id)
            if(error){
                console.error('Error al consultar listado de favoritos del usuario', errorFavoritos.message)
            }           
            const lista = data.map(obj=>obj.id_alojamiento)                
            setFavorito(lista)
        }
    } 
    // --------------------------fin carga datos iniciale----------------------     
    const uploadDataFavoritos = async (id) =>{
        if(!user){            
            setMostrarModal(true)
            return
            // routes.push('/login')           
        }
        // ---------------------buscar favorito-----------------
        const yaFavorito = favorito.includes(id)
        if(yaFavorito){            
            const {error}= await eliminarFavoritos(user.id, id)
            if(error) console.error('error al eliminar favorito: ', error)
            setFavorito(prev=>prev.filter(fid => fid !== id))
        }else{
            const {error} = await agregarFavoritos(user.id, id)
            if(error) console.error('Error al insertar favorito: ', error.message)
            setFavorito(prev=>[...prev, id])
        } 
    }
    //-------------------cargar datos al montar pagina---------------
    useEffect(() => {
        mostrarDatos()  
        if (user) {                 
            setMostrarModal(false);            
        }
    }, [user]);

    if (error) return <p>Error al cargar las fotos: {error.message}</p>;    
    return (        
        < >
            {
                dataAlojamiento.map((alojamiento)=>(                    
                    <div  key={alojamiento.id} className="" >                        
                        <div className="relative w-[250px] h-[400px] md:w-[250px] md:h-[250px]   ">
                            <Link href={`/rooms/${alojamiento.id}`}>
                                <Image 
                                    src={alojamiento.fotos?.[1]}
                                    alt={alojamiento.titulo}
                                    fill
                                    sizes="(max-width: 768px) 250px, (max-width: 1024px) 250px, 250px"
                                    className=" object-cover rounded-2xl"                                
                                />
                            </Link>
                            <div 
                                role="button" 
                                className="absolute top-3 right-3"
                                onClick={()=>uploadDataFavoritos(alojamiento.id)}
                             >
                                <Heart 
                                    color="white"                                
                                    className={`bg-none cursor-pointer transform transition hover:scale-110 
                                               ${favorito.includes(alojamiento.id) 
                                                ? "fill-red-600 opacity-none" 
                                                : "fill-black opacity-40" } `} 
                                />
                            </div>
                        </div>
                        <div className=" text-sm">
                            <h1>{alojamiento.titulo}</h1>                            
                            <p>{`${alojamiento.ciudad}/${alojamiento.departamento}`}</p>
                            <p className="font-medium">{alojamiento.precio}</p>
                        </div>
                    </div>
                ))                
            }
            {
                !user && mostrarModal &&(
                    <Modal onClose={()=>setMostrarModal(false) }>
                        <SignUp
                            routing="hash"                                                    
                        />
                    </Modal>
                )
            }
        </>
    );
}
