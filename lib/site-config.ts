// TODO: Gerçek şirket bilgilerini ve yayın alan adını bu dosyada tamamlayın.
export const company = {
  name: 'ASTAF Asansör',
  url: process.env.NEXT_PUBLIC_SITE_URL || '',
  phone: '+905300630752', // TODO: +90 ile gerçek telefon
  whatsapp: '+905300630752', // TODO: Ülke koduyla yalnızca rakamlar
  email: 'gryakkus@gmail.com', // TODO: Gerçek e-posta
  address: '', // TODO: Açık adres
  workingHours: '09.00-18.00', // TODO: Doğrulanmış çalışma saatleri
  openingHoursSpecification: [] as Record<string, unknown>[],
  socialLinks: [] as { label: string; url: string }[],
  serviceAreas: ['İstanbul'],
  stats: {
    completedProjects: null,
    maintainedElevators: null,
    satisfaction: null,
  } as Record<string, number | null>,
  searchConsole: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  indexing:
    process.env.SITE_INDEXING === 'true' &&
    Boolean(process.env.NEXT_PUBLIC_SITE_URL),
}
export const navigation = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/kurumsal', label: 'Kurumsal' },
  { href: '/hizmetler', label: 'Hizmetler' },
  { href: '/projeler', label: 'Projeler' },
  { href: '/blog', label: 'Blog' },
  { href: '/iletisim', label: 'İletişim' },
]
export const phoneHref = company.phone
  ? `tel:${company.phone.replace(/[^+\d]/g, '')}`
  : null
export const whatsappHref = company.whatsapp
  ? `https://wa.me/${company.whatsapp.replace(/\D/g, '')}`
  : null
