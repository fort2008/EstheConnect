
// Patch intégré v4 : Chatbase + fallback, Contact modal, Devis mail, Reserve hook
(function(){
  const EMAIL_TO = "aboprof.bm2@gmail.com";
  const WHATSAPP = "21628296239";
  const CHATBOT_ID = "fFFT4q2Uol4y-qUwVpYBZ";

  // --- Chatbase + fallback
  function initChat(){
    try{
      window.embeddedChatbotConfig = { chatbotId: CHATBOT_ID, domain: "www.chatbase.co" };
      if(!document.querySelector('script[src*="chatbase.co/embed.min.js"]')){
        const s = document.createElement('script');
        s.src = "https://www.chatbase.co/embed.min.js";
        s.defer = true;
        s.setAttribute("chatbotId", CHATBOT_ID);
        s.setAttribute("domain", "www.chatbase.co");
        document.head.appendChild(s);
      }
    }catch(e){}
    setTimeout(()=>{
      const ok = document.querySelector('iframe[src*="chatbase"], .chatbase-bubble, .chatbase-widget');
      if(!ok && !document.querySelector('.ec-fab')){
        const b = document.createElement('button');
        b.className = 'ec-fab';
        b.type = 'button';
        b.textContent = 'Chat';
        b.addEventListener('click', ()=>{ location.href = `https://wa.me/${WHATSAPP}`; });
        document.body.appendChild(b);
      }
    }, 3500);
  }

  // --- Contact modal
  function ensureContactModal(){
    if(document.getElementById('ecContactModal')) return;
    const m = document.createElement('div');
    m.className = 'ec-modal';
    m.id = 'ecContactModal';
    m.hidden = true;
    m.innerHTML = `
      <div class="ec-box">
        <div class="ec-head">
          <h3 style="margin:0">Contact & Devis</h3>
          <button class="ec-x" data-x aria-label="Fermer">×</button>
        </div>
        <div class="ec-body">
          <div class="ec-row">
            <div><strong>WhatsApp</strong><div style="color:#555">Contact direct</div></div>
            <a class="ec-btn" href="https://wa.me/${WHATSAPP}" target="_blank" rel="noopener">Ouvrir WhatsApp</a>
          </div>
          <div class="ec-row">
            <div><strong>Devis par e-mail</strong><div style="color:#555">Sans afficher de numéro</div></div>
            <a class="ec-btn" id="ecMailBtn" href="#">Devis par mail</a>
          </div>
        </div>
      </div>`;
    document.body.appendChild(m);

    m.addEventListener('click', (e)=>{ if(e.target===m || e.target.matches('[data-x]')) m.hidden = true; });
    document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') m.hidden = true; });

    m.querySelector('#ecMailBtn').addEventListener('click', (e)=>{
      e.preventDefault();
      const subj = encodeURIComponent('Demande de devis — EstheConnect');
      const body = encodeURIComponent(
        "Bonjour,\n\nJe souhaite un devis :\n- Nom : \n- Téléphone (WhatsApp) : \n- Intervention : \n- Pays : \n- Date souhaitée : \n- Détails : \n\nMerci."
      );
      location.href = `mailto:${EMAIL_TO}?subject=${subj}&body=${body}`;
    });
  }
  function openContact(){ ensureContactModal(); document.getElementById('ecContactModal').hidden = false; }

  // --- Hooks
  document.addEventListener('click', (e)=>{
    const a = e.target.closest('a,button');
    if(!a) return;
    const text = (a.textContent||'').trim().toLowerCase();
    const href = (a.getAttribute('href')||'').toLowerCase();
    // CONTACT links
    if(text === 'contact' || href === '#contact' || href.endsWith('/#contact')){
      e.preventDefault();
      openContact();
    }
    // Reserve button
    if(a.hasAttribute('data-reserve-open')){
      e.preventDefault();
      const modal = document.getElementById('reserveModal');
      if(modal) modal.hidden = false;
    }
  });

  initChat();
})();
