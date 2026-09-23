import Link from 'next/link';
import {districts} from '@/lib/validation';
import styles from './district-services.module.css';

export function DistrictServices({service}:{service:'Arıza'|'Bakım'}) {
 const label=service==='Bakım'?'asansör bakımı':'asansör arıza ve onarım';
 return <section aria-labelledby="district-services-heading">
  <h2 id="district-services-heading">İstanbul ilçelerinde {label}</h2>
  <p>{service==='Bakım'
   ?'Apartman, site ve iş yeriniz için bakım talebinde bulunabilirsiniz. İlçenizi seçerek servis formuna geçin; bakım kapsamını ve ziyaret planını bina bilgilerinize göre birlikte belirleyelim.'
   :'7/24 arıza ve onarım hizmeti için ilçenizi seçerek talep formuna geçebilirsiniz. Ekibin ulaşım süresi, konum ve arızanın niteliğine göre görüşme sırasında netleştirilir.'}</p>
  <p>İlçe seçimi formdaki konum alanını doldurur. Talebin iletilmesi için formu tamamlamanız gerekir; acil arıza bildirimi için telefonla iletişime geçin.</p>
  <ul className={styles.grid}>{districts.map(d=><li key={d}><Link href={{pathname:'/servis-talebi',query:{tur:service,ilce:d}}}>{d}<span>{service==='Bakım'?'Asansör bakımı':'Asansör arıza ve onarım'}</span></Link></li>)}</ul>
 </section>;
}
