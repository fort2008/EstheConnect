
// Footer year + modal behaviours
(function(){
  document.addEventListener("DOMContentLoaded", ()=>{
    const y=document.getElementById("year"); if(y) y.textContent=(new Date).getFullYear();
  });
  document.addEventListener("click", (e)=>{
    const trg = e.target.closest("[data-reserve-open]"); 
    if(!trg) return;
    e.preventDefault();
    const m = document.getElementById("reserveModal");
    if(m) m.hidden = false;
  });
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
})();
