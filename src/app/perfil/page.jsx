"use client";
import { SignedIn, SignOutButton, useUser } from "@clerk/nextjs";
import {
  DoorClosedIcon,  
  Settings,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ModalServicios from "../components/modalsTest/modalServicios";
import { useState } from "react";

export default function Perfil() {
  const { user } = useUser();
  const [openModal, setOpenModal] = useState(false)
  const [seleccionado, setSeleccionado] =useState(null)
  const itemsAirbnb = [
        {
            titulo: "Alojamientos",
            src : "/images/hospedaje.png",
            link:"/alojamiento"
        },
        {
            titulo:"Experiencias",
            src:"/images/experiencias.png",
            link:"/experiencias"
        },
        {
            titulo:"Servicios",
            src:"/images/servicios.png",
            link:"/servicios"
        }
    ] 
 
  return (
    user && (
        <div className="flex flex-col justify-left items-center px-5 py-6 w-full md:m-auto md:w-[50%]">
            <div className="grid grid-cols-1 gap-6 w-full">
            
                {/* ---------------------- Título perfil -------------------- */}
                <div className="text-left md:text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Perfil</h1>
                </div>
                
                {/* ---------------------- Avatar + Nombre -------------------- */}
                <div className="flex flex-col justify-center items-center p-6 rounded-2xl">
                    <div className="relative w-28 h-28">
                        {
                            user.imageUrl ? (
                                <Image
                                    src={user.imageUrl}
                                    alt="Foto de perfil"
                                    fill
                                    className="rounded-full object-cover border-4 border-gray-200 shadow-lg"
                                />
                                ) : (
                                    <div className="bg-gray-700 rounded-full p-6 flex justify-center items-center w-full h-full">
                                        <User className="w-12 h-12 text-white" />
                                    </div>
                                )
                        }
                    </div>
                    <div className="text-center mt-4">
                        <p className="text-[28px] font-bold">{user.firstName}</p>
                        <p className="text-gray-500">Huésped</p>
                    </div>
                </div>
                
                {/* ---------------------- Anfitrión -------------------- */}
                <div 
                  role="button" 
                  onClick={()=>{setOpenModal(true)}} 
                  className="flex items-center gap-4 bg-white border border-gray-200 p-4 md:p-5 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 cursor-pointer transition-all duration-200"
                >
                    <div className="flex justify-center items-center">
                        <Image
                            src={"/images/hospedaje.png"}
                            alt="logo"
                            width={50}
                            height={100}
                        />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">Conviértete en anfitrión</h2>
                        <p className="text-sm text-gray-500">
                            Empieza a anfitrionar y genera ingresos adicionales, ¡es muy sencillo!
                        </p>
                    </div>
                </div>
                
                {/* ---------------------- Opciones de la cuenta -------------------- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link href={'/reservaciones'}>
                        <div role="button" className="flex justify-center md:justify-between items-center bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200">
                            <span className="text-gray-700 font-medium">Mis reservaciones</span>
                        </div>
                    </Link>
                    <Link href={"/"}>
                {/* ---------------------- Cerrar sesión -------------------- */}
                        <div role="button" className="flex justify-center md:justify-between items-center gap-3 bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200">
                            <DoorClosedIcon />
                            <SignedIn>
                                <SignOutButton>
                                    <span className="font-medium">Cerrar sesión</span>
                                </SignOutButton>
                            </SignedIn>
                        </div>
                    </Link>
                    
                </div>
            </div>

            {/* ---------------------- Modal -------------------- */}
            {openModal && (
                <ModalServicios                         
                    setMostrarModal={setOpenModal}
                    seleccionado={seleccionado}
                    setSeleccionado={setSeleccionado}
                    onClose={()=>setOpenModal(false)}
                    itemsAirbnb={itemsAirbnb}
                />
            )}
        </div>
    )
  );
}
