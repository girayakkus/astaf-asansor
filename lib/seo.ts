import type {Metadata} from 'next';
import {company} from './site-config';
export const absolute = (path:string) => company.url ? new URL(path,company.url).toString() : undefined;
export function pageMeta(title:string,description:string,path:string):Metadata {return {
 title:path==='/'?{absolute:`${title} | ASTAF Asansör`}:title,description,alternates:company.url?{canonical:absolute(path)}:undefined,
 openGraph:{title:`${title} | ASTAF Asansör`,description,url:absolute(path),siteName:company.name,locale:'tr_TR',type:'website'},
 twitter:{card:'summary',title:`${title} | ASTAF Asansör`,description},
};}
export function organizationSchema(){return {'@context':'https://schema.org','@type':company.address&&company.phone?'LocalBusiness':'Organization',name:company.name,url:company.url||undefined,logo:absolute('/logo/astaf-original.jpg'),telephone:company.phone||undefined,email:company.email||undefined,address:company.address?{'@type':'PostalAddress',streetAddress:company.address,addressLocality:'İstanbul',addressCountry:'TR'}:undefined,areaServed:{'@type':'City',name:'İstanbul'},openingHoursSpecification:company.openingHoursSpecification.length?company.openingHoursSpecification:undefined,sameAs:company.socialLinks.length?company.socialLinks.map(x=>x.url):undefined};}
