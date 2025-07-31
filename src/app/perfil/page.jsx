'use client'
import { useUser } from "@clerk/nextjs";
import { ArrowBigRight, DoorClosedIcon, Rows, Settings, User, User2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Perfil(){
  const {user} = useUser()
  const sombra = "shadow-[0_0_4px_rgba(0,0,0,0.2)]"
  return(        
    user&& (
      <div className="flex flex-col justify-left items-center px-5  w-full">
        <div className=" grid grid-cols-1 gap-4 w-full">
          {/* ----------------------------------perfil------------------------------- */}
          <div className="text-left">
            <h1 className="text-[40px] font-bold">Perfil</h1>
          </div>
          {/* -------------------------logo +  nombre----------------------------- */}
          <div className={`flex flex-col justify-center items-center p-6 ${sombra} rounded-2xl`}>
            <div className="bg-gray-700 rounded-full p-6">
              <User />
            </div>
            <div className="text-center">
              <p className="text-[40px] font-bold">{user.firstName}</p>
              <p>Huésped</p>
            </div>
          </div>
          {/* ----------------------------viajes------------------------------- */}
          <div className="flex justify-between gap-6">
            <div className={`w-[50%] ${sombra} p-5 rounded-xl`}>
              <p>Viajes anteriores</p>
            </div>
            <div className={`w-[50%] ${sombra} p-5 rounded-xl`}>
              <p>conexiones</p>
            </div>
          </div>
          {/* ------------------------------conviertete en anfitrion------------------ */}
          <div className={`flex justify-between p-2 ${sombra} rounded-xl gap-3`}>
            <div className="flex justify-center items-center">
              <Image 
                src={'/images/hospedaje.png'}
                alt="logo"
                width={50}
                height={100}
              />
            </div>
            <div>
              <div>
                <h2>Conviertete en anfitrión</h2>
              </div>
              <div>
                <p className="text-xs">Empieza a anfitrionar y genera ingresos adicionales, ¡es muy sencillo!</p>
              </div>
            </div>
          </div>
          {/* ---------------------------------configuracion de la cuenta------------------------ */}
          <div className="flex flex-col gap-5">
            <Link href={'/configuracion-cuenta'}>
              <div role="button" className="flex justify-between">
                  <div className="flex gap-4">
                    <div><Settings /></div>
                    <div><p>Configuración de la cuenta</p></div>
                  </div>
                  <div><ArrowBigRight /> </div>
              </div>
            </Link>
            <div role="button" className="flex justify-between">
              <div className="flex gap-4">
                <div><User2Icon /></div>
                <div><p>Ver perfil</p></div>
              </div>
              <div><ArrowBigRight /> </div>
            </div>
            <div role="button" className="flex justify-between">
              <div className="flex gap-4">
                <div><Settings /></div>
                <div><p>Configuración de la cuenta</p></div>
              </div>
              <div><ArrowBigRight /> </div>
            </div>
            <div role="button" className="flex justify-between">
              <div className="flex gap-4">
                <div><Settings /></div>
                <div><p>Configuración de la cuenta</p></div>
              </div>
              <div><ArrowBigRight /> </div>
            </div>
            
          </div>
          <hr className="border-none h-[1px] bg-gray-300" />
          {/* --------------------------------------------recomendacion--------------------------------- */}
          
          {/* -----------------------------------cerrar sesion---------------------------------- */}
          <div className="flex gap-5">
            <div>
              <DoorClosedIcon />
            </div>
            <div role="button">
              <p>Cerrar sesión</p>
            </div>
          </div>
        </div>
      </div>
    )        
  )
}