"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useAppContext } from "@/context/app-context"

export default function LoginPage() {
  const { iniciarSesion } = useAppContext()
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular un pequeño retraso para la autenticación
    setTimeout(() => {
      const success = iniciarSesion(formData.email, formData.password)

      if (success) {
        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido al panel de administración.",
        })
        router.push("/admin")
      } else {
        toast({
          title: "Error de autenticación",
          description: "Correo electrónico o contraseña incorrectos.",
          variant: "destructive",
        })
      }

      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Iniciar Sesión</CardTitle>
                <CardDescription>Accede al panel de administración de DanzaBolivia.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#E30613] hover:bg-[#c00510]" disabled={isLoading}>
                    {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                  </Button>
                </form>

                <div className="mt-4 text-center text-sm text-muted-foreground">
                  <p>Para fines de demostración:</p>
                  <p>Email: admin@danzabolivia.com</p>
                  <p>Contraseña: admin123</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
