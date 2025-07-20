export const Filtros = ({label, texto}) =>{
    return(
        <div className="flex flex-col px-5 h-full justify-center hover:bg-stone-100 rounded-full">
            <label htmlFor={label}>{label}</label>
            <input className="border-none" type="text" id={label} placeholder={texto}  />
        </div>    
    )
} 