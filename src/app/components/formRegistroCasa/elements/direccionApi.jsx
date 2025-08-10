
/**
 * Componente de autocompletado de direcciones usando la API de Geoapify.
 *
 * @component
 * @param {Object} props
 * @param {(direccion: { direccion: string, ciudad: string, departamento: string, pais: string }) => void} props.onDireccionSeleccionada
 *   Callback que se ejecuta cuando el usuario selecciona una dirección de las sugerencias.
 *
 * @returns {JSX.Element} Un campo de texto con sugerencias de direcciones y autocompletado.
 */
'use client'
import { useState, useEffect, useRef } from 'react'

export default function AutoCompleteDireccion({ onDireccionSeleccionada }) {
  const [inputValue, setInputValue] = useState('')
  const [sugerencias, setSugerencias] = useState([])
  const [cargando, setCargando] = useState(false)
  const evitarBusqueda = useRef(false) // 👈 Nueva referencia

  useEffect(() => {
    if (evitarBusqueda.current) {
      evitarBusqueda.current = false
      return
    }

    const delayDebounce = setTimeout(() => {
      if (inputValue.length > 2) {
        obtenerSugerencias(inputValue)
      } else {
        setSugerencias([])
      }
    }, 300)

    return () => clearTimeout(delayDebounce)
  }, [inputValue])

  async function obtenerSugerencias(texto) {
    setCargando(true)
    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(texto)}&limit=5&lang=es&apiKey=0b303069c96e4504bff53a98ccad9392`
      )
      const data = await res.json()
      setSugerencias(data.features)
    } catch (error) {
      console.error('Error al obtener sugerencias:', error)
    } finally {
      setCargando(false)
    }
  }

  function seleccionarDireccion(item) {
    const direccionCompleta = item.properties.formatted
    const ciudad = item.properties.city || item.properties.town || item.properties.village || ''
    const departamento = item.properties.state || ''
    const pais = item.properties.country || ''

    evitarBusqueda.current = true // 👈 Evita que el useEffect haga fetch
    setInputValue(direccionCompleta)
    setSugerencias([])

    if (onDireccionSeleccionada) {
      onDireccionSeleccionada({
        direccion: direccionCompleta,
        ciudad,
        departamento,
        pais
      })
    }
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Ingresa tu dirección"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      {sugerencias.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full shadow-lg max-h-60 overflow-auto">
          {sugerencias.map((item, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
              onClick={() => seleccionarDireccion(item)}
            >
              {item.properties.formatted}
            </li>
          ))}
        </ul>
      )}

      {cargando && <p className="text-sm text-gray-500 mt-1">Cargando...</p>}
    </div>
  )
}
