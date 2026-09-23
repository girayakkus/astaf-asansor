'use client';
import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import {useState,useEffect,useRef} from 'react';
import {Menu,X,ArrowUpRight} from 'lucide-react';
import {navigation} from '@/lib/site-config';
export function Header(){const path=usePathname();const [open,setOpen]=useState(false);const toggle=useRef<HTMLButtonElement>(null);useEffect(()=>setOpen(false),[path]);return <header className="site-header"><div className="container header-inner"><Link href="/" className="brand" aria-label="ASTAF Asansör ana sayfa"><Image src="/logo/astaf-header.webp" width={153} height={86} alt="ASTAF Asansör" priority/></Link><nav className="desktop-nav" aria-label="Ana menü">{navigation.map(n=><Link key={n.href} href={n.href} aria-current={(n.href==='/'?path==='/':path.startsWith(n.href))?'page':undefined}>{n.label}</Link>)}</nav><Link href="/servis-talebi" className="header-cta">Servis Talebi <ArrowUpRight size={17}/></Link><button className="menu-toggle" ref={toggle} aria-label={open?'Menüyü kapat':'Menüyü aç'} aria-expanded={open} aria-controls="mobile-nav" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div><nav hidden={!open} id="mobile-nav" className="mobile-nav" aria-label="Mobil menü" onKeyDown={e=>{if(e.key==='Escape'){setOpen(false);toggle.current?.focus()}}}>{navigation.map(n=><Link key={n.href} href={n.href} onClick={()=>setOpen(false)}>{n.label}<ArrowUpRight size={16}/></Link>)}</nav></header>}
