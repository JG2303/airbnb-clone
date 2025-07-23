export const Filtros = ({label, texto, children}) =>{
    return(
        <div className="flex hover:bg-stone-100 rounded-full cursor-pointer ">
            <div className="flex flex-col px-5 h-full justify-center  ">
                <label className="cursor-pointer" htmlFor={label}>{label}</label>
                <input className="border-none cursor-pointer focus:outline-none focus:border-none" type="text" id={label} placeholder={texto}  />
            </div>    
                {children}
        </div>
    )
} 