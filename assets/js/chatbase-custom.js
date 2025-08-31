
(function(){
  const CHATBOT_ID="fFFT4q2Uol4y-qUwVpYBZ";
  const FRAME_URL=`https://www.chatbase.co/chatbot-iframe/${CHATBOT_ID}`;

  function detectLang(){
    const htmlLang = (document.documentElement.getAttribute("lang")||"").toLowerCase();
    const navLang = (navigator.language||"").toLowerCase();
    const pick = (l)=>l.slice(0,2);
    let code = pick(htmlLang || navLang || "fr");
    if(!/^(fr|en|nl|de)$/.test(code)) code = "fr";
    return code;
  }

  const TEXTS = {
    fr: {
      title: "Assistance EstheConnect",
      body: "Bonjour, je suis votre assistante virtuelle EstheConnect. Posez-moi une question et j’essaierai de vous aider le plus rapidement possible ! Veuillez ne pas entrer d’informations confidentielles ou personnelles.",
      close: "Fermer",
      start: "Commencer"
    },
    en: {
      title: "EstheConnect Assistant",
      body: "Hello! I’m your virtual assistant at EstheConnect. Ask me anything and I’ll try to help as quickly as possible. Please don’t enter confidential or personal information.",
      close: "Close",
      start: "Start"
    },
    nl: {
      title: "EstheConnect Assistent",
      body: "Hallo! Ik ben uw virtuele assistent bij EstheConnect. Stel uw vraag en ik help u zo snel mogelijk. Gelieve geen vertrouwelijke of persoonlijke informatie in te voeren.",
      close: "Sluiten",
      start: "Starten"
    },
    de: {
      title: "EstheConnect Assistenz",
      body: "Hallo! Ich bin Ihre virtuelle Assistentin bei EstheConnect. Stellen Sie Ihre Frage, und ich helfe so schnell wie möglich. Bitte keine vertraulichen oder persönlichen Daten eingeben.",
      close: "Schließen",
      start: "Starten"
    }
  };

  function injectUI(){
    if(document.getElementById("cb-drawer")) return;
    const drawer=document.createElement("div");
    drawer.id="cb-drawer";
    drawer.innerHTML=`
      <div class="cb-head">
        <span>Assistance EstheConnect</span>
        <button type="button" id="cb-close" aria-label="Fermer">×</button>
      </div>
      <iframe id="cb-frame" title="Chat EstheConnect" loading="lazy" allow="clipboard-write"></iframe>
    `;
    document.body.appendChild(drawer);

    const btn=document.createElement("button");
    btn.className="cb-launcher"; btn.type="button"; btn.setAttribute("aria-label","Ouvrir le chat");
    btn.innerHTML=`
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3c5.246 0 9.5 3.84 9.5 8.573 0 4.734-4.254 8.574-9.5 8.574-1.37 0-2.67-.246-3.862-.697l-3.83 1.363a.8.8 0 0 1-1.038-.98l1.094-3.16C2.6 14.94 2.5 14.07 2.5 12.573 2.5 6.84 6.754 3 12 3Z" fill="currentColor"/>
        <circle cx="9" cy="11" r="1.3" fill="#fff"/>
        <circle cx="15" cy="11" r="1.3" fill="#fff"/>
        <path d="M8.5 14.2c.9 1.1 2.1 1.8 3.5 1.8s2.6-.7 3.5-1.8" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/>
      </svg>`;
    document.body.appendChild(btn);

    btn.addEventListener("click",openDrawer);
    drawer.querySelector("#cb-close").addEventListener("click",closeDrawer);
    document.addEventListener("keydown",e=>{if(e.key==="Escape") closeDrawer();});
  }

  function buildGreeting(){
    const lang = detectLang();
    const t = TEXTS[lang] || TEXTS.fr;
    const div = document.createElement("div");
    div.id="cb-greet";
    div.className="cb-greet";
    div.innerHTML = `
      <p class="title">${t.title}</p>
      <p class="txt">${t.body}</p>
      <div class="bar">
        <button class="btn ghost" type="button" id="cb-greet-close">${t.close}</button>
        <button class="btn" type="button" id="cb-greet-start">${t.start}</button>
      </div>`;
    return div;
  }

  function openDrawer(){
    const d=document.getElementById("cb-drawer");
    const f=document.getElementById("cb-frame");
    if(!f.src) f.src=FRAME_URL; 
    d.classList.add("open");

    if(!document.getElementById("cb-greet")){
      const greet = buildGreeting();
      d.insertBefore(greet, f);
      const hide = ()=>greet.remove();
      greet.querySelector("#cb-greet-close").addEventListener("click", hide);
      greet.querySelector("#cb-greet-start").addEventListener("click", ()=>{ try{f.contentWindow.focus();}catch(e){} hide(); });
    }
  }

  function closeDrawer(){ const d=document.getElementById("cb-drawer"); if(d) d.classList.remove("open"); }

  function loadChatbaseScript(){
    if(document.querySelector('script[src*="chatbase.co/embed.min.js"]')) return;
    window.embeddedChatbotConfig={chatbotId:CHATBOT_ID,domain:"www.chatbase.co"};
    const s=document.createElement("script"); s.src="https://www.chatbase.co/embed.min.js"; s.defer=true;
    s.setAttribute("chatbotId",CHATBOT_ID); s.setAttribute("domain","www.chatbase.co"); document.head.appendChild(s);
  }

  document.addEventListener("DOMContentLoaded",()=>{injectUI();loadChatbaseScript();});
})();
