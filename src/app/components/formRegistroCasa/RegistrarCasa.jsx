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
import { useRouter } from 'next/navigation';


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
	const router = useRouter()
  	const siguientePaso = () => setPasoActual((prev) => prev + 1);
 	const pasoAnterior = () => setPasoActual((prev) => prev - 1);
	const validarPaso = () => {
    switch (pasoActual) {
		case 0: return tipo.trim() !== "";
		case 1: return tipoAlojamiento.trim() !== "";
		case 2: return ubicacion.pais && ubicacion.departamento && ubicacion.ciudad && ubicacion.direccion && ubicacion.postal;
		case 3: return infoAlojamiento.huespedes > 0 && infoAlojamiento.habitaciones > 0;
		case 4: return servicios.length > 0;
		case 5: return rutas !== null; 
		case 6: return titulo.trim().length > 5;
		case 7: return descripcion.trim().length > 10;
		case 8: return precio.trim() !== "" && Number(precio) > 0;
		default: return true;
		}
	};
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
		<fieldset className="mb-6">
			<legend className="text-sm font-medium text-gray-700">Título</legend>
			<textarea
				className="w-full h-40 p-4 mt-2 rounded-xl border border-gray-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-300 outline-none resize-none shadow-sm"
				value={titulo}
				onChange={(e) => setTitulo(e.target.value)}
			/>
		</fieldset>,
		<fieldset className="mb-6">
			<legend className="text-sm font-medium text-gray-700">Descripción</legend>
			<textarea
				className="w-full h-40 p-4 mt-2 rounded-xl border border-gray-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-300 outline-none resize-none shadow-sm"
				value={descripcion}
				onChange={(e) => setDescripcion(e.target.value)}
			/>
		</fieldset>,
		<fieldset>
			<legend className="text-sm font-medium text-gray-700">Precio</legend>
			<input
				type="number"
				className="w-full p-4 mt-2 rounded-xl border border-gray-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-300 outline-none shadow-sm"
				value={precio}
				onChange={(e) => setPrecio(e.target.value)}
			/>
		</fieldset>,
  	];

  	 const dataFormulario = {
        alojamiento: tipo,
        id_user: user?.id,
        tipo_alojamiento : tipoAlojamiento,
        pais: ubicacion.pais.trim(),
        departamento : ubicacion.departamento.trim(),
        ciudad: ubicacion.ciudad.trim(),
        direccion: ubicacion.direccion.trim(),
        codigo_postal: ubicacion.postal.trim(),
        huespedes: infoAlojamiento.huespedes,
        habitaciones: infoAlojamiento.habitaciones,
        camas:infoAlojamiento.camas,
        baños:infoAlojamiento.baños,
        servicios: servicios,
        fotos: rutas,
        titulo: titulo.trim(),
        descripcion : descripcion.trim(),
        precio: precio.trim()
    }  
	const uploadData = async ()=>{
		await insertAlojamiento(ubicacion.direccion, dataFormulario)
		if(error) {
			console.log('error al registrar anuncio',error)		
			return
		}
		router.push('/?modoAnfitrion=true')

	}  
  return (
    <div className="w-full md:w-[50%] mx-auto pb-20">
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
						disabled={!validarPaso()}
						className={`px-4 py-2 rounded text-white 
							${validarPaso() 
								? "bg-blue-500 hover:bg-blue-600" 
								: "bg-gray-300 cursor-not-allowed"
              				}`}
					>
						Siguiente
					</button>
				) : (
					<button
						type='button'
						onClick={uploadData}
						disabled={!validarPaso()}
						className={`px-4 py-2 rounded text-white 
							${validarPaso() 
								? "bg-blue-500 hover:bg-blue-600" 
								: "bg-gray-300 cursor-not-allowed"
              				}`}
					>Registrar</button>  
				)}
			</div>
		</form>
	</div>
  );
}
