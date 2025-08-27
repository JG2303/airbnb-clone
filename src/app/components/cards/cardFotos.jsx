'use client'
import { SignUp, useUser } from "@clerk/nextjs"
import { Heart, HouseIcon, Trash2Icon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css' 
import ModalBase from "../modals/modalBase"
import { useRouter } from "next/navigation"
import { useStoreSearch } from "@/app/stores/storeSearch"
import useFavoritos from "@/hooks/useFavoritos"
import Modal from "../modals/modal"
export default function CardFotos({ciudad}){ 
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [dataAlojamiento, setDataAlojamiento] = useState([])  
    const [error, setError] = useState(null)
    const [favorito, setFavorito] = useState([]) 
    const [paginaFavorito, setPaginaFavorito] = useState(false) 
    const {user} = useUser()   
    const [clickAnuncio, setClickAnuncio] = useState(false)
    const [idAnuncio, setIdAnuncio] = useState(null)
    const [anuncios, setAnuncios] = useState(false)
    const [eliminar, setEliminar] = useState(false)
    const [reservas, setReservas] = useState(false)
    const [dataReservas, setDataReservas] = useState({
        fecha_entrada:''  ,
        fecha_salida: '',
        precio: null,
        adultos: null,
        titulo: '',
        id_reserva: null

    })
    const searchData = useStoreSearch((state)=>state.searchData)
    const { favoritosUsuario, 
            agregarFavoritos, 
            eliminarFavoritos,
            selectAlojamientoCiudad,
            esAnfitrion, 
            deleteAlojamiento, 
            selectReservas,
            deleteReserva
          } = useFavoritos()     
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
        }else if(ciudad==="anuncios"){ 
            const {data, error} = await esAnfitrion(user?.id)
            if(error) console.error('error al abtener anuncios del anfitrion')
            setAnuncios(true)
            setDataAlojamiento(data)            
        }else if(ciudad === "filtros"){
            setDataAlojamiento(searchData)
        }else if(ciudad === "reservas"){            
            const { data, error } = await selectReservas(user?.id) 
            if (error) {
                console.error('Error al obtener reservaciones:', error.message)
                return
            }
            
            const reservas = data.map(r => ({
                ...r,
                ...r.alojamiento,   
            }));
            setDataAlojamiento(reservas) 
            setReservas(true)
            
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
    // --------------------------fin carga datos iniciales---------------------- 
     
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
    // -----------------------------configuracion del anuncio-----------------
    const handleAnuncio = (id_alojamiento,id_reserva,ingreso, salida, precio, huespedes, titulo) => {
        setClickAnuncio(true)
        setIdAnuncio(id_alojamiento)        
        setDataReservas({...dataReservas,
            fecha_entrada: ingreso,
            fecha_salida: salida,
            precio,
            adultos: huespedes,
            titulo,
            id_reserva        
            }
        )
        
    }
    // -------------------------------eliminar anuncio-------------------------
    
    const handleEliminarAnuncio = async () =>{              
        const {error} = await deleteAlojamiento(idAnuncio)        
        if(error){
            console.error('Error al eliminar anuncio ', error.message)
            return
        }         
        setClickAnuncio(false)  
        setEliminar(false)
        setIdAnuncio(null)
        mostrarDatos()
    }
    // -------------------------------eliminar anuncio-------------------------
    const handleEditarAnuncio = () =>{
       router.push(`/anfitrion/editar/${idAnuncio}`)
    }  
    //-----------------------------eliminar reserva-------------------
    const eliminarReserva = async (id) => {
        const {error} = await deleteReserva(id)
        if(error) {
            console.error('Error al eliminar reserva')
            return
        }
        alert('Reserva cancelada')
        setClickAnuncio(false)  
        setEliminar(false)
        setIdAnuncio(null)
        mostrarDatos()
    }  
    //-------------------cargar datos al montar pagina---------------
    useEffect(() => {
        mostrarDatos()  
        if (user) {                 
            setMostrarModal(false);            
        }
    }, [user]);    
    if (error) return <p>Error al cargar las fotos: {error.message}</p>; 
    console.log('reservas: ', dataAlojamiento)
    return (        
        <>
            { isLoading  ? (
                <>                
                    <Skeleton width={300} height={250} style={{ marginBottom: '10px' }} />
                    <Skeleton count={3} width="100%" height={20} style={{ marginBottom: '5px' }} />
                    <Skeleton width={150} height={25} style={{ marginTop: '20px' }} />
                </>
            ):(
                dataAlojamiento?.map((alojamiento,i)=>( 
                    anuncios || reservas
                    ?
                    <div key={i} 
                        role="button" 
                        onClick={
                                ()=>handleAnuncio(
                                        alojamiento.id,
                                        alojamiento.id,                                        
                                        alojamiento.fecha_entrada,
                                        alojamiento.fecha_salida,
                                        alojamiento.costo_total,
                                        alojamiento.adultos,
                                        alojamiento.titulo
                                    )} 
                        className=" flex flex-col flex-wrap w-full h-full md:w-full md:h-full ">
                         <div  className={` w-full h-[150px] md:w-full  md:h-[200px] `}>
                             <Image 
                                src={alojamiento.fotos?.[1] || '/images/net.png'}
                                alt={alojamiento.id}  
                                width={300}
                                height={300}                                      
                                priority                                     
                                className="rounded-[20px] object-cover w-full h-full"                                
                            />
                         </div>
                         {alojamiento.id_alojamiento}
                         <div >
                             <h2 className="text-[12px] md:text-[15px] ">{capitalizarPrimeraLetra(alojamiento.alojamiento)} en {alojamiento.ciudad}</h2>
                             {
                                 
                             }                                
                         </div>
                    </div>
                    :
                    <div  key={i} className="flex flex-col md:flex-wrap w-full h-full md:w-full md:h-full ">                        
                        <div className={`relative`}>
                            <Link href={`/rooms/${alojamiento.id}`} >
                                <div className={` ${paginaFavorito 
                                                    ? "w-full h-[300px] "
                                                    : "w-full h-[180px] " 
                                                }`}
                                >
                                    <Image 
                                        src={alojamiento.fotos?.[1] || '/images/net.png'}
                                        alt={alojamiento.id} 
                                        width={300}
                                        height={300}                                       
                                        priority                                         
                                        className={`rounded-[20px] object-cover w-full h-full }`}                                
                                    />
                                </div>
                            </Link>
                            <div 
                                role="button" 
                                className="absolute top-2 right-1 md:right-3"
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
                        <div >
                            <h2 className="text-[12px] md:text-[15px] ">{capitalizarPrimeraLetra(alojamiento.alojamiento)} en {alojamiento.ciudad}</h2>
                            <p className=" text-[12px] md:text-[15px] text-gray-500">${alojamiento.precio} COP por noche </p>
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
            
            {
                user && clickAnuncio &&(
                    <ModalBase 
                        isOpen={clickAnuncio} 
                        onClose={()=> {
                            setClickAnuncio(false); 
                            setEliminar(false);
                            setIdAnuncio(null);
                        }}
                        >
                        
                        {
                            eliminar  ?(
                                <div className="flex flex-col gap-3">
                                    <h2 className="text-center font-bold ">¿Quieres eliminar este anuncio?</h2>
                                    <p>Esto es permanente: ya no podrás encontrar ni editar este anuncio.</p>
                                    <div className="flex flex-col gap-3">
                                        <button 
                                            type="button"
                                            onClick={handleEliminarAnuncio}
                                            className="bg-gray-900/80 w-full py-4 rounded-xl text-white font-bold hover:bg-gray-900">
                                            Sí, lo quiero eliminar
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={()=>setEliminar(false)}
                                            className="flex w-full justify-center gap-4 rounded-xl py-4 hover:bg-gray-200">
                                            <Trash2Icon />
                                            Cancelar
                                        </button>

                                    </div>
                                </div>
                            )
                            : reservas  ?(
                               <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-auto flex flex-col gap-6">
                                    
                                    <div className="border-b pb-3">
                                        <h2 className="text-2xl font-semibold text-gray-800">Detalles de la reserva</h2>
                                    </div>
                                    
                                    <div className="space-y-2 text-gray-700">
                                        <p className="text-lg font-medium">{dataReservas.titulo}</p>
                                        <p><span className="font-semibold">Fecha ingreso:</span> {dataReservas.fecha_entrada}</p>
                                        <p><span className="font-semibold">Fecha salida:</span> {dataReservas.fecha_salida}</p>
                                        <p><span className="font-semibold">Huéspedes:</span> {dataReservas.adultos}</p>
                                        <p className="text-lg"><span className="font-semibold">Precio total:</span> ${dataReservas.precio}</p>
                                    </div>
                                    
                                    <div className="flex flex-col gap-3">
                                        {/* <Link href={`/rooms/${idAnuncio}`}>
                                            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold hover:opacity-90 transition">
                                                Visitar anuncio
                                            </button>
                                        </Link> */}
                                        <button 
                                            type="button"
                                            onClick={()=>eliminarReserva(dataReservas.id_reserva)}
                                            className="w-full py-3 rounded-xl  text-gray-900 font-medium hover:bg-gray-300 transition"
                                        >
                                            Cancelar reservación
                                        </button>
                                    </div>
                                </div>

                            ) 
                            :
                            (<div className="flex flex-col gap-3 p-4">
                                <div className="m-auto">
                                    <HouseIcon size={100} />
                                </div>
                                <button 
                                    type="button"
                                    onClick={()=>{
                                        handleEditarAnuncio() 
                                        setClickAnuncio(false)
                                    }}
                                    className="bg-gray-900/80 w-full py-4 rounded-xl text-white font-bold hover:bg-gray-900">
                                    Edita el anuncio
                                </button>
                                <button 
                                    type="button"
                                    onClick={()=> setEliminar(true)}
                                    className="flex w-full justify-center gap-4 rounded-xl py-4 hover:bg-gray-200"
                                >
                                    <Trash2Icon />
                                    Elimina el anuncio
                                </button>
                            </div> )
                        }
                    </ModalBase>
                    
                )
            }
            
        </>
    );
}
