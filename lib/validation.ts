import {z} from 'zod';
export const requestTypes=['Arıza','Bakım','Montaj','Revizyon','Ray','Kapı','Teklif','Diğer'] as const;
export const districts=['Adalar','Arnavutköy','Ataşehir','Avcılar','Bağcılar','Bahçelievler','Bakırköy','Başakşehir','Bayrampaşa','Beşiktaş','Beykoz','Beylikdüzü','Beyoğlu','Büyükçekmece','Çatalca','Çekmeköy','Esenler','Esenyurt','Eyüpsultan','Fatih','Gaziosmanpaşa','Güngören','Kadıköy','Kağıthane','Kartal','Küçükçekmece','Maltepe','Pendik','Sancaktepe','Sarıyer','Silivri','Sultanbeyli','Sultangazi','Şile','Şişli','Tuzla','Ümraniye','Üsküdar','Zeytinburnu'] as const;
const optionalText=(max:number)=>z.string().trim().max(max).optional().default('');
export const inquirySchema=z.object({
  form:z.enum(['contact','service']),
  name:z.string().trim().min(2,'Adınızı ve soyadınızı yazın.').max(100,'En fazla 100 karakter kullanın.'),
  phone:z.string().trim().regex(/^[+\d\s().-]+$/,'Geçerli bir telefon numarası yazın.').refine(v=>{const n=v.replace(/\D/g,'');return n.length>=10&&n.length<=15},'Telefon numarası 10–15 rakam içermelidir.'),
  email:z.union([z.literal(''),z.email('Geçerli bir e-posta adresi yazın.')]).optional().default(''),
  requestType:z.enum(requestTypes,{error:'Bir talep türü seçin.'}),
  building:optionalText(150),address:optionalText(500),district:optionalText(60),
  elevators:z.union([z.literal(''),z.string().regex(/^\d{1,3}$/).refine(v=>Number(v)>=1&&Number(v)<=100,'1–100 arasında bir sayı girin.')]).optional().default(''),
  message:z.string().trim().min(10,'Lütfen en az 10 karakterle talebinizi açıklayın.').max(3000,'En fazla 3000 karakter kullanın.'),
  consent:z.literal(true,{error:'Aydınlatma metnini okuduğunuzu belirtin.'}),
  website:optionalText(200),startedAt:z.number().finite(),turnstileToken:optionalText(2048),
}).superRefine((d,ctx)=>{if(d.form==='service'){
  if(d.address.length<10)ctx.addIssue({code:'custom',path:['address'],message:'En az 10 karakterle bina adresini yazın.'});
  if(!(districts as readonly string[]).includes(d.district))ctx.addIssue({code:'custom',path:['district'],message:'İlçeyi seçin.'});
  if(!d.elevators)ctx.addIssue({code:'custom',path:['elevators'],message:'Asansör sayısını belirtin.'});
}});
export type Inquiry=z.infer<typeof inquirySchema>;
