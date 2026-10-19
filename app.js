(()=>{'use strict';
/* ====== CONFIGURACIÓN: cambia estos datos por los reales ====== */
const C={wa:'51968143004',yape:'968 143 004',plin:'968 143 004',titular:'Nay Secret',
 yapeQR:'',plinQR:'',               // ej. 'img/qr-yape.png' (opcional)
 banco:'BCP',cuenta:'000-00000000-0-00',cci:'000-000-000000000000-00',
 envioLima:10,                       // costo de envío en Lima (S/)
 cardLink:''};                       // link de pago de tu pasarela (Culqi, Niubiz, Mercado Pago...)

/* ====== CATÁLOGO: [id, nombre, imagen, precio (S/ EJEMPLO), descripción] ====== */
const D=[
['Colonias y cremas',[
 [1,'Colonia y crema Aqua Kiss (shimmer)','celeste-brillo',119,'Body mist y crema corporal con brillo. Fragancia fresca y acuática para todo el día.'],
 [2,'Colonia y crema Aqua Kiss','celeste-sin-brillo',119,'Body mist y crema corporal sin brillo. Aroma limpio, fresco y suave.'],
 [3,'Colonia y crema Coconut Passion (shimmer)','colonia-brillo-marron',119,'Coco cremoso con vainilla cálida y destellos dorados sobre la piel.'],
 [4,'Colonia y crema Coconut Passion','colonia-marron',119,'Dúo de body mist y crema con aroma tropical a coco y vainilla.'],
 [5,'Colonia y crema Into the Night','colonia-negra-y-crema-negra',119,'Fragancia intensa y misteriosa con acabado brillante para salidas de noche.'],
 [6,'Colonia y crema Coconut Milk & Rose','marro-y-morado',119,'Coco suave y rosas delicadas. Un dúo cremoso y femenino.']]],
['Colección Pink',[
 [10,'Pink Apple – Crema corporal','apple',65,'Loción corporal hidratante con aroma dulce a manzana.'],
 [11,'Pink Apple – Aceite corporal','apple-pink-aceite',69,'Aceite que deja la piel suave, con brillo y aroma a manzana.'],
 [12,'Pink Coconut – Crema corporal','coco',65,'Loción hidratante con aroma cremoso a coco.'],
 [13,'Pink Coconut – Exfoliante corporal','coconut',75,'Exfoliante para renovar la piel y dejarla suave y perfumada.'],
 [14,'Pink Coconut – Aceite corporal','coconut-aceite',69,'Aceite corporal ligero con fragancia a coco.'],
 [15,'Pink Fresa – Aceite corporal','fresa-aceite',69,'Aceite corporal con aroma dulce a fresa y acabado luminoso.'],
 [16,'Pink Fresa – Crema corporal','fresassssssssss',65,'Crema corporal hidratante con aroma a fresas frescas.'],
 [17,'Pink Honey – Mist corporal','honey',59,'Body mist con notas dulces de miel. Ligero y envolvente.'],
 [18,'Pink Lavender – Jabón corporal','lavander-jabon',55,'Jabón líquido corporal de lavanda para una ducha relajante.'],
 [19,'Pink Super Berry – Aceite corporal','mora-aceite-superberry',69,'Aceite corporal con aroma frutal a moras y frutos rojos.'],
 [20,'Pink Super Berry – Set corporal','body',189,'Set corporal Super Berry: cuidado y fragancia en un solo conjunto.']]],
['Bolsos y accesorios',[
 [30,'Bolso de mano grande','bolso-de-mano-grande',149,'Bolso amplio de rayas rosadas, ideal para el día a día.'],
 [31,'Estuche plegable para tarjetas','estuche-plegable-para-tarjetas',59,'Estuche compacto con llavero para llevar tus tarjetas.'],
 [32,'Joyero corazón rosado','joyero-corazon-rosado',69,'Joyero en forma de corazón con espejo interior.'],
 [33,'Llavero tarjetero','llavero-chico',55,'Tarjetero con llavero, práctico y de estilo rosado.']]],
['Pijamas',[
 [40,'Conjunto de pijama corto de raso','conjunto-de-pijama-corto-de-raso-esmaltado',159,'Pijama de raso con rayas rosadas. Polo y short, suave y fresco.',1],
 [41,'Conjunto de pijama largo de raso','ffff-conjunto-de-pijama-largo-de-raso-glaseado',179,'Pijama largo de raso con rayas rosadas. Elegante y cómodo.',1]]],
['Sets de regalo',[
 [50,'Set de 12 mini fragancias','12-set',299,'Estuche de regalo con 12 mini fragancias para descubrir tus favoritas.'],
 [51,'Bombshell Intense – Perfume de viaje','bombshell-intense-perfume-de-viaje-spray',129,'Perfume de viaje en spray, práctico para llevar a todas partes.'],
 [52,'Bombshell Passion – Perfume de viaje','bombshell-passion-perfume-de-viaje-spray',129,'Perfume de viaje en spray con fragancia floral y frutal.'],
 [53,'Bombshell – Labial y perfume de viaje','gordo-labial-bombshell-perfume-de-viaje-spray',149,'Set de regalo con labial y perfume de viaje.'],
 [54,'Bombshell Intense – Labial y perfume','labial-bombshell-intense-perfume-de-viaje-spray',149,'Set de regalo con labial y perfume de viaje Intense.']]],
['Colecciones',[
 [60,'Colección Pink Apple','coleccion-pink-apple',249,'Colección completa Pink Apple para cuidar tu piel con aroma a manzana.'],
 [61,'Colección Coconut','coleccion-coconut',249,'Colección completa Pink Coconut con cremas y fragancia.'],
 [62,'Colección Super Berry','coleccion-super-berry',249,'Colección completa Super Berry con cuidado corporal y fragancia.'],
 [63,'Colección Vainilla','coleccion-vainilla',249,'Colección Pink Vainilla con cremas, aceite y fragancia.'],
 [64,'Colección completa Vainilla','coleccion-completa-vainilla',289,'Colección Vainilla completa, incluye exfoliante.']]]];
const P={};D.forEach(([c,a])=>a.forEach(r=>P[r[0]]={id:r[0],name:r[1],img:r[2],price:r[3],desc:r[4],size:!!r[5],cat:c}));
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const S=n=>'S/ '+Number(n).toFixed(2),norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const toast=t=>{const e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),2200)};

/* ====== Catálogo + buscador ====== */
let cat='Todos';
$('#chips').innerHTML=['Todos',...D.map(d=>d[0])].map(c=>`<button class="chip" data-c="${esc(c)}" aria-pressed="${c==='Todos'}">${esc(c)}</button>`).join('');
function draw(){
  const q=norm($('#q').value.trim());let n=0;
  $('#catalogRoot').innerHTML=D.map(([c,a])=>{
    const it=a.map(r=>P[r[0]]).filter(p=>(cat==='Todos'||cat===c)&&(!q||norm(p.name+' '+p.desc+' '+c).includes(q)));n+=it.length;
    return it.length?`<h3 class="cg-t">${esc(c)}</h3><div class="grid">${it.map(p=>`<article class="pcard"><div class="ph"><img src="img/${p.img}.webp" alt="${esc(p.name)}" width="640" height="640" loading="lazy"></div><div class="bd"><span class="cat-l">${esc(p.cat)}</span><h4>${esc(p.name)}</h4><p class="ds">${esc(p.desc)}</p>${p.size?`<select id="sz${p.id}" aria-label="Talla"><option>S</option><option selected>M</option><option>L</option><option>XL</option></select>`:''}<p class="pr">${S(p.price)}</p><button class="btn-solid" data-add="${p.id}">Agregar al carrito</button></div></article>`).join('')}</div>`:'';
  }).join('')||'';
  if(!n)$('#catalogRoot').innerHTML='<p class="none">No encontramos productos con esa búsqueda. Prueba con otra palabra.</p>';
}
$('#q').addEventListener('input',draw);
$('#chips').addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;cat=b.dataset.c;$$('.chip').forEach(x=>x.setAttribute('aria-pressed',x===b));draw()});

/* ====== Privacidad ====== */
const ok=()=>{try{return localStorage.getItem('ns_consent')==='yes'}catch(e){return false}};
(()=>{let v=null;try{v=localStorage.getItem('ns_consent')}catch(e){}const pv=$('#privacy');if(!v)pv.hidden=false;
 const set=x=>{try{localStorage.setItem('ns_consent',x);if(x!=='yes')localStorage.removeItem('ns_cart')}catch(e){}pv.hidden=true;save()};
 $('#pv-ok').onclick=()=>set('yes');$('#pv-no').onclick=()=>set('no')})();

/* ====== Carrito ====== */
let cart=[];try{if(ok())cart=JSON.parse(localStorage.getItem('ns_cart')||'[]').filter(i=>P[i.id])}catch(e){}
const save=()=>{try{if(ok())localStorage.setItem('ns_cart',JSON.stringify(cart))}catch(e){}};
const sub=()=>cart.reduce((s,i)=>s+P[i.id].price*i.q,0);
function render(){
  const n=cart.reduce((s,i)=>s+i.q,0),cn=$('#cnt');cn.textContent=n;cn.hidden=!n;$('#cartSum').hidden=!n;$('#sTot').textContent=S(sub());
  $('#cartList').innerHTML=n?cart.map((i,x)=>{const p=P[i.id];return `<div class="ci"><img src="img/${p.img}.webp" alt=""><div><b>${esc(p.name)}${i.size?' · Talla '+i.size:''}</b><div>${S(p.price)}</div><div class="q"><button data-q="-1" data-x="${x}" aria-label="Menos">–</button><span>${i.q}</span><button data-q="1" data-x="${x}" aria-label="Más">+</button></div></div><button class="rm" data-rm="${x}" aria-label="Quitar">✕</button></div>`}).join(''):'<p class="cart-empty">Tu carrito está vacío.</p>';
}
const cartEl=$('#cart'),openCart=o=>{cartEl.classList.toggle('open',o);cartEl.setAttribute('aria-hidden',!o);$('#scrim').classList.toggle('on',o)};
document.addEventListener('click',e=>{
  const a=e.target.closest('[data-add],[data-q],[data-rm]');if(!a)return;const d=a.dataset;
  if(d.add){const id=+d.add,size=P[id].size?$('#sz'+id).value:null,f=cart.find(i=>i.id===id&&i.size===size);f?f.q++:cart.push({id,size,q:1});toast('Agregado al carrito')}
  else if(d.q){const i=cart[+d.x];i.q+=+d.q;if(i.q<1)cart.splice(+d.x,1)}
  else cart.splice(+d.rm,1);
  save();render()});
$('#cartBtn').onclick=()=>openCart(true);$('#cartClose').onclick=()=>openCart(false);$('#scrim').onclick=()=>openCart(false);
$('#cartClear').onclick=()=>{cart=[];save();render()};
document.addEventListener('keydown',e=>{if(e.key==='Escape'){openCart(false);closeCk()}});
window.addEventListener('scroll',()=>$('#hdr').classList.toggle('scrolled',scrollY>40),{passive:true});

/* ====== Checkout ====== */
const ck=$('#ck'),box=$('#ckBox'),closeCk=()=>{ck.hidden=true;document.body.style.overflow=''};
const PAY={
 yape:{t:'Yape',s:'Yapea y adjunta tu captura',i:()=>`Yapea <b>${esc(S(total()))}</b> al número <b>${C.yape}</b> a nombre de <b>${esc(C.titular)}</b>.${C.yapeQR?`<br><img src="${C.yapeQR}" alt="QR Yape" width="160" style="margin-top:.6rem">`:''}`,r:1},
 plin:{t:'Plin',s:'Plinea y adjunta tu captura',i:()=>`Plinea <b>${esc(S(total()))}</b> al número <b>${C.plin}</b> a nombre de <b>${esc(C.titular)}</b>.${C.plinQR?`<br><img src="${C.plinQR}" alt="QR Plin" width="160" style="margin-top:.6rem">`:''}`,r:1},
 transf:{t:'Transferencia bancaria',s:'Adjunta tu voucher',i:()=>`Banco <b>${esc(C.banco)}</b><br>Cuenta: <b>${C.cuenta}</b><br>CCI: <b>${C.cci}</b><br>Titular: <b>${esc(C.titular)}</b><br>Monto: <b>${esc(S(total()))}</b>`,r:1},
 card:{t:'Tarjeta de crédito o débito',s:'Pago seguro con link',i:()=>C.cardLink?'Al confirmar se abrirá tu página de pago seguro. Tus datos de tarjeta nunca pasan por esta web.':'Al confirmar te enviaremos por WhatsApp un link de pago seguro para pagar con tu tarjeta.',r:0},
 cash:{t:'Efectivo contra entrega',s:'Pagas al recibir tu pedido',i:()=>'Pagas en efectivo cuando recibes tu pedido. Confirmaremos por WhatsApp si está disponible en tu zona.',r:0}};
let zona='lima',pay='yape';
const ship=()=>zona==='lima'?C.envioLima:0,total=()=>sub()+ship();
function summary(){return cart.map(i=>{const p=P[i.id];return `<div class="tl"><span>${i.q} × ${esc(p.name)}${i.size?' ('+i.size+')':''}</span><span>${S(p.price*i.q)}</span></div>`}).join('')+`<div class="tl"><span>Subtotal</span><span>${S(sub())}</span></div><div class="tl"><span>Envío</span><span>${zona==='lima'?S(C.envioLima):'Por confirmar'}</span></div><div class="tl t"><span>Total</span><span>${S(total())}</span></div>`}
function openCk(){
  if(!cart.length)return;openCart(false);ck.hidden=false;document.body.style.overflow='hidden';
  box.innerHTML=`<form class="ck-form" id="ckForm" novalidate><button class="ck-x" type="button" id="ckX" aria-label="Cerrar">✕</button><h2>Finalizar compra</h2>
<h3>1. Tus datos</h3><div class="f"><label class="l">Nombre completo<input name="nom" required autocomplete="name"></label><label class="l">Teléfono / WhatsApp<input name="tel" type="tel" required autocomplete="tel"></label><label class="l w">Correo (opcional)<input name="mail" type="email" autocomplete="email"></label></div>
<h3>2. Envío</h3><div class="f"><label class="l">Zona<select name="zona" id="zona"><option value="lima">Lima (S/ ${C.envioLima.toFixed(2)})</option><option value="prov">Provincias (se confirma el costo)</option></select></label><label class="l">Ciudad / distrito<input name="ciu" required></label><label class="l w">Dirección y referencia<input name="dir" required autocomplete="street-address"></label></div>
<h3>3. Método de pago</h3><div class="pay" id="pays">${Object.entries(PAY).map(([k,m])=>`<label class="pm"><input type="radio" name="pay" value="${k}"${k===pay?' checked':''}><span><b>${m.t}</b><small>${m.s}</small></span></label>`).join('')}</div><div class="pinfo" id="pinfo"></div>
<div id="rec"><h3>4. Comprobante de pago</h3><input type="file" name="rec" id="recf" accept="image/*,application/pdf"><p style="font-size:12px;color:var(--mute);margin-top:.4rem">Adjunta la captura de tu pago. En celulares compatibles se comparte directo por WhatsApp; si no, envíala en el chat con tu número de pedido.</p></div>
<h3>Notas (opcional)</h3><textarea name="nota" rows="2"></textarea><p class="err" id="err" role="alert"></p><button class="btn-solid" type="submit" style="width:100%;margin-top:1rem">Confirmar pedido</button></form>
<div class="ck-side"><h2>Resumen</h2><div id="sum"></div></div>`;
  const f=$('#ckForm'),upd=()=>{pay=f.pay.value;zona=f.zona.value;$('#pinfo').innerHTML=PAY[pay].i();$('#rec').hidden=!PAY[pay].r;$('#sum').innerHTML=summary()};
  f.zona.value=zona;upd();f.addEventListener('change',upd);$('#ckX').onclick=closeCk;f.addEventListener('submit',submit)}
$('#goCk').onclick=openCk;
async function submit(e){
  e.preventDefault();const f=e.target,err=$('#err');err.textContent='';
  if(!f.nom.value.trim()||!f.tel.value.trim()||!f.ciu.value.trim()||!f.dir.value.trim()){err.textContent='Completa tus datos y dirección de envío.';return}
  const file=f.rec.files[0];if(PAY[pay].r&&!file){err.textContent='Adjunta tu comprobante de pago para continuar.';return}
  const no='NS-'+new Date().toISOString().slice(2,10).replace(/-/g,'')+'-'+Math.floor(1000+Math.random()*9000);
  const msg=`*Pedido ${no} – Nay Secret*\n\n${cart.map(i=>`• ${i.q} x ${P[i.id].name}${i.size?' (Talla '+i.size+')':''} – ${S(P[i.id].price*i.q)}`).join('\n')}\n\nSubtotal: ${S(sub())}\nEnvío: ${zona==='lima'?S(C.envioLima):'por confirmar (provincia)'}\n*Total: ${S(total())}*\n\nPago: ${PAY[pay].t}${file?' (comprobante adjunto)':''}\nNombre: ${f.nom.value}\nTeléfono: ${f.tel.value}${f.mail.value?'\nCorreo: '+f.mail.value:''}\nEntrega: ${f.ciu.value}, ${f.dir.value}${f.nota.value?'\nNotas: '+f.nota.value:''}`;
  const url=`https://wa.me/${C.wa}?text=${encodeURIComponent(msg)}`;let shared=false;
  if(file&&navigator.canShare&&navigator.canShare({files:[file]})){try{await navigator.share({files:[file],text:msg});shared=true}catch(x){}}
  if(!shared)window.open(url,'_blank','noopener');
  if(pay==='card'&&C.cardLink)window.open(C.cardLink,'_blank','noopener');
  const need=file&&!shared?'<p>Recuerda enviar tu captura del pago en el chat de WhatsApp indicando tu número de pedido.</p>':'';
  box.innerHTML=`<div class="ok"><h2>¡Pedido registrado!</h2><p class="no">${no}</p><p>Te escribiremos por WhatsApp para validar tu pago y coordinar el envío.</p>${need}<p style="margin:1.2rem 0"><a class="btn-solid" href="${url}" target="_blank" rel="noopener noreferrer">Abrir WhatsApp</a></p><button class="btn-text" id="ckDone">Seguir comprando</button></div>`;
  cart=[];save();render();$('#ckDone').onclick=closeCk}

$('#contactForm').addEventListener('submit',e=>{e.preventDefault();const f=e.target;window.open(`https://wa.me/${C.wa}?text=${encodeURIComponent(`Hola Nay Secret, les escribo desde la web:\nNombre: ${f.nombre.value}\nEmail: ${f.email.value}\nMensaje: ${f.mensaje.value}`)}`,'_blank','noopener')});
draw();render();
})();
