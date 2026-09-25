import {test,afterEach} from 'node:test';
import assert from 'node:assert/strict';
import {inquirySchema} from '../lib/validation';
import {POST} from '../app/api/talepler/route';
import {legalDocuments} from '../data/legal';
const payload=()=>({form:'service',name:'Test Kullanıcı',phone:'0555 000 00 00',email:'',requestType:'Bakım',building:'Test bina',address:'Test bina adresi',district:'Şişli',elevators:'2',message:'Yerel otomatik test isteği.',consent:true,website:'',startedAt:Date.now()-5000,turnstileToken:'test-token'});
const req=(body:unknown,origin='http://localhost:3000')=>new Request('http://localhost:3000/api/talepler',{method:'POST',headers:{origin,'content-type':'application/json'},body:JSON.stringify(body)});
const originalFetch=globalThis.fetch;
const savedEnv={...process.env};
afterEach(()=>{globalThis.fetch=originalFetch;for(const k of ['RESEND_API_KEY','FORM_EMAIL_FROM','FORM_DELIVERY_URL','FORM_DELIVERY_TOKEN','TURNSTILE_SECRET_KEY','NEXT_PUBLIC_TURNSTILE_SITE_KEY','LEGAL_APPROVED','NEXT_PUBLIC_SITE_URL']){if(savedEnv[k]===undefined)delete process.env[k];else process.env[k]=savedEnv[k]}for(const p of Object.values(legalDocuments)){p.approved=false;p.sections=[]}});
test('service requires address, known district and elevator count',()=>{assert.equal(inquirySchema.safeParse(payload()).success,true);for(const changes of [{address:''},{district:'Bilinmeyen'},{elevators:'0'},{elevators:'101'},{elevators:'1.5'}])assert.equal(inquirySchema.safeParse({...payload(),...changes}).success,false)});
test('phone, consent and text bounds are validated',()=>{for(const changes of [{phone:'abcd1234567890'},{phone:'123'},{consent:false},{message:'kısa'},{message:'a'.repeat(3001)},{email:'invalid'}])assert.equal(inquirySchema.safeParse({...payload(),...changes}).success,false)});
test('contact does not require service-only fields',()=>assert.equal(inquirySchema.safeParse({...payload(),form:'contact',address:'',district:'',elevators:''}).success,true));
test('cross-origin submissions are rejected',async()=>assert.equal((await POST(req(payload(),'https://evil.invalid'))).status,403));
test('invalid data, honeypot and too-fast submissions are rejected',async()=>{assert.equal((await POST(req({...payload(),name:''}))).status,422);assert.equal((await POST(req({...payload(),website:'spam'}))).status,400);assert.equal((await POST(req({...payload(),startedAt:Date.now()}))).status,400)});
test('unconfigured delivery fails honestly without external transmission',async()=>{delete process.env.FORM_DELIVERY_URL;let called=false;globalThis.fetch=async()=>{called=true;throw Error('Unexpected network')};assert.equal((await POST(req(payload()))).status,503);assert.equal(called,false)});
function ready(){Object.assign(process.env,{FORM_DELIVERY_URL:'https://delivery.invalid/requests',FORM_DELIVERY_TOKEN:'test-only',TURNSTILE_SECRET_KEY:'test-only',NEXT_PUBLIC_TURNSTILE_SITE_KEY:'test-only',LEGAL_APPROVED:'true'});for(const p of Object.values(legalDocuments)){p.approved=true;p.sections=[{title:'Test',text:'Test'}]}}
test('verified delivery returns reference and strips security fields',async()=>{ready();let calls=0;globalThis.fetch=async(url,options)=>{calls++;if(String(url).includes('siteverify'))return Response.json({success:true,hostname:'localhost',action:'inquiry'});const body=JSON.parse(String(options?.body));assert.equal(body.turnstileToken,undefined);assert.equal(body.website,undefined);assert.equal(body.phone,payload().phone);assert.equal(new Headers(options?.headers).get('Authorization'),'Bearer test-only');return Response.json({accepted:true})};const response=await POST(req(payload()));assert.equal(response.status,200);assert.match((await response.json()).reference,/^[\da-f-]{36}$/);assert.equal(calls,2)});
test('failed verification cannot deliver data',async()=>{ready();let calls=0;globalThis.fetch=async()=>{calls++;return Response.json({success:true,hostname:'other.invalid',action:'inquiry'})};assert.equal((await POST(req(payload()))).status,400);assert.equal(calls,1)});
test('delivery failure never reports success',async()=>{ready();globalThis.fetch=async(url)=>String(url).includes('siteverify')?Response.json({success:true,hostname:'localhost',action:'inquiry'}):new Response('Unavailable',{status:500});assert.equal((await POST(req(payload()))).status,502)});
test('malformed JSON and oversized payload are rejected',async()=>{assert.equal((await POST(new Request('http://localhost:3000/api/talepler',{method:'POST',headers:{origin:'http://localhost:3000','content-type':'application/json'},body:'{'}))).status,400);assert.equal((await POST(req({message:'a'.repeat(17000)}))).status,413)});

test('Resend delivers only to configured info inbox with complete service details',async()=>{
 ready();Object.assign(process.env,{RESEND_API_KEY:'test-resend',FORM_EMAIL_FROM:'ASTAF <form@bildirim.astafasansor.com>'});
 let sent=false;
 globalThis.fetch=async(url,options)=>{
  if(String(url).includes('siteverify'))return Response.json({success:true,hostname:'localhost',action:'inquiry'});
  assert.equal(String(url),'https://api.resend.com/emails');
  const body=JSON.parse(String(options?.body));
  assert.deepEqual(body.to,['info@astafasansor.com']);
  assert.equal(body.reply_to,'customer@example.com');
  for(const value of [payload().phone,payload().address,payload().district,payload().message])assert.ok(body.text.includes(value));
  assert.ok(!body.text.includes('test-token'));sent=true;
  return Response.json({id:'test-email-id'});
 };
 assert.equal((await POST(req({...payload(),email:'customer@example.com',to:'attacker@example.com'}))).status,200);assert.equal(sent,true);
});
test('Resend errors or missing acknowledgement never report success',async()=>{
 ready();Object.assign(process.env,{RESEND_API_KEY:'test-resend',FORM_EMAIL_FROM:'form@bildirim.astafasansor.com'});
 for(const response of [new Response('Failure',{status:500}),Response.json({})]){
  globalThis.fetch=async(url)=>String(url).includes('siteverify')?Response.json({success:true,hostname:'localhost',action:'inquiry'}):response;
  assert.equal((await POST(req(payload()))).status,502);
 }
});
