import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">DanzaBolivia</h3>
            <p className="text-gray-400">Preservando nuestras tradiciones a través del arte y el movimiento.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <p className="text-gray-400 mb-2">Av. 16 de Julio #1234, La Paz, Bolivia</p>
            <p className="text-gray-400 mb-2">info@danzabolivia.com</p>
            <p className="text-gray-400">+591 2 1234567</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/danzas" className="hover:text-white">
                  Danzas
                </Link>
              </li>
              <li>
                <Link href="/registro" className="hover:text-white">
                  Registro
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white">
                  Administración
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} DanzaBolivia. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
