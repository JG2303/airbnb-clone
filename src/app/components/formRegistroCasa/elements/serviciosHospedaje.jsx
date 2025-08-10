'use client'
import { AlarmSmoke, CircleDot, Droplets, FireExtinguisher, Flame, HelpCircle, Laptop, LayoutGrid, Music, ParkingCircle, ParkingSquare, ShowerHead, Tv, Umbrella, Utensils, WashingMachine, Waves, Wifi, Wind } from "lucide-react";
export default function ServiciosHospedaje({servicios, setServicios}){
    const opciones = [
        {id: "wifi", nombre : "Wifi", icono: Wifi},
        {id: "tv", nombre: "TV", icono: Tv},
        {id: "cocina", nombre:"Cocina", icono: Utensils},
        {id: "lavadora", nombre:"Lavadora", icono: WashingMachine},
        {id: "estacionamiento-gratis", nombre:"Estacionamiento gratuito en las instalaciones", icono: ParkingCircle},
        {id: "estacionamiento-pago", nombre:"Estacionamiento de pago en las instalaciones", icono: ParkingSquare},
        {id: "aire-acondicionado", nombre:"Aire acondicionado", icono: Wind},
        {id: "zona-trabajo", nombre:"Zona de trabajo", icono: Laptop},
        {id: "piscina", nombre:"Piscina", icono: Waves},
        {id: "jacuzzi", nombre:"Jacuzzi", icono: Droplets},
        {id: "terraza", nombre:"Terraza", icono: LayoutGrid},
        {id: "parrilla", nombre:"Parrilla", icono: Flame},
        {id: "piano", nombre:"Piano", icono: Music},
        {id: "mesa-billar", nombre:"Mesa de billar", icono: CircleDot},
        {id: "chimenea-interior", nombre:"Chimenea interior", icono: HelpCircle},
        {id: "ducha-exterior", nombre:"Ducha exterior", icono: ShowerHead},
        {id: "detector-humo", nombre:"Detector de humo", icono: AlarmSmoke},
        {id: "extintor", nombre:"Extintor de incendios", icono: FireExtinguisher},
        {id: "playa", nombre:"Acceso a la playa", icono: Umbrella}
    ];
    const handleseleccion = (id) =>{
        setServicios((prev) =>
            prev.includes(id) ? prev.filter((item)=> item !== id)
                                : [...prev, id]
        )
    }        
    return(
        <fieldset className="grid grid-cols-3  border gap-4 p-8">
            <legend className="col-span-4 text-lg  mb-4">Cuéntale a los huéspedes todo lo que tu espacio tiene para ofrecer</legend>
            {
                opciones.map((servicio)=>{
                    const IconoServicio= servicio.icono || HelpCircle
                    return(
                        <button
                            key={servicio.id}                            
                            type="button"
                            role="checkbox"
                            onClick={()=>handleseleccion(servicio.id)}
                            className={`h-full box-border flex flex-col gap-2 justify-between items-start cursor-pointer hover:outline-3 hover:outline-black w-full  text-left p-5 rounded-md transition-all duration-100
                                        ${
                                            servicios.includes(servicio.id) 
                                            ? "outline-black outline-3"
                                            : "outline outline-gray-200"
                                        }`}
                        >
                            <div> <IconoServicio size={30} /></div>
                            <div className='font-medium text-[18px]'> {servicio.nombre}</div>
                        </button>
                    )
                })
            }
        </fieldset>
    )
}