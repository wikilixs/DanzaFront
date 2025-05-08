"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useAppContext } from "@/context/app-context"

export default function RegistroPage() {
  const { danzas, registrarBailarin, registrarInstructor } = useAppContext()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [activeTab, setActiveTab] = useState("bailarin")
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    tipo: "bailarin",
    danza: "",
    experiencia: "",
  })

  useEffect(() => {
    // Establecer el tipo de registro según el parámetro de URL
    const tipo = searchParams.get("tipo")
    if (tipo === "instructor") {
      setActiveTab("instructor")
      setFormData((prev) => ({ ...prev, tipo: "instructor" }))
    } else if (tipo === "bailarin") {
      setActiveTab("bailarin")
      setFormData((prev) => ({ ...prev, tipo: "bailarin" }))
    }

    // Establecer la danza preseleccionada si viene en la URL
    const danza = searchParams.get("danza")
    if (danza) {
      setFormData((prev) => ({ ...prev, danza }))
    }
  }, [searchParams])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validar que todos los campos estén completos
    if (
      !formData.nombre ||
      !formData.apellido ||
      !formData.email ||
      !formData.telefono ||
      !formData.danza ||
      !formData.experiencia
    ) {
      toast({
        title: "Error en el formulario",
        description: "Por favor completa todos los campos.",
        variant: "destructive",
      })
      return
    }

    // Registrar según el tipo
    if (activeTab === "bailarin") {
      registrarBailarin({
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        telefono: formData.telefono,
        danza: formData.danza,
        experiencia: formData.experiencia,
      })
    } else {
      registrarInstructor({
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        telefono: formData.telefono,
        danza: formData.danza,
        experiencia: formData.experiencia,
      })
    }

    toast({
      title: "Registro exitoso",
      description: `${formData.nombre} ha sido registrado como ${activeTab}.`,
    })

    // Resetear el formulario
    setFormData({
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      tipo: activeTab,
      danza: "",
      experiencia: "",
    })

    // Redirigir a la página de la danza
    const danzaSeleccionada = danzas.find((d) => d.nombre === formData.danza)
    if (danzaSeleccionada) {
      setTimeout(() => {
        router.push(`/danzas/${danzaSeleccionada.id}`)
      }, 1500)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Registro de Participantes</h1>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="bailarin">Bailarín</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
              </TabsList>

              <TabsContent value="bailarin">
                <Card>
                  <CardHeader>
                    <CardTitle>Registro de Bailarín</CardTitle>
                    <CardDescription>Completa el formulario para unirte a nuestros grupos de danza.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nombre">Nombre</Label>
                          <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="apellido">Apellido</Label>
                          <Input
                            id="apellido"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Correo Electrónico</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telefono">Teléfono</Label>
                          <Input
                            id="telefono"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="danza">Danza de Interés</Label>
                        <Select value={formData.danza} onValueChange={(value) => handleSelectChange("danza", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una danza" />
                          </SelectTrigger>
                          <SelectContent>
                            {danzas.map((danza) => (
                              <SelectItem key={danza.id} value={danza.nombre}>
                                {danza.nombre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Experiencia Previa</Label>
                        <RadioGroup
                          value={formData.experiencia}
                          onValueChange={(value) => handleSelectChange("experiencia", value)}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Ninguna" id="ninguna" />
                            <Label htmlFor="ninguna">Ninguna</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Principiante" id="principiante" />
                            <Label htmlFor="principiante">Principiante (menos de 1 año)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Intermedio" id="intermedio" />
                            <Label htmlFor="intermedio">Intermedio (1-3 años)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Avanzado" id="avanzado" />
                            <Label htmlFor="avanzado">Avanzado (más de 3 años)</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <Button type="submit" className="w-full bg-[#E30613] hover:bg-[#c00510]">
                        Registrarse como Bailarín
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="instructor">
                <Card>
                  <CardHeader>
                    <CardTitle>Registro de Instructor</CardTitle>
                    <CardDescription>
                      Completa el formulario para unirte a nuestro equipo de instructores.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nombre-instructor">Nombre</Label>
                          <Input
                            id="nombre-instructor"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="apellido-instructor">Apellido</Label>
                          <Input
                            id="apellido-instructor"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email-instructor">Correo Electrónico</Label>
                          <Input
                            id="email-instructor"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telefono-instructor">Teléfono</Label>
                          <Input
                            id="telefono-instructor"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="danza-instructor">Especialidad en Danza</Label>
                        <Select value={formData.danza} onValueChange={(value) => handleSelectChange("danza", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una danza" />
                          </SelectTrigger>
                          <SelectContent>
                            {danzas.map((danza) => (
                              <SelectItem key={danza.id} value={danza.nombre}>
                                {danza.nombre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experiencia-instructor">Años de Experiencia</Label>
                        <Select
                          value={formData.experiencia}
                          onValueChange={(value) => handleSelectChange("experiencia", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona años de experiencia" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-3 años">1-3 años</SelectItem>
                            <SelectItem value="4-6 años">4-6 años</SelectItem>
                            <SelectItem value="7-10 años">7-10 años</SelectItem>
                            <SelectItem value="10+ años">Más de 10 años</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button type="submit" className="w-full bg-[#E30613] hover:bg-[#c00510]">
                        Registrarse como Instructor
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
