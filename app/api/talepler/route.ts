import {sendFormEmail} from '@/lib/form-email';
import {inquirySchema} from '@/lib/validation';
import {formsReady} from '@/lib/forms';
export const runtime='nodejs';
const respond=(status:number,message:string,extra:Record<string,unknown>={})=>Response.json({message,...extra},{status,headers:{'Cache-Control':'no-store'}});
export async function POST(request:Request){
 const origin=request.headers.get('origin');
 const allowed=process.env.NEXT_PUBLIC_SITE_URL?new URL(process.env.NEXT_PUBLIC_SITE_URL).origin:new URL(request.url).origin;
 if(!origin||origin!==allowed)return respond(403,'Bu kaynaktan talep kabul edilmiyor.');
 if(!request.headers.get('content-type')?.startsWith('application/json'))return respond(415,'JSON biçiminde bir istek gerekiyor.');
 if(Number(request.headers.get('content-length')||0)>16000)return respond(413,'Talep çok uzun.');
 let raw:unknown;
 try{const reader=request.body?.getReader();if(!reader)return respond(400,'Talep boş.');let bytes=0;const chunks:Uint8Array[]=[];while(true){const {value,done}=await reader.read();if(done)break;bytes+=value.byteLength;if(bytes>16000){await reader.cancel();return respond(413,'Talep çok uzun.')}chunks.push(value)}raw=JSON.parse(Buffer.concat(chunks).toString('utf8'))}catch{return respond(400,'Talep okunamadı.');}
 const parsed=inquirySchema.safeParse(raw);if(!parsed.success)return respond(422,'Lütfen işaretli alanları kontrol edin.',{errors:Object.fromEntries(parsed.error.issues.map(i=>[String(i.path[0]),i.message]))});
 const data=parsed.data;
 if(data.website||Date.now()-data.startedAt<2000||Date.now()-data.startedAt>86400000)return respond(400,'Form doğrulanamadı. Sayfayı yenileyip tekrar deneyin.');
 if(!formsReady())return respond(503,'Online talep gönderimi henüz açılmadı. Bilgileriniz kaydedilmedi.');
 try{
  const result=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({secret:process.env.TURNSTILE_SECRET_KEY!,response:data.turnstileToken}),signal:AbortSignal.timeout(10000)});
  const verification=await result.json();
  if(!result.ok||!verification.success||verification.action!=='inquiry'||verification.hostname!==new URL(allowed).hostname)return respond(400,'Güvenlik doğrulaması başarısız. Lütfen tekrar deneyin.');
  const reference=crypto.randomUUID();
  if(process.env.RESEND_API_KEY){
   if(!await sendFormEmail(data,reference))return respond(502,'Talebiniz gönderilemedi. Lütfen daha sonra tekrar deneyin.');
   return respond(200,'Talebiniz e-posta gönderim servisine iletildi.',{reference});
  }
  const destination=new URL(process.env.FORM_DELIVERY_URL!);if(destination.protocol!=='https:')return respond(503,'Gönderim servisi hazır değil.');
  const {website,startedAt,turnstileToken,consent,...fields}=data;
  void website;void startedAt;void turnstileToken;
  const delivery=await fetch(destination,{method:'POST',redirect:'error',headers:{'Content-Type':'application/json',Authorization:`Bearer ${process.env.FORM_DELIVERY_TOKEN}`,'Idempotency-Key':reference},body:JSON.stringify({reference,...fields,privacyAcknowledged:consent,receivedAt:new Date().toISOString()}),signal:AbortSignal.timeout(15000)});
  if(!delivery.ok)return respond(502,'Talebiniz gönderilemedi. Lütfen daha sonra tekrar deneyin.');
  return respond(200,'Talep alındı.',{reference});
 }catch{return respond(502,'Gönderim doğrulanamadı. Lütfen bağlantınızı kontrol edip yeniden deneyin.');}
}
