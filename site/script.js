const addParagraphs = (id, paragraphs) => {
  document.getElementById(id).innerHTML =
    paragraphs.map(p => `<p class="ripple-text">${p}</p>`).join("");
};

document.getElementById("hero-lines").innerHTML =
  siteContent.hero.lines.map(line => `<span class="ripple-text">${line}</span>`).join("");

document.getElementById("tagline").textContent = siteContent.hero.tagline;
document.getElementById("intro").textContent = siteContent.hero.intro;

document.getElementById("origins-title").textContent = siteContent.origins.title;
addParagraphs("origins-body", siteContent.origins.paragraphs);

document.getElementById("engagement-logos").innerHTML =
  siteContent.origins.engagements.map(item => `
    <div class="logo-card">
      <img
        src="${item.file}"
        alt="${item.name}"
        onerror="this.style.display='none';this.nextElementSibling.style.display='block';"
      >
      <span class="logo-fallback" style="display:none">${item.name}</span>
    </div>
  `).join("");

document.getElementById("approach-title").textContent = siteContent.approach.title;
addParagraphs("approach-body", siteContent.approach.paragraphs);
document.getElementById("principle-title").textContent = siteContent.approach.principleTitle;
document.getElementById("principle-body").textContent = siteContent.approach.principleBody;

document.getElementById("work-title").textContent = siteContent.work.title;
document.getElementById("work-intro").textContent = siteContent.work.intro;

document.getElementById("services").innerHTML =
  siteContent.work.services.map(service => `
    <article class="service">
      <h3 class="ripple-text">${service.title}</h3>
      <p>${service.text}</p>
    </article>
  `).join("");

document.getElementById("contact-link").href = `mailto:${siteContent.work.email}`;

document.getElementById("vision-title").textContent = siteContent.vision.title;
addParagraphs("vision-body", siteContent.vision.paragraphs);

document.getElementById("footer-line").textContent = siteContent.footer;
document.getElementById("year").textContent = new Date().getFullYear();

const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = [...document.querySelectorAll("main section[id]")];

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    navLinks.forEach(link => {
      const active = link.getAttribute("href") === `#${entry.target.id}`;
      link.classList.toggle("active", active);
    });
  });
}, {
  rootMargin: "-42% 0px -42% 0px",
  threshold: 0
});

sections.forEach(section => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: .12
});

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const current = document.getElementById("current-mark");

if (current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  current.addEventListener("pointermove", event => {
    const rect = current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;

    current.style.setProperty("--dx", `${x * 24}px`);
    current.style.setProperty("--dy", `${y * 18}px`);
    current.classList.add("cursor-active");
  });

  current.addEventListener("pointerleave", () => {
    current.style.setProperty("--dx", "0px");
    current.style.setProperty("--dy", "0px");
    current.classList.remove("cursor-active");
  });
}

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
