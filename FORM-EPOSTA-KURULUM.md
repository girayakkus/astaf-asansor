# Form e-postası kurulumu

Servis ve iletişim formlarının alıcısı sunucuda sabit: info@astafasansor.com.
Resend ayarları mevcutsa e-posta kullanılır; eski webhook ayarları zorunlu değildir.

1. Resend Domains bölümünde bildirim.astafasansor.com gönderici alan adını doğrulayın. Resend panelinin verdiği gönderim DNS kayıtlarını Turhost'a ekleyin. Kök alan adının ImprovMX MX kayıtlarını değiştirmeyin; Resend Receiving özelliğini açmanız gerekmez.
2. Resend'de gönderim yetkili API anahtarı oluşturun.
3. Vercel Production ortamına ekleyin:
   RESEND_API_KEY = anahtarınız (Secret)
   FORM_EMAIL_FROM = ASTAF Web <form@bildirim.astafasansor.com> (Config; bu alan adını doğruladıysanız)
4. Mevcut formun spam doğrulaması için Cloudflare Turnstile widget oluşturun; www.astafasansor.com hostname iznini ekleyin:
   NEXT_PUBLIC_TURNSTILE_SITE_KEY = widget site key (Config)
   TURNSTILE_SECRET_KEY = widget secret (Secret)
5. Mevcut data/legal.ts dosyasındaki gerçek aydınlatma/gizlilik/çerez metinlerini tamamlayın. Mevcut kod her belgede approved:true ve dolu sections alanı, ayrıca LEGAL_APPROVED=true istiyor. Yalnızca ortam değişkenini açmak yetmez. Bu paket hukuki metinleri değiştirmez veya tamamlanmış saymaz.
6. NEXT_PUBLIC_SITE_URL=https://www.astafasansor.com olmalı. Dosyaları Git projenize aktarın, npm run build yapın, commit/push ve Production deployment ile yayınlayın.
7. Gerçek form gönderimini test edin: Resend Logs içinde teslim durumunu, info yönlendirmesi üzerinden Gmail gelen kutusu ve spam klasörünü kontrol edin. Bu paketin otomatik testlerinde dış servisler taklit edilmiştir; gerçek e-posta gönderilmemiştir.

Paket dosyaları: lib/form-email.ts, lib/forms.ts, app/api/talepler/route.ts, tests/forms.test.ts. İletişim bilgilerinizi içeren lib/site-config.ts değiştirilmez. Mevcut Turnstile ve hukuki metin kontrolleri korunmuştur. API anahtarını Git'e veya sohbet mesajına koymayın.
