import {PageHero} from '@/components/page-hero';
import {ProjectFilter} from '@/components/project-filter';
import {publishedProjects} from '@/data/projects';
import {pageMeta} from '@/lib/seo';
export const metadata=pageMeta('Projeler ve Uygulamalar','ASTAF Asansör montaj, revizyon, bakım, ray ve kapı uygulamaları. Proje paylaşımlarını hizmet türüne göre inceleyin.','/projeler');
export default function Projects(){return <><PageHero eyebrow="PROJELER VE UYGULAMALAR" title="Yapınıza değer katan çalışmalar." description="Her binayı kendi koşullarıyla ele alıyor, uygulamayı ihtiyaca göre planlıyoruz." crumbs={[{label:'Projeler',href:'/projeler'}]}/><section className="section container"><ProjectFilter projects={publishedProjects}/></section></>}
