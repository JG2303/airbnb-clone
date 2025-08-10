"use client";
import {useState } from 'react'
import { useUser } from '@clerk/nextjs'
import useFavoritos from '@/hooks/useFavoritos';
import TipoAlojamiento from './elements/tipoAlojamiento';
import QueAlojamiento from './elements/queAlojamiento';
import DireccionAlojamiento from './elements/direccionAlojamiento';
import Cantidad from './elements/cantidad';
import ServiciosHospedaje from './elements/serviciosHospedaje';
import FotosHospedaje from './elements/fotosHospedaje';

export default function RegistrarCasa() {
	const {user} = useUser()
  	const [pasoActual, setPasoActual] = useState(0);
  	const [tipo, setTipo] = useState("")
    const [tipoAlojamiento, setTipoAlojamiento]= useState('')
	const {insertAlojamiento, error} = useFavoritos()    
    const [ubicacion, setUbicacion] = useState({
        pais:"",
        direccion:"",
        apartamento:"",
        ciudad:"",
        departamento:"",
        postal:""
    })
    const [infoAlojamiento, setInfoAlojamiento]=useState({
        huespedes:1,
        habitaciones:1,
        camas:1,
        baños: 1
    })    
    const [servicios, setServicios] = useState([])
    const [rutas, setRutas] = useState(null)
    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [precio, setPrecio] = useState('')  

  	const siguientePaso = () => setPasoActual((prev) => prev + 1);
 	 const pasoAnterior = () => setPasoActual((prev) => prev - 1);

  	const pasos = [
		<TipoAlojamiento
			tipo={tipo}
			setTipo={setTipo}
		/>,
		<QueAlojamiento
			tipoAlojamiento={tipoAlojamiento}
			setTipoAlojamiento={setTipoAlojamiento}		
		/>,
		<DireccionAlojamiento
			ubicacion={ubicacion}
			setUbicacion={setUbicacion}
		/>,
		<Cantidad
			infoAlojamiento={infoAlojamiento}
			setInfoAlojamiento={setInfoAlojamiento}
		/>,
		<ServiciosHospedaje
			servicios={servicios}
			setServicios={setServicios}
		/>,
		<FotosHospedaje
			rutas={rutas}
			setRutas={setRutas}
    	/>,
		<fieldset>
			<legend>Título</legend>
			<textarea
				value={titulo}
				onChange={(e)=>(setTitulo(e.target.value))}
			/>
		</fieldset>,
		<fieldset>
			<legend>Descripción</legend>
			<textarea
				value={descripcion}
				onChange={(e) =>setDescripcion(e.target.value)}
			/>
		</fieldset>,
		<fieldset>
			<legend>Precio</legend>
			<input
				type="text"
				value={precio}
				onChange={(e) => setPrecio(e.target.value)}
			/>
		</fieldset>,
  	];

  	 const dataFormulario = {
        alojamiento: tipo,
        id_user: user?.id,
        tipo_alojamiento : tipoAlojamiento,
        pais: ubicacion.pais,
        departamento : ubicacion.departamento,
        ciudad: ubicacion.ciudad,
        direccion: ubicacion.direccion,
        codigo_postal: ubicacion.postal,
        huespedes: infoAlojamiento.huespedes,
        habitaciones: infoAlojamiento.habitaciones,
        camas:infoAlojamiento.camas,
        baños:infoAlojamiento.baños,
        servicios: servicios,
        fotos: rutas,
        titulo: titulo,
        descripcion : descripcion,
        precio: precio
    }  
	const uploadData = async ()=>{
		await insertAlojamiento(ubicacion.direccion, dataFormulario)
		if(error) console.log(error) 
	}  
  return (
    <div className="w-[50%] mx-auto">
		<form>			 
			{pasos[pasoActual]}			

			<div className="flex justify-between mt-5">
				{pasoActual > 0 && (
					<button
					type="button"
					onClick={pasoAnterior}
					className="bg-gray-300 px-4 py-2 rounded"
					>
					Atrás
					</button>
				)}
				{pasoActual < pasos.length - 1 ? (
					<button
					type="button"
					onClick={siguientePaso}
					className="bg-blue-500 text-white px-4 py-2 rounded"
					>
					Siguiente
					</button>
				) : (
					<button
						type='button'
						onClick={uploadData}
						className='bg-cyan-700 px-5 py-3 rounded-2xl'
					>Registrar</button>  
				)}
			</div>
		</form>
	</div>
  );
}
