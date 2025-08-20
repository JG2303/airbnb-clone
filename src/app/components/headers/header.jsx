
/**
 * Componente Header para la aplicación tipo Airbnb.
 * 
 * Renderiza la barra de navegación principal, el logo, los filtros de búsqueda, el menú móvil y los controles de usuario/cuenta.
 * 
 * Características:
 * - Diseño responsivo para escritorio y móvil.
 * - Muestra elementos de navegación (Alojamientos, Experiencias, Servicios) con iconos.
 * - Barra de búsqueda con filtros para ubicación, check-in, check-out y huéspedes.
 * - Navegación inferior móvil con iconos.
 * - Modal para convertirse en anfitrión.
 * - Controles de autenticación de usuario (UserButton, DropdownMenu).
 * - Visibilidad dinámica de iconos según la posición de scroll.
 * 
 * @component
 * @returns {JSX.Element} El componente header renderizado.
 */
'use client'
import  {Search, Heart ,Home, MessageSquare,User} from "lucide-react"
import Link from "next/link"
import { SignedIn, UserButton, useUser } from "@clerk/nextjs"
import DropdownMenu from "../dropdown/dropdown"
import {  useEffect, useState } from "react"
import ModalServicios from "../modalsTest/modalServicios"
import useFavoritos from "@/hooksTest/useFavoritos"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useAnuncioStore } from "@/app/stores/storeAnfitrion"
// import {setAnuncioStore} from '@stores/storeAnfitrion'
export function Header({children}) { 
    const {user} = useUser()
    const {esAnfitrion} = useFavoritos()
    const [modoAnfitrion, setModoAnfitrion] = useState(false)
    const [dataAnfitrion, setDataAnfitrion] = useState(null)
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const setAnuncio = useAnuncioStore((state)=>state.setAnuncio);
    const itemsAirbnb = [
        {
            titulo: "Alojamientos",
            src : "/images/hospedaje.png",
            link:"/alojamiento"
        },
        {
            titulo:"Experiencias",
            src:"/images/experiencias.png",
            link:"/experiencias"
        },
        {
            titulo:"Servicios",
            src:"/images/servicios.png",
            link:"/servicios"
        }
    ] 
    const anfitrion = async() =>{
        const {data, error} = await esAnfitrion(user?.id)
        if(error) console.error('error al consultar publicaciones de usuario')
        setDataAnfitrion(data)
        if(data.length > 0) setModoAnfitrion(true)
        setAnuncio(data)
                
    }
    const [mostrarModal, setMostrarModal] = useState(false)
    const [seleccionado, setSeleccionado] = useState(null)
    const menuCelular = [
        {nombre:"Explora", icono:Search, link:"/"},
        {nombre:"Favoritos", icono:Heart, link:"/favoritos"},
        {nombre:"Viajes", icono:Home, link:"/alojamiento"},
        {nombre:"Mensajes", icono:MessageSquare, link:"/"},
        {nombre:"Perfil", icono:User, link:"/perfil"},
    ] 
    // ---------controlo el modo del boton ------------------
    const handleModal = (e)=>{
        const modo = e.target.textContent        
        if (pathname === "/anfitrion") {
            router.push("/") 
        } else if (modo==="Modo anfitrión") {            
            router.push(`/anfitrion`)
        } else {
            setMostrarModal(true)
        }        
    }  
    useEffect(()=>{
        if (searchParams.get('modoAnfitrion') === 'true') {
            setModoAnfitrion(true)
            // -------------limpiar el parametro de la URL------------
            router.replace(window.location.pathname)
        } else {
            anfitrion()
        }
    },[user,searchParams])
    return(                             
        <div className="grid  md:grid-cols-4  ">
            {/* ----------------------------------------logo-------------------------------------- */}
            <div className={`logo-container hidden w-100 md:flex `}>
                <Link href="/">
                    <img
                        src="/images/logo.png"
                        alt="Airbnb - logo"
                        width={120}
                        height={120}
                        
                    />
                </Link>
            </div>
            {/* -------------------------------menu nav------------------------------------------- */}
            <div className="col-span-2">
                {children}
            </div>
            {/* -------------------------------------menu celular-------------------------------- */}
            <div className="bg-white fixed bottom-0 left-0 flex justify-between w-full px-6 py-2 md:hidden ">
                    {
                        menuCelular.map((item,i)=>{
                            const Icono = item.icono || HelpCircle
                            return(
                                <div key={i} className="flex ">
                                    <Link href={item.link} className=" flex flex-col items-center justify-center gap-1">
                                        <Icono />
                                        <p className="text-[10px]">{item.nombre}</p>
                                    </Link>
                                </div>
                            )
                        })
                    }
            </div>   
            {/* --------------------------------modal de anfitrion------------------------------- */}
            <div className="hidden md:flex md:items-start md:gap-5 md:justify-end ">
                <div className="">
                    <button 
                        className=" cursor-pointer  hover:bg-stone-100 rounded-4xl p-2 text-[13px]  "
                        onClick={(e)=>handleModal(e)}
                    >
                        {
                            pathname === "/anfitrion"
                                ? "Cambiar a modo viajero"
                                : (user?.id && modoAnfitrion ? "Modo anfitrión" : "Conviértete en anfitrión")
                        }
                        
                    </button>
                </div>
                {
                    mostrarModal &&(                            
                        <ModalServicios 
                            seleccionado={seleccionado} 
                            setSeleccionado={setSeleccionado}
                            mostrarModal={mostrarModal}
                            setMostrarModal={setMostrarModal}
                            onClose={() => setMostrarModal(false)} 
                            itemsAirbnb={itemsAirbnb}
                        >                                          
                        </ModalServicios>
                    )
                }
                <div className=" flex justify-center gap-1 items-center">
                    <SignedIn >
                        <UserButton  />
                    </SignedIn>                    
                    <DropdownMenu /> 
                </div>                          
            </div> 
        </div>
    )
}