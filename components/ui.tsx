import Link from 'next/link';
import {ArrowUpRight,ArrowRight, Wrench, Building2, RefreshCw, Settings2, Columns3, PanelsTopLeft} from 'lucide-react';
import {services} from '@/data/services';
export const serviceIcons=[Wrench,Building2,RefreshCw,Settings2,Columns3,PanelsTopLeft];
export function Button({href,children,secondary=false}:{href:string;children:React.ReactNode;secondary?:boolean}){return <Link className={`button ${secondary?'button-secondary':''}`} href={href}>{children}<ArrowUpRight size={18}/></Link>}
export function Eyebrow({children}:{children:React.ReactNode}){return <p className="eyebrow"><span/>{children}</p>}
export function SectionHeading({label,title,text}:{label:string;title:string;text?:string}){return <div className="section-heading"><Eyebrow>{label}</Eyebrow><h2>{title}</h2>{text&&<p>{text}</p>}</div>}
export function ServiceCards(){return <div className="service-grid">{services.map((s,i)=>{const Icon=serviceIcons[i];return <Link key={s.slug} href={`/hizmetler/${s.slug}`} className="service-card"><div className="card-top"><Icon size={29} strokeWidth={1.4}/><span>0{i+1}</span></div><h3>{s.title}</h3><p>{s.short}</p><span className="card-link">Detayları incele <ArrowRight size={17}/></span></Link>})}</div>}
export function JsonLd({data}:{data:unknown}){return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,'\\u003c')}}/>}
