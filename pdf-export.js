/* PDF A4 local, sem dependências nem envio de dados. */
(function(root){
'use strict';
const W=595.28,H=841.89,M=42;
function clean(s){return String(s??'').normalize('NFC').replace(/[\u2010-\u2015]/g,'-').replace(/\u2022/g,' / ').replace(/\u2212/g,'-');}
function literal(s){return '('+Array.from(clean(s)).map(c=>{const n=c.charCodeAt(0);return n>=32&&n<=255?(c==='('||c===')'||c==='\\'?'\\'+c:c):'?';}).join('')+')';}
function build(report){
 let pages=[],ops=[],y=H-M;
 const text=(s,x,yy,size=10,bold=false,color='0.12 0.14 0.18')=>ops.push(`BT /${bold?'F2':'F1'} ${size} Tf ${color} rg 1 0 0 1 ${x} ${yy} Tm ${literal(s)} Tj ET`);
 const width=(s,size=10)=>Array.from(clean(s)).reduce((n,c)=>n+(/[MW@%]/.test(c)? .87:/[ilI .,:'!|]/.test(c)? .25:/[A-Z0-9]/.test(c)? .62:.53),0)*size;
 function wrap(s,max,size=10){const lines=[];let line='';for(const word of clean(s).split(/\s+/)){if(width((line?line+' ':'')+word,size)>max&&line){lines.push(line);line='';}let chunk=word;while(width(chunk,size)>max){let cut=Math.max(1,Math.floor(chunk.length*max/width(chunk,size)) -1);lines.push(chunk.slice(0,cut));chunk=chunk.slice(cut);}line+=(line?' ':'')+chunk;}if(line)lines.push(line);return lines.length?lines:[''];}
 function start(){ops=[];y=H-M;text('SINEZZIO COMMERCE',M,y,12,true,'0.75 0.23 0.08');y-=23;text('Relatório de precificação',M,y,20,true);y-=20;text(`${report.platform} / ${report.date}`,M,y,9);y-=26;}
 function end(){text(`Simulação estimada / dados locais / página ${pages.length+1}`,M,26,8,false,'0.4 0.43 0.48');pages.push(ops.join('\n'));}
 function room(h){if(y-h<55){end();start();}}
 function paragraph(s,size=10){const lines=wrap(s,W-2*M,size);if(lines.length*(size+5)<H-160)room(lines.length*(size+5)+6);for(const line of lines){room(size+5);text(line,M,y,size);y-=size+5;}y-=6;}
 function section(title){room(80);y-=6;ops.push(`0.85 0.87 0.9 RG 0.5 w ${M} ${y+8} m ${W-M} ${y+8} l S`);text(title,M,y-10,12,true);y-=26;}
 function row(label,value,bold=false){const valueLines=wrap(value,160);const labelLines=wrap(label,320);const h=Math.max(valueLines.length,labelLines.length)*13;room(h+3);labelLines.forEach((s,i)=>text(s,M,y-i*13,10,bold));valueLines.forEach((s,i)=>text(s,W-M-width(s),y-i*13,10,bold));y-=h+3;}
 start();paragraph(report.product,12);section('Resultado por unidade');for(const r of report.results)row(r[0],r[1],true);
 section('Composição financeira');for(const r of report.breakdown)row(...r);
 section('Cenários de preço');for(const r of report.scenarios)paragraph(r);
 section('Observações');for(const n of report.notes)paragraph(n,9);
 section('Dados da simulação');for(const group of report.inputs){section(group.title);for(const r of group.rows)row(...r);}
 section('Premissas');paragraph('Tarifas estimadas. Confira os custos no marketplace antes de definir o preço. Dados e cálculos não são enviados a servidores.',9);end();
 const objects=['<< /Type /Catalog /Pages 2 0 R >>','', '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>','<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>'];const refs=[];
 for(const stream of pages){const contentId=objects.length+1;objects.push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);const pageId=objects.length+1;objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentId} 0 R >>`);refs.push(pageId+' 0 R');}
 objects[1]=`<< /Type /Pages /Count ${pages.length} /Kids [${refs.join(' ')}] >>`;
 let pdf='%PDF-1.4\n%\xE2\xE3\xCF\xD3\n',offsets=[0];objects.forEach((o,i)=>{offsets.push(pdf.length);pdf+=`${i+1} 0 obj\n${o}\nendobj\n`;});const xref=pdf.length;pdf+=`xref\n0 ${objects.length+1}\n0000000000 65535 f \n`+offsets.slice(1).map(n=>String(n).padStart(10,'0')+' 00000 n \n').join('')+`trailer\n<< /Size ${objects.length+1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
 return Uint8Array.from(pdf,c=>c.charCodeAt(0));
}
root.SinezzioPDF={build};
})(typeof window==='undefined'?globalThis:window);
