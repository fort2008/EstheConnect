
/**
 * EstheConnect chat injector
 * Supports Chatbase (bot) and Crisp (live). See data attributes.
 * It auto-removes the pink fallback bubble (.fab-chat).
 */
(function(){
  try{
    var s = document.currentScript || (function(){var a=document.getElementsByTagName('script');return a[a.length-1]})();
    var fb = document.querySelector('.fab-chat'); if (fb) fb.remove();
    var mode = (s.dataset.chat || 'chatbase').toLowerCase();
    var id = s.dataset.chatId || '';
    if(!id){ console.warn('[chat-inject] Missing data-chat-id'); return; }
    if(mode === 'chatbase'){
      window.embeddedChatbotConfig = { chatbotId: id, domain: "www.chatbase.co" };
      var sc = document.createElement('script');
      sc.src = "https://www.chatbase.co/embed.min.js"; sc.defer = true;
      sc.setAttribute('chatbotId', id); sc.setAttribute('domain','www.chatbase.co');
      document.body.appendChild(sc);
    }else if(mode === 'crisp'){
      window.$crisp=[]; window.CRISP_WEBSITE_ID=id;
      var sc2=document.createElement("script"); sc2.src="https://client.crisp.chat/l.js"; sc2.async=1;
      document.head.appendChild(sc2);
    }
  }catch(e){ console.error('[chat-inject]', e); }
})();
