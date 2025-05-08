"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useAppContext } from "@/context/app-context"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Users } from "lucide-react"

export default function DanzaDetallePage() {
  const params = useParams()
  const router = useRouter()
  const { danzas, bailarines, instructores } = useAppContext()
  const [danza, setDanza] = useState(null)
  const [bailarinesDanza, setBailarinesDanza] = useState([])
  const [instructoresDanza, setInstructoresDanza] = useState([])

  useEffect(() => {
    if (params.id && danzas.length > 0) {
      const danzaEncontrada = danzas.find((d) => d.id === Number.parseInt(params.id))
      if (danzaEncontrada) {
        setDanza(danzaEncontrada)

        // Filtrar bailarines e instructores de esta danza
        const bailarinesFiltrados = bailarines.filter((b) => b.danza === danzaEncontrada.nombre)
        const instructoresFiltrados = instructores.filter((i) => i.danza === danzaEncontrada.nombre)

        setBailarinesDanza(bailarinesFiltrados)
        setInstructoresDanza(instructoresFiltrados)
      } else {
        router.push("/danzas")
      }
    }
  }, [params.id, danzas, bailarines, instructores, router])

  if (!danza) {
    return <div className="flex justify-center items-center min-h-screen">Cargando...</div>
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <Button variant="ghost" className="mb-6 flex items-center" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a danzas
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="relative aspect-video md:aspect-square">
              <Image
                src={danza.imagen || "/placeholder.svg"}
                alt={danza.nombre}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-4">{danza.nombre}</h1>
              <p className="text-lg text-muted-foreground mb-6">{danza.descripcion}</p>

              <div className="space-y-4 mb-8">
                <p className="text-lg">{danza.detalle}</p>
                <p>
                  <span className="font-medium">Región:</span> {danza.region}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-[#E30613]" />
                    <span>{danza.bailarines} bailarines</span>
                  </div>
                  <div>
                    <span>{danza.instructores} instructores</span>
                  </div>
                </div>
              </div>

              <Button
                className="bg-[#E30613] hover:bg-[#c00510]"
                onClick={() => router.push(`/registro?danza=${danza.nombre}`)}
              >
                Unirse a esta danza
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Bailarines ({bailarinesDanza.length})</h2>
                {bailarinesDanza.length > 0 ? (
                  <ul className="space-y-2">
                    {bailarinesDanza.map((bailarin) => (
                      <li key={bailarin.id} className="p-2 border-b">
                        {bailarin.nombre} {bailarin.apellido} - {bailarin.experiencia}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No hay bailarines registrados en esta danza.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Instructores ({instructoresDanza.length})</h2>
                {instructoresDanza.length > 0 ? (
                  <ul className="space-y-2">
                    {instructoresDanza.map((instructor) => (
                      <li key={instructor.id} className="p-2 border-b">
                        {instructor.nombre} {instructor.apellido} - {instructor.experiencia}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No hay instructores registrados en esta danza.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
