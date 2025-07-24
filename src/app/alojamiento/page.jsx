import RegistrarCasa from "../components/formRegistroCasa/RegistrarCasa";

export const metadata = {
  title: 'Alojamiento | Airbnb',
  description: 'Página de alojamiento con opciones disponibles.',
};
export default function alojamiento() {
    return(
        <div className="flex justify-center">
           <RegistrarCasa />
        </div>
    )
}