'use client'
import { usePathname } from "next/navigation"
import { Header } from "./components/headers/header"
import Navbar from "./components/navbar/navbar"
import { Suspense } from "react"

export default function ClientLayout({children}){
    const pathName = usePathname()
    const rutasNav = [
        "/",
        
    ]
    const mostrarNav = rutasNav.includes(pathName)
    return(
    <>
        <Suspense fallback={<div>Cargando...</div>}>  
            <header>
                <Header>
                    { mostrarNav && <Navbar />}
                </Header>

            </header>  
        </Suspense>     
        {children}
    </>
    )
}