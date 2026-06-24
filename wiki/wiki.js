const links = [...document.querySelectorAll(".toc a")];
const sections = links
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (sections.length > 0) {
  const setActive = () => {
    let active = sections[0].id;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= 140) {
        active = section.id;
      }
    }
    for (const link of links) {
      link.toggleAttribute("aria-current", link.getAttribute("href") === `#${active}`);
    }
  };

  document.addEventListener("scroll", setActive, { passive: true });
  setActive();
}
