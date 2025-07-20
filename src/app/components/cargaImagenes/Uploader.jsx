'use client'
import { supabase } from "@/lib/supabaseClient"
import { useState } from "react"

export const Uploader = ({userId})=>{
    const [file, setFile] = useState(null)
    const [url, setUrl] = useState(null)
    const handleUpload = async () => {
        if(!file || !userId) return alert('falta archivo o ID')

        const fileExt = file.name.split('.').pop()
        const fileName= `${userId}-${Date.now()}.${fileExt}`
        const filePath = `${fileName}`

        const {error} = await supabase.storage
            .from('fotos')
            .upload(filePath, file)
        if(error) return alert("error al subir imagen")
        
        const {data} = supabase.storage
            .from('fotos')
            .getPublicUrl(filePath)
        
        setUrl(data.publicUrl)
        // Aquí podrías guardar la URL en tu base de datos
        console.log("URL guardada:", data.publicUrl)
        
    }
    return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0])}
      />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2">Subir imagen</button>
      {url && <img src={url} alt="imagen subida" className="mt-4 w-48 rounded-md" />}
    </div>
  )

}