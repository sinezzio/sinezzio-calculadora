from decimal import Decimal as D, ROUND_HALF_UP
from pathlib import Path
import json
R=lambda x:x.quantize(D('.01'),rounding=ROUND_HALF_UP)
# Independent hand-audit fixtures. Prices/weights here are test assumptions, not scale measurements.
products=[('Liquidificador Mondial','55','119','cozinha','3.9375'),('Batedeira Mondial','55','129.90','cozinha','3.168'),('Torneira gourmet','85','169.90','ferramentas','2.5'),('Produto de teste','60','99.90','casa','1'),('Espremedor','46','69.90','cozinha','1')]
low=[[D(v) for v in row] for row in [('11.95','13.95','15.95','17.95'),('12.85','15','17.15','19.30'),('13.45','15.70','17.95','20.20'),('14','16.35','18.75','21.10'),('14.95','17.45','19.95','22.40'),('16.15','18.85','21.55','24.20')]]
weights=list(map(D,['.25','.5','1','2','3','4']))
fixtures=[]
for name,cost,price,cat,weight in products:
 for platform in ['shopee','amazon']:
  c,p,w=D(cost),D(price),D(weight);rate=D('.11') if cat=='ferramentas' else D('.12')
  def calc(p):
   if platform=='shopee':
    if p>=500:return None
    pct=R(p*(D('.20') if p<80 else D('.14')));fixed=D('4.50') if p<80 else D('16') if p<100 else D('20') if p<200 else D('26');log=D(0)
   else:
    pct=max(D(2),R(p*rate));fixed=D(0)
    if p<79:log=D('4.50') if p<30 else D('6.50') if p<50 else D('6.75')
    elif p<200:log=low[next(i for i,z in enumerate(weights) if w<=z)][0 if p<100 else 1 if p<120 else 2 if p<150 else 3]
    else:log=list(map(D,['20.45','20.95','21.95','23.45','24.45','25.95']))[next(i for i,z in enumerate(weights) if w<=z)]
   payout=p-pct-fixed-log;op=payout-c;ger=op-D('8.205')
   return dict(percent=pct,fixed=fixed,log=log,payout=payout,operational=op,afterAds=op,profit=ger)
  floors={}
  for cent in range(1,50000):
   v=D(cent)/100;x=calc(v)
   if x['afterAds']>=0 and 'operational' not in floors:floors['operational']=v
   if x['profit']>=0 and 'managerial' not in floors:floors['managerial']=v
   if x['profit']>=v*D('.05') and 'heating' not in floors:floors['heating']=v
   if len(floors)==3:break
  expected=calc(p)
  fixtures.append(dict(product=name,platform=platform,cost=cost,price=price,category=cat,billableWeight=weight,expected={k:str(v) for k,v in expected.items()},displayed={k:str(R(v)) for k,v in expected.items()},floors={k:str(v) for k,v in floors.items()}))
Path(__file__).with_name('audit-fixtures.json').write_text(json.dumps(fixtures,ensure_ascii=False,indent=2)+'\n')
for f in fixtures:print(f['product'],f['platform'],'repasse',f['displayed']['payout'],'operacional',f['displayed']['operational'],'gerencial',f['displayed']['profit'],'pisos',f['floors'])
