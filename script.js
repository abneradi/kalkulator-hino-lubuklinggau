let DB=null, selected=null;
const $=id=>document.getElementById(id);
const rupiah=n=>{if(n===null||n===undefined||isNaN(n))return 'Tidak tersedia';return 'Rp '+Math.round(n).toLocaleString('id-ID')};
const num=v=>Number(String(v||'').replace(/[^0-9]/g,''))||0;
function fillSeries(){ $('series').innerHTML=Object.keys(DB.body_options).map(x=>`<option>${x}</option>`).join(''); fillTypes(); }
function fillTypes(){let s=$('series').value;let ms=DB.models.filter(x=>x.series===s);$('type').innerHTML=ms.map((x,i)=>`<option value="${i}">${x.type}</option>`).join('');fillBodies();}
function fillBodies(){let s=$('series').value;$('body').innerHTML=DB.body_options[s].map(x=>`<option>${x}</option>`).join('');update();}
function getModel(){let ms=DB.models.filter(x=>x.series===$('series').value);return ms[Number($('type').value)||0]}
function update(){selected=getModel();if(!selected)return;let body=$('body').value,plate=$('plate').value,bp=num($('bodyPrice').value);let bbn=selected.bbn?.[plate]?.[body];let on=(selected.off_spv||0)+(bbn??0)+bp;let otr=(selected.pricelist_otr??null);let totalOTR=otr===null?null:otr+bp; $('unitTitle').textContent=selected.series+' – '+selected.type+' – '+body+' – Plat '+plate; updateVisual(); $('off').textContent=rupiah(selected.off_spv);$('bbn').textContent=rupiah(bbn);$('karoseri').textContent=rupiah(bp);$('onNett').textContent=bbn===null?'Tidak dapat dihitung':rupiah(on);$('pricelist').textContent=rupiah(otr);$('otr').textContent=rupiah(totalOTR);$('discDealer').textContent=(bbn!==null&&otr!==null)?rupiah(totalOTR-on):'Tidak dapat dihitung';calcLease();}
function calcLease(){let lease=num($('otrLease').value),onText=$('onNett').textContent,on=num(onText.replace(/[^0-9]/g,''));let disc=lease&&on?lease-on:0;$('discDP').textContent=lease&&on?rupiah(disc):'-';let tdp=num($('tdp').value);let dp=tdp&&lease&&on?tdp-disc:0;$('dpSetor').textContent=tdp&&lease&&on?rupiah(dp):'-';renderInstallments();}
function renderInstallments(){let lease=num($('otrLease').value),tdp=num($('tdp').value);let on=num($('onNett').textContent.replace(/[^0-9]/g,''));let disc=lease&&on?lease-on:0;let dp=tdp?Math.max(0,tdp-disc):0;let pokok=Math.max(0,lease-dp);let ten=[24,36,48,60];$('installments').innerHTML=ten.map(n=>{let rate=num($('r'+n).value)/100;if(!pokok||!rate)return `<div class="inst"><span>${n} bulan</span><b>-</b></div>`;let ang=(pokok*(1+rate*(n/12)))/n;return `<div class="inst"><span>${n} bulan</span><b>${rupiah(ang)}</b></div>`}).join('');}
function updateVisual(){
  const series=$('series').value;
  const type=$('type').value||'';
  const is500=series==='Hino 500';
  $('visualSeries').textContent=series.toUpperCase();
  $('visualType').textContent=type;
  $('unitImage').src=is500
    ? 'https://www.hino.co.id/assets/images/gso/hinobdn/asset21.png'
    : 'https://www.hino.co.id/assets/uploads/products/c60a15729ef206da7f96411d6c0f522b.png';
}
$('series').addEventListener('change',fillTypes);$('type').addEventListener('change',update);$('body').addEventListener('change',update);$('plate').addEventListener('change',update);$('bodyPrice').addEventListener('input',update);$('otrLease').addEventListener('input',calcLease);$('tdp').addEventListener('input',calcLease);
$('rates').innerHTML=[24,36,48,60].map(n=>`<label>${n} bulan<input id="r${n}" inputmode="decimal" value="${n===24?'3.60':n===36?'3.80':n===48?'3.90':n===60?'4.10':''}" placeholder="%/tahun"></label>`).join('');[24,36,48,60].forEach(n=>$('r'+n).addEventListener('input',renderInstallments));
fetch('data.json').then(r=>r.json()).then(d=>{DB=d;fillSeries();});
