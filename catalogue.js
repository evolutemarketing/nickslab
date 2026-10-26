(()=>{
const list=Array.isArray(window.NICKS_PRODUCTS)?window.NICKS_PRODUCTS:[];
const grid=document.querySelector('.cards');if(!grid)return;
const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const validImage=s=>typeof s==='string'&&(s.startsWith('assets/')||/^data:image\/(png|jpeg|webp);base64,/.test(s));
for(const p of list.filter(p=>p.published)){
 const btn=document.createElement('button');btn.type='button';btn.className='product';btn.dataset.name=p.name||'';btn.dataset.cat=p.category||'Other';
 const im=document.createElement('img');im.loading='lazy';im.alt=(p.name||'Product')+' image';const photos=(Array.isArray(p.images)?p.images:[p.image]).filter(validImage).slice(0,4);if(photos.length)im.src=photos[0];
 const info=document.createElement('div');info.className='info';info.innerHTML='<span class="tag">'+esc(p.category)+'</span><h3>'+esc(p.name)+'</h3><span class="muted">'+esc(p.ingredients||p.pack||'View product details')+'</span>';
 btn.append(im,info);btn.addEventListener('click',()=>{
 document.getElementById('modalname').textContent=p.name||'';
 document.getElementById('modalcat').textContent=p.category||'';
 const modalimg=document.getElementById('modalimg');modalimg.removeAttribute('src');if(photos.length)modalimg.src=photos[0];let thumbs=document.getElementById('nicks-gallery-thumbs');if(!thumbs){thumbs=document.createElement('div');thumbs.id='nicks-gallery-thumbs';modalimg.insertAdjacentElement('afterend',thumbs)}thumbs.replaceChildren();photos.forEach((src,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label','View product image '+(i+1));const pic=document.createElement('img');pic.src=src;pic.alt='Product view '+(i+1);b.append(pic);b.onclick=()=>{modalimg.src=src;thumbs.querySelectorAll('button').forEach(x=>x.classList.remove('active'));b.classList.add('active')};if(i===0)b.classList.add('active');thumbs.append(b)});
 const details=document.querySelector('.modal .details');
 let extra=details.querySelector('.offline-details');if(!extra){extra=document.createElement('div');extra.className='offline-details';details.insertBefore(extra,details.querySelector('a.pill'));}
 extra.replaceChildren();for(const [label,value] of [['Composition / Ingredients',p.ingredients],['Pack size',p.pack],['Description',p.description]]){if(value){let h=document.createElement('b');h.textContent=label;let t=document.createElement('p');t.className='muted';t.textContent=value;extra.append(h,t)}}
 document.getElementById('overlay').classList.add('open');
 });grid.append(btn);
}
const style=document.createElement('style');style.textContent='.product[hidden]{display:none!important}#nicks-gallery-thumbs{display:flex;gap:8px;padding:8px 15px;flex-wrap:wrap;background:#eef6fc;grid-column:1}#nicks-gallery-thumbs button{border:2px solid transparent;border-radius:8px;padding:3px;background:white;cursor:pointer}#nicks-gallery-thumbs button.active{border-color:#076eb8}#nicks-gallery-thumbs img{height:60px;width:60px;object-fit:contain;padding:2px;background:white}.modal #modalimg{grid-column:1;max-width:100%}.modal .details{grid-column:2;grid-row:1 / span 2}@media(max-width:760px){.modal .details{grid-column:1;grid-row:auto}}';document.head.append(style);
})();