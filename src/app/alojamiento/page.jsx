'use client'
import { useUser } from "@clerk/nextjs"
import { SignUp } from "@clerk/clerk-react"
import { useState } from "react"
import RegistrarCasa from "../components/formRegistroCasa/registrarCasa";
import Modal from "../components/modals/modal";
export default function alojamiento() {
	const [mostrarModal, setMostrarModal] = useState(false)
	const {user} = useUser()
	if(!user){
		return(
			<Modal onClose={()=>setMostrarModal(false) }>
				<SignUp
					routing="hash"                                                    
				/>
			</Modal>
		 )
	} 
    return(
		
			<div className="flex justify-center">
				<RegistrarCasa />
			</div>
		
    )
}