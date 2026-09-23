# ASTAF Asansör

Next.js 16.3.6, React 19.3, TypeScript, App Router ve Tailwind CSS ile hazırlanmış Türkçe kurumsal web sitesi. Vercel’e uygundur. Sunucu bileşenleri ve statik üretim kullanır; düz React SPA değildir.

## Çalıştırma

Node.js 22 veya desteklenen daha yeni bir LTS sürümü kullanın.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Windows PowerShell: `Copy-Item .env.example .env.local`.

```bash
npm run typecheck
npm test
npm run build
npm run verify:build
npm start
```

`build` doğrulanan webpack derlemesini kullanır. Kaynak dosyalar zip içinde bulunur; `node_modules` ve derleme çıktıları pakete alınmaz. Sürümler package.json ve package-lock.json ile sabitlenmiştir.

## Sayfalar

- Ana sayfa, kurumsal, hizmetler, projeler, blog, iletişim ve servis talebi.
- Altı kapsamlı hizmet sayfası; bakım, montaj, revizyon, arıza, ray ve kapı sistemleri.
- Yedi rehber yazısı; kategori filtreleri ve hizmet sayfalarına iç bağlantılar.
- Gerçek veriler eklendiğinde statik üretilecek proje ve İstanbul lokasyon sayfaları.
- Üç bilgilendirme sayfası, özel 404 ve hata ekranı.
- Sitemap, robots.txt, sayfaya özel metadata, OpenGraph, Twitter ve JSON-LD.

## Şirket bilgileri

`lib/site-config.ts` içindeki TODO alanlarını gerçek bilgilerle doldurun. Telefon, WhatsApp, adres, e-posta, çalışma saatleri ve sosyal hesaplar tek yerden yönetilir. Boş numaralar tıklanabilir sahte bağlantılar oluşturmaz. Doğrulanmış istatistikler girilirse ana sayfada gösterilir; şu anda rakamlar yayınlanmaz.

`data/projects.ts`: yalnızca gerçek ve yayın izni alınmış proje verileri. `published: true` olan kayıtların kartları ve detay sayfaları görünür; sitemap otomatik güncellenir. Görselleri `public/images/` altına ekleyin. Örnek projeler gerçek iş gibi gösterilmemiştir.

`data/locations.ts`: konuma özgü, gerçekten faydalı içerik girilmeden kayıt yayınlamayın. İlçe adı değiştirilmiş kopya sayfalar üretmeyin. Hizmet bölgesi İstanbul’dur; formlardaki ilçe seçimi, her ilçede sabit ekip veya süre garantisi anlamına gelmez.

`data/posts.ts`: yazı başlıkları, tarih, yazar, kategori, hizmet ilişkisi ve içerik bölümleri. Editoryal yazar etiketi bir mühendislik yeterlilik iddiası değildir. Teknik içerikler şirketin gerçek uygulamalarıyla gözden geçirilmeli; mevzuat değişiklikleri ayrıca takip edilmelidir.

## Formlar: gerçek teslim bağlantısı

Formlarda istemci/sunucu doğrulaması, boyut sınırı, aynı origin kontrolü, honeypot, minimum doldurma süresi ve Turnstile doğrulaması bulunur. Veriler loglanmaz veya localStorage'a yazılmaz. Turnstile hostname ve action değerleri sunucuda kontrol edilir.

Şu an **online gönderim kapalıdır**. Formda açıkça belirtilir; API 503 döndürür. Gönderilmemiş talep için başarı mesajı üretilmez.

Etkinleştirmek için:

1. `data/legal.ts` dosyasına veri sorumlusu, amaçlar, alıcılar, toplama yöntemi/hukuki sebep, saklama ve başvuru kanallarıyla gerçek, onaylı metinleri girin. Her belgenin `approved` alanını true yapın. Mevcut durum bilgilendirmeleri hukuki metin değildir.
2. `LEGAL_APPROVED=true` olarak ayarlayın.
3. Cloudflare Turnstile widget'ını gerçek alan adına bağlayın. `NEXT_PUBLIC_TURNSTILE_SITE_KEY` ve sunucuya özel `TURNSTILE_SECRET_KEY` girin.
4. `FORM_DELIVERY_URL` ve sunucuya özel `FORM_DELIVERY_TOKEN` girin. Alıcı, sizin kontrolünüzdeki HTTPS webhook/CRM/e-posta işleyicisi olmalıdır.
5. Yeniden derleyin ve gerçek alıcıyla uçtan uca test edin.

Webhook isteği: JSON POST; `Authorization: Bearer ...` ve `Idempotency-Key` başlıkları. Gövde: `reference`, `form`, `name`, `phone`, `email`, `requestType`, `building`, `address`, `district`, `elevators`, `message`, `privacyAcknowledged`, `receivedAt`. Güvenlik tokenları aktarılmaz. Alıcı yalnızca talebi dayanıklı biçimde kaydettikten veya teslim aldıktan sonra 2xx dönmelidir. Hatalar/timeout kullanıcıya başarısız veya doğrulanamadı olarak gösterilir. Teslim servisinin kayıt/saklama, erişim ve idempotency politikası alıcıda uygulanır. Vercel Firewall üzerinden istek hız sınırı eklenebilir.

Testler dışarıya gerçek mesaj göndermez; başarılı ve başarısız servis yanıtları taklit edilir. Canlı webhook/Turnstile entegrasyonu kimlik bilgileri olmadığı için denenmemiştir.

## SEO ve yayın ayarları

`NEXT_PUBLIC_SITE_URL` gerçek HTTPS origin olmalıdır (ör. sizin alan adınız; yolu olmayan kök URL). Boşken sahte canonical/domain üretmemek için canonical bağlantıları ve URL içeren breadcrumb JSON-LD eklenmez; sitemap boş döner.

Gerçek alan adı ayarlandığında canonical, sitemap, OG URL ve BreadcrumbList otomatik oluşur. `SITE_INDEXING=true` üretimde indekslemeyi açar. Önizlemelerde false bırakın. robots.txt ve noindex meta birlikte yönetilir. Onaysız hukuki sayfalar sitemap dışında ve noindex kalır.

Organization schema yalnızca verilen gerçek bilgileri içerir. Telefon ve adres tamamlanınca LocalBusiness türüne geçer. Service, Article ve sayfada görünen SSS ile eşleşen FAQPage JSON-LD vardır. FAQ işaretlemesi bu ticari siteye Google'da FAQ zengin sonuç garantisi vermez; Google bu görünümü esas olarak uygun sağlık ve resmî sitelerle sınırlar. Kaynak: [Google Search Central](https://developers.google.com/search/blog/2023/08/howto-faq-changes).

Search Console doğrulaması `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` ile eklenir. Doğrulama sonrası sitemap.xml gönderin. Google indeksleme veya sıralama garantisi yoktur.

İsteğe bağlı `NEXT_PUBLIC_GA_ID` veya `NEXT_PUBLIC_GTM_ID`, merkezi `components/analytics.tsx` tarafından yönetilir. Kabul edilmeden script yüklenmez; ret ve tercih değiştirme desteklenir. GTM varsa GA ayrıca yüklenmez. GTM içine eklenecek etiketlerin ve çerezlerin kapsamı ayrıca denetlenmelidir. Sosyal paylaşım başlık ve açıklamaları hazırdır; istenmediğinden yapay sosyal paylaşım görseli üretilmemiştir.

## Vercel

1. Proje klasörünü Git deposuna alın ve Vercel'de içe aktarın; Framework: Next.js.
2. Build command: `npm run build`; Install command: `npm ci`.
3. Üretim ortam değişkenlerini Vercel'de girin; gizli anahtarlar NEXT_PUBLIC öneki taşımaz.
4. Alan adını bağlayın; kök URL, yönlendirme ve şirket bilgilerini doğrulayın.
5. Önizleme indekslemeyi kapalı tutun. Gerçek şirket bilgileri, hukuki metinler ve form teslim testi tamamlanınca production için `SITE_INDEXING=true` ile yeniden deploy edin.

Site Vercel hesabınıza yayınlanmadı; bu paket kaynak ve çalışan yerel önizlemedir. Normal Vercel derlemesinde `CODEX_LOCAL` ayarını kullanmayın. Bu isteğe bağlı bayrak yalnızca araç ortamının alt süreç kısıtlarında worker thread ile doğrulama içindir.

## Dosya düzeni

```text
app/                  Sayfalar, API, metadata, sitemap ve robots
components/           Etkileşimler ve ortak UI
components/layout/    Header ve footer
components/sections/  Ortak sayfa bölümleri
data/                 Hizmet, blog, proje, lokasyon ve hukuk içerikleri
lib/                  Şirket bilgileri, SEO ve doğrulama
public/               Logo, favicon ve optimize görseller
tests/                Form/API ve SEO davranış testleri
scripts/              Derleme çıktısı bağlantı ve metadata kontrolü
```

## Görseller ve kaynaklar

Kullanıcı tarafından verilen ASTAF logosunun aslı korunmuştur. Header için WebP kopya; fotoğraflar için optimize WebP ve `next/image` kullanılır. Kahraman görseli önceliklidir, diğer görseller tembel yüklenir. Fontlar paket içinden sunulur, Google Fonts'a tarayıcı isteği atılmaz. Sabit görsel alanları CLS riskini azaltır. Hareket azaltma tercihi desteklenir.

- Lobi: [Salman Haris / Pexels](https://www.pexels.com/photo/elevators-in-a-hotel-16383996/).
- Kabin: [Max Vakhtbovych / Pexels](https://www.pexels.com/photo/a-stainless-steel-narrow-elevator-7722159/).
- [Pexels kullanım lisansı](https://www.pexels.com/license/). Görseller temsili olarak etiketlenmiştir; ASTAF referansı değildir.
- Güvenli yolcu davranışı: [Otis](https://www.otis.com/en/us/tools-resources/elevator-safety).
- Modernizasyon bileşenleri: [KONE](https://distributors.kone.com/en/existing-buildings/elevator-modernization/).
- Form güvenlik doğrulaması: [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).
- Aydınlatma metni için resmî başvuru: [KVKK](https://www.kvkk.gov.tr/Icerik/2033/Aydinlatma-Yukumlulugu-).

Gerçek mobil PageSpeed/CWV skoru ancak canlı sunucu ve saha verisiyle ölçülür; burada ölçülmemiş bir puan iddia edilmez. Canlı URL sonrası PageSpeed ve Search Console Core Web Vitals takibi önerilir.
