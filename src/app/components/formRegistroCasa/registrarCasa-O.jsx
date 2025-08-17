'use client'
import {useState } from 'react'
import Cantidad from './elements/cantidad'
import DireccionAlojamiento from './elements/direccionAlojamiento'
import FotosHospedaje from './elements/fotosHospedaje'
import QueAlojamiento from './elements/queAlojamiento'
import ServiciosHospedaje from './elements/serviciosHospedaje'
import TipoAlojamiento from './elements/tipoAlojamiento'
import styles from './registrarCasa.module.css'
import { useUser } from '@clerk/nextjs'
import { supabase } from '@/lib/supabaseClient'
export default function RegistrarCasaE({data}){
    const {user, isLoaded}= useUser() 
    // if(!user) return(<div>Acceso denegado</div>)
    const [tipo, setTipo] = useState(data.alojamiento || "")
    const [tipoAlojamiento, setTipoAlojamiento]= useState(data.tipo_alojamiento ||'')    
    const [ubicacion, setUbicacion] = useState({
        pais:data.pais || "",
        direccion:data.direccion ||"",
        apartamento:data.apartemento || "",
        ciudad:data.ciudad || "",
        departamento:data.departamento || "",
        postal:data.codigo_postal || ""
    })
    const [infoAlojamiento, setInfoAlojamiento]=useState({
        huespedes:data.huespedes || 1,
        habitaciones:data.habitaciones || 1,
        camas:data.camas || 2,
        baños:data.baños ||  3
    })    
    const [servicios, setServicios] = useState(data.servicios || [])
    const [rutas, setRutas] = useState(null)
    const [titulo, setTitulo] = useState(data.titulo || '')
    const [descripcion, setDescripcion] = useState(data.descripcion || '')
    const [precio, setPrecio] = useState(data.precio || '')
    if(!isLoaded) return <div>Cargando...</div>
    if(!user) return <div>No puedes ver esta pagina si no esta logueado</div>   
    const dataFormulario = {
        alojamiento: tipo,
        id_user: user.id,
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
    const updateData = async ()=>{
        const {data:existente} = await supabase
            .from('alojamiento')
            .select('*')
            .eq('direccion', ubicacion.direccion)
        if(existente.length === 0){
            const {error} = await supabase  
                .from('alojamiento')
                .insert(dataFormulario)
            if (error) {
            console.error('Error al insertar:', error.message);
            } else {
            console.log('Inserción exitosa:', dataFormulario);
            }       
        }else{
            return(
                alert('Ya esta direccion fue registrada') 
            )
        }
    }
    console.log('servicios',servicios)
    return(
        <form className={`${styles.formulario} w-full md:w-[50%] pb-20`}  >           
            <TipoAlojamiento tipo={tipo} setTipo={setTipo} />
            <QueAlojamiento tipoAlojamiento={tipoAlojamiento} setTipoAlojamiento={setTipoAlojamiento}/>
            <fieldset className='p-4'>
                <legend>¿Dónde se encuentra tu espacio?</legend>
                <div >
                    <input className='w-full md:w-[80%] mx-auto' id='ubicacion-api' type="text" placeholder='Ingresa tu dirección' />
                </div>
            </fieldset>
            <DireccionAlojamiento ubicacion={ubicacion} setUbicacion={setUbicacion}/>
            <Cantidad infoAlojamiento={infoAlojamiento} setInfoAlojamiento={setInfoAlojamiento}/>
            <ServiciosHospedaje servicios={servicios} setServicios={setServicios} />
            <FotosHospedaje rutas={rutas} setRutas={setRutas}/>
            <fieldset>
                <legend>Ahora, ponle un título a tu --casa ecológica--</legend>
                <div>                    
                    <textarea 
                        className='border w-full text-3xl rounded-xl p-4' 
                        name="titulo" 
                        id="titulo" 
                        maxLength={32} 
                        cols="30" 
                        rows="3"
                        value={titulo}
                        onChange={(e)=>setTitulo(e.target.value)}
                    >
                    </textarea>
                </div>
            </fieldset>
            <fieldset>
                <legend>Escribe tu descripción</legend>                
                <div>
                    <textarea 
                        className='border w-full text-3xl rounded-xl p-4' 
                        name="descripcion" 
                        id="descripcion" 
                        maxLength={500} 
                        cols="30" 
                        rows="10"
                        value={descripcion}
                        onChange={(e)=>setDescripcion(e.target.value)}
                    >
                    </textarea>
                </div>
            </fieldset>
            <fieldset className='flex justify-center'>
                <legend>Configura un precio base para los días entre semana</legend>
                <input 
                    type="text" 
                    value={precio}
                    onChange={(e)=>setPrecio(e.target.value)}
                    className='font-medium'
                />
            </fieldset>   
            <button
                type='button'
                onClick={updateData}
                className='bg-cyan-700 px-5 py-3 rounded-2xl'
            >Actualizar</button>         
        </form>
    )
}