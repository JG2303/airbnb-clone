'use client'
import { useState, useRef, useEffect } from 'react'

export default function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

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
        className="bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition"
      >
        ☰
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
          <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Iniciar sesión o registrarse</div>
        </div>
      )}
    </div>
  )
}
