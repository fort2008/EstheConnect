// chat-inject.js — Charge seulement Chatbase, aucun fallback
(function () {
  const CHATBOT_ID = "fFFT4q2Uol4y-qUwVpYBZ";
  window.embeddedChatbotConfig = { chatbotId: CHATBOT_ID, domain: "www.chatbase.co" };
  if (!document.querySelector('script[src*="chatbase.co/embed.min.js"]')) {
    const s = document.createElement("script");
    s.src = "https://www.chatbase.co/embed.min.js";
    s.defer = true;
    s.setAttribute("chatbotId", CHATBOT_ID);
    s.setAttribute("domain", "www.chatbase.co");
    document.head.appendChild(s);
  }
})();
