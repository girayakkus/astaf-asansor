import {notFound} from 'next/navigation';
import Link from 'next/link';
import {locations} from '@/data/locations';
import {services} from '@/data/services';
import {PageHero} from '@/components/page-hero';
import {pageMeta} from '@/lib/seo';
export const dynamicParams=false;
export function generateStaticParams(){return locations.filter(l=>l.published).map(l=>({slug:l.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const l=locations.find(l=>l.slug===slug&&l.published);return l?pageMeta(l.title,l.description,`/istanbul/${slug}`):{title:'Sayfa bulunamadı'}}
export default async function Location({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const l=locations.find(l=>l.slug===slug&&l.published);if(!l)notFound();return <><PageHero eyebrow={`${l.district} · İstanbul`} title={l.title} description={l.description} crumbs={[{label:l.district,href:`/istanbul/${slug}`}]}/><section className="section container prose">{l.sections.map(s=><section key={s.title}><h2>{s.title}</h2><p>{s.text}</p></section>)}<h2>İlgili hizmetler</h2>{services.filter(s=>l.serviceSlugs.includes(s.slug)).map(s=><p key={s.slug}><Link href={`/hizmetler/${s.slug}`}>{s.title}</Link></p>)}</section></>}
