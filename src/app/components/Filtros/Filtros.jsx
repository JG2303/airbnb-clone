export const Filtros = ({label, texto}) =>{
    return(
        <div className="filtro-lugar  flex flex-col ">
            <label htmlFor="lugar">{label}</label>
            <input className="border-none" type="text" id="lugar" placeholder={texto}  />
        </div>    
    )
} 