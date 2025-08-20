'use client'
import DropdownHuespedes from "@/app/components/dropdownTest/DropHuespedes"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useReservaStore } from "@/app/stores/storeReserva"
import { differenceInCalendarDays, eachDayOfInterval, format, parseISO } from "date-fns"
import { AlarmSmoke, CircleDot, Droplets, FireExtinguisher, Flame, HelpCircle, Laptop, LayoutGrid, Music, ParkingCircle, ParkingSquare, ShowerHead, Tv, Umbrella, Utensils, WashingMachine, Waves, Wifi, Wind, ArrowLeft, ArrowRight } from "lucide-react";
import { useClerk, useUser } from "@clerk/nextjs"
import useFavoritos from "@/hooks/useFavoritos"
import Mapa from "@/app/components/mapas/mapa"
import CalendarioFechas from "@/app/components/calendario/calendarioFechas"
import CalendarioDoble from "@/app/components/calendario/calendarioDoble"
import Calendario from "@/app/components/calendario/calendario"
import DropdownHuespedesCelu from "@/app/components/dropdownTest/DropHuespedesCelu"
import DropdownBase from "@/app/components/dropdownTest/dropdownBase"
import Link from "next/link"
import ModalFotos from "@/app/components/modals/modalFotos"
export default function Rooms(){ 
     
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
    const {user} = useUser()
    const { openSignIn } = useClerk();
    const {alojamientoId, datosReserva} = useFavoritos()
    const [dataset, setDataset] = useState(null)
    const [fechasReservadas, setFechasReservadas] = useState([])
    const [dataReserva, setDataReserva] = useState(null)    
    const [open, setOpen] = useState(false)  
    const [openPc, setOpenPc] = useState(false) 
    const [openFotos, setOpenFotos] = useState(false)    
    const route = useRouter() 
    const [fechaInicio, setFechaInicio] = useState(null)
    const [fechaFin, setFechaFin] = useState(null)
    const {roomId} = useParams()    
    const setDatosReserva = useReservaStore((state)=>state.setDatosReserva)
    const diasTotal = differenceInCalendarDays(fechaFin, fechaInicio)
    // ------------------datos para cargar en la pagina -------------------
     
    const obtenerData = async ()=>{
        const {data, error} = await alojamientoId(roomId)
        if(error) console.error('error al obtener data de alojamiento: ', error.message)
        setDataset(data)
    } 
         
    const ObtenerDataReserva = async () => {
        const {data, error} = await datosReserva(roomId)
        if(error) console.error('Error al obtener datos de reserva :', error.message)        
        setDataReserva(data)
    }

    const diasReserva = () =>{
        
        if(dataReserva){            
            dataReserva.forEach((reserva)=>{
                const inicio = parseISO(reserva.fecha_entrada)
                const fin = parseISO(reserva.fecha_salida)
                const dias = eachDayOfInterval({start: inicio, end:fin})                
                setFechasReservadas((prev)=> [...prev, dias])
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
     
    const handleDataReserva = (e)=>{
        const textoBoton = e.target.textContent
        const id= e.target.id
        if(textoBoton === "Reserva" ){    
            if(!user){
                return openSignIn({})
            }       
            route.push(`/rooms/${roomId}/reserva`)    
        // ---------------------------estado global------------------        
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
            id ==="celular" ? setOpen(true): setOpenPc(true)          
        }
    } 
    
    const direccion = `${dataset?.direccion}, ${dataset?.ciudad}, ${dataset?.departamento}`
    const menuBotonReserva = (
        <div role="button" className=" text-left p-2">
             <p>{diasTotal ? `${fechaInicio?.toLocaleDateString("es-ES")} - ${fechaFin?.toLocaleDateString("es-ES")}` : "selecciona fechas"}</p>        
        </div>
    )

    useEffect(()=>{
        obtenerData() 
        ObtenerDataReserva()       
    },[])   
    useEffect(()=>{
        diasReserva()
    },[dataReserva])
    
    return(     
       <div className="container-rooms container relative flex flex-col md:w-[90%] md:m-auto  " >
            {dataset &&(
                <div className="flex flex-col   gap-4 ">
                 {/* ------------------fotos----------------------- */}
                    
                        <section  className="grid grid-cols-4 grid-rows-2 gap-2  h-[40vh] w-full  ">
                            <div className=" col-span-4 row-span-2 md:col-span-2 md:row-span-2  ">
                                <Image 
                                    src={dataset.fotos?.[0]}
                                    alt="mio"
                                    width={700}
                                    height={200}
                                    onClick={()=>{setOpenFotos(true)}}
                                    className="w-full h-full transform transition-transform duration-300  object-cover md:rounded-2xl cursor-pointer hover:scale-[1.01] "
                                />
                            </div>
                            {
                                dataset.fotos
                                .filter((f,i)=>i !== 0 && i <= 4)
                                .map((foto,i)=>(
                                    <div key={i}  className="relative transform transition-transform duration-300 w-full h-full overflow-hidden cursor-pointer hover:scale-[1.01]">
                                        <Image 
                                            src={foto}
                                            alt="foto"
                                            fill
                                            priority
                                            onClick={()=>{setOpenFotos(true)}}
                                            className=" object-cover md:rounded-2xl"
                                        />
                                    </div>
                                    
                                ))
                            }
                        </section>
                            {/* -------------iconos  de atras(celu)  ----------- */}
                            <div className="absolute  top-2 w-full flex justify-between px-3   md:order-first">
                                <Link href={'/'}>
                                    <div className="bg-gray-300/30 backdrop-blur-2xl rounded-full p-2 hover:bg-gray-100/60">
                                        <ArrowLeft size={15}/>
                                    </div>
                                </Link>
                                
                            </div>
                        {/* -------------------------fin session de foto celular-------- */}
                    <div className="flex flex-col  rounded-t-3xl bg-white -mt-8 md:flex-row md:rounded-none  md:m-0">
                        <div className=" w-full md:w-[60%]">
                            {/* ------------------------------session informacion-------------------- */}
                            <article className="px-4 flex flex-col gap-5">
                                <section className="flex flex-col gap-5  ">
                                {/* -------------------------titulo y descripcion--------------------- */}
                                    <div>
                                        <h1>{dataset.titulo}, {dataset.ciudad}</h1>
                                    </div>  

                                    <div className="text-center text-gray-500">
                                        <p>{dataset.tipo_alojamiento} en {dataset.ciudad}, {dataset.pais}</p>
                                        <p>{`${dataset.huespedes} ${dataset.huespedes > 1 ? "huespédes" : "huésped"} • ${dataset.habitaciones} ${dataset.habitaciones>1 ? "habitaciones" : "habitación"} • ${dataset.camas} ${dataset.camas > 1 ? "camas" : "cama"} • ${dataset.baños} ${dataset.baños > 1 ? "baños" : "baño"}`}</p>
                                    </div>
                                    
                                    <div>
                                        <p>{dataset.descripcion}</p>
                                    </div>
                                </section>
                                {/* -------------------------------------session de servicios---------------------------- */}
                                <hr />
                                <section className="flex flex-col gap-4"> 
                                    <h2 className=" font-bold">Lo que este lugar ofrece</h2>                                    
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                        {
                                            dataset.servicios.map((servicio, i) => {
                                            const opcion = opciones.find((op) => op.id === servicio)                                
                                            const Icono = opcion.icono
                                            return(
                                                <div key={i} className="flex gap-3 items-center p-3 h-full min-h-18 border border-gray-100 shadow-xs/30 rounded-2xl">                                    
                                                    <Icono />
                                                    {opcion.nombre}
                                                </div>
                                            )
                                            })
                                        }
                                    </div>                                    
                                
                                </section>
                                <hr />
                                {/* -------------------------------session mapa---------------------------------- */}
                                <section className="h-auto">
                                    <h2 className="font-bold">A donde irás</h2>
                                    <p>{dataset.ciudad}, {dataset.departamento}, {dataset.pais}</p>
                                    {/* --------------------------mapa---------------------------- */}
                                    <div className="rounded-xl p-4 shadow-2xl/10 ">
                                        <Mapa direccion={direccion}/>
                                    </div>
                                </section>
                                <hr />
                                {/* ----------------------session calendario------------------- */}
                                <section className="flex flex-col " >
                                    <p>x noches</p>                    
                                    <div className=" flex justify-center items-center h-100 w-full   md:hidden">
                                        <CalendarioFechas                               
                                            escala={125}
                                            fechasReservadas={fechasReservadas}
                                            startDate={fechaInicio}
                                            endDate={fechaFin}
                                            setStartDate={setFechaInicio}
                                            setEndDate={setFechaFin}
                                        />
                                    </div>
                                    <div className="  hidden md:flex md:justify-center items-center h-150 w-full    ">
                                        <CalendarioDoble 
                                            startDate={fechaInicio}
                                            endDate={fechaFin}
                                            setStartDate={setFechaInicio}
                                            setEndDate={setFechaFin}
                                            fechasReservadas={fechasReservadas}
                                        />
                                    </div>
                                </section>
                            </article>
                        </div>
                        {/* ----------------------------datos de reserva------------------------ */}                 
                        
                        {/* --------------------------------------reserva celular----------------------------------------- */}
                        <div className="sticky bottom-0 z-1000 bg-white md:bg-none md:z-1 w-full flex justify-between items-centercenter md:flex-col md:w-[40%]  ">
                            
                            {/* -----------------------boton y huespedes--------------------------- */}
                            <div className=" flex  w-full md:h-80 border border-gray-100 items-center gap-2 md:sticky md:flex-col md:items-start md:shadow-2xl md:border md:border-gray-100 md:rounded-xl md:top-30 px-4 py-2 ">
                                {/* --------------------------precio------------------------- */}
                                <div className="flex flex-col justify-center items-start w-[50%]  md:flex-col">
                                    <p className=" text-[16px] font-bold md:text-[20px] text-gray-700  ">
                                        {fechaInicio && fechaFin
                                            ? (`$ ${dataset.precio * diasTotal} COP ` ) 
                                            :("Agrega las fechas para ver los precios") } 
                                    </p>
                                    <p className="text-gray-400 ">
                                        {fechaInicio && fechaFin && (`Por ${diasTotal>1 ? (`${diasTotal} noches`) : (`${diasTotal} noche`) } ` )} 
                                    </p>
                                    
                                </div>
                                {/* ----------------------------------boton---------------------------- */}
                                <div className=" flex-col md:w-full  md:h-40 w-[50%]  ">
                                    <div className=" flex flex-col  gap-4 rounded-xl  md:sticky top-30 "> 
                                        <div className=" border border-gray-400 rounded-xl hidden md:block">
                                            <div className="md:border-b md:border-gray-200 ">                                    
                                                {
                                                    openPc && (
                                                        <DropdownBase menuBoton={menuBotonReserva} >
                                                            <CalendarioDoble 
                                                                startDate={fechaInicio}
                                                                endDate={fechaFin}
                                                                setStartDate={setFechaInicio}
                                                                setEndDate={setFechaFin}
                                                                fechasReservadas={fechasReservadas}
                                                            />  
                                                        </DropdownBase> 
                                                    )
                                                }                                             
                                            </div>                               
                                            <div className="md:hover:bg-gray-100 rounded-b-xl">                                                                        
                                                <DropdownHuespedes huespedesPermitidos={dataset.huespedes} setDataHuespedes={setDataHuespedes}/>          
                                            </div>  
                                        </div> 

                                        {/* ------------------------------boton pc-------------------------- */}
                                        <button
                                            type="button"
                                            id="pc"
                                            onClick={(e)=>handleDataReserva(e)}
                                            className=" hidden md:h-full bg-red-500 p-5 md:block  md:border text-white font-bold rounded-full cursor-pointer"
                                        >
                                            {
                                                diasTotal>0 ?"Reserva" : "Comprobar disponibilidad"
                                            }
                                        </button>
                                        
                                        {/* --------------------------boton celu-----------------------  */}
                                        <button
                                            type="button"
                                            id="celular"
                                            onClick={(e)=>handleDataReserva(e)}
                                            className="px-4 py-2 md:hidden bg-red-500 text-white font-bold rounded-full h-full"
                                        >
                                            {
                                                diasTotal>0 ?"Reserva" : "Comprobar disponibilidad"
                                            }
                                        </button> 
                                    </div>
                                </div>
                                {/* -------------------------------fin boton------------------------------ */}
                            </div>
                        </div>
                    </div>
                        
                </div>
            )}
            
            {/* --------------------------------------------modal para seleccionar fechas y huespedes en celular---------------------- */}
            <Calendario open={open} setOpen={setOpen} >
                <div className="flex flex-col overflow-y-auto">
                    <div>
                        <CalendarioFechas                               
                            escala={100}
                            fechasReservadas={fechasReservadas.flat()}
                            startDate={fechaInicio}
                            endDate={fechaFin}
                            setStartDate={setFechaInicio}
                            setEndDate={setFechaFin}                                                        
                        />
                    </div>
                    <div>
                        <DropdownHuespedesCelu huespedesPermitidos={dataset?.huespedes} setDataHuespedes={setDataHuespedes}/>
                    </div>
                </div>
                {/* -----------------------------------boton + precio----------------------- */}
                <div className="flex gap-4">
                    <div className="flex flex-col justify-center  items-start w-[50%] h-20 md:flex-col ">
                        <p className="md:text-[25px] text-gray-700 ">
                            {fechaInicio && fechaFin
                                ? (`$ ${dataset.precio * diasTotal} COP ` ) 
                                :("Agrega las fechas para ver los precios") } 
                        </p>
                        <p className="text-gray-700 ">
                            {fechaInicio && fechaFin && (`Por ${diasTotal>1 ? (`${diasTotal} noches`) : (`${diasTotal} noche`) } ` )} 
                        </p>
                        
                    </div>
                    <div className="flex  justify-center items-center w-[40%]  ">
                        <button 
                            onClick={()=>setOpen(false)}
                            className=" bg-red-400 h-[80%] w-full text-white font-bold rounded-2xl">
                                confirmar
                            </button>
                    </div>
                </div>
            </Calendario>
            {
                openFotos && (
                    <ModalFotos 
                        isOpen={openFotos}
                        onClose={()=>setOpenFotos(false)}
                        fotos={dataset?.fotos}
                    />
                )
            }
       </div>
          
    )
}