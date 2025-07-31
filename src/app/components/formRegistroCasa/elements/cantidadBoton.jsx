'use client'

export default function CantidadBoton({ disableQuitar, disableAgregar, cantidad, setCantidad}){     
    return(
        <div className=" p-5">
            <div className="flex gap-2">
                <button
                    type="button" 
                    disabled={disableQuitar}
                    onClick={()=> setCantidad(cantidad-1)}
                    className={`shadow px-2 disabled:bg-gray-300 disabled:cursor-not-allowed`}
                >-
                </button>
                <p>{cantidad}</p>
                <button 
                    type="button"
                    disabled={disableAgregar}
                    onClick={()=>setCantidad(cantidad+1) }
                    className={`shadow px-2 disabled:bg-gray-300 disabled:cursor-not-allowed`} 
                >+
                </button>                
            </div>
        </div>
    )
}