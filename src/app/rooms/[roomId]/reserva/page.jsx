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
        <div className="grid grid-cols-5 p-20 gap-10 w-[60%] mx-auto">
            {/* ----------------------metodo de pago------------------- */}
            <div className="col-span-3 shadow-md p-6">
                <h1>Confirma y paga</h1>
                <div className=" flex flex-col gap-5">
                    <h2>1. Agrega un método de pago</h2>
                    <div className="flex justify-between items-center">
                        {/* ------------------icono---------------------- */}
                        <div><CardSim /></div>
                        {/* ---------------------icono---------------- */}
                        <div>
                            <p>Tarjeta de crédito o débito</p>
                            <VenetianMaskIcon />
                        </div>
                        {/* ----------------icono---------------- */}
                        <div>
                            <BoxSelectIcon />
                        </div>
                    </div>
            {/* -----------------formulario de pago------------------------ */}
                    <div className="border">
                        <div>
                            <input className="w-full h-15 outline-0 border-b" type="text" placeholder="Número de tarjeta "/>
                        </div>
                        <div className="flex ">
                            <div className="w-[50%]">
                                <input className="w-full h-15 border-r outline-0" type="text" placeholder="Caducidad" />
                            </div>
                            <div className="w-[50%]">
                                <input  className="w-full h-15 outline-0" type="text" placeholder="Código CVV" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <input className="border w-full h-15 outline-0" type="text" placeholder="País/región" />
                    </div>
                    <div>
                        <input className="border w-full h-15 outline-0" type="text" placeholder="País/región" />
                    </div>
                    {/* ----------------------------------boton-------------------------- */}
                    <div className="flex justify-end">
                        <button
                            onClick={uploadReserva} 
                            className="bg-red-500 px-5 py-3 rounded-xl cursor-pointer hover:bg-red-700">Siguiente</button>
                    </div>
                </div>
            </div>
            {/* --------------------------------card de alojamiento---------------------- */}
            <div className="col-span-2 w-full gap-3">
                <div className="flex flex-col gap-3">
                    {/* ----------------titulo e imagen--------------------- */}
                    <div className="flex gap-3 w-full ">
                        <div>
                            <Image
                                src={datosReserva.foto}
                                alt={datosReserva.titulo}
                                width={120}
                                height={120}
                            />
                        </div>
                        <div>
                            <h2>{datosReserva.titulo}</h2>
                        </div>
                    </div>
                    {/* -------------------informacion cancelacion---------- */}
                    <div>
                        <h3>Cancelación gratuita</h3>
                        <p>Si cancelas la reservación antes de xxx fecha recibirás el reemblso total.</p>
                    </div>
                    <hr />
                    {/* ---------------detalles viaje-------------- */}
                    <div className="flex justify-between">
                        <div>
                            <h3>Detalles del viaje</h3>
                            <p>{datosReserva.fechaInicio}</p>
                            <p>{datosReserva.adultos} Adultos, {datosReserva.niños} {datosReserva.niños > 0 ? "niños" : ""} </p>
                            <p>{datosReserva.diasTotal}</p>
                            </div>
                        <div className="">
                            <button type="button" className="bg-gray-300 shadow px-2 py-1">Cambiar</button>
                        </div>
                    </div>
                    <hr />
                    {/* ---------------------informacion del precio--------------- */}
                    <div className="flex flex-col gap-3">
                        <div>
                            <h3>Información del precio</h3>
                        </div>
                        <div>
                            <p>{datosReserva.diasTotal} noches {datosReserva.precio} COP </p>
                            <p>TOTAL:  $ { datosReserva.diasTotal * datosReserva.precio} COP</p>
                        </div>
                        <div>
                            <p>Descuento por reservación adelantada</p>
                            <p>--precio descuento--</p>
                        </div>
                    </div>
                    <hr />

                </div>
            </div>                        
        </div>
    )
}