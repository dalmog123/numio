import type { Metadata } from 'next'
import './globals.css'
import AnimatedFavicon from '@/components/AnimatedFavicon'

export const metadata: Metadata = {
  title: 'Numio Solutions',
  description: 'Financial Intelligence, Reimagined.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <AnimatedFavicon />
        {children}
      </body>
    </html>
  )
}