import type { Metadata } from 'next'
import '@fontsource-variable/manrope'
import '@fontsource-variable/dm-sans'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { JsonLd } from '@/components/ui'
import { company } from '@/lib/site-config'
import { organizationSchema } from '@/lib/seo'
import { Analytics } from '@/components/analytics'
// import { Analytics } from '@vercel/analytics/next'
export const metadata: Metadata = {
  metadataBase: company.url ? new URL(company.url) : undefined,
  title: {
    default: 'ASTAF Asansör | İstanbul Asansör Bakım, Montaj ve Revizyon',
    template: '%s | ASTAF Asansör',
  },
  description:
    'İstanbul’da asansör bakım, montaj, revizyon, teknik servis, ray ve kapı sistemleri. Yapınıza uygun çözümler için ASTAF Asansör.',
  icons: { icon: '/favicon.svg' },
  robots: { index: company.indexing, follow: company.indexing },
  verification: company.searchConsole
    ? { google: company.searchConsole }
    : undefined,
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const ga = process.env.NEXT_PUBLIC_GA_ID || ''
  const gtm = process.env.NEXT_PUBLIC_GTM_ID || ''
  return (
    <html lang="tr">
      <body>
        <a className="skip-link" href="#main">
          İçeriğe geç
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={organizationSchema()} />
        <Analytics
          gaId={/^G-[A-Z0-9]+$/.test(ga) ? ga : ''}
          gtmId={/^GTM-[A-Z0-9]+$/.test(gtm) ? gtm : ''}
        />
      </body>
    </html>
  )
}
