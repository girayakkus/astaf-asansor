// TODO: Veri sorumlusu ve gerçek işleme süreçleriyle hazırlanmış onaylı metinleri ekleyin.
// Placeholder metinler hukuki aydınlatma metni olarak sunulmaz. Tamamlanana kadar formlar kapalıdır.
export const legalDocuments:Record<string,{title:string;description:string;approved:boolean;sections:{title:string;text:string}[]}>= {
 'kvkk':{title:'Kişisel Veriler ve Aydınlatma',description:'ASTAF Asansör kişisel verilerin işlenmesine ilişkin bilgilendirme sayfası.',approved:false,sections:[]},
 'gizlilik-politikasi':{title:'Gizlilik Politikası',description:'Web sitesi kullanımı ve gizlilik uygulamaları hakkında bilgilendirme.',approved:false,sections:[]},
 'cerez-politikasi':{title:'Çerez Politikası',description:'Çerezler ve isteğe bağlı analiz tercihleri hakkında bilgilendirme.',approved:false,sections:[]},
};
