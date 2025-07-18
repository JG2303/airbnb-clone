import Image from "next/image";
export const metadata = {
    title: "Servicios | Airbnb",
    descripcion: "pagina de servicios ofrecidos "

}
export default function Servicios(){
    return(
        <div className="flex justify-center">
            <Image 
                src="/images/servicios.png"
                alt="servicios-image"
                width={300}
                height={300}
            />
        </div>
    )
}