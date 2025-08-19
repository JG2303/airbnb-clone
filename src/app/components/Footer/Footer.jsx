export default function Footer() {
  return (
    <footer className=" bg-white text-sm text-gray-600">
      <div className="mx-auto max-w-screen-xl px-4 py-6 flex flex-col md:flex-row md:justify-between md:items-center gap-2 text-center md:text-left">
        
        {/* Texto izquierdo */}
        <div>
          © {new Date().getFullYear()} Clonebnb, Inc. · Privacidad · Términos · Mapa del sitio
        </div>

        {/* Texto derecho */}
        <div>
          Soporte · Ayuda · Moneda: COP
        </div>
      </div>
    </footer>
  )
}

