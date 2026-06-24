const buttons = Array.from(document.querySelectorAll("[data-set-lang]"));
const panels = Array.from(document.querySelectorAll("[data-lang-panel]"));

function setLanguage(lang) {
  document.documentElement.lang = lang;
  buttons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.setLang === lang));
  });
  panels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.langPanel === lang);
  });
  const url = new URL(window.location.href);
  url.searchParams.set("lang", lang);
  history.replaceState(null, "", url);
}

buttons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.setLang));
});

const initial = new URL(window.location.href).searchParams.get("lang") || "it";
setLanguage(["it", "en", "es"].includes(initial) ? initial : "it");
