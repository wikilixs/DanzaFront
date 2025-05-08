"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Tipos de datos
export interface Bailarin {
  id: number
  nombre: string
  apellido: string
  email: string
  telefono: string
  danza: string
  experiencia: string
}

export interface Instructor {
  id: number
  nombre: string
  apellido: string
  email: string
  telefono: string
  danza: string
  experiencia: string
}

export interface Danza {
  id: number
  nombre: string
  descripcion: string
  detalle: string
  bailarines: number
  instructores: number
  region: string
  imagen: string
}

interface AppContextType {
  bailarines: Bailarin[]
  instructores: Instructor[]
  danzas: Danza[]
  usuario: { nombre: string; rol: string } | null
  registrarBailarin: (bailarin: Omit<Bailarin, "id">) => void
  registrarInstructor: (instructor: Omit<Instructor, "id">) => void
  eliminarBailarin: (id: number) => void
  eliminarInstructor: (id: number) => void
  iniciarSesion: (email: string, password: string) => boolean
  cerrarSesion: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

// Datos iniciales
const danzasIniciales: Danza[] = [
  {
    id: 1,
    nombre: "Morenada",
    descripcion: "La danza de los morenos",
    detalle:
      "La Morenada es una de las danzas más representativas de Bolivia, con sus trajes pesados y movimientos que representan el sufrimiento de los esclavos africanos.",
    bailarines: 42,
    instructores: 2,
    region: "La Paz, Oruro",
    imagen: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    nombre: "Caporales",
    descripcion: "La danza de los capataces",
    detalle:
      "Los Caporales representan a los capataces de las haciendas coloniales. Se caracteriza por sus saltos y movimientos enérgicos, y el sonido de las cascabeles en las botas.",
    bailarines: 38,
    instructores: 1,
    region: "La Paz",
    imagen: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    nombre: "Tinku",
    descripcion: "El ritual del encuentro",
    detalle:
      "El Tinku es un ritual ancestral de las comunidades del norte de Potosí. La danza representa el encuentro entre comunidades y la conexión con la Pachamama.",
    bailarines: 25,
    instructores: 1,
    region: "Potosí",
    imagen: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    nombre: "Diablada",
    descripcion: "La danza de los diablos",
    detalle:
      "La Diablada representa la lucha entre el bien y el mal. Los bailarines usan máscaras elaboradas de diablos y trajes ornamentados con bordados y espejos.",
    bailarines: 30,
    instructores: 0,
    region: "Oruro",
    imagen: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 5,
    nombre: "Saya Afroboliviana",
    descripcion: "Ritmo afroboliviano",
    detalle:
      "La Saya es una expresión cultural de los afrobolivianos. Se caracteriza por sus ritmos alegres y movimientos cadenciosos que reflejan la herencia africana.",
    bailarines: 22,
    instructores: 0,
    region: "Los Yungas",
    imagen: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 6,
    nombre: "Kullawada",
    descripcion: "La danza de las hilanderas",
    detalle:
      "La Kullawada representa a las mujeres hilanderas del altiplano. Los bailarines llevan ruecas y realizan movimientos que simulan el hilado de la lana.",
    bailarines: 28,
    instructores: 0,
    region: "La Paz, Oruro",
    imagen: "/placeholder.svg?height=200&width=400",
  },
]

const bailarinesIniciales: Bailarin[] = [
  {
    id: 1,
    nombre: "Carlos",
    apellido: "Mamani",
    email: "carlos@example.com",
    telefono: "70123456",
    danza: "Morenada",
    experiencia: "Intermedio",
  },
  {
    id: 2,
    nombre: "María",
    apellido: "Quispe",
    email: "maria@example.com",
    telefono: "71234567",
    danza: "Caporales",
    experiencia: "Avanzado",
  },
  {
    id: 3,
    nombre: "Juan",
    apellido: "Condori",
    email: "juan@example.com",
    telefono: "72345678",
    danza: "Tinku",
    experiencia: "Principiante",
  },
  {
    id: 4,
    nombre: "Laura",
    apellido: "Flores",
    email: "laura@example.com",
    telefono: "73456789",
    danza: "Morenada",
    experiencia: "Intermedio",
  },
  {
    id: 5,
    nombre: "Pedro",
    apellido: "Vargas",
    email: "pedro@example.com",
    telefono: "74567890",
    danza: "Diablada",
    experiencia: "Avanzado",
  },
]

const instructoresIniciales: Instructor[] = [
  {
    id: 1,
    nombre: "Roberto",
    apellido: "Choque",
    email: "roberto@example.com",
    telefono: "75678901",
    danza: "Morenada",
    experiencia: "7-10 años",
  },
  {
    id: 2,
    nombre: "Ana",
    apellido: "Mendoza",
    email: "ana@example.com",
    telefono: "76789012",
    danza: "Caporales",
    experiencia: "4-6 años",
  },
  {
    id: 3,
    nombre: "Luis",
    apellido: "Torrez",
    email: "luis@example.com",
    telefono: "77890123",
    danza: "Tinku",
    experiencia: "10+ años",
  },
]

// Proveedor del contexto
export function AppProvider({ children }: { children: ReactNode }) {
  // Estado para bailarines, instructores y danzas
  const [bailarines, setBailarines] = useState<Bailarin[]>([])
  const [instructores, setInstructores] = useState<Instructor[]>([])
  const [danzas, setDanzas] = useState<Danza[]>([])
  const [usuario, setUsuario] = useState<{ nombre: string; rol: string } | null>(null)

  // Cargar datos iniciales
  useEffect(() => {
    // Intentar cargar desde localStorage primero
    const storedBailarines = localStorage.getItem("bailarines")
    const storedInstructores = localStorage.getItem("instructores")
    const storedDanzas = localStorage.getItem("danzas")
    const storedUsuario = localStorage.getItem("usuario")

    setBailarines(storedBailarines ? JSON.parse(storedBailarines) : bailarinesIniciales)
    setInstructores(storedInstructores ? JSON.parse(storedInstructores) : instructoresIniciales)
    setDanzas(storedDanzas ? JSON.parse(storedDanzas) : danzasIniciales)
    setUsuario(storedUsuario ? JSON.parse(storedUsuario) : null)
  }, [])

  // Guardar cambios en localStorage
  useEffect(() => {
    if (bailarines.length > 0) localStorage.setItem("bailarines", JSON.stringify(bailarines))
    if (instructores.length > 0) localStorage.setItem("instructores", JSON.stringify(instructores))
    if (danzas.length > 0) localStorage.setItem("danzas", JSON.stringify(danzas))
    if (usuario) localStorage.setItem("usuario", JSON.stringify(usuario))
  }, [bailarines, instructores, danzas, usuario])

  // Registrar nuevo bailarín
  const registrarBailarin = (nuevoBailarin: Omit<Bailarin, "id">) => {
    const id = bailarines.length > 0 ? Math.max(...bailarines.map((b) => b.id)) + 1 : 1
    const bailarin = { ...nuevoBailarin, id }
    setBailarines([...bailarines, bailarin])

    // Actualizar contador en danzas
    setDanzas(
      danzas.map((danza) => {
        if (danza.nombre === nuevoBailarin.danza) {
          return { ...danza, bailarines: danza.bailarines + 1 }
        }
        return danza
      }),
    )
  }

  // Registrar nuevo instructor
  const registrarInstructor = (nuevoInstructor: Omit<Instructor, "id">) => {
    const id = instructores.length > 0 ? Math.max(...instructores.map((i) => i.id)) + 1 : 1
    const instructor = { ...nuevoInstructor, id }
    setInstructores([...instructores, instructor])

    // Actualizar contador en danzas
    setDanzas(
      danzas.map((danza) => {
        if (danza.nombre === nuevoInstructor.danza) {
          return { ...danza, instructores: danza.instructores + 1 }
        }
        return danza
      }),
    )
  }

  // Eliminar bailarín
  const eliminarBailarin = (id: number) => {
    const bailarinEliminado = bailarines.find((bailarin) => bailarin.id === id)
    if (bailarinEliminado) {
      setBailarines(bailarines.filter((bailarin) => bailarin.id !== id))

      // Actualizar contador en danzas
      setDanzas(
        danzas.map((danza) => {
          if (danza.nombre === bailarinEliminado.danza) {
            return { ...danza, bailarines: danza.bailarines - 1 }
          }
          return danza
        }),
      )
    }
  }

  // Eliminar instructor
  const eliminarInstructor = (id: number) => {
    const instructorEliminado = instructores.find((instructor) => instructor.id === id)
    if (instructorEliminado) {
      setInstructores(instructores.filter((instructor) => instructor.id !== id))

      // Actualizar contador en danzas
      setDanzas(
        danzas.map((danza) => {
          if (danza.nombre === instructorEliminado.danza) {
            return { ...danza, instructores: danza.instructores - 1 }
          }
          return danza
        }),
      )
    }
  }

  // Sistema simple de autenticación
  const iniciarSesion = (email: string, password: string) => {
    // En un sistema real, esto se haría con una API y autenticación segura
    if (email === "admin@danzabolivia.com" && password === "admin123") {
      setUsuario({ nombre: "Administrador", rol: "admin" })
      return true
    }
    return false
  }

  const cerrarSesion = () => {
    setUsuario(null)
    localStorage.removeItem("usuario")
  }

  return (
    <AppContext.Provider
      value={{
        bailarines,
        instructores,
        danzas,
        usuario,
        registrarBailarin,
        registrarInstructor,
        eliminarBailarin,
        eliminarInstructor,
        iniciarSesion,
        cerrarSesion,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// Hook personalizado para usar el contexto
export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext debe ser usado dentro de un AppProvider")
  }
  return context
}
