'use client'
import { useState } from "react"
import { CreditCard, Circle, CheckCircle2 } from "lucide-react"

export default function MetodoPago() {
  const [metodo, setMetodo] = useState("tarjeta")

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-4">2. Agrega un método de pago</h2>

      {/* Opción tarjeta */}
      <div
        onClick={() => setMetodo("tarjeta")}
        className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer mb-4 ${
          metodo === "tarjeta" ? "border-black" : "border-gray-300"
        }`}
      >
        <CreditCard className="w-5 h-5" />
        <span className="flex-1 font-medium">Tarjeta de crédito o débito</span>
        {metodo === "tarjeta" ? (
          <CheckCircle2 className="w-5 h-5 text-black" />
        ) : (
          <Circle className="w-5 h-5 text-gray-400" />
        )}
      </div>

      {metodo === "tarjeta" && (
        <form className="space-y-3">
          <input
            type="text"
            placeholder="Número de tarjeta"
            className="w-full p-2 border rounded-md"
          />
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Caducidad"
              className="w-1/2 p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Código CVV"
              className="w-1/2 p-2 border rounded-md"
            />
          </div>
          <input
            type="text"
            placeholder="Código postal"
            className="w-full p-2 border rounded-md"
          />
          <select className="w-full p-2 border rounded-md">
            <option value="co">Colombia</option>
            <option value="mx">México</option>
            <option value="ar">Argentina</option>
            <option value="es">España</option>
          </select>
        </form>
      )}
    </div>
  )
}
