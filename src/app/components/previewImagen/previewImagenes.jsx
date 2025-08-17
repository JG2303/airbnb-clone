import Image from "next/image"
import {useState } from "react"
export default function PreviewImagenes({preview, setPreview}){    
    // const [click, setClick] = useState('')
    const handleImageChange = (e) =>{
        const files = Array.from(e.target.files)
        const newPreviews = files.map(file =>(
            {
                file,
                url:URL.createObjectURL(file),
                name: file.name
            }
        )) 
        setPreview(newPreviews)
    }
    const handleDelete = (i) =>{
        URL.revokeObjectURL(preview[i].url)
        const borrado = preview.filter((elemento, ind) => ind !== i)
        setPreview(borrado)
    }    
    return(
        <div className="flex flex-col items-center gap-3 object-contain p-5">
            <div className="grid grid-cols-2 w-full md:grid-cols-2 gap-4 md:p-6 ">
                {
                    preview.map((prev, i)=>(
                        <div key={i}  className="relative">
                            <Image                         
                                src={prev.url} 
                                alt={prev.name}
                                width={100}
                                height={100}
                                className="h-full w-full md:w-[300] rounded-2xl shadow-2xs"
                            >
                            </Image>    
                            <button
                                type="button"
                                className="bg-red-500 text-white px-3 py-1 rounded-3xl absolute top-2 right-2 hover:bg-red-700 transition-all"
                                onClick={()=>handleDelete(i)}
                            >x</button>
                        </div>
                    )) 
                }
            </div>
            <input 
                type="file" 
                multiple
                id="imagen"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
             />
            <label 
                htmlFor="imagen"
                className="bg-blue-200 py-4 px-6 rounded-2xl cursor-pointer hover:bg-blue-400 transition-all"
            >Cargar fotos</label>
            
        </div>
    )
}