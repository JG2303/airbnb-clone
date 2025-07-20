'use client'
import Image from "next/image"
import styles from "./Header.module.css"
import { Filtros } from "../Filtros/Filtros"
import Link from "next/link"
import { SignedIn, UserButton } from "@clerk/nextjs"
import DropdownMenu from "../Dropdown/Dropdown"
export const Header = ()=>{
    return(
        <div className="containerHeader flex  flex-col gap-3">
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
                <nav className={`${styles.nav} ml-25`}>
                    <ul className={styles.servicios}>
                        <li> 
                            <Link href="/alojamiento">
                                <Image 
                                    src="/images/hospedaje.png"
                                    alt="Hospedaje"
                                    width={46}
                                    height={46}
                                />  
                                Alojamiento 
                            </Link>             
                        </li>
                        <li>
                            <Link href="/experiencias" >
                                <Image                                     
                                    src="/images/experiencias.png"
                                    alt="experiencias"
                                    width={46}
                                    height={46}
                                />
                                    Experiencias
                            </Link>
                        </li>
                        <li>
                            <Link href="/servicios">
                                <Image 
                                    src="/images/servicios.png"
                                    alt="servicios"
                                    width={46}
                                    height={46}
                                />
                                Servicios
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="credenciales flex gap-5 justify-center items-center">
                    <button 
                    className=" cursor-pointer hover:bg-stone-100 rounded-4xl p-2"
                    >Conviértete en anfitrion</button>
                    <SignedIn >
                        <UserButton />
                    </SignedIn>                    
                    <DropdownMenu />                           
                </div> 
            </div>
                <div className="container-filtros flex justify-center">
                    <div className="flex shadow-sm/30 w-fit h-18 rounded-full ">                
                        <Filtros 
                                label={"Dónde"}
                                texto={"Explora destinos"}
                        />
                            <Filtros 
                                label={"Check-in"}
                                texto={"Agrega fecha"}
                        />
                            <Filtros 
                                label={"Check-out"}
                                texto={"Agrega fecha"}
                        />
                            <Filtros 
                                label={"Quién"}
                                texto={"¿Cuántos?"}
                        />  
                        <button>Buscar</button>                        
                    </div>       
               </div>     
           </div>
    )
}