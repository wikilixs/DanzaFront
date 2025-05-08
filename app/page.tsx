"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, Users } from "lucide-react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useAppContext } from "@/context/app-context"
import { useRouter } from "next/navigation"

export default function Home() {
  const { danzas } = useAppContext()
  const router = useRouter()

  // Mostrar solo las 3 danzas con más bailarines
  const danzasDestacadas = [...danzas].sort((a, b) => b.bailarines - a.bailarines).slice(0, 3)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[500px] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/placeholder.svg?height=500&width=1200"
              alt="Danza típica boliviana"
              fill
              className="object-cover brightness-50"
              priority
            />
          </div>
          <div className="container mx-auto px-4 z-10 text-white">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Descubre la Riqueza de la Danza Boliviana</h1>
              <p className="text-xl mb-6">Preservando nuestras tradiciones a través del arte y el movimiento</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-[#E30613] hover:bg-[#c00510]" onClick={() => router.push("/danzas")}>
                  Explorar Danzas
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-[#E30613]"
                  onClick={() => router.push("/registro")}
                >
                  Registrarse
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Dances */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center">Danzas Destacadas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {danzasDestacadas.map((danza) => (
                <Card key={danza.id}>
                  <CardHeader>
                    <CardTitle>{danza.nombre}</CardTitle>
                    <CardDescription>{danza.descripcion}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video relative mb-4">
                      <Image
                        src={danza.imagen || "/placeholder.svg"}
                        alt={danza.nombre}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <p className="text-muted-foreground">{danza.detalle}</p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex justify-between items-center w-full">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{danza.bailarines} bailarines</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#E30613]"
                        onClick={() => router.push(`/danzas/${danza.id}`)}
                      >
                        Ver más <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button className="bg-[#E30613] hover:bg-[#c00510]" onClick={() => router.push("/danzas")}>
                Ver todas las danzas
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Nuestra Escuela</h2>
                <p className="mb-4 text-lg">
                  En DanzaBolivia, nos dedicamos a preservar y difundir la rica tradición de danzas folclóricas
                  bolivianas, ofreciendo clases para todas las edades y niveles.
                </p>
                <p className="mb-6 text-lg">
                  Nuestros instructores son bailarines profesionales con amplia experiencia en danzas tradicionales,
                  comprometidos con mantener viva nuestra cultura a través del arte.
                </p>
                <Button className="bg-[#E30613] hover:bg-[#c00510]" onClick={() => router.push("/instructores")}>
                  Conoce a nuestros instructores
                </Button>
              </div>
              <div className="relative h-[400px]">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Escuela de danza"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-[#E30613] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">¡Únete a nuestra comunidad de danza!</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Aprende danzas típicas bolivianas, conoce nuevas personas y forma parte de nuestras presentaciones
              culturales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-white text-[#E30613] hover:bg-gray-100"
                onClick={() => {
                  router.push("/registro?tipo=bailarin")
                }}
              >
                Registrarse como Bailarín
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#E30613]"
                onClick={() => {
                  router.push("/registro?tipo=instructor")
                }}
              >
                Registrarse como Instructor
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
