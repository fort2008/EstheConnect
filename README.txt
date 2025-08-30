PATCH v3 — Chatbase + Contact + Devis par mail
====================================================
Fichiers à copier dans votre site :
- assets/css/ec-enhance.css
- assets/js/ec-enhance.js

À ajouter dans vos pages (ex. index.html), idéalement après vos CSS et avant </body> :
<head>
  <link rel="stylesheet" href="assets/css/ec-enhance.css">
  <script>window.embeddedChatbotConfig={chatbotId:"fFFT4q2Uol4y-qUwVpYBZ",domain:"www.chatbase.co"};</script>
  <script src="https://www.chatbase.co/embed.min.js" chatbotId="fFFT4q2Uol4y-qUwVpYBZ" domain="www.chatbase.co" defer></script>
</head>
...
<script defer src="assets/js/ec-enhance.js"></script>

Ce patch :
- Assure l’affichage de la bulle Chatbase (et ajoute une bulle locale “Chat” → WhatsApp si Chatbase est bloqué).
- Rend le bouton/entrée **CONTACT** fonctionnel via une modale propre.
- Ajoute **Devis par mail** (mailto vers aboprof.bm2@gmail.com, corps prérempli).
- Sécurise l’ouverture de la modale **RÉSERVER EN LIGNE**.
