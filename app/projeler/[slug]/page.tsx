import {notFound} from 'next/navigation';
import Image from 'next/image';
import {publishedProjects} from '@/data/projects';
import {PageHero} from '@/components/page-hero';
import {Button} from '@/components/ui';
import {pageMeta} from '@/lib/seo';
export const dynamicParams=false;
export function generateStaticParams(){return publishedProjects.map(p=>({slug:p.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=publishedProjects.find(p=>p.slug===slug);return p?pageMeta(p.title,p.description,`/projeler/${slug}`):{title:'Proje bulunamadı'}}
export default async function Project({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=publishedProjects.find(p=>p.slug===slug);if(!p)notFound();return <><PageHero eyebrow={`${p.type} · ${p.location}`} title={p.title} description={p.description} crumbs={[{label:'Projeler',href:'/projeler'},{label:p.title,href:`/projeler/${slug}`}]}/><section className="section container content-grid"><article className="prose"><Image src={p.image} alt={p.imageAlt} width={1200} height={800} sizes="(max-width:950px) 100vw, 65vw"/>{p.sections.map(s=><section key={s.title}><h2>{s.title}</h2><p>{s.text}</p></section>)}</article><aside className="sidebar-box"><h2>Uygulama bilgileri</h2><p>{p.location}<br/>{p.operation}<br/>{p.buildingType}</p><Button href="/servis-talebi?tur=Teklif">Benzer bir proje için</Button></aside></section></>}
