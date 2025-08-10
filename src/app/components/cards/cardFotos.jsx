
/**
 * El componente CardFotos muestra una lista de tarjetas de alojamientos con imágenes, títulos, ubicación y precio.
 * Permite a los usuarios agregar o quitar alojamientos de sus favoritos.
 * Si el usuario no está autenticado, se muestra un modal para registrarse.
 *
 * @componente
 * @param {Object} props
 * @param {string} [props.lugar="todos"] - Determina qué alojamientos mostrar ("todos" para todos, "favoritos" para favoritos).
 * @returns {JSX.Element} Las tarjetas de alojamiento renderizadas con funcionalidad de favoritos.
 *
 * @ejemplo
 * <CardFotos lugar="todos" />
 */
'use client'
import { SignUp, useUser } from "@clerk/nextjs"
import { Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import Modal from "../modals/modal"
import useFavoritos from "@/hooks/useFavoritos"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css' // Importa los estilos CSS
export default function CardFotos({ciudad}){ 
    const [isLoading, setIsLoading] = useState(false)
    const [dataAlojamiento, setDataAlojamiento] = useState([])  
    const [error, setError] = useState(null)
    const [favorito, setFavorito] = useState([]) 
    const [paginaFavorito, setPaginaFavorito] = useState(false)  
    const {user} = useUser()   
    const {favoritosUsuario, agregarFavoritos, eliminarFavoritos, selectAlojamientoCiudad} = useFavoritos()     
    const [mostrarModal, setMostrarModal]=useState(false)     
    //  ---------------carga de datos iniciales---------------------
    const mostrarDatos = async () =>{ 
        setIsLoading(true)        
        // -----------------------pagina favoritos para cards-----------------
        if(ciudad==="favoritos"){ 
            const {data, error} = await favoritosUsuario(user?.id)           
            const lista = data?.map(obj => obj.alojamiento)
            setDataAlojamiento(lista)   
            setPaginaFavorito(true)         
            if(error) console.log('error con favoritos:', error)
        }else{            
            // --------------------------pagina home-------------------
            const {data, error} = await selectAlojamientoCiudad(ciudad)
            if(error) console.error('Error al cargar datos: ', error.message)
            setDataAlojamiento(data)   
            setPaginaFavorito(false)         
        }
        // -----------------------lista favoritos -----------------------
        if(user){
            const {data, error} = await favoritosUsuario(user?.id)
            if(error){
                console.error('Error al consultar listado de favoritos del usuario', errorFavoritos.message)
            }           
            const lista = data.map(obj=>obj.id_alojamiento)                
            setFavorito(lista)
        }
        setIsLoading(false)
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
            const {error}= await eliminarFavoritos(user?.id, id)
            if(error) console.error('error al eliminar favorito: ', error)
            setFavorito(prev=>prev.filter(fid => fid !== id))
        }else{
            const {error} = await agregarFavoritos(user?.id, id)
            if(error) console.error('Error al insertar favorito: ', error.message)
            setFavorito(prev=>[...prev, id])
        } 
    }
    // ---------------------poner primera letra en mayuscula--------------------
    const capitalizarPrimeraLetra = (texto) => {
        if (!texto) return ''
        return texto.charAt(0).toUpperCase() + texto.slice(1)
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
        <>
            { isLoading ? (
                <>                
                    <Skeleton width={300} height={250} style={{ marginBottom: '10px' }} />
                    <Skeleton count={3} width="100%" height={20} style={{ marginBottom: '5px' }} />
                    <Skeleton width={150} height={25} style={{ marginTop: '20px' }} />
                </>
            )
             :(
                dataAlojamiento?.map((alojamiento)=>(                    
                    <div  key={alojamiento.id}  >                        
                        <div className="relative md:w-[250px] md:h-[200px] ">
                            <Link href={`/rooms/${alojamiento.id}`}>
                                <div className={`w-full h-[150px] gap-2  ${paginaFavorito ? "w-full h-[300px]  md:h-[400px]": "md:w-full md:h-[300px]" }`}>
                                    <Image 
                                        src={alojamiento.fotos?.[1]}
                                        alt={alojamiento.id}                                        
                                        priority 
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"                                 
                                        className="rounded-3xl object-cover"                                
                                        fill  
                                    />
                                </div>
                            </Link>
                            <div 
                                role="button" 
                                className="absolute top-3 right-3"
                                onClick={()=>uploadDataFavoritos(alojamiento.id)}
                             >
                                {/* --------------------------------favorito icono------------------- */}
                                <Heart 
                                    size={30}
                                    color="white"                                
                                    className={`bg-none cursor-pointer transform transition hover:scale-110 
                                               ${favorito.includes(alojamiento.id) 
                                                ? "fill-red-600 opacity-none" 
                                                : "fill-black opacity-40" } `} 
                                />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-[12px] md:text-[18px] ">{capitalizarPrimeraLetra(alojamiento.alojamiento)} en {alojamiento.ciudad}</h2>
                            <p className="font-medium text-gray-500">${alojamiento.precio} COP por noche </p>
                        </div>
                    </div>
                )))                
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
