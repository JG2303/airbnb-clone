export default function Cantidad(){
    return(
        <fieldset className="border p-5">
            <legend>Agrega algunos datos básicos sobre tu espacio</legend>
            <div>
                <label htmlFor="huespedes">Huéspedes</label>
                <input type="text" placeholder="Cantidad max de huéspedes" />
            </div>
            <div>
                <label htmlFor="camas">Camas</label>
                <input type="text" placeholder="Cantidad de camas" />
            </div>
            <div>
                <label htmlFor="baños">Baños</label>
                <input type="text" placeholder="Cantidad de baños" />
            </div>
        </fieldset>
    )
}