export default function PageConstruction() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center max-w-md px-6 py-10 bg-white shadow-lg rounded-2xl">
            {/* Icono */}
            <div className="flex justify-center mb-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-rose-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10h11M9 21V3m12 8-9 9"
                    />
                </svg>
            </div>

            {/* Texto */}
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
                Página en construcción
            </h1>
            <p className="text-gray-600 mb-8">
                Estamos trabajando para traerte una mejor experiencia.  
                Vuelve pronto y descubre lo que estamos preparando 🚧✨
            </p>

            {/* Botón */}
            <a
            href="/"
            className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold shadow hover:opacity-90 transition"
            >
                Volver al inicio
            </a>
        </div>
    </div>
  );
}
