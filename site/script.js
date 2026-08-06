const addParagraphs = (elementId, paragraphs) => {
  document.getElementById(elementId).innerHTML = paragraphs.map((p) => `<p>${p}</p>`).join("");
};

document.getElementById("hero-lines").innerHTML = siteContent.hero.lines.map((line) => `<span>${line}</span>`).join("");
document.getElementById("tagline").textContent = siteContent.hero.tagline;
document.getElementById("intro").textContent = siteContent.hero.intro;

document.getElementById("origins-title").textContent = siteContent.origins.title;
addParagraphs("origins-body", siteContent.origins.paragraphs);

document.getElementById("approach-title").textContent = siteContent.approach.title;
addParagraphs("approach-body", siteContent.approach.paragraphs);
document.getElementById("principle-title").textContent = siteContent.approach.principleTitle;
document.getElementById("principle-body").textContent = siteContent.approach.principleBody;

document.getElementById("work-title").textContent = siteContent.work.title;
document.getElementById("work-intro").textContent = siteContent.work.intro;
document.getElementById("services").innerHTML = siteContent.work.services.map((service) => `
  <article class="service">
    <h3>${service.title}</h3>
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

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-42% 0px -42% 0px", threshold: 0 });

sections.forEach((section) => observer.observe(section));
