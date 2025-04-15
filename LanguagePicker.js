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
        console.log("✅ File loaded:", data);
        for (const key in data) {
          const el = document.getElementById(key);
          if (el) {
            el.textContent = data[key];
          } else {
            console.warn(`⚠️ Element with ID '${key}' doesn't exists on this page.`);
          }
        }
      })
      .catch(err => {
        console.error("❌ Error with loading file:", err);
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