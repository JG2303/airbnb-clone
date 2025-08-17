'use client'
import { usePathname } from "next/navigation"
import { Header } from "./components/headers/header"
import Navbar from "./components/navbar/navbar"

export default function ClientLayout({children}){
    const pathName = usePathname()
    const rutasNav = [
        "/",
        
    ]
    const mostrarNav = rutasNav.includes(pathName)
    return(
    <>
        <header>
            <Header>
                { mostrarNav && <Navbar />}
            </Header>

        </header>       
        {children}
    </>
    )
}