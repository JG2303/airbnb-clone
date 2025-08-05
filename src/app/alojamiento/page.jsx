
/**
 * Metadata for the alojamiento page.
 * @type {{title: string, description: string}}
 */

/**
 * alojamiento page component.
 * Renders the RegistrarCasa form inside a centered flex container.
 *
 * @component
 * @returns {JSX.Element} The alojamiento page layout.
 */
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