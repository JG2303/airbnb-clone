
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
import  * as iconosLucide from "lucide-react"
import Image from "next/image"
import styles from "./header.module.css"
import Link from "next/link"
import { SignedIn, UserButton, useUser } from "@clerk/nextjs"
import DropdownMenu from "../dropdown/dropdown"
import { useEffect, useState } from "react"
import ModalServicios from "../modals/modalServicios"
import { Filtros } from "../filtros/filtros"
import { Search } from "lucide-react"
import DropdownBase from "../dropdown/dropdownBase"
import FiltrosHeader from "../filtros/filtrosHeader"
export function Header() {  
      
    const [mostrarModal, setMostrarModal] = useState(false)
    const [seleccionado, setSeleccionado] = useState(null)
    const [mostrarIconos, setMostrarIconos] = useState(true)
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
    const menuCelular = [
        {nombre:"Explora", icono:"Search", link:"/"},
        {nombre:"Favoritos", icono:"Heart", link:"/favoritos"},
        {nombre:"Viajes", icono:"Home", link:"/alojamiento"},
        {nombre:"Mensajes", icono:"MessageSquare", link:"/"},
        {nombre:"Perfil", icono:"User", link:"/perfil"},
    ] 
    const handleModal = ()=>{
        setMostrarModal(true)
    }  
    
    useEffect(() => {
        const handleScroll = () => {
        setMostrarIconos(window.scrollY < 30); 
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return(                             
        <div className="flex justify-between  ">
            {/* ----------------------------------------logo-------------------------------------- */}
            <div className={`logo-container  hidden w-100 md:flex `}>
                <Link href="/">
                    <Image 
                        src="/images/logo.png"
                        alt="Airbnb - logo"
                        width={150}
                        height={56}
                        priority={true}
                    />
                </Link>
            </div>
            {/* -------------------------------menu nav------------------------------------------- */}
            <div className={`flex flex-col  w-full  items-center ${!mostrarIconos ? "gap-3" : "gap-7" } `}>
                <nav className={`${styles.nav} order-2 transition-all transform duration-600 ease-in-out md:order-first ${!mostrarIconos && "md:absolute md:scale-0 scale-80 "}`}>
                    <ul className="flex justify-between items-center gap-7">
                        {
                            itemsAirbnb.map((item)=>(                                
                                <li key={item.titulo} >                                    
                                    <Link 
                                        href={item.titulo ==="Alojamientos" ? '/' : item.link} 
                                        className="flex flex-col justify-between items-center md:flex-row">
                                        <div 
                                             className={`
                                                    origin-top
                                                    transition-all duration-400 ease-in-out
                                                    transform
                                                    ${mostrarIconos ? "scale-100 opacity-100" : "scale-y-0 scale-75 opacity-0"}
                                                    ${!mostrarIconos && "absolute h-0 overflow-hidden "}
                                                `}
                                        >
                                            <Image 
                                                src={item.src}
                                                alt={item.titulo}
                                                width={52}
                                                height={52}  
                                                loading="lazy"                                             
                                            />
                                        </div>
                                        <div>
                                            {item.titulo}
                                        </div>
                                    </Link>
                                </li>
                            ))
                        }                        
                    </ul>
                </nav>
                {/* ------------------------------------buscador---------------------------------------- */}
                <div className={`container-filtros  flex justify-center md:transition-all md:transform md:duration-400 md:ease-in-out w-full ${!mostrarIconos && "md:absolute md:scale-85 "}`}>
                    <div className="flex  shadow-sm/20  bg-white w-full md:w-fit  h-13 md:h-18 rounded-full ">                
                        <div className="hidden md:flex w-full h-full ">
                           <FiltrosHeader>                            
                           </FiltrosHeader>
                        </div>
                        {/* ------------------------------------boton busqueda pantallas pequeñas------------------ */}                            
                        <div className="flex flex-row justify-center order-1 items-center  w-full gap-3 md:hidden ">                                                         
                                <button 
                                    type="button"
                                    onClick={()=>setMostrarModal(true)}
                                    className="flex justify-center items-center gap-4 w-full rounded-full  bg-white cursor-pointer"
                                >
                                    <Search />
                                    Empieza la busqueda
                                </button>
                        </div>
                            
                    </div>       
                </div>  
            </div>
            {/* -------------------------------------menu celular-------------------------------- */}
            <div className="bg-white fixed bottom-0 left-0 flex justify-between w-full px-6 py-2 md:hidden ">
                    {
                        menuCelular.map((item,i)=>{
                            const Icono = iconosLucide[item.icono] || iconosLucide.HelpCircle
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
            <div className="hidden md:flex md:items-start md:gap-5 md:justify-center  w-110">
                <div className="">
                    <button 
                        className=" cursor-pointer hover:bg-stone-100 rounded-4xl p-2 w-full "
                        onClick={handleModal}
                    >
                        Conviértete en anfitrion
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
                <div className=" flex justify-center gap-2 items-center">
                    <SignedIn >
                        <UserButton />
                    </SignedIn>                    
                    <DropdownMenu /> 
                </div>                          
            </div> 
        </div>
    )
}