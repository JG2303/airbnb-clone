'use client'
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function CardFotos({children}){ 
    const [dataAlojamiento, setDataAlojamiento] = useState([])  
    const [error, setError] = useState(null);
    const mostrarDatos = async () =>{
        const {data, error} = await supabase
            .from('alojamiento')
            .select('*')
        if(error){
            setError(error)
        }else{
            setDataAlojamiento(data)
        }
    }    
    useEffect(() => {
        mostrarDatos()     
    }, []);    
    if (error) return <p>Error al cargar las fotos: {error.message}</p>;    
    return (        
        <div className="flex flex-wrap gap-3 p-4">
            {
                dataAlojamiento.map((alojamiento, i)=>(                    
                    <div  key={i} className=" flex flex-col items-center w-[250px] h-[300px]  rounded-2xl ">                        
                        <div className="">
                            <Link href={`/rooms/${alojamiento.id}`}>
                                <Image 
                                    src={alojamiento.fotos?.[1]}
                                    alt={alojamiento.titulo}
                                    width={250}
                                    height={200}
                                    className="w-[250px] h-[200px] object-cover rounded-2xl"                                
                                />
                            </Link>
                        </div>
                        <div className=" text-sm">
                            <h1>{alojamiento.titulo}</h1>                            
                            <p>{`${alojamiento.ciudad}/${alojamiento.departamento}`}</p>
                            <p className="font-medium">{alojamiento.precio}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}
