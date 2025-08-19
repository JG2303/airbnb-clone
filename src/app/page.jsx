'use client'

import CardFotos from "./components/cards/cardFotos";
import { useRef } from "react";
import ScrollAlojamientos from "./components/botonesScroll/scrollAlojamientos";
import { ChevronRight } from "lucide-react";
export default function Home(){  
    // --------------------referencias a los divs que tienen los botones para hacer scroll------
    const scrollRefSession1 = useRef(null)
    const scrollRefSession2 = useRef(null)
    const scrollRefSession3 = useRef(null)
    const scrollRefSession4 = useRef(null)
    const sessionesAlojamientos = [
        {nombre:"cartagena", scrollRef: scrollRefSession1},
        {nombre:"cali", scrollRef: scrollRefSession2},
        {nombre:"girardot", scrollRef: scrollRefSession3},
        {nombre:"santa marta", scrollRef: scrollRefSession4},
    ]
    return (  
        <div className=" pl-7 pt-3 flex flex-col gap-2 pb-20">     
            {/* ---------------------sesiones----------------------        */}
            {
                sessionesAlojamientos.map((session, id)=>(
                    <div key={(id)} className="flex flex-col "> 
                        <div className="flex justify-between items-center "> 
                            {/* -------------------------iconos de flechas-------------------- */}
                            <div 
                                role="button"
                                id={session.nombre} 
                                onClick={(e)=>alert(e.currentTarget.id)}
                                className="flex justify-center items-center gap-3  cursor-pointer p-2  "                        
                            >
                                <p className="text-[16px] md:text-[25px] font-semibold">Alojamientos populares en {session.nombre}</p> 
                                <ChevronRight  size={30} className="mt-1"/>
                            </div>                            
                            <ScrollAlojamientos  scrollRef={session.scrollRef}/>
                            
                        </div>
                        <div className=" overflow-x-auto scroll-oculto overflow-y-hidden" ref={session.scrollRef}>
                            <div className="grid grid-cols-8  w-[1350px]  xl:w-[2100px] gap-3  ">
                                <CardFotos ciudad={session.nombre}/>
                            </div>
                        </div>
                    </div>
                ))
            }            
            
        </div>   
    )
}