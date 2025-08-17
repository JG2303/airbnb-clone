'use client'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect, useState } from 'react'

// Soluciona íconos rotos en Next.js
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

export default function Mapa({ direccion = 'colombia' }) { 
	const API_KEY = process.env.NEXT_PUBLIC_API_GEOAPIFY
	const [coordenadas, setCoordenadas] = useState(null)

	useEffect(() => {
		async function buscarCoordenadas() {
			const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(direccion)}&lang=es&apiKey=${API_KEY}`
			const response = await fetch(url)
			const data = await response.json()
			if (data.features && data.features.length > 0) {
				const { lat, lon } = data.features[0].properties
				setCoordenadas([lat, lon])
			}
		}
		buscarCoordenadas()
	}, [direccion])

	if (!coordenadas) return <p className="text-sm text-gray-500">Cargando mapa...</p>

	return (
		<MapContainer 
				center={coordenadas} 
				zoom={15} 
				scrollWheelZoom={false}
				dragging={false}
				zoomControl={false}
				doubleClickZoom={false}
				boxZoom={false}
				keyboard={false}
				touchZoom={false}
				className="h-96 w-full rounded-md shadow-md ">
			<TileLayer				
				url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${API_KEY}`}
				
			/>
			<Marker position={coordenadas}>
				<Popup>
					{direccion}
				</Popup>
			</Marker>
		</MapContainer>
	)
}
