'use client'
import { mostrarTodos } from "@/lib/supabaseCrud";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function CardFotos({children}){    
    const [fotos, setFotos] = useState([]);
    const [error, setError] = useState(null);
    async function cargarFotos() {
        const { resultado, error } = await mostrarTodos('fotos'); 
        if (error) {
            setError(error);
        } else {
            setFotos(resultado);                
        }
    }
    useEffect(() => {
        cargarFotos();
    }, [fotos]);    
    if (error) return <p>Error al cargar las fotos: {error.message}</p>;
    return (        
        <div className="flex flex-wrap justify-center p-10 gap-5">            
            {fotos.map((foto) => (
                <div              
                    key={foto.id}
                    className="max-w-[300px] max-h-[800px] "                    
                >
                    <Image
                        src={foto.url}
                        alt={`Foto ${foto.id}`}
                        width={300}
                        height={300}
                        className="w-[300px] h-[300px] object-cover rounded-2xl "
                    />  
                    <p className="break-all">{foto.url}</p>                  
                    {children}
                </div>
            ))}
        </div>
    );
}
