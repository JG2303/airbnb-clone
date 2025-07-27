'use client'
export default function Cantidad({infoAlojamiento, setInfoAlojamiento}){
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
        <fieldset className="border p-5">
            <legend>Agrega algunos datos básicos sobre tu espacio</legend>
            <div>
                <label htmlFor="huespedes">Huéspedes</label>
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

            <div>
                <label htmlFor="camas">Camas</label>
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

            <div>
                <label htmlFor="baños">Baños</label>
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
        </fieldset>
    )
}