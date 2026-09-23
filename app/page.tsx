import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowDown,
  ArrowUpRight,
  ShieldCheck,
  ClipboardCheck,
  ScanLine,
  MoveUpRight,
  Check,
  MapPin,
} from 'lucide-react'
import { Button, Eyebrow, SectionHeading, ServiceCards } from '@/components/ui'
import { Emergency } from '@/components/sections/emergency'
import { Stats } from '@/components/sections/stats'
import { processSteps } from '@/data/services'
import { pageMeta } from '@/lib/seo'
export const metadata = pageMeta(
  'İstanbul Asansör Bakım, Montaj ve Revizyon',
  'ASTAF Asansör: İstanbul’da bakım, montaj, revizyon, teknik servis, ray ve kapı çözümleri. Yapınıza uygun hizmetleri keşfedin.',
  '/',
)
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <Eyebrow>İSTANBUL · ASANSÖR ÇÖZÜMLERİ</Eyebrow>
            <h1>
              Yükünüzü değil,
              <br />
              <span>güveninizi</span>
              <br />
              taşıyoruz<span className="hero-period">.</span>
            </h1>
            <p className="hero-description">
              Asansör bakım, montaj ve revizyonunda;
              <br className="desktop-break" /> yapınızın her katına uzanan
              mühendislik.
            </p>
            <div className="button-row">
              <Button href="/servis-talebi?tur=Teklif">Teklif Al</Button>
              <Link className="text-button" href="/hizmetler">
                Hizmetlerimizi inceleyin <ArrowUpRight size={18} />
              </Link>
            </div>
            <div className="hero-note">
              <ShieldCheck size={20} />
              <span>Güvenlik odaklı yaklaşım. Planlı, şeffaf hizmet.</span>
            </div>
          </div>
          <div className="hero-visual">
            <Image
              src="/images/elevator-lobby.webp"
              alt="Paslanmaz çelik kapılı modern asansör lobisi; temsili mimari görsel"
              fill
              sizes="(max-width: 760px) 100vw, 55vw"
              priority
              fetchPriority="high"
              className="hero-image"
            />
            <div className="visual-topline">
              <span>ASTAF / DİKEY ULAŞIM</span>
              <MoveUpRight size={22} />
            </div>
            <div className="floor-indicator">
              <span>↑</span>01
            </div>
            <div className="visual-caption">
              <span>
                Her katta.
                <br />
                <strong>Aynı güven.</strong>
              </span>
              <span className="caption-line" />
            </div>
            <span className="image-credit">Temsili mimari görsel</span>
          </div>
        </div>
        <div className="hero-bottom container">
          <span>YAPINIZ İÇİN DOĞRU ÇÖZÜM</span>
          <a href="#hizmetler" aria-label="Hizmetler bölümüne ilerle">
            <ArrowDown size={18} />
          </a>
          <span>01 — 06</span>
        </div>
      </section>
      <section className="trust-strip">
        <div className="container trust-grid">
          {[
            [
              ShieldCheck,
              'Güvenlik önceliğimiz',
              'Her işlemde dikkatli kontrol',
            ],
            [ClipboardCheck, 'Planlı bakım', 'Düzenli ve kayıtlı takip'],
            [ScanLine, 'Bütüncül çözümler', 'Keşiften teslimata'],
            [MapPin, 'İstanbul’da hizmet', 'Yapınıza uygun planlama'],
          ].map(([Icon, title, text]) => {
            const I = Icon as typeof ShieldCheck
            return (
              <div key={String(title)}>
                <I size={27} strokeWidth={1.5} />
                <p>
                  <strong>{String(title)}</strong>
                  <span>{String(text)}</span>
                </p>
              </div>
            )
          })}
        </div>
      </section>
      <Stats />
      <section id="hizmetler" className="section container">
        <div className="section-title-row">
          <SectionHeading
            label="NELER YAPIYORUZ?"
            title="Her ihtiyaca, doğru çözüm."
            text="Tek bir sistem, birbirini tamamlayan altı uzmanlık alanı."
          />
          <Link className="text-button" href="/hizmetler">
            Tüm hizmetler <ArrowUpRight size={18} />
          </Link>
        </div>
        <ServiceCards />
      </section>
      <section className="why-section">
        <div className="container why-grid">
          <div className="why-image">
            <Image
              src="/images/elevator-interior.webp"
              alt="Modern bir asansör kabininin paslanmaz çelik iç mekânı; temsili görsel"
              fill
              sizes="(max-width:760px) 100vw, 42vw"
            />
            <div className="image-label">
              TEKNİK BAKIŞ. <span>İNSAN ODAKLI YAKLAŞIM.</span>
            </div>
          </div>
          <div className="why-copy">
            <SectionHeading
              label="NEDEN ASTAF?"
              title="Görünmeyen detaylar. Hissedilen güven."
              text="Bir asansörün arkasında birbiriyle uyum içinde çalışması gereken onlarca bileşen var. Biz işimize sistemin tamamına bakarak başlıyoruz."
            />
            <div className="principles">
              {[
                [
                  'Teknik değerlendirme',
                  'İhtiyacı yerinde inceler, çözümü yapınıza göre planlarız.',
                ],
                [
                  'Şeffaf hizmet süreci',
                  'Kapsamı, yapılacak işlemleri ve sonraki adımı açıkça paylaşırız.',
                ],
                [
                  'Düzenli takip',
                  'Bakım ve servis kayıtlarıyla sistemin durumunu izleriz.',
                ],
                [
                  'Doğru malzeme seçimi',
                  'Bileşen uyumunu ve bakım ihtiyaçlarını birlikte değerlendiririz.',
                ],
              ].map(([t, d]) => (
                <div key={t}>
                  <Check size={18} />
                  <div>
                    <h3>{t}</h3>
                    <p>{d}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link className="text-button" href="/kurumsal">
              ASTAF’ı yakından tanıyın <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          label="NASIL ÇALIŞIYORUZ?"
          title="İlk görüşmeden, son kontrole."
          text="Her adımı belli, her aşaması takip edilebilir bir süreç."
        />
        <div className="process-grid">
          {processSteps.map(([t, d], i) => (
            <div key={t}>
              <span className="step-number">0{i + 1}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>
      <Emergency />
      <section className="section container project-teaser">
        <div>
          <SectionHeading
            label="UYGULAMA ALANLARI"
            title="Her yapının ihtiyacı farklı."
            text="Konut, iş yeri ve ticari yapılarda bakım, montaj ve yenileme kapsamını mevcut sisteme ve kullanım koşullarına göre belirliyoruz."
          />
          <Button href="/projeler" secondary>
            Projeler ve uygulamalar
          </Button>
        </div>
        <div className="project-outline">
          <BuildingIllustration />
          <p>
            Yapınızın bir sonraki adımını
            <br />
            <strong>birlikte planlayalım.</strong>
          </p>
          <Link
            href="/servis-talebi?tur=Teklif"
            aria-label="Yapınız için teklif alın"
          >
            <ArrowUpRight size={27} />
          </Link>
        </div>
      </section>
      <section className="journal-home section">
        <div className="container">
          <div className="section-title-row">
            <SectionHeading
              label="ASTAF REHBER"
              title="Bilgiyle başlayan doğru kararlar."
            />
            <Link className="text-button" href="/blog">
              Tüm yazılar <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="journal-grid">
            {[
              [
                'BAKIM',
                'Asansör bakımında neler kontrol edilir?',
                'asansor-bakiminda-nelere-dikkat-edilir',
              ],
              [
                'MODERNİZASYON',
                'Asansör revizyonu nedir?',
                'asansor-revizyonu-nedir',
              ],
              [
                'TEKNİK BİLGİLER',
                'Asansör kapısı neden arızalanır?',
                'asansor-kapisi-neden-arizalanir',
              ],
            ].map(([c, t, s], i) => (
              <Link href={`/blog/${s}`} key={s} className="journal-card">
                <span className="journal-number">0{i + 1}</span>
                <span className="eyebrow">{c}</span>
                <h3>{t}</h3>
                <span className="card-link">
                  Yazıyı okuyun <ArrowUpRight size={18} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
function BuildingIllustration() {
  return (
    <div className="location-tag">
      <MapPin size={20} />
      İSTANBUL
    </div>
  )
}
