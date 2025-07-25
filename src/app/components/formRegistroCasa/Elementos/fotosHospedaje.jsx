export default function FotosHospedaje(){
    return(
        <fieldset className="border p-5 flex justify-center ">
           <legend> Agrega algunas fotos de tu casa -lo que se selecciono como alojamiento- </legend>            
           <div className="flex flex-col  items-center  justify-end bg-gray-100 rounded-3xl border border-dashed shadow-xl w-[70%] h-[350px]">
                <input  type="file" name="fotos" id="foto" className="hidden" />
                <label className=" bg-blue-400 px-8 py-5  rounded-2xl cursor-pointer hover:bg-blue-700 transition-colors" htmlFor="foto">Agrega fotos</label>
           </div>
        </fieldset>
    )
}