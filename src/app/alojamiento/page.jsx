
/**
 * Metadata for the alojamiento page.
 * @type {{title: string, description: string}}
 */

/**
 * alojamiento page component.
 * Renders the RegistrarCasa form inside a centered flex container.
 *
 * @component
 * @returns {JSX.Element} The alojamiento page layout.
 */
'use client'
import { useUser } from "@clerk/nextjs";
import RegistrarCasa from "../components/formRegistroCasa/registrarCasa";
import Modal from "../components/modals/modal";
import { SignUp } from "@clerk/clerk-react";
import { useState } from "react";
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