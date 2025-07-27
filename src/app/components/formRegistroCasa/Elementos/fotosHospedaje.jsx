import { useState } from "react";
import PreviewImagenes from "../../previewImagen/previewImagenes";
import CargarImagen from "../../upload/Upload";
export default function FotosHospedaje(){
    const [preview, setPreview] = useState([])
    const handleUpload = () =>{
        console.log('soy la imagen de preview ; ', preview)
    }
    return(
        <fieldset className="border p-5 flex flex-col justify-center items-center gap-3">
           <legend> Agrega algunas fotos de tu casa -lo que se selecciono como alojamiento- </legend>            
           <div className="flex flex-col  items-center  justify-end bg-gray-100 rounded-3xl border border-dashed shadow-xl w-[70%] min-h-[350px]">
                <PreviewImagenes preview={preview} setPreview={setPreview} />
           </div>
           <div className="">
                <button 
                    type="button"
                    className="bg-green-300 rounded-xl px-5 py-3 hover:bg-green-600 transition-all ml-150"
                    onClick={handleUpload}
                >Guardar</button>
            </div>
            <CargarImagen />

        </fieldset>
    )
}