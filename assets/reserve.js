
// Simple reservation modal logic
(function(){
  const modal = document.getElementById('reserveModal');
  const openers = document.querySelectorAll('[data-reserve-open]');
  const closeBtn = document.getElementById('reserveClose');
  const overlay = modal;
  function open(){ modal.removeAttribute('hidden'); document.body.style.overflow='hidden'; }
  function close(){ modal.setAttribute('hidden',''); document.body.style.overflow=''; }
  openers.forEach(b=>b.addEventListener('click', (e)=>{ e.preventDefault(); open(); }));
  closeBtn.addEventListener('click', (e)=>{ e.preventDefault(); close(); });
  overlay.addEventListener('click', (e)=>{ if(e.target===overlay) close(); });
  // country buttons: build WhatsApp links
  const WA='21628296239';
  function handler(country){ return function(){ 
    const msg = encodeURIComponent('Bonjour, je souhaite réserver en ligne — Pays: '+country+' (via EstheConnect).');
    window.open('https://wa.me/'+WA+'?text='+msg, '_blank'); 
  };}
  ['tn','be','fr'].forEach(c=>{
    const el = document.querySelector('[data-resv-'+c+']');
    if(el) el.addEventListener('click', handler(el.getAttribute('data-country')));
  });
})();
