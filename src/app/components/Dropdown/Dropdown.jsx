'use client'
import { SignedIn, SignedOut, SignOutButton, SignUpButton } from '@clerk/nextjs'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
export default function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  // ---------------------detectar click por fuera del menu
  useEffect(() => {
    const handleClickOutside = (event) => {        
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-200  border-none rounded-full px-3 py-2 cursor-pointer shadow-sm hover:shadow-md transition"
      >
        <Menu className='w-4 h-6' />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-64 bg-white rounded-xl shadow-xl py-2">
          <div className="px-4 py-2 font-semibold text-gray-900">Centro de ayuda</div>
          <hr className="my-1" />
          <div className="px-4 py-2 font-semibold text-black">
            Conviértete en anfitrión
            <p className="text-sm font-normal text-gray-600">
              Empieza a anfitrionar y genera ingresos adicionales, ¡es muy sencillo!
            </p>
          </div>
          <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Recomendar a un anfitrión</div>
          <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Encuentra un coanfitrión</div>
          <Link href={'/perfil'}><div  role='button' className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Perfil</div></Link>
          <SignedOut>              
              <SignUpButton mode="modal">                
                  <div itemType='button' className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Iniciar sesión o registrarse</div>
              </SignUpButton>                  
          </SignedOut>
          <SignedIn>
              <SignOutButton>
                    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Cerrar sesión</div>
              </SignOutButton>
          </SignedIn>
        </div>
      )}
    </div>
  )
}
