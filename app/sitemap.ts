import type {MetadataRoute} from 'next';
import {services} from '@/data/services';
import {posts} from '@/data/posts';
import {publishedProjects} from '@/data/projects';
import {locations} from '@/data/locations';
import {legalDocuments} from '@/data/legal';
import {company} from '@/lib/site-config';
export default function sitemap():MetadataRoute.Sitemap{if(!company.url)return [];const url=(s:string)=>new URL(s,company.url).toString();return [
 ...['/','/hizmetler','/kurumsal','/projeler','/blog','/iletisim','/servis-talebi'].map(p=>({url:url(p)})),
 ...services.map(s=>({url:url(`/hizmetler/${s.slug}`)})),
 ...posts.map(p=>({url:url(`/blog/${p.slug}`),lastModified:p.modified})),
 ...publishedProjects.map(p=>({url:url(`/projeler/${p.slug}`)})),
 ...locations.filter(l=>l.published).map(l=>({url:url(`/istanbul/${l.slug}`)})),
 ...Object.entries(legalDocuments).filter(([,v])=>v.approved).map(([k])=>({url:url(`/${k}`)})),
 ];}
