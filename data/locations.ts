// Doorway sayfalar üretmeyin. Yerel ekip, gerçek proje ve konuma özgü bilgiler olmadan yayınlamayın.
export type LocationPage={slug:string;title:string;description:string;district:string;published:boolean;sections:{title:string;text:string}[];serviceSlugs:string[]};
export const locations:LocationPage[]=[];
