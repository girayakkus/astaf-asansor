import type {Inquiry} from './validation';

export const formRecipient = 'info@astafasansor.com';
export async function sendFormEmail(data:Inquiry, reference:string) {
 const text = [
  'ASTAF Asansör — Yeni ' + (data.form==='service'?'servis talebi':'iletişim mesajı'),
  `Referans: ${reference}`, `Tarih: ${new Date().toISOString()}`,
  `Ad Soyad: ${data.name}`, `Telefon: ${data.phone}`, `E-posta: ${data.email||'-'}`,
  `Hizmet: ${data.requestType}`, `İlçe: ${data.district||'-'}`,
  `Firma / Apartman: ${data.building||'-'}`, `Adres: ${data.address||'-'}`,
  `Asansör sayısı: ${data.elevators||'-'}`, '', 'Mesaj:', data.message,
  '', 'Aydınlatma metni okundu: ' + (data.consent?'Evet':'Hayır'),
 ].join('\n');
 const response=await fetch('https://api.resend.com/emails', {
  method:'POST', redirect:'error', signal:AbortSignal.timeout(15000),
  headers:{'Content-Type':'application/json',Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Idempotency-Key':reference},
  body:JSON.stringify({from:process.env.FORM_EMAIL_FROM,to:[formRecipient],
   subject:`ASTAF | ${data.requestType} | ${data.district||'İletişim'} | ${reference.slice(0,8)}`,
   text,...(data.email?{reply_to:data.email}:{})}),
 });
 if(!response.ok)return false;
 const result=await response.json();
 return typeof result.id==='string'&&result.id.length>0;
}
