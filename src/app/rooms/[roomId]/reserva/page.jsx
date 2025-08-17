/**
     * Sube una reserva a la tabla 'reservas' de Supabase usando los datos del usuario y la reserva.
     * Construye el objeto de reserva, lo muestra en consola y trata de insertarlo en la base de datos.
     * Muestra una alerta si hay error, de lo contrario confirma la subida exitosa y redirige a la página principal.
     *
     * @async
     * @function uploadReserva
     * @returns {Promise<void>} Se resuelve cuando la reserva se sube y ocurre la navegación.
     */
'use client'
import { useReservaStore } from "@/app/stores/storeReserva";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@clerk/nextjs";
import { format } from "date-fns";
import { BoxSelectIcon, CardSim, VenetianMaskIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

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
                alert('Datos subidos ')
                route.push('/')
            }
    }
    return(
        <>
            <div className="container-reserva relative grid grid-col-1 gap-10 w-full p-4 ">
                
                {/* --------------------------------card de alojamiento---------------------- */}                           
                <div className="flex flex-col gap-3 border border-gray-200 rounded-xl p-4 ">
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
                            <div>
                                <button className="bg-gray-200 px-4 py-2 cursor-pointer rounded-xl" >Cambiar</button>                                
                            </div>
                        </div>
                        <hr />

                        <div className="flex justify-between items-center py-4">
                            <div>
                                <h3>Huespédes</h3>
                                <p>{datosReserva.adultos + datosReserva.niños} {(datosReserva.adultos + datosReserva.niños)>1 ? "Adultos" : "Adulto"}</p>
                            </div>
                            <div>
                                <button className="bg-gray-200 px-4 py-2 cursor-pointer rounded-xl" >Cambiar</button>
                            </div>
                        </div>
                        <hr />

                        <div className="flex justify-between items-center py-4">
                            <div>
                                <h3>Precio total</h3>
                                <p>${ datosReserva.diasTotal * datosReserva.precio} COP</p>
                            </div>
                            <div>
                                <button className="bg-gray-200 px-4 py-2 cursor-pointer rounded-xl" >Detalles</button>
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
                        tarjeta credito
                    </div>
                    <div className="py-4">
                        google pay
                    </div>
                </div>
            </div>
                {/* -------------------------------------boton sigueinete celular--------------------- */}
                <div className="sticky flex justify-center items-center bottom-0 w-full bg-white z-1000 px-4 py-3 h-20 md:hidden">
                    <button className=" w-full h-full text-gray-300 text-[18px] bg-gray-950 rounded-xl">Siguiente</button>
                </div>
        </>
    )
}