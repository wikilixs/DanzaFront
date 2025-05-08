"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, Users } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useAppContext } from "@/context/app-context"
import { useRouter } from "next/navigation"

export default function DanzasPage() {
  const { danzas } = useAppContext()
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-4">Danzas Típicas Bolivianas</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Bolivia cuenta con una rica diversidad cultural que se refleja en sus danzas tradicionales. Cada región
              tiene sus propias expresiones artísticas que cuentan historias, tradiciones y cosmovisiones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {danzas.map((danza) => (
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
                  <p className="text-muted-foreground mb-4">{danza.detalle}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span className="font-medium mr-2">Región:</span> {danza.region}
                  </div>
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
                      Ver detalles <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
