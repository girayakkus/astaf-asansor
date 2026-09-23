'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <section className="section container"><h1 className="text-4xl mb-6">Sayfa yüklenemedi.</h1><p className="mb-8">Geçici bir sorun oluştu. Lütfen yeniden deneyin.</p><button className="button" onClick={reset}>Yeniden dene</button></section>}
