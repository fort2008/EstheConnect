
// === Chatbase custom launcher + drawer ===
(function(){
  const CHATBOT_ID = "fFFT4q2Uol4y-qUwVpYBZ";
  const FRAME_URL = `https://www.chatbase.co/chatbot-iframe/${CHATBOT_ID}`;

  // 1) Injecter l'UI (bouton + panneau)
  function injectUI(){
    if (document.getElementById("cb-drawer")) return;

    const drawer = document.createElement("div");
    drawer.id = "cb-drawer";
    drawer.innerHTML = `
      <div class="cb-head">
        <span>Assistant EstheConnect</span>
        <button type="button" id="cb-close" aria-label="Fermer">×</button>
      </div>
      <iframe id="cb-frame" title="Chat EstheConnect" loading="lazy" allow="clipboard-write"></iframe>
    `;
    document.body.appendChild(drawer);

    const btn = document.createElement("button");
    btn.className = "cb-launcher";
    btn.type = "button";
    btn.setAttribute("aria-label","Ouvrir le chat");
    // Icône style "bulle souriante" (SVG)
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3c5.246 0 9.5 3.84 9.5 8.573 0 4.734-4.254 8.574-9.5 8.574-1.37 0-2.67-.246-3.862-.697l-3.83 1.363a.8.8 0 0 1-1.038-.98l1.094-3.16C2.6 14.94 2.5 14.07 2.5 12.573 2.5 6.84 6.754 3 12 3Z" fill="currentColor"/>
        <circle cx="9" cy="11" r="1.3" fill="#fff"/>
        <circle cx="15" cy="11" r="1.3" fill="#fff"/>
        <path d="M8.5 14.2c.9 1.1 2.1 1.8 3.5 1.8s2.6-.7 3.5-1.8" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/>
      </svg>`;
    document.body.appendChild(btn);

    // Listeners
    btn.addEventListener("click", openDrawer);
    drawer.querySelector("#cb-close").addEventListener("click", closeDrawer);
    // fermer Échap / clic en dehors (optionnel)
    document.addEventListener("keydown", e => { if(e.key==="Escape") closeDrawer(); });
  }

  function openDrawer(){
    const drawer = document.getElementById("cb-drawer");
    const frame  = document.getElementById("cb-frame");
    if (!frame.src) frame.src = FRAME_URL; // charge l’iframe au premier clic
    drawer.classList.add("open");
  }
  function closeDrawer(){
    document.getElementById("cb-drawer").classList.remove("open");
  }

  // 2) Charger le script Chatbase (utile si tu veux aussi l’embed par défaut ailleurs)
  function loadChatbaseScript(){
    if (document.querySelector('script[src*="chatbase.co/embed.min.js"]')) return;
    window.embeddedChatbotConfig = { chatbotId: CHATBOT_ID, domain: "www.chatbase.co" };
    const s = document.createElement("script");
    s.src = "https://www.chatbase.co/embed.min.js";
    s.defer = true;
    s.setAttribute("chatbotId", CHATBOT_ID);
    s.setAttribute("domain", "www.chatbase.co");
    document.head.appendChild(s);
  }

  // Init
  document.addEventListener("DOMContentLoaded", ()=>{
    injectUI();
    loadChatbaseScript();
  });
})();
