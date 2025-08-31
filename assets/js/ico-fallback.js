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
      if (urls.length < 2) return;
      const primary = urls[0], fallback = urls[1];
      const test = new Image();
      test.onload = () => setSingleBg(el, primary);
      test.onerror = () => setSingleBg(el, fallback);
      setSingleBg(el, fallback); // provisoire
      test.src = primary;
    });
  });
})();
