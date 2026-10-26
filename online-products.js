/* Nicks Laboratories: merge live Supabase products with the existing static catalogue. */
(async()=>{
 const cfg=window.NICKS_SUPABASE_CONFIG;
 const fallback=Array.isArray(window.NICKS_PRODUCTS)?window.NICKS_PRODUCTS:[];
 if(!cfg||!window.supabase){window.NICKS_PRODUCTS=fallback;return;}
 try{
  const client=window.supabase.createClient(cfg.url,cfg.key);
  const {data,error}=await client.from('products').select('id,name,category,pack,ingredients,description,images,published').eq('published',true);
  if(error)throw error;
  const live=(data||[]).map(p=>({...p,image:p.images?.[0]||''}));
  const names=new Set(live.map(p=>p.name.trim().toLowerCase()));
  window.NICKS_PRODUCTS=[...fallback.filter(p=>!names.has((p.name||'').trim().toLowerCase())),...live];
 }catch(e){console.warn('Live products unavailable; showing existing catalogue',e);window.NICKS_PRODUCTS=fallback;}
})();
