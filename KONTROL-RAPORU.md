# ASTAF Asansör — Teslim kontrolü

Tarih: 22 Eylül 2026

## Tamamlanan doğrulamalar

- Next.js 16.3.6 üretim derlemesi başarılı (`next build --webpack`).
- TypeScript strict kontrolü başarılı.
- 10 form/API davranış testi ve 2 SEO ayar testi başarılı.
- 23 sayfada tek H1, Türkçe lang, benzersiz title/description, OG ve Twitter metadata doğrulandı.
- 873 dahili bağlantı ve 49 görsel etiketi kontrol edildi; kırık kaynak/bağlantı bulunmadı.
- 42 JSON-LD bloğu geçerli JSON olarak doğrulandı. Google Rich Results Test canlı URL üzerinde çalıştırılmadı.
- Üretim sunucusunda 23 sayfa, robots.txt ve sitemap.xml HTTP 200 verdi.
- Olmayan normal/proje/lokasyon adresleri HTTP 404 verdi.
- Next Image optimizasyon endpoint'i HTTP 200 verdi; ana görsel tarayıcıda yüklendi.
- 320 ve 390 piksel mobil, 768 piksel tablet ve masaüstü görünümünde denetlenen sayfalarda yatay taşma yok.
- Mobil menü açma/kapama, form hataları ve ilk hatalı alana odaklanma, teklif türünün URL'den seçilmesi, SSS açılması ve proje filtresi kontrol edildi.
- Mobil servis formu, açıklama sütunundan önce görsel olarak konumlandırıldı.

## Bilerek boş / kapalı bırakılanlar

- Telefon, WhatsApp, e-posta, adres, çalışma saatleri, sosyal bağlantılar ve başarı rakamları: gerçek bilgi verilmedi.
- Proje kayıtları ve ilçe sayfaları: gerçek veri/izin verilmedi; örnek kayıt yayınlanmadı.
- Hukuki metinler: şirketin gerçek veri işleme süreçleri ve kimliği olmadan oluşturulmuş nihai metin iddiası yok. Bekleme metinleri noindex.
- Online form teslimi: alıcı, Turnstile ve onaylı hukuki metinler olmadan kapalı. Başarı akışı taklit edilmiş servis yanıtlarıyla test edildi; gerçek e-posta/CRM teslimi denenmedi.
- Canonical ve sitemap alan adı: gerçek origin girildiğinde oluşur. Alan adı boşken sitemap boş; indeksleme kapalı. Test origin'i yalnızca otomatik testte kullanıldı, yayın içeriğine eklenmedi.
- GA4/GTM: kimlikler girilmedi; takip script'i yüklenmiyor.
- Vercel yayını: yapılmadı. Çalışan yerel önizleme ve Vercel'e uygun kaynak kod teslim edildi.

## Ölçülmeyenler

Canlı mobil PageSpeed skoru, gerçek kullanıcı Core Web Vitals, kapsamlı WCAG uygunluk denetimi ve Search Console indeksleme sonucu ölçülmedi. Hız veya erişilebilirlik puanı uydurulmadı. Canlı origin ve alıcı yapılandırıldığında README'deki yayın adımları tamamlanmalıdır.

## Ortam notu

Araç ortamı alt süreç başlatmayı kısıtladığı için üretim derlemesi `CODEX_LOCAL=1` ile worker thread kullanılarak yapıldı. Test dosyaları aynı test içeriği korunarak TypeScript API üzerinden çalıştırıldı. Normal geliştirme/Vercel ortamında standart npm komutları kullanılabilir. Bu yerel bayrak Vercel'de gerekli değildir.
