import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Img Tools',
  description: '图片转换工具',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link
        href="/logo.svg"
        rel="icon"
        sizes="32x32"
        type="image/x-icon"
      />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
