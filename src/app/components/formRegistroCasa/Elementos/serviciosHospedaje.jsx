'use client'
import { useState } from "react"
export default function ServiciosHospedaje(){
    const opciones = [
        {id: "wifi", nombre : "Wifi"},
        {id: "tv", nombre: "TV",},
        {id: "cocina", nombre:"Cocina"},
        {id: "lavadora", nombre:"Lavadora"},
        {id: "estacionamiento-gratis", nombre:"Estacionamiento gratuito en las instalaciones"},
        {id: "estacionamiento-pago", nombre:"Estacionamiento de pago en las instalaciones"},
        {id: "aire-acondicionado", nombre:"Aire acondicionado"},
        {id: "zona-trabajo", nombre:"Zona de trabajo"},
        {id: "piscina", nombre:"Piscina"},
        {id: "jacuzzi", nombre:"Jacuzzi"},
        {id: "terraza", nombre:"Terraza"},
        {id: "Parrilla", nombre:"Parrilla"},
        {id: "piano", nombre:"Piano"},
        {id: "mesa-billar", nombre:"Mesa de billar"},
        {id: "chimenea-interior", nombre:"Chimenea interior"},
        {id: "ducha-exterior", nombre:"Ducha exterior"},
        {id: "detector-humo", nombre:"Detector de humo"},
        {id: "extintor", nombre:"Extintor de incendios"},
        {id: "playa", nombre:"Acceso a la playa"},

    ]
    const [seleccionados, setSeleccionados] = useState("")
        const handleseleccion = (id) =>{
            setSeleccionados((prev) =>
                prev.includes(id) ? prev.filter((item)=> item !== id)
                                  : [...prev, id]
            )
        }
    return(
        <fieldset className="grid grid-cols-4 border p-5">
            <legend>Cuéntale a los huéspedes todo lo que tu espacio tiene para ofrecer</legend>
            {
                opciones.map((servicio)=>(
                    <div key={servicio.id}>
                        <label className="w-25" htmlFor={servicio.id}>{servicio.nombre}</label>
                        <input type="checkbox" name="servicio" id={servicio.id} />
                    </div>
                ))
            }
        </fieldset>
    )
}