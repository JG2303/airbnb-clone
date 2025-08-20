'use client'
import { SignedIn, SignedOut, SignOutButton, SignUpButton } from '@clerk/nextjs'
import { Menu as MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

export default function DropdownMenu({setMostrarModal}) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            {/*-----------------------boton del menu------------ */}
            <MenuButton className="bg-gray-200 border-none rounded-full px-3 py-2 cursor-pointer shadow-sm hover:shadow-md transition">
                <MenuIcon className="w-4 h-6" />
            </MenuButton>

            {/*---------------- ------opciones --------------*/}
            <MenuItems className="absolute right-0 z-10 mt-2 w-64 origin-top-right bg-white rounded-xl shadow-xl ring-1 ring-black/5 focus:outline-none ">
                <MenuItem>                        
                            <Link
                                href="/alojamiento"
                                prefetch
                                className={`block px-4 py-2 font-semibold text-black hover:bg-gray-100`}
                            >
                                Conviértete en anfitrión
                                <p className="text-sm font-normal text-gray-600">
                                    Empieza a anfitrionar y genera ingresos adicionales, ¡es muy sencillo!
                                </p>
                            </Link>                        
                    </MenuItem>
                {/* ------------------------usuario autenticado------------------------------ */}
                <SignedIn>
                    <MenuItem>                        
                            <Link
                                href="/favoritos"
                                className={`block px-4 py-2 cursor-pointer hover:bg-gray-100`}
                            >
                                Lista favoritos
                            </Link>                        
                    </MenuItem>
                    <MenuItem>                        
                            <Link
                                href="/perfil"
                                className={`block px-4 py-2 cursor-pointer hover:bg-gray-100`}
                            >
                                Perfil
                            </Link>                       
                    </MenuItem>
                    
                </SignedIn>

                {/* -------------------------------si no hay usuario autenticado------------------------ */}
                <SignedOut>
					
                    <MenuItem>                        
						<SignUpButton mode="modal">
							<div
								className={`block px-4 py-2 cursor-pointer hover:bg-gray-100`}
							>
								Iniciar sesión o registrarse
							</div>
						</SignUpButton>                      
                    </MenuItem>
                </SignedOut>

                {/* --------------------cerrar session ---------------------*/}
                <SignedIn>
                    <MenuItem>
                       
                            <SignOutButton>
                                <div
                                    className={`block px-4 py-2 cursor-pointer hover:bg-gray-100`}
                                >
                                    Cerrar sesión
                                </div>
                            </SignOutButton>
                       
                    </MenuItem>
                </SignedIn>
            </MenuItems>
        </Menu>
    )
}
