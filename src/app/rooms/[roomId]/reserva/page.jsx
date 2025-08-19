'use client'
import { useReservaStore } from "@/app/stores/storeReserva";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import MetodoPago from "@/app/components/formularioPago/formularioPago";

export default function Reserva(){
    const {user} = useUser()
    const {roomId} = useParams()
    const route = useRouter()
    const datosReserva = useReservaStore((state)=>state.datosReserva)
    if(!datosReserva) return    
    const uploadReserva = async () =>{
        const data = {
            id_usuario: user.id,
            id_alojamiento : roomId,
            fecha_entrada : datosReserva.fechaInicio,
            fecha_salida : datosReserva.fechaFin,
            costo : datosReserva.precio,
            costo_total : datosReserva.precio * datosReserva.diasTotal,
            adultos : datosReserva.adultos,
            ninos : datosReserva.niños,
            bebes : datosReserva.bebes,
            mascotas : datosReserva.mascotas
        }
        console.log('Datos a subir: ',data)
        const {error} = await supabase
            .from('reservas')
            .insert(data)
            if(error){
                alert('error al cargar datos a la BD')
            }else{
                alert('Alojamiento reservado con exito')
                route.push('/')
            }
    }
    return(
        <>
            <div className="container-reserva relative flex flex-col md:flex-row gap-5  w-full md:px-50  p-4 ">
                
                {/* --------------------------------card de alojamiento---------------------- */}                           
                <div className="flex flex-col  gap-3 border border-gray-200 rounded-xl p-4 ">
                    {/* ----------------titulo e imagen--------------------- */}
                    <div className="flex gap-3 w-full h-30  py-4 ">
                        <div className="w-[40%] flex justify-center items-center ">
                            <div className="absolute w-[100px] h-[100px]">
                                <Image
                                    src={datosReserva.foto}
                                    alt={datosReserva.titulo}
                                    fill
                                    className="object-cover rounded-xl"
                                />
                            </div>
                        </div>
                        <div className="w-[60%]">
                            <h2>{datosReserva.titulo}</h2>
                        </div>
                    </div>
                    <hr />
                    {/* ---------------detalles viaje-------------- */}
                    <div className=" ">
                        <div className="flex justify-between items-center py-4">
                            <div>
                                <h3>Fechas</h3>
                                <p>{datosReserva.fechaInicio}  </p>
                            </div>
                            
                        </div>
                        <hr />

                        <div className="flex justify-between items-center py-4">
                            <div>
                                <h3>Huespédes</h3>
                                <p>{datosReserva.adultos + datosReserva.niños} {(datosReserva.adultos + datosReserva.niños)>1 ? "Adultos" : "Adulto"}</p>
                            </div>
                            
                        </div>
                        <hr />

                        <div className="flex justify-between items-center py-4">
                            <div>
                                <h3>Precio total</h3>
                                <p>${ datosReserva.diasTotal * datosReserva.precio} COP</p>
                            </div>
                            
                        </div>
                        <hr />
                        {/* -------------------informacion cancelacion---------- */}
                        <div>
                            <h3>Cancelación gratuita</h3>
                            <p>Si cancelas la reservación antes de xxx fecha recibirás el reemblso total.</p>
                        </div>
                    </div>
                </div> 
                <hr />           
                {/* ----------------------------------------------session de pago--------------------*/}
                <div className="flex flex-col p-4">
                    <h2 className="text-[22px] font-bold">Agrega un metodo de pago</h2>
                    <div className="py-4">
                       <MetodoPago />
                    </div>                    
                        <div className="hidden  md:flex justify-center items-center ">
                            <button 
                                onClick={uploadReserva}
                                className=" w-full p-4  text-gray-300 text-[18px] bg-gray-950 rounded-xl cursor-pointer hover:bg-gray-700"
                            >
                                Reservar
                            </button>
                        </div>                    
                </div>
            </div>
                {/* -------------------------------------boton siguiente celular--------------------- */}
                <div className="sticky flex justify-center items-center bottom-0 w-full bg-white z-1000 px-4 py-3 h-20 ">
                    <button 
                        onClick={uploadReserva}
                        className=" w-full h-full md:hidden text-gray-300 text-[18px] bg-gray-950 rounded-xl"
                    >
                        Reservar
                    </button>
                </div>
        </>
    )
}