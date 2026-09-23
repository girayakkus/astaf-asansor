'use client';
import {useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {categories,type Post} from '@/data/posts';
export function BlogFilter({posts}:{posts:Post[]}){const [category,setCategory]=useState('Tümü');const filtered=posts.filter(p=>category==='Tümü'||category===p.category);return <><div className="filters mb-10" aria-label="Yazı kategorisi">{['Tümü',...categories].map(c=><button key={c} className="filter" aria-pressed={category===c} onClick={()=>setCategory(c)}>{c}</button>)}</div><div aria-live="polite">{filtered.length?<div className="article-grid">{filtered.map(p=><Link className="article-card" key={p.slug} href={`/blog/${p.slug}`}><span className="eyebrow">{p.category}</span><h2>{p.title}</h2><p>{p.description}</p><span className="card-link">Yazıyı okuyun <ArrowUpRight size={18}/></span></Link>)}</div>:<div className="empty-state"><h2>Bu kategoride henüz yazı yok.</h2><p>Diğer kategorilerdeki rehberlerimizi inceleyebilirsiniz.</p></div>}</div></>}
