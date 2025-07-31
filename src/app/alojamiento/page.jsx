import RegistrarCasa from "../components/formRegistroCasa/registrarCasa";

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