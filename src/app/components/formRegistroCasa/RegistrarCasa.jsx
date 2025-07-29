'use client'
import {useState } from 'react'
import Cantidad from './Elementos/cantidad'
import DireccionAlojamiento from './Elementos/direccionAlojamiento'
import FotosHospedaje from './Elementos/fotosHospedaje'
import QueAlojamiento from './Elementos/queAlojamiento'
import ServiciosHospedaje from './Elementos/serviciosHospedaje'
import TipoAlojamiento from './Elementos/tipoAlojamiento'
import styles from './RegistrarCasa.module.css'
import { useUser } from '@clerk/nextjs'
import { supabase } from '@/lib/supabaseClient'
export default function RegistrarCasa(){
    const {user, isLoaded}= useUser() 
    // if(!user) return(<div>Acceso denegado</div>)
    const [tipo, setTipo] = useState("")
    const [tipoAlojamiento, setTipoAlojamiento]= useState('')    
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
        camas:2,
        baños: 3
    })    
    const [servicios, setServicios] = useState([])
    const [rutas, setRutas] = useState(null)
    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [precio, setPrecio] = useState('')
    // useEffect(()=>{
    //     console.log('Alojamiento : ', tipo)
    //     console.log('Tipo de alojamiento',tipoAlojamiento)
    //     console.log('Direccion : ',ubicacion )
    //     console.log('Info alojamiento : ',infoAlojamiento)
    //     console.log('Servicios :',servicios)
    //     console.log('Fotos :',rutas)
    //     console.log('Titulo: ', titulo)
    //     console.log('Descripcion :', descripcion)
    //     console.log('Precio : ', precio)
    //  },[titulo, descripcion, precio])   
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
    const uploadData = async ()=>{
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
    return(
        <form className={`${styles.formulario} w-[50%]`} action=""  >           
            <TipoAlojamiento tipo={tipo} setTipo={setTipo} />
            <QueAlojamiento tipoAlojamiento={tipoAlojamiento} setTipoAlojamiento={setTipoAlojamiento}/>
            <fieldset className='border p-5'>
                <legend>¿Dónde se encuentra tu espacio?</legend>
                <div >
                    <input className='w-[80%] mx-auto' id='ubicacion-api' type="text" placeholder='Ingresa tu dirección' />
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
                        className='border w-full text-3xl rounded-xl' 
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
                        className='border w-full text-3xl rounded-xl' 
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
                onClick={uploadData}
                className='bg-cyan-700 px-5 py-3 rounded-2xl'
            >Registrar</button>         
        </form>
    )
}