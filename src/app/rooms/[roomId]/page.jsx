'use client'
import CalendarioRango from "@/app/components/calendario/calendario"
import DropdownHuespedes from "@/app/components/dropdown/DropHuespedes"
import { supabase } from "@/lib/supabaseClient"
import { Heart, Share } from "lucide-react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useReservaStore } from "@/app/stores/storeReserva"
import { differenceInCalendarDays, eachDayOfInterval, format, parseISO } from "date-fns"
import { useUser } from "@clerk/nextjs"
export default function Rooms(){ 
    const {user} = useUser()
    const [dataset, setDataset] = useState(null)
    const [dataReserva, setDataReserva] = useState(null)    
    const [open, setOpen] = useState(false)    
    const route = useRouter() 
    const [fechaInicio, setFechaInicio] = useState(null)
    const [fechaFin, setFechaFin] = useState(null)
    const {roomId} = useParams()
    let fechasReservadas = []
    const setDatosReserva = useReservaStore((state)=>state.setDatosReserva)
    const diasTotal = differenceInCalendarDays(fechaFin, fechaInicio)
    const obtenerData = async () =>{
        const {data, error} = await supabase
            .from('alojamiento')
            .select('*')
            .eq('id', roomId)
            .single()
        if(error){
            console.error('Error al obtener los datos: ', error)
            return null
        }
        setDataset(data)
        
    }   
      const ObtenerDataReserva = async () => {
        const {data: datReserva , error: errorReserva} = await supabase
            .from('reservas')
            .select(`fecha_entrada,
                     fecha_salida`)
            .eq('id_alojamiento',roomId)
        if(errorReserva){
            console.error('error al obtener datosa de alojamiento :',  errorReserva.message)            
        }
        setDataReserva(datReserva)
             
    } 
    const diasReserva = () =>{              
        
        if(dataReserva){
            dataReserva.forEach((reserva)=>{
            const inicio = parseISO(reserva.fecha_entrada)
            const fin = parseISO(reserva.fecha_salida)
            const dias = eachDayOfInterval({start: inicio, end:fin})
            fechasReservadas.push(...dias)
        })
        }
    }
    
    const [dataHuspedes, setDataHuespedes] =useState({
        adultos:1,
        niños:0,
        bebes:0,
        mascotas:0,
        huespedes:1,
    })   
    const handleDataReserva = (textoBoton)=>{
        if(textoBoton === "Reserva" ){    
            if(!user)return alert('inicia sesion')        
            route.push(`/rooms/${roomId}/reserva`)            
            setDatosReserva({
                id:roomId,
                idUser: user.id,
                adultos: dataHuspedes.adultos,
                niños: dataHuspedes.niños,
                bebes: dataHuspedes.bebes,
                mascotas: dataHuspedes.mascotas,
                foto:dataset.fotos[0],
                titulo:dataset.titulo,
                precio:dataset.precio,                
                fechaInicio: format(fechaInicio, "yyy/MM/dd"),
                fechaFin: format(fechaFin, "yyy/MM/dd"),
                diasTotal,                
            }) 
        }else{
            ObtenerDataReserva()
            setOpen(true)
        }
    } 
    useEffect(()=>{
        obtenerData()        
    },[])   
    useEffect(()=>{
        diasReserva()
    },[dataReserva])
    console.log('fechas',dataReserva)
    return(     
       <div className="container w-[60%] md:w-[90%] m-auto " >
            {dataset &&(
                <div>
                {/* -------------------------------------fotos------------------------------- */}
                <section  className="flex flex-col items-start gap-7 ">
                    {/* ----------------titulo + iconos------------------------- */}
                    <section className="flex justify-between items-center w-full">
                        <div className="">
                            <h1>{dataset.titulo}</h1>
                        </div>
                        <div className="flex  gap-5">
                            <div className="flex gap-1">
                                <Share />
                                Compartir
                            </div>
                            <div className="flex gap-1">
                                <Heart />
                                Guardar
                            </div>
                        </div>
                    </section>
                    {/* -------------------fotos-------------------------------------------- */}
                    <section className="grid grid-cols-4 grid-rows-2 gap-2  h-[40vh] w-full">
                        <div className="col-span-2 row-span-2 ">
                            <Image 
                                src={dataset.fotos?.[0]}
                                alt="mio"
                                width={700}
                                height={200}
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>
                        {
                            dataset.fotos
                            .filter((f,i)=>i !== 0 && i <= 4)
                            .map((foto,i)=>(
                                <div key={i} className="relative w-full h-full overflow-hidden">
                                    <Image 
                                        src={foto}
                                        alt="foto"
                                        fill
                                        className=" object-cover rounded-2xl"
                                    />
                                </div>
                            ))
                        }
                    </section>
                </section>
                {/* ------------------------------------------descripcion y reserva-------------------------- */}
                <section>
                    <div className="flex py-6 ">                        
                        {/* ---------------descripcion----------------- */}
                        <article className="w-[65%]  h-[100vh]">
                           <section>                                
                                <h2 className="text-lg">{`Habitacion privada en ${dataset.alojamiento} con servicios incluidos en ${dataset.ciudad}, ${dataset.pais}`}</h2>
                                <p>{`${dataset.huespedes} huéspedes • ${dataset.habitaciones} Habitación(es) • ${dataset.camas} cama(s) • ${dataset.baños} baño(s)`} </p>
                           </section>
                        </article>

                        {/* -------------------------------------reserva------------------------------------ */}
                        <article className=" flex flex-col w-[40%]  border-blue-400 p-5">
                            <div className=" flex flex-col gap-4 shadow-2xl  rounded-xl p-4 sticky top-30">
                                <div className="w-full h-30 ">
                                    <p className="text-[45px]">{`$${dataset.precio} COP`}</p>
                                    <p>{`por ${dataset} noches`}</p>                                
                                </div>
                                <div className="border border-gray-400 rounded-xl">
                                    <div>                                    
                                        <CalendarioRango 
                                            open={open}
                                            fechasReservadas={fechasReservadas}
                                            setOpen={setOpen}
                                            fechaInicio={fechaInicio}
                                            fechaFin={fechaFin}
                                            setFechaInicio={setFechaInicio}
                                            setFechaFin={setFechaFin}
                                        />
                                    </div>                               
                                    <div>                                                                        
                                        <DropdownHuespedes huespedesPermitidos={dataset.huespedes} setDataHuespedes={setDataHuespedes}/>          
                                    </div>  
                                </div> 
                                <div>
                                    {/* <Link href={`/rooms/${roomId}/reserva`}> */}
                                        <button 
                                            type="button" 
                                            className="bg-red-500 px-5 py-4 w-full rounded-full cursor-pointer text-white text-[20px]"  
                                            onClick={(e)=>handleDataReserva(e.target.textContent)}                                          
                                        >
                                            {
                                                diasTotal > 0 ? "Reserva"
                                                              : "Comprobar disponibilidad"
                                            }
                                        </button>
                                    {/* </Link> */}
                                </div>
                            </div>
                        </article>
                    </div>
                </section>
                {/* ---------------------------------------calificaciones y comentarios---------------------- */}
                <section>
                    <div className="h-[200vh] border border-amber-950"></div>
                </section>
                </div>
                
                
            )}
       </div>
          
    )
}