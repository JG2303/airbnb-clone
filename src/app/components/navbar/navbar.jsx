'use client'
import { Search } from "lucide-react";
import FiltrosHeader from "../filtros/filtrosHeader";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar(){
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
    useEffect(() => {
        const handleScroll = () => {
        setMostrarIconos(window.scrollY < 30); 
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return(
        <div className={` flex flex-col h-full  w-full items-center justify-center `}>
                <div className=" w-full order-2 md:order-first">
                    <nav className={`  p-3 md:h-[50%] transition-all transform duration-200 ease-in-out md:order-first ${!mostrarIconos && "md:absolute md:scale-0 scale-75 "}`}>
                        <ul className="flex justify-center  items-center gap-7 ">
                            {
                                itemsAirbnb.map((item,i)=>(                                
                                    <li key={i} className="" >                                    
                                        <Link 
                                            href={item.titulo ==="Alojamientos" ? '/' : item.link} 
                                            className="flex flex-col justify-between items-center md:flex-row">
                                            <div 
                                                className={`
                                                        origin-top
                                                        transition-all duration-200 ease-in-out
                                                        transform
                                                        ${mostrarIconos ? "scale-100 opacity-100" : "scale-y-0 scale-75 opacity-0"}
                                                        ${!mostrarIconos && "absolute h-0  overflow-hidden "}
                                                    `}
                                            >
                                                <img
                                                    src={item.src}
                                                    alt={item.titulo}
                                                    width={52}
                                                    height={52}
                                                                                                
                                                />
                                            </div>
                                            <div className={`${mostrarIconos ? "scale-100 opacity-100" : "scale-y-0 scale-75 opacity-0"}`}>
                                                {item.titulo}
                                            </div>
                                        </Link>
                                    </li>
                                ))
                            }                        
                        </ul>
                </nav>
                </div>
                {/* ------------------------------------buscador---------------------------------------- */}
                <div className={`container-filtros w-full order-1   flex justify-center  md:transition-all md:transform md:duration-400 md:ease-in-out  ${!mostrarIconos && "md:scale-85 "}`}>
                    <div className="flex  shadow-sm/20  bg-white w-full md:w-fit  h-13 md:h-18 rounded-full ">                
                        <div className="hidden md:flex w-full h-full ">
                           <FiltrosHeader>                            
                           </FiltrosHeader>
                        </div>
                        {/* ------------------------------------boton busqueda pantallas pequeñas------------------ */}                            
                        <div className="flex flex-row justify-center order-1 items-center  w-full gap-3 md:hidden ">                                                         
                                <button 
                                    type="button"
                                    // onClick={()=>setMostrarModal(true)}
                                    className="flex justify-center items-center gap-4 w-full rounded-full  bg-white cursor-pointer"
                                >
                                    <Search />
                                    Empieza la busqueda
                                </button>
                        </div>
                            
                    </div>       
                </div>  
            </div>
    )
}