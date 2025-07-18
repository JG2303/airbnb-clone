import Image from "next/image";

export const metadata = {
  title: 'Alojamiento | Airbnb',
  description: 'Página de alojamiento con opciones disponibles.',
};
export default function alojamiento() {
    return(
        <div className="flex justify-center">
            <Image
                src="/images/hospedaje.png"
                alt="Hospedaje"
                width={300}
                height={300}
            >
            </Image> 
        </div>
    )
}