'use client'

import CardFotos from "../components/cards/cardFotos"
export default  function ReservacionesUser(){
    
    return(
        <div>
            <h2 className="text-center">Reservaciones</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 p-3">
                 <CardFotos ciudad={'reservas'} />
            </div>

        </div>
    )
}