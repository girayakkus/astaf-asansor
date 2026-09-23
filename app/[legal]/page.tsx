import {notFound} from 'next/navigation';
import {legalDocuments} from '@/data/legal';
import {PageHero} from '@/components/page-hero';
import {pageMeta} from '@/lib/seo';
export const dynamicParams=false;
export function generateStaticParams(){return Object.keys(legalDocuments).map(legal=>({legal}))}
export async function generateMetadata({params}:{params:Promise<{legal:string}>}){const {legal}=await params;const p=legalDocuments[legal];return p?{...pageMeta(p.title,p.description,`/${legal}`),...(!p.approved?{robots:{index:false,follow:true}}:{})}:{title:'Sayfa bulunamadı'}}
export default async function Legal({params}:{params:Promise<{legal:string}>}){const {legal}=await params;const p=legalDocuments[legal];if(!p)notFound();return <><PageHero eyebrow="BİLGİLENDİRME" title={p.title} crumbs={[{label:p.title,href:`/${legal}`}]}/><section className="section container prose">{p.approved?p.sections.map(s=><section key={s.title}><h2>{s.title}</h2><p>{s.text}</p></section>):<><h2>Bilgilendirme metni hazırlanıyor.</h2><p>Şirket ve veri işleme bilgileri tamamlandığında güncel metin bu sayfada paylaşılacaktır. Online talep gönderimi henüz açılmamıştır.</p>{legal==='cerez-politikasi'&&<p>İsteğe bağlı analiz araçları varsayılan olarak kapalıdır. Etkinleştirildiklerinde tercihiniz sorulmadan yüklenmezler.</p>}</>}</section></>}
