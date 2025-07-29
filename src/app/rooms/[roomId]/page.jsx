'use client'
import { supabase } from "@/lib/supabaseClient"
import { Heart, Share } from "lucide-react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
export default function Rooms(){ 
    const [dataset, setDataset] = useState(null) 
    const params = useParams()
    const id = params.roomId 
    const obtenerData = async () =>{
        const {data, error} = await supabase
            .from('alojamiento')
            .select('*')
            .eq('id', id)
            .single()
        if(error){
            console.error('Error al obtener los datos: ', error)
            return null
        }
        setDataset(data)
    }
    useEffect(()=>{
        obtenerData()
    },[])
    
    return(
     
       <div className="container w-[80%] m-auto border" >
            {dataset &&(
                <div>
                {/* -------------------------------------fotos------------------------------- */}
                <section  className="flex flex-col items-start gap-7 ">
                    {/* ----------------titulo + iconos------------------------- */}
                    <section className="flex justify-between items-center w-full">
                        <div className="">
                            <h1>{dataset.titulo}</h1>
                        </div>
                        <div className="flex  gap-5">
                            <div className="flex gap-1">
                                <Share />
                                Compartir
                            </div>
                            <div className="flex gap-1">
                                <Heart />
                                Guardar
                            </div>
                        </div>
                    </section>
                    {/* -------------------fotos-------------------------------------------- */}
                    <section className="grid grid-cols-4 grid-rows-2 gap-2  h-[40vh] w-full">
                        <div className="col-span-2 row-span-2 ">
                            <Image 
                                src={dataset.fotos?.[0]}
                                alt="mio"
                                width={700}
                                height={200}
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>
                        {
                            dataset.fotos.filter((f,i)=>i !== 0 && i <= 4).map((foto,i)=>(
                                <div key={i} className="relative w-full h-full overflow-hidden">
                                    <Image 
                                        src={foto}
                                        alt="foto"
                                        fill
                                        className=" object-cover rounded-2xl"
                                    />
                                </div>
                            ))
                        }
                    </section>
                </section>
                {/* ------------------------------------------descripcion y reserva-------------------------- */}
                <section>
                    <div className="flex py-6 ">                        
                        {/* ---------------descripcion----------------- */}
                        <article className="w-[60%] border border-red-400">
                           <section>
                                <div className="h-[200vh]"></div>
                           </section>
                        </article>

                        {/* -----------------reserva------------------- */}
                        <article className="w-[40%] border border-blue-400 p-5">
                            <div className="w-full h-30 bg-amber-300 sticky top-30 "></div>
                        </article>
                    </div>
                </section>
                {/* ---------------------------------------calificaciones y comentarios---------------------- */}
                <section>
                    <div className="h-[100vh] border border-amber-950"></div>
                </section>
                </div>
                
                
            )}
       </div>
          
    )
}