'use client'

export default function CantidadBoton({ disableQuitar, disableAgregar, cantidad, setCantidad}){     
    return(
        <div className=" p-5">
            <div className="flex justify-center items-center gap-2 md:gap-5">
                <button
                    type="button" 
                    disabled={disableQuitar}
                    onClick={()=> setCantidad(cantidad-1)}
                    className={`shadow  px-[14px] text-[20px]  py-1 text-gray-400 disabled:bg-gray-300/30 disabled:cursor-not-allowed disabled:outline-0 rounded-full outline outline-gray-200 hover:outline-gray-400 hover:text-gray-600`}
                >-
                </button>
                <p className="text-[20px]">{cantidad}</p>
                <button 
                    type="button"
                    disabled={disableAgregar}
                    onClick={()=>setCantidad(cantidad+1) }
                    className={`shadow px-3 text-[20px] py-1 text-gray-400 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-full outline outline-gray-200 hover:outline-gray-400 hover:text-gray-600`} 
                >+
                </button>                
            </div>
        </div>
    )
}