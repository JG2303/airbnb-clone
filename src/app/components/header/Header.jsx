'use client'
import Image from "next/image"
import styles from "./Header.module.css"
import { Filtros } from "../Filtros/Filtros"
import Link from "next/link"
import { SignedIn, UserButton } from "@clerk/nextjs"
import { useState } from "react"
import DropdownMenu from "../Dropdown"
export const Header = ()=>{
    const [menuLogin, setMenuLogin] = useState(false)
    const handleLogin = () =>{
        setMenuLogin(!menuLogin)
    }
    return(
        <div className="containerHeader flex  flex-col ">
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
                <nav className={styles.nav}>
                    <ul className={styles.servicios}>
                        <li> 
                            <Link href="/alojamiento">
                                <Image 
                                src="/images/hospedaje.png"
                                alt="Hospedaje"
                                width={36}
                                height={36}
                                />  
                                Alojamiento 
                            </Link>             
                        </li>
                        <li>
                            <Link href="/experiencias">
                                <Image 
                                    src="/images/experiencias.png"
                                    alt="experiencias"
                                    width={36}
                                    height={36}
                                />
                                    Experiencias
                            </Link>
                        </li>
                        <li>
                            <Link href="/servicios">
                                <Image 
                                    src="/images/servicios.png"
                                    alt="servicios"
                                    width={36}
                                    height={36}
                                />
                                Servicios
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="credenciales flex gap-5 justify-center items-center">
                    <SignedIn >
                    <UserButton />
                    </SignedIn>
                    <Image 
                        src="/images/net.png"
                        alt="net"
                        width={36}
                        height={36}
                    />
                    
                    <DropdownMenu />
                           
                </div> 
            </div>
            <div className="busqueda flex justify-center items-center ">
                <div className="container-filtro flex  rounded-full items-center  border-1  w-3xl h-13">
                   <Filtros 
                        label={[1,2,3]}
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
                </div>            
            </div>
            
        </div>
    )
}