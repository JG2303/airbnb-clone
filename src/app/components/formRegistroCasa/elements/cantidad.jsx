'use client'
export default function Cantidad({children,infoAlojamiento, setInfoAlojamiento}){
    const handleAgregar = (campo)=> {        
        setInfoAlojamiento({
            ...infoAlojamiento,
            [campo]:infoAlojamiento[campo] + 1
        })
    }
    const handleQuitar = (campo)=> {
        if(infoAlojamiento[campo] > 0) {
            setInfoAlojamiento({
                ...infoAlojamiento,
                [campo] : infoAlojamiento[campo] -1
            })
        }
    }
    return(
        <fieldset className="p-4 flex flex-col">
            
            <legend>Agrega algunos datos básicos sobre tu espacio</legend>
            {/* -------------------------------huespedes------------------------- */}
            <div className="flex flex-col items-center">
                <p>Huéspedes</p>
                <div className="flex gap-2">
                    <button
                        type="button" 
                        onClick={()=>handleQuitar('huespedes')}
                        className="shadow px-2"
                    >-
                    </button>
                    <p>{infoAlojamiento.huespedes}</p>
                    <button 
                        type="button" 
                        onClick={()=>handleAgregar('huespedes')}
                        className="shadow px-2"
                    >+
                    </button>
                </div>
            </div>
               {/* -----------------habitaciones--------------------------------- */}
            <div className="flex flex-col items-center">
                <p>Habitaciones</p>
                <div className="flex gap-2">
                    <button
                        type="button" 
                        onClick={()=>handleQuitar('habitaciones')}
                        className="shadow px-2"
                    >-
                    </button>
                    <p>{infoAlojamiento.habitaciones}</p>
                    <button 
                        type="button" 
                        onClick={()=>handleAgregar('habitaciones')}
                        className="shadow px-2"
                    >+
                    </button>
                </div>
            </div>
                {/* --------------------------camas--------------------------- */}
            <div className="flex flex-col items-center">
                <p>Camas</p>
                <div className="flex gap-2">
                    <button
                        type="button" 
                        onClick={()=>handleQuitar('camas')}
                        className="shadow px-2"
                    >-
                    </button>
                    <p>{infoAlojamiento.camas}</p>
                    <button 
                        type="button" 
                        onClick={()=>handleAgregar('camas')}
                        className="shadow px-2"
                    >+
                    </button>
                </div>
            </div>
                {/* ---------------------------------baños----------------------------- */}
            <div className="flex flex-col items-center">
                <p>Baños</p>
                <div className="flex gap-2">
                    <button
                        type="button" 
                        onClick={()=>handleQuitar('baños')}
                        className="shadow px-2"
                    >-
                    </button>
                    <p>{infoAlojamiento.baños}</p>
                    <button 
                        type="button" 
                        onClick={()=>handleAgregar('baños')}
                        className="shadow px-2"
                    >+
                    </button>
                </div>
            </div>
            {children}
        </fieldset>
    )
}