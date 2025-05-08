import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AppProvider } from "@/context/app-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "DanzaBolivia - Escuela de Danzas Típicas Bolivianas",
  description:
    "Escuela de danzas típicas bolivianas, ofreciendo clases y presentaciones de Morenada, Caporales, Tinku y más.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AppProvider>
            {children}
            <Toaster />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
