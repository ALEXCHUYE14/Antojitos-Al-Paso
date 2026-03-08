import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Antojitos al Paso | Pollo a la Brasa Catacaos - Delivery Piura',
  description: 'Antojitos al Paso - El mejor pollo a la brasa y fast food en Catacaos, Piura. Delivery disponible. Pedidos por WhatsApp. Dirección: Jr. Zepita # 349, Catacaos.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
