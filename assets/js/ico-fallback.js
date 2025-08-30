
// assets/js/ico-fallback.js
// Corrige les <span class="ico" style="background-image:url(A),url(B)"> pour
// n'afficher qu'UNE image : A si elle charge, sinon B.

(function () {
  function extractUrls(bg) {
    const out = [];
    String(bg).replace(/url\((['"]?)(.*?)\1\)/g, (_, __, u) => out.push(u));
    return out;
  }

  function setSingleBg(el, url) {
    el.style.backgroundImage = `url("${url}")`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".ico[style*='background-image']").forEach((el) => {
      const urls = extractUrls(el.style.backgroundImage);
      if (urls.length < 2) return; // rien à corriger

      const primary = urls[0];
      const fallback = urls[1];

      const test = new Image();
      test.onload = () => setSingleBg(el, primary);
      test.onerror = () => setSingleBg(el, fallback);
      // Pour éviter le "bloqué", on enlève l'empilement immédiatement :
      setSingleBg(el, fallback); // provisoire, puis on remplace si la 1re charge
      test.src = primary;
    });
  });
})();
