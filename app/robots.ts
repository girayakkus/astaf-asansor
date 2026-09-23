import type {MetadataRoute} from 'next';
import {company} from '@/lib/site-config';
export default function robots():MetadataRoute.Robots{return {rules:company.indexing?{userAgent:'*',allow:'/',disallow:'/api/'}:{userAgent:'*',disallow:'/'},sitemap:company.url?new URL('/sitemap.xml',company.url).toString():undefined};}
