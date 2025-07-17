import Image from "next/image"
import styles from "./Header.module.css"
import { Filtros } from "../Filtros/Filtros"
export const Header = ()=>{
    return(
        <header className="containerHeader flex  flex-col ">
            <div className="encabezado flex justify-between ">
                <div className="logo-container">
                <Image 
                    src="/images/logo.png"
                    alt="Airbnb - logo"
                    width={125}
                    height={56}
                    priority={true}
                />
                </div>
                <nav className={styles.nav}>
                    <ul className={styles.servicios}>
                        <li> 
                            <Image 
                                src="/images/hospedaje.png"
                                alt="Hospedaje"
                                width={36}
                                height={36}
                            />  
                            Hospedaje                
                        </li>
                        <li>
                            <Image 
                                src="/images/experiencias.png"
                                alt="experiencias"
                                width={36}
                                height={36}
                            />
                            Experiencias
                        </li>
                        <li>
                            <Image 
                                src="/images/servicios.png"
                                alt="servicios"
                                width={36}
                                height={36}
                            />
                            Servicios
                        </li>
                    </ul>
                </nav>
                <div className="credenciales flex gap-5 justify-center items-center">
                    <Image 
                        src="/images/net.png"
                        alt="net"
                        width={36}
                        height={36}
                    />
                    <Image 
                        src="/images/login.png"
                        alt="login"
                        width={16}
                        height={16}
                    />
                </div>
            </div>
            <div className="busqueda flex justify-center items-center ">
                <div className="container-filtro flex justify-evenly rounded-full items-center  border-1  w-3xl h-13">
                   <Filtros 
                        label={[1,2,3]}
                        texto={"Explora destinos"}
                   />
                    <Filtros 
                        label={"Check-in"}
                        texto={"Agrega fecha"}
                   />
                    <Filtros 
                        label={"Check-out"}
                        texto={"Agrega fecha"}
                   />
                    <Filtros 
                        label={"Quién"}
                        texto={"¿Cuántos?"}
                   />
                </div>            
            </div>
            
        </header>
    )
}