// Misc UI helpers: year, reserve modal open + contact modal
(function(){
  // Footer year
  document.addEventListener("DOMContentLoaded", ()=>{
    const y=document.getElementById("year"); if(y) y.textContent=(new Date).getFullYear();
  });

  // Reserve: open modal from any [data-reserve-open]
  document.addEventListener("click", (e)=>{
    const trg = e.target.closest("[data-reserve-open]"); 
    if(!trg) return;
    e.preventDefault();
    const m = document.getElementById("reserveModal");
    if(m) m.hidden = false;
  });

  // Close reserve modal
  window.addEventListener("click",(e)=>{
    const m = document.getElementById("reserveModal"); if(!m) return;
    if(e.target===m) m.hidden=true;
  });
  document.addEventListener("keydown",(e)=>{
    const m = document.getElementById("reserveModal"); if(!m) return;
    if(e.key==="Escape") m.hidden=true;
  });
  document.addEventListener("click",(e)=>{
    if(e.target && e.target.matches("#reserveClose,.xbtn")) {
      const m=document.getElementById("reserveModal"); if(m) m.hidden=true;
    }
  });

  // Contact modal (can be opened from elsewhere by dispatching ec:open-contact)
  document.addEventListener("ec:open-contact", ()=>{
    let m=document.getElementById("ecContactModal");
    if(!m){
      m=document.createElement("div"); m.className="ec-modal"; m.id="ecContactModal"; m.hidden=true;
      m.innerHTML=`
        <div class="ec-box">
          <div class="ec-head">
            <h3 style="margin:0">Contact</h3>
            <button class="ec-x" data-x aria-label="Fermer">×</button>
          </div>
          <div class="ec-body">
            <div class="ec-row">
              <div><strong>Devis par e-mail</strong><div style="color:#555">Réponse sous 24–48 h</div></div>
              <a class="ec-btn" href="mailto:aboprof.bm2@gmail.com?subject=Devis%20—%20EstheConnect&body=Bonjour,%0A%0AMerci de m'envoyer un devis.%0A-%20Nom:%0A-%20Téléphone%20(optionnel):%0A-%20Intervention:%0A-%20Pays:%0A-%20Date%20souhaitée:%0A-%20Détails:%0A">Devis par mail</a>
            </div>
          </div>
        </div>`;
      document.body.appendChild(m);
      m.addEventListener("click",(e)=>{ if(e.target===m || e.target.hasAttribute("data-x")) m.hidden=true; });
      document.addEventListener("keydown",(e)=>{ if(e.key==="Escape") m.hidden=true; });
    }
    m.hidden=false;
  });
})();