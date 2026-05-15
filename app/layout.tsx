import type { Metadata } from 'next'
import { Playfair_Display, Lora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin", "vietnamese"],
  variable: '--font-playfair',
  display: 'swap',
});

const lora = Lora({ 
  subsets: ["latin", "vietnamese"],
  variable: '--font-lora',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Thiệp Cưới Online | Tạo Thiệp Cưới Đẹp & Sang Trọng',
  description: 'Tạo thiệp cưới online miễn phí, đẹp mắt và sang trọng. Dễ dàng tùy chỉnh và chia sẻ với bạn bè, người thân.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className="bg-background">
      <body className={`${playfair.variable} ${lora.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
