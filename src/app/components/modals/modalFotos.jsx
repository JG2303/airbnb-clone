"use client"

import { Fragment, useEffect, useState } from "react"
import Image from "next/image"
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

export default function ModalFotos({ isOpen, onClose, fotos = [], initialIndex = 0 }) {
  const [index, setIndex] = useState(initialIndex)

  useEffect(() => {
    if (isOpen) setIndex(initialIndex)
  }, [isOpen, initialIndex])

  const prev = () => setIndex(i => (i - 1 + fotos.length) % fotos.length)
  const next = () => setIndex(i => (i + 1) % fotos.length)

  // Navegación con teclado (opcional)
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => {
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [isOpen, fotos.length])

  return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-9999" onClose={onClose}>
                {/* Overlay */}
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100"
                    leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/80" />
                </TransitionChild>

                <div className="fixed inset-0 p-4 flex items-center justify-center">
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-200" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
                    leave="ease-in duration-150" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
                >
                    <DialogPanel className="relative w-full max-w-6xl h-[80vh] rounded-xl focus:outline-none">
                        {/* Botón cerrar */}
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); onClose(); }}
                            className="absolute top-4 right-4 z-10 rounded-full p-2 bg-white/10 hover:bg-white/20 text-white"
                        >
                            <X size={24} />
                        </button>

                        {/* Imagen */}
                        <div className="relative w-full h-full overflow-hidden rounded-xl">
                            {fotos.length > 0 && (
                            <Image
                                src={fotos[index]}
                                alt={`Foto ${index + 1}`}
                                fill
                                className="object-contain"
                            />
                            )}
                        </div>

                        {/* Flecha izquierda */}
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); prev(); }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-2 bg-white/10 hover:bg-white/20 text-white"
                        >
                            <ChevronLeft size={28} />
                        </button>

                        {/* Flecha derecha */}
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); next(); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 bg-white/10 hover:bg-white/20 text-white"
                        >
                            <ChevronRight size={28} />
                        </button>
                    </DialogPanel>
                </TransitionChild>
                </div>
            </Dialog>
        </Transition>
  )
}
