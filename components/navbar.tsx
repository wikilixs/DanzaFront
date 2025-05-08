"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAppContext } from "@/context/app-context"
import { useRouter } from "next/navigation"

export function Navbar() {
  const { usuario, cerrarSesion } = useAppContext()
  const router = useRouter()

  const handleLogout = () => {
    cerrarSesion()
    router.push("/")
  }

  return (
    <header className="bg-[#E30613] text-white">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link href="/" className="text-2xl font-bold">
              DanzaBolivia
            </Link>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:underline font-medium">
              Inicio
            </Link>
            <Link href="/danzas" className="hover:underline font-medium">
              Danzas
            </Link>
            <Link href="/registro" className="hover:underline font-medium">
              Registro
            </Link>
            {usuario && (
              <Link href="/admin" className="hover:underline font-medium">
                Administración
              </Link>
            )}
          </div>
          {usuario ? (
            <div className="flex items-center gap-4">
              <span className="text-sm hidden sm:inline">Hola, {usuario.nombre}</span>
              <Button variant="outline" className="bg-white text-[#E30613] hover:bg-gray-100" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              className="bg-white text-[#E30613] hover:bg-gray-100"
              onClick={() => router.push("/login")}
            >
              Iniciar Sesión
            </Button>
          )}
        </nav>
      </div>
    </header>
  )
}
