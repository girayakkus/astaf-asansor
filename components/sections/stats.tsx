import {company} from '@/lib/site-config';
const labels:Record<string,string>={completedProjects:'Tamamlanan proje',maintainedElevators:'Bakımı yapılan asansör',satisfaction:'Müşteri memnuniyeti'};
export function Stats(){const verified=Object.entries(company.stats).filter(([,n])=>n!==null);if(!verified.length)return null;return <section className="container verified-stats" aria-label="ASTAF verileri">{verified.map(([key,value])=><div key={key}><strong>{key==='satisfaction'?'%':''}{value?.toLocaleString('tr-TR')}</strong><p>{labels[key]}</p></div>)}</section>}
