document.addEventListener("DOMContentLoaded", () => {
  const languageSelect = document.getElementById("languageSelect");
  const defaultLang = localStorage.getItem("siteLang") || "nl";

  function loadLanguage(lang) {
    fetch(`lang/${lang}.json`)
      .then(res => {
        if (!res.ok) throw new Error(`Language-file not found: ${lang}.json`);
        return res.json();
      })
      .then(data => {
        console.log("✅ File successfully loaded:", data);
        for (const key in data) {
          const el = document.getElementById(key);
          if (el) {
            el.textContent = data[key];
          } else {
            console.warn(`⚠️ Element with ID '${key}' doesn't exists on this page. This can happen when it wants to load an element that's not on this page, but on another one. If you don't see any text on this page, please reload the page.`);
          }
        }
      })
      .catch(err => {
        console.error("❌ Error with loading file:", err, "Please refresh the site or contact me via my GitHub-profile.");
      });

    document.documentElement.lang = lang;
    localStorage.setItem("siteLang", lang);
    if (languageSelect) languageSelect.value = lang;
  }

  loadLanguage(defaultLang);

  if (languageSelect) {
    languageSelect.addEventListener("change", (e) => {
      loadLanguage(e.target.value);
    });
  }
});