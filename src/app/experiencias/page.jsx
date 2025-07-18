import Image from "next/image";
export const metadata = {
    title: "Experiencias | Airbnb",
    descripcion : "Encuentra las mejores experiencias"
}
export default function Experiencias() {
    return(
        <div className="flex justify-center">
            <Image
                src="/images/experiencias.png"
                alt="experiencias-image"
                width={300}
                height={300}
            />            
        </div>
    )
}