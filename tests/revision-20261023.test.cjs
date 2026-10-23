const syntheticReceipts=[{price:90,displayDiscount:4.5,netFees:24.1,commission:10,service:14.1,shipping:0,payout:61.4},{price:150,displayDiscount:7.5,netFees:33.5,commission:12,service:21.5,shipping:0,payout:109}];
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(__dirname+'/../index.html','utf8');let script=html.match(/<script>([\s\S]*?)<\/script>/)[1];script=script.slice(0,script.indexOf('function fill('))+'globalThis.api={initial,calculate,logistic,automaticPrice,solve,requiredFields,manualScope};})();';const ctx={};vm.runInNewContext(script,ctx);const a=ctx.api;
const base=(patch={})=>({...a.initial,cost:60,price:99.9,category:'cozinha',wt:1,len:20,wid:15,hei:10,amzVerified:true,...patch});const near=(x,y)=>assert.ok(Math.abs(x-y)<1e-7,`${x} != ${y}`);let n=0;function test(label,fn){fn();n++;console.log('OK '+label);}
test('Shopee concilia componentes ilustrativos de Pix e repasse',()=>{
 for(const r of syntheticReceipts){const d=base({cost:40,allocate:false,pixPct:5}),x=a.calculate(r.price,d);assert.equal(x.complete,true);near(x.payout,r.payout);near(x.cm.all,r.displayDiscount+r.netFees);near(x.afterAds,r.payout-40);near(x.profit,r.payout-40);near(a.calculate(r.price,{...d,pixPct:0}).payout,r.payout);}
});
test('Centro-Oeste/Norte/Nordeste não herda tabela do interior Sul/Sudeste',()=>{
 const d=base({platform:'amazon',region:'norte',price:200,wt:6});assert.equal(a.manualScope(d),true);assert.ok(Number.isNaN(a.logistic(200,d).value));assert.equal(a.calculate(200,d).complete,false);assert.ok(a.requiredFields(d).includes('logManual'));assert.equal(a.requiredFields(d).includes('wt'),false);
 const quoted={...d,logManual:49.17,amzRangeMin:180,amzRangeMax:220};const x=a.calculate(200,quoted);assert.equal(x.complete,true);near(x.lg.value,49.17);near(x.payout,126.83);assert.equal(a.calculate(221,quoted).complete,false);
 assert.equal(a.automaticPrice({...d,pricingMode:'automatic'}).price,null);
});
test('Precisão de moeda é validada na entrada, sem arredondar silenciosamente',()=>{
 for(const key of ['cost','pack','inbound','ship','other','platformExtra','adsFixed','shippingRevenue','das','monthly','amzMonthly'])for(const value of [.001,1.234,1e10])assert.equal(a.calculate(99.9,base({[key]:value})).complete,false,key+' '+value);
 assert.equal(a.calculate(99.901,base()).complete,false);assert.equal(a.calculate(99.9,base({cost:0.1+0.2})).complete,true);assert.equal(a.calculate(99.9,base({cost:60.01})).complete,true);
 const p=base({platform:'amazon',fulfill:'own',logManual:18.001});assert.equal(a.calculate(p.price,p).complete,false);
 const ml=base({platform:'mercadolivre',mlCategory:'casa',mlRate:13,mlFixed:4.001,mlLog:18});assert.equal(a.calculate(ml.price,ml).complete,false);
});
test('Percentuais e rateios preservam frações legítimas; Shopee não muda por centavos exibidos',()=>{
 const x=a.calculate(99.9,base({adsPct:1.125,allocate:true}));assert.equal(x.complete,true);near(x.ads,1.123875);near(x.dasAllocated,8.205);near(x.payout,69.91);
});
test('Mensalidade e entrega própria entram no resultado uma única vez',()=>{
 const d=base({platform:'amazon',fulfill:'own',price:100,logManual:18,shippingRevenue:10,amzMonthly:19,monthly:100,orders:10,pack:2});const x=a.calculate(100,d);assert.equal(x.complete,true);near(x.cm.all,13.2);near(x.payout,96.8);near(x.ops,20);near(x.operational,16.8);near(x.allocated,20.105);near(x.profit,-3.305);
});
test('Canais inválidos, metas inválidas e quantidades fora do limite não geram preço',()=>{
 assert.equal(a.calculate(100,base({platform:'inexistente'})).complete,false);assert.equal(a.calculate(100,base({qty:10001})).complete,false);assert.equal(a.solve(base(),'inexistente',0),null);assert.equal(a.automaticPrice(base({pricingMode:'automatic',pricingGoal:'inexistente'})).price,null);
});
test('O preço mínimo com cotação da nova região coincide com busca independente de centavos',()=>{
 const d=base({platform:'amazon',region:'norte',price:100,logManual:18.75,amzRangeMin:79,amzRangeMax:150,allocate:false});
 let expected=null;for(let c=7900;c<=15000;c++){const price=c/100,fee=Math.round(price*.12*100)/100;if(price-fee-18.75-60>=10-1e-8){expected=price;break;}}
 assert.equal(a.solve(d,'cash',10),expected);
});
test('Marca e fonte usam arquivos locais; CSS tem tema único e logo proporcional',()=>{
 for(const file of ['sinezzio-logo.png','ubuntu-400.woff2','ubuntu-500.woff2','ubuntu-700.woff2','ubuntu-LICENSE.txt'])assert.ok(fs.statSync(__dirname+'/../assets/'+file).size>1000);
 assert.equal((html.match(/<style>/g)||[]).length,1);assert.equal(html.includes('color-scheme:dark'),false);assert.ok(html.includes('class="brand-logo"'));assert.ok(html.includes('width:80px;height:62px'));assert.ok(html.includes('height:auto;object-fit:contain'));assert.ok(html.includes('Lucro por anúncio (R$)'));assert.equal(html.includes('Lucro por unidade (R$)'),false);
});
console.log(n+' grupos da revisão visual/financeira passaram.');
