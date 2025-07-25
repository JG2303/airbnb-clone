import Cantidad from './Elementos/cantidad'
import DireccionAlojamiento from './Elementos/direccionAlojamiento'
import FotosHospedaje from './Elementos/fotosHospedaje'
import QueAlojamiento from './Elementos/queAlojamiento'
import ServiciosHospedaje from './Elementos/serviciosHospedaje'
import TipoAlojamiento from './Elementos/tipoAlojamiento'
import styles from './RegistrarCasa.module.css'
export default function RegistrarCasa(){

    return(
        <form className={`${styles.formulario} formulario`} action=""  >           
            <TipoAlojamiento />
            <QueAlojamiento />
            <fieldset className='border p-5'>
                <legend>¿Dónde se encuentra tu espacio?</legend>
                <div >
                    <input className='w-[80%] mx-auto' type="text" placeholder='Ingresa tu dirección' />
                </div>
            </fieldset>
            <DireccionAlojamiento/>
            <Cantidad />
            <ServiciosHospedaje />
            <FotosHospedaje />
            <fieldset>
                <legend>Ahora, ponle un título a tu --casa ecológica--</legend>
                <div>
                    <textarea className='border w-full text-3xl rounded-xl' name="titulo" id="titulo" maxLength={32} cols="30" rows="3">
                    </textarea>
                </div>
            </fieldset>
            <fieldset>
                <legend>Escribe tu descripción</legend>
                <div>
                    <textarea className='border w-full text-3xl rounded-xl' name="titulo" id="titulo" maxLength={500} cols="30" rows="10">
                    </textarea>
                </div>
            </fieldset>
            <fieldset className='flex justify-center'>
                <legend>Configura un precio base para los días entre semana</legend>
                <div className='text-8xl'>
                    $40.385
                </div>
            </fieldset>
        </form>
    )
}