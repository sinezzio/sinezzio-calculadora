const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
let js=html.match(/<script>([\s\S]*?)<\/script>/)[1];js=js.slice(0,js.indexOf('function fill('))+'globalThis.api={initial,calculate,commission,logistic,solve,automaticPrice,heatingPrice,saleLedger,displayCents};})();';
const ctx={};vm.runInNewContext(js,ctx);const a=ctx.api;
const near=(x,y,msg='')=>assert.ok(Math.abs(x-y)<1e-7,`${msg}: ${x} != ${y}`);
const base=(extra={})=>({...a.initial,price:100,cost:60,category:'casa',mlCategory:'casa',wt:1,len:1,wid:1,hei:1,shopeeVerified:true,amzVerified:true,...extra});
let checks=0;function test(label,run){run();checks++;console.log('OK '+label);}
test('10 cenários conferidos com Decimal independente, incluindo torneira Amazon e 30 preços mínimos',()=>{
 const fixtures=JSON.parse(fs.readFileSync(path.join(__dirname,'audit-fixtures.json'),'utf8'));
 for(const f of fixtures){
  const d=base({platform:f.platform,cost:Number(f.cost),price:Number(f.price),category:f.category,wt:Number(f.billableWeight)}),x=a.calculate(d.price,d);
  assert.equal(x.complete,true,f.product);for(const key of ['payout','operational','afterAds','profit'])near(x[key],Number(f.expected[key]),f.product+' '+f.platform+' '+key);
  near(x.cm.percent,Number(f.expected.percent));near(x.cm.fixed,Number(f.expected.fixed));near(x.lg.value,Number(f.expected.log));
  for(const key of ['payout','operational','afterAds','profit'])near(a.displayCents(x[key]),Number(f.displayed[key]),'apresentação '+key);
  assert.equal(a.solve(d,'variable',0),Number(f.floors.operational));assert.equal(a.solve(d,'cash',0),Number(f.floors.managerial));assert.equal(a.heatingPrice(d),Number(f.floors.heating));
  const sum=a.saleLedger(d,x).reduce((v,r)=>v+Math.round(r.value*100),0);assert.equal(sum,Math.round(a.displayCents(x.profit)*100));
 }
});
test('Espremedor: origem dos R$ 12,60 reproduzida e cada parcela reconciliada',()=>{
 const visible=base({cost:46,price:69.9,ship:27,allocate:false});near(a.calculate(69.9,visible).cm.all,18.48);near(a.calculate(69.9,visible).profit,-21.58);
 const full={...visible,pack:3,risk:2,allocate:true},x=a.calculate(69.9,full);near(x.profit,-34.183);near(x.reserve,1.398);near(x.dasAllocated,8.205);near(-21.58-x.profit,12.603);
 const ledger=a.saleLedger(full,x);near(ledger.find(r=>r.key==='das').value,-8.21);near(ledger.find(r=>r.key==='reserve').value,-1.4);near(ledger.find(r=>r.key==='rounding').value,.01);
 assert.equal(ledger.reduce((v,r)=>v+Math.round(r.value*100),0),-3418);near(a.displayCents(x.profit),-34.18);
});
test('DAS é custo mensal único, por unidade física e compartilhado entre lojas e kits',()=>{
 const quote={mlRate:13,mlFixed:4,mlLog:18,mlVerified:true};let das=0,total=0;
 for(const [platform,n] of [['shopee',4],['amazon',4],['mercadolivre',2]]){
  const x=a.calculate(100,base({...quote,platform,amzMonthly:19}));assert.equal(x.complete,true);near(x.tax,0);near(x.dasAllocated,8.205);das+=x.dasAllocated*n;total+=x.allocated*n;
 }
 near(das,82.05);near(total,101.05);
 const kit=base({qty:2});near(a.calculate(100,kit).dasAllocated*5,82.05);
 const off=a.calculate(100,{...kit,allocate:false});near(off.dasAllocated,0);near(off.tax,0);
});
test('Faixas Shopee até valores altos pela tabela CNPJ; Pix não reduz repasse',()=>{
 for(const [price,fixed,rate] of [[1,4.5,.2],[79.99,4.5,.2],[80,16,.14],[99.99,16,.14],[100,20,.14],[199.99,20,.14],[200,26,.14],[499.99,26,.14],[500,26,.14],[500.01,26,.14],[1000,26,.14],[5000,26,.14]]){
  const x=a.calculate(price,base({price}));assert.equal(x.complete,true);near(x.cm.fixed,fixed);near(x.cm.percent,Math.round(price*rate*100)/100);
 }
 const highValue=a.calculate(4800,base({price:4800,cost:1700,allocate:false}));near(highValue.cm.all,698);near(highValue.payout,4102);near(highValue.profit,2402);near(highValue.margin,2402/4800);
 const ideal=a.solve(base({price:4800,cost:1700,allocate:false}),'margin',.2);assert.ok(ideal>500);const candidate=a.calculate(ideal,base({price:ideal,cost:1700,allocate:false}));assert.ok(candidate.complete&&candidate.margin>=.2-1e-8);assert.ok(a.calculate(ideal-.01,base({price:ideal-.01,cost:1700,allocate:false})).margin<.2); 
 const x=a.calculate(119,base({price:119})),y=a.calculate(119,base({price:119,pixPct:5}));near(x.payout,y.payout);near(x.profit,y.profit);
});
test('Um preço maior pode dar menos lucro: 79,99/80 e 99,99/100 e 199,99/200',()=>{
 for(const [left,right] of [[79.99,80],[99.99,100],[199.99,200]])assert.ok(a.calculate(left,base({price:left})).profit>a.calculate(right,base({price:right})).profit);
 const d=base({cost:46,price:69.9}),p=a.heatingPrice(d);assert.equal(p,78.27);assert.ok(a.calculate(p,{...d,price:p}).profit>0);assert.ok(a.calculate(80,{...d,price:80}).profit<0);
});
test('DBA por origem e tarifa zero manual desconhecida bloqueada; ML vazio não inventa lucro',()=>{
 for(const [region,expected] of [['sp',36.95],['capitais',34.45],['interior',36.95]])near(a.logistic(200,base({platform:'amazon',wt:6,region})).value,expected);
 assert.equal(a.calculate(100,base({platform:'amazon',fulfill:'fba',logManual:'',amzVerified:false})).complete,false);
 assert.equal(a.calculate(100,base({platform:'amazon',fulfill:'own',logManual:0,amzVerified:false})).complete,false);
 const d=base({platform:'mercadolivre',mlRate:'',mlFixed:'',mlLog:''});assert.equal(a.calculate(100,d).complete,false);assert.equal(a.solve(d,'cash',0),null);
 for(const patch of [{ship:''},{inbound:''},{monthly:''},{das:''},{amzMonthly:''}])assert.equal(a.calculate(100,base(patch)).complete,false,JSON.stringify(patch));
});
test('Aquecimento inclui DAS mesmo com rateio desligado e não altera o preço manual',()=>{
 const d=base({allocate:false,cost:55,price:119,pricingMode:'automatic',pricingGoal:'heating',safetyMargin:5});assert.equal(a.automaticPrice(d).price,97.79);
 const low=a.heatingPrice({...d,safetyMargin:0}),high=a.heatingPrice({...d,safetyMargin:10});assert.ok(high>=low);
 const manual={...d,pricingMode:'manual'};assert.equal(a.automaticPrice(manual).price,null);assert.equal(manual.price,119);
});
test('Soma exata de receitas e despesas em 120 cenários, sem custos duplicados',()=>{
 for(let i=0;i<120;i++){
  const platform=['shopee','amazon','mercadolivre'][i%3];
  const d=base({platform,price:100+i,cost:20+i/10,qty:1+i%3,kitPackageConfirmed:true,inbound:2.15,pack:1.45,ship:platform==='shopee'?7:0,other:1.11,adsFixed:.35,adsPct:3.5,adsDistinct:true,risk:2,monthly:13.17,amzMonthly:19,mlRate:13.5,mlFixed:4.15,mlLog:18.67,mlVerified:true});
  const x=a.calculate(d.price,d);assert.equal(x.complete,true);const rows=a.saleLedger(d,x);
  near(rows.filter(r=>r.key!=='rounding').reduce((sum,r)=>sum+r.exact,0),x.profit);
  assert.equal(rows.reduce((sum,r)=>sum+Math.round(r.value*100),0),Math.round(a.displayCents(x.profit)*100));
 }
 assert.equal(a.calculate(100,base({safetyMargin:''})).complete,true);
});
console.log(`${checks} grupos de auditoria adicionais passaram.`);

