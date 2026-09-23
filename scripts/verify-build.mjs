import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve('.next/server/app');
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)])}
const files=walk(root).filter(f=>f.endsWith('.html')&&!path.basename(f).startsWith('_'));
const routes=new Set(files.map(f=>{const name=path.relative(root,f).replaceAll('\\','/').replace(/\.html$/,'');return name==='index'?'/':'/'+name}));
const titles=new Set();const descriptions=new Set();let links=0,schemas=0,images=0;
for(const f of files){const html=fs.readFileSync(f,'utf8');const rel=path.relative(root,f);
 assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,`${rel}: one H1`);
 const title=html.match(/<title>([\s\S]*?)<\/title>/)?.[1];assert.ok(title?.includes('ASTAF'),`${rel}: branded title`);assert.ok(!titles.has(title),`${rel}: unique title`);titles.add(title);
 const description=html.match(/<meta name="description" content="([^"]+)"/)?.[1];assert.ok(description,`${rel}: description`);assert.ok(!descriptions.has(description),`${rel}: unique description`);descriptions.add(description);
 assert.ok(html.includes('<html lang="tr"'),`${rel}: Turkish lang`);
 assert.ok(html.includes('property="og:title"'),`${rel}: OG title`);assert.ok(html.includes('name="twitter:card"'),`${rel}: Twitter card`);
 for(const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){const data=JSON.parse(match[1]);assert.ok(data['@type']);schemas++}
 for(const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)){const href=match[1].replaceAll('&amp;','&');if(!href.startsWith('/')||href.startsWith('//'))continue;const url=new URL(href,'https://example.com');assert.ok(routes.has(url.pathname)||fs.existsSync(path.join('public',url.pathname)),`${rel}: broken ${href}`);links++}
 for(const match of html.matchAll(/<img\b[^>]*>/g)){const tag=match[0];assert.ok(/alt="[^"]*"/.test(tag),`${rel}: image alt`);images++;const src=tag.match(/src="([^"]+)"/)?.[1];if(src?.startsWith('/_next/image')){const url=new URL(src.replaceAll('&amp;','&'),'https://example.com').searchParams.get('url');assert.ok(url&&fs.existsSync(path.join('public',url)),`${rel}: image ${url}`)}}
}
console.log(JSON.stringify({pages:files.length,internalLinks:links,jsonLdBlocks:schemas,images,result:'PASS'},null,2));
