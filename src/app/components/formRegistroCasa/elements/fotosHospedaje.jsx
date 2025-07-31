import {useState } from "react";
import PreviewImagenes from "../../previewImagen/previewImagenes";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabaseClient";
export default function FotosHospedaje({rutas, setRutas}){
    const [preview, setPreview] = useState([])    
    const {user} = useUser() 
    const handleUpload = async() =>{
        if(!user) return alert("Usuario no autenticado")
        const uploads = preview.map(async (foto,i) => {
            const extension = foto.name.split('.').pop().toLowerCase()
            const fileName = `${user.id}-${Date.now()}-${i}.${extension}`;
            const {error} = await supabase.storage
                .from('fotos')
                .upload(`${user.id}/alojamientos/${fileName}`, foto.file)
            if(error) throw new Error('error al subir imagen')   
            
            const {data} = supabase.storage
                .from('fotos')
                .getPublicUrl(`${user.id}/alojamientos/${fileName}`)            
            return (data.publicUrl)
        })
       try {              
        const urls = await Promise.all(uploads)
        setRutas(urls) 
        alert("Imagenes subidas con exíto")       
       } catch (error) {
            console.error(error)
            alert("Hubo un error subiendo las imágenes.");
       }
    }    
    return(
        <fieldset className="border p-5 flex flex-col justify-center items-center gap-3">
           <legend> Agrega algunas fotos de tu casa -lo que se selecciono como alojamiento- </legend>            
           <div className="flex flex-col  items-center  justify-end bg-gray-100 rounded-3xl border border-dashed shadow-xl w-[70%] min-h-[350px]">
                <PreviewImagenes preview={preview} setPreview={setPreview} />
           </div>
           <div >
                <button 
                    type="button"
                    className="bg-green-300 rounded-xl px-5 py-3 hover:bg-green-600 transition-all ml-150"
                    onClick={handleUpload}
                >Guardar</button>
            </div>
        </fieldset>
    )
}