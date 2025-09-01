const state = {
  lang: localStorage.getItem('lang') || 'fr',
  category: 'all',
  q: ''
};

const langs = ['fr','nl','en','de'];
const t = {
  fr:{ title:'Tarifs', subtitle:'Tous les tarifs des interventions', search:'Rechercher une intervention...', all:'Toutes', notice:'Prix indicatifs — confirmez par devis personnalisé.', cat:{
    face:'Visage', body:'Corps', dental:'Dentaire', hair:'Greffe de cheveux'
  }, cols:{ act:'Intervention', desc:'Détails', price:'Prix (€)', notes:'Remarques' } },
  nl:{ title:'Tarieven', subtitle:'Alle tarieven van de ingrepen', search:'Zoek een ingreep...', all:'Alles', notice:'Richtprijzen — bevestig via gepersonaliseerde offerte.', cat:{
    face:'Gezicht', body:'Lichaam', dental:'Tandheelkunde', hair:'Haartransplantatie'
  }, cols:{ act:'Ingreep', desc:'Details', price:'Prijs (€)', notes:'Opmerkingen' } },
  en:{ title:'Prices', subtitle:'All procedure prices', search:'Search a procedure...', all:'All', notice:'Indicative prices — confirm via personalized quote.', cat:{
    face:'Face', body:'Body', dental:'Dental', hair:'Hair Transplant'
  }, cols:{ act:'Procedure', desc:'Details', price:'Price (€)', notes:'Notes' } },
  de:{ title:'Preise', subtitle:'Alle Preise der Eingriffe', search:'Eingriff suchen...', all:'Alle', notice:'Richtpreise — per individuellem Kostenvoranschlag bestätigen.', cat:{
    face:'Gesicht', body:'Körper', dental:'Zahnmedizin', hair:'Haartransplantation'
  }, cols:{ act:'Eingriff', desc:'Details', price:'Preis (€)', notes:'Hinweise' } },
};

function setLang(l){
  state.lang = l; localStorage.setItem('lang', l);
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    const dict = t[state.lang];
    const parts = key.split('.');
    let cur = dict;
    for(const p of parts){ cur = cur?.[p]; }
    if(typeof cur === 'string') el.textContent = cur;
  });
  document.getElementById('q').placeholder = t[state.lang].search;
  renderTable();
}

function badge(txt){ return `<span class="pill"><span class="dot"></span>${txt}</span>`; }

async function loadData(){
  const resp = await fetch(`data/prices.${state.lang}.json`);
  if(!resp.ok){ console.warn('No lang file found, fallback to FR'); return await fetch('data/prices.fr.json').then(r=>r.json()); }
  return await resp.json();
}

function matches(item){
  const q = state.q.trim().toLowerCase();
  const inCat = state.category==='all' || item.category===state.category;
  const inText = !q || [item.name, item.desc, item.notes].filter(Boolean).some(s=>s.toLowerCase().includes(q));
  return inCat && inText;
}

let DATA = [];
async function renderTable(){
  if(!DATA.length){ DATA = await loadData(); }
  const dict = t[state.lang];
  document.getElementById('title').textContent = dict.title;
  document.getElementById('subtitle').textContent = dict.subtitle;
  document.getElementById('notice').textContent = dict.notice;
  document.querySelector('[data-i18n="cols.act"]').textContent = dict.cols.act;
  document.querySelector('[data-i18n="cols.desc"]').textContent = dict.cols.desc;
  document.querySelector('[data-i18n="cols.price"]').textContent = dict.cols.price;
  document.querySelector('[data-i18n="cols.notes"]').textContent = dict.cols.notes;

  const tbody = document.querySelector('#tbody');
  tbody.innerHTML = '';
  DATA.filter(matches).forEach(item=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><div>${item.name}</div><div class="small">${badge(labelFor(item.category))}</div></td>
      <td>${item.desc||''}</td>
      <td class="price">€ ${item.price}</td>
      <td>${item.notes||''}</td>`;
    tbody.appendChild(tr);
  });
}

function labelFor(cat){
  const d = t[state.lang].cat;
  return ({
    face: d.face, body: d.body, dental: d.dental, hair: d.hair
  })[cat] || t[state.lang].all;
}

function setCategory(cat, btn){
  state.category = cat;
  document.querySelectorAll('.filters .btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderTable();
}

window.addEventListener('DOMContentLoaded', ()=>{
  // lang buttons
  langs.forEach(l=>{
    const b = document.getElementById('lang-'+l);
    if(b){ b.addEventListener('click', ()=>setLang(l)); }
  });
  document.getElementById('q').addEventListener('input', (e)=>{ state.q = e.target.value; renderTable(); });
  setLang(state.lang);
});