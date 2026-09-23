import {PageHero} from '@/components/page-hero';
import {ServiceCards} from '@/components/ui';
import {Emergency} from '@/components/sections/emergency';
import {pageMeta} from '@/lib/seo';
export const metadata=pageMeta('Asansör Hizmetleri','İstanbul’da asansör bakım, montaj, revizyon, arıza servisi, ray ve kapı sistemleri. Her hizmetin kapsamını ve çalışma sürecini inceleyin.','/hizmetler');
export default function Services(){return <><PageHero eyebrow="ALTI UZMANLIK ALANI" title="Sisteminizin her parçası için." description="Yeni bir kurulumdan düzenli bakıma; yapınızın ihtiyacını yerinde değerlendiriyor, çözümü bir bütün olarak planlıyoruz." crumbs={[{label:'Hizmetler',href:'/hizmetler'}]}/><section className="section container"><ServiceCards/></section><Emergency/></>}
