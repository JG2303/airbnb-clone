import Image from "next/image"
import styles from "./Header.module.css"
export const Header = ()=>{
    return(
        <header className="containerHeader flex  flex-col bg-sky-100">
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
                                width={56}
                                height={56}
                            />  
                            Hospedaje                
                        </li>
                        <li>
                            <Image 
                                src="/images/experiencias.png"
                                alt="experiencias"
                                width={56}
                                height={56}
                            />
                            Experiencias
                        </li>
                        <li>
                            <Image 
                                src="/images/servicios.png"
                                alt="servicios"
                                width={56}
                                height={56}
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
                        width={81}
                        height={38}
                    />
                </div>
            </div>
            <div className="busqueda flex justify-center items-center ">
                    <input className="border-2" type="text" placeholder="hola" />
                    <input className="border-2" type="text" placeholder="como"/>
                    <input className="border-2" type="text" placeholder="estas"/>
                    
            </div>
            
        </header>
    )
}