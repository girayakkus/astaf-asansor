import Link from 'next/link';
import {ChevronRight} from 'lucide-react';
import {Eyebrow,JsonLd} from './ui';
import {absolute} from '@/lib/seo';
export type Crumb={label:string;href:string};
export function Breadcrumbs({items}:{items:Crumb[]}){const all=[{label:'Ana Sayfa',href:'/'},...items];return <><nav className="breadcrumbs" aria-label="Sayfa yolu">{all.map((item,i)=><span key={item.href} className="inline-flex items-center gap-2">{i>0&&<ChevronRight size={12}/>}<Link href={item.href} aria-current={i===all.length-1?'page':undefined}>{item.label}</Link></span>)}</nav>{absolute('/')&&<JsonLd data={{'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:all.map((c,i)=>({'@type':'ListItem',position:i+1,name:c.label,item:absolute(c.href)}))}}/>}</>}
export function PageHero({eyebrow,title,description,crumbs,children}:{eyebrow:string;title:string;description?:string;crumbs:Crumb[];children?:React.ReactNode}){return <section className="page-hero"><div className="container"><Breadcrumbs items={crumbs}/><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1>{description&&<p className="lead">{description}</p>}{children}</div></section>}
