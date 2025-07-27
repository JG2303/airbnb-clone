'use client'
import Image from "next/image"
import styles from "./Header.module.css"
import Link from "next/link"
import { SignedIn, UserButton } from "@clerk/nextjs"
import DropdownMenu from "../Dropdown/Dropdown"
import { Filtros } from "../Filtros/Filtros"
import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import ModalServicios from "../Modals/modalServicios"

export const Header = ({children})=>{
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
    const [mostrarModal, setMostrarModal] = useState(false)
    const [seleccionado, setSeleccionado] = useState(null)   
    const handleModal = ()=>{
        setMostrarModal(true)
    }
    return(
        <div className="flex  flex-col gap-3 "> 
            {children}           
            <div className="encabezado flex justify-between ">
                <div className="logo-container">
                    <Link href="/">
                        <Image 
                            src="/images/logo.png"
                            alt="Airbnb - logo"
                            width={125}
                            height={56}
                            priority={true}
                        />
                    </Link>
                </div>
                <nav className={`${styles.nav} ml-[11%] `}>
                    <ul className={styles.servicios}>
                        {
                            itemsAirbnb.map((item)=>(                                
                                <li key={item.titulo}>                                    
                                    <Link href={item.link}>
                                        <Image 
                                            src={item.src}
                                            alt={item.titulo}
                                            width={52}
                                            height={52}
                                        />
                                        {item.titulo}
                                    </Link>
                                </li>
                            ))
                        }
                        
                    </ul>
                </nav>
                <div className="credenciales flex gap-5 justify-center items-center">
                    <button 
                        className=" cursor-pointer hover:bg-stone-100 rounded-4xl p-2"
                        onClick={handleModal}
                    >
                        Conviértete en anfitrion
                    </button>
                    {
                        mostrarModal &&(                            
                            <ModalServicios seleccionado={setSeleccionado} onClose={() => setMostrarModal(false)} >
                               <div className="flex flex-col">
                                    <div className="flex gap-5">
                                        {
                                            itemsAirbnb.map((item)=>( 
                                                <div 
                                                    key={item.titulo}
                                                    onClick={()=>setSeleccionado(item.link)} 
                                                    className={`border-1 cursor-pointer p-[6rem] rounded-xl ${seleccionado === item.link ? "border-black border-3 " : "border-gray-300"}`}>                                    
                                                        <Image 
                                                            src={item.src}
                                                            alt={item.titulo}
                                                            width={80}
                                                            height={80}
                                                        />
                                                        {item.titulo}
                                                </div>
                                            ))
                                        }
                                    </div>
                                        <hr className="m-3 w-full bg-gray-400 border-gray-300"  />                                        
                                    <div className="flex flex-col items-end" >
                                        {
                                            seleccionado 
                                                ?(
                                                    <Link href={seleccionado}>
                                                        <button
                                                            onClick={()=>(setMostrarModal(false), setSeleccionado(null))}
                                                            className={`cursor-pointer bg-blue-200 rounded-[10px] p-2 w-[120px]`}
                                                            >
                                                            Siguiente
                                                        </button>                                                        
                                                    </Link>
                                                ):(
                                                    <button
                                                        disabled
                                                        className="'bg-gray-300 bg-gray-400 text-white cursor-not-allowed p-2 w-[120px] rounded-[10px]"
                                                    >
                                                      Siguiente      
                                                    </button>
                                                )
                                        }
                                        
                                    </div>
                               </div>                                
                            </ModalServicios>
                        )
                    }
                    <SignedIn >
                        <UserButton />
                    </SignedIn>                    
                    <DropdownMenu />                           
                </div> 
            </div>
            {/* <div className="container-filtros flex justify-center pb-4">
                <div className="flex shadow-sm/30 w-fit h-18 rounded-full bg-white">                
                    <Filtros 
                        id={"donde"}
                        label={"Dónde"}
                        texto={"Explora destinos"}
                        tipo={"text"}
                    />
                    <Filtros 
                        id={"in"}
                        label={"Check-in"}
                        texto={"Agrega fecha"}
                        tipo={"date"}
                    />
                    <Filtros 
                        id={"out"}
                        label={"Check-out"}
                        texto={"Agrega fecha"}
                        tipo={"date"}
                    />
                    <div className="flex">
                        <Filtros  
                            id={"quien"}
                            label={"Quién"} 
                            texto={"¿Cuántos?"}
                        >
                                <button className="px-4 py-3 h-[80%] mt-2 mr-1.5 bg-red-500 rounded-[50%] cursor-pointer hover:bg-red-700 "><Search color={"white"} /></button> 
                        </Filtros> 
                    </div>
                        
                </div>       
            </div>      */}
           </div>
    )
}