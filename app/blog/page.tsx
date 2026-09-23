import {PageHero} from '@/components/page-hero';
import {BlogFilter} from '@/components/blog-filter';
import {posts} from '@/data/posts';
import {pageMeta} from '@/lib/seo';
export const metadata=pageMeta('Asansör Rehberi ve Blog','Bina yöneticileri ve kullanıcılar için asansör bakımı, arıza, güvenlik ve modernizasyon rehberleri.','/blog');
export default function Blog(){return <><PageHero eyebrow="ASTAF REHBER" title="Sistemi tanıyın. Doğru karar verin." description="Asansörünüzün bakımını, çalışma prensiplerini ve yenileme ihtiyaçlarını anlamanıza yardımcı olacak notlar." crumbs={[{label:'Blog',href:'/blog'}]}/><section className="section container"><BlogFilter posts={posts}/></section></>}
