
// reserver.html helper
(function(){
  function qs(name){ return new URLSearchParams(location.search).get(name) || ""; }
  document.addEventListener("DOMContentLoaded", ()=>{
    const country = (qs("country") || "").toLowerCase();
    if(country){
      const el = document.querySelector(`[data-country='${country}']`);
      if(el) el.scrollIntoView({behavior:"smooth", block:"start"});
    }
  });
})();
