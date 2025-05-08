"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Trash2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useAppContext } from "@/context/app-context"
import { toast } from "@/components/ui/use-toast"

export default function AdminPage() {
  const { bailarines, instructores, danzas, eliminarBailarin, eliminarInstructor, usuario } = useAppContext()
  const router = useRouter()
  const [busqueda, setBusqueda] = useState("")

  // Redirigir si no hay usuario autenticado
  useEffect(() => {
    if (!usuario) {
      router.push("/login")
    }
  }, [usuario, router])

  // Filtrar bailarines según la búsqueda
  const bailarinesFiltrados = bailarines.filter(
    (bailarin) =>
      bailarin.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      bailarin.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
      bailarin.danza.toLowerCase().includes(busqueda.toLowerCase()),
  )

  // Filtrar instructores según la búsqueda
  const instructoresFiltrados = instructores.filter(
    (instructor) =>
      instructor.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      instructor.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
      instructor.danza.toLowerCase().includes(busqueda.toLowerCase()),
  )

  // Eliminar bailarín con confirmación
  const handleEliminarBailarin = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este bailarín?")) {
      eliminarBailarin(id)
      toast({
        title: "Bailarín eliminado",
        description: "El bailarín ha sido eliminado correctamente.",
      })
    }
  }

  // Eliminar instructor con confirmación
  const handleEliminarInstructor = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este instructor?")) {
      eliminarInstructor(id)
      toast({
        title: "Instructor eliminado",
        description: "El instructor ha sido eliminado correctamente.",
      })
    }
  }

  if (!usuario) {
    return <div className="flex justify-center items-center min-h-screen">Redirigiendo al login...</div>
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Panel de Administración</h1>
            <p className="text-muted-foreground">Gestiona bailarines, instructores y danzas de la escuela.</p>
          </div>

          <div className="mb-6">
            <div className="max-w-md">
              <Label htmlFor="busqueda">Buscar</Label>
              <Input
                id="busqueda"
                placeholder="Buscar por nombre, apellido o danza..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="danzas" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="danzas">Danzas</TabsTrigger>
              <TabsTrigger value="bailarines">Bailarines</TabsTrigger>
              <TabsTrigger value="instructores">Instructores</TabsTrigger>
            </TabsList>

            <TabsContent value="danzas">
              <Card>
                <CardHeader>
                  <CardTitle>Danzas</CardTitle>
                  <CardDescription>Lista de danzas y cantidad de participantes en cada una.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Bailarines</TableHead>
                        <TableHead>Instructores</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {danzas.map((danza) => (
                        <TableRow key={danza.id}>
                          <TableCell className="font-medium">{danza.nombre}</TableCell>
                          <TableCell>{danza.bailarines}</TableCell>
                          <TableCell>{danza.instructores}</TableCell>
                          <TableCell>{danza.bailarines + danza.instructores}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => router.push(`/danzas/${danza.id}`)}>
                              Ver detalles
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bailarines">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Bailarines</CardTitle>
                    <CardDescription>Gestiona los bailarines registrados en la escuela.</CardDescription>
                  </div>
                  <Button
                    className="bg-[#E30613] hover:bg-[#c00510]"
                    onClick={() => router.push("/registro?tipo=bailarin")}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Nuevo Bailarín
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Apellido</TableHead>
                        <TableHead>Danza</TableHead>
                        <TableHead>Experiencia</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bailarinesFiltrados.length > 0 ? (
                        bailarinesFiltrados.map((bailarin) => (
                          <TableRow key={bailarin.id}>
                            <TableCell className="font-medium">{bailarin.nombre}</TableCell>
                            <TableCell>{bailarin.apellido}</TableCell>
                            <TableCell>{bailarin.danza}</TableCell>
                            <TableCell>{bailarin.experiencia}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon" onClick={() => handleEliminarBailarin(bailarin.id)}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                            No se encontraron bailarines con esos criterios de búsqueda.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="instructores">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Instructores</CardTitle>
                    <CardDescription>Gestiona los instructores de la escuela.</CardDescription>
                  </div>
                  <Button
                    className="bg-[#E30613] hover:bg-[#c00510]"
                    onClick={() => router.push("/registro?tipo=instructor")}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Nuevo Instructor
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Apellido</TableHead>
                        <TableHead>Especialidad</TableHead>
                        <TableHead>Experiencia</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {instructoresFiltrados.length > 0 ? (
                        instructoresFiltrados.map((instructor) => (
                          <TableRow key={instructor.id}>
                            <TableCell className="font-medium">{instructor.nombre}</TableCell>
                            <TableCell>{instructor.apellido}</TableCell>
                            <TableCell>{instructor.danza}</TableCell>
                            <TableCell>{instructor.experiencia}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEliminarInstructor(instructor.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                            No se encontraron instructores con esos criterios de búsqueda.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
