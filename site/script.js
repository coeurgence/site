const addParagraphs=(id,ps)=>{document.getElementById(id).innerHTML=ps.map(p=>`<p class="ripple-text">${p}</p>`).join("")};
document.getElementById("hero-lines").innerHTML=siteContent.hero.lines.map(x=>`<span class="ripple-text">${x}</span>`).join("");
document.getElementById("tagline").textContent=siteContent.hero.tagline;
document.getElementById("intro").textContent=siteContent.hero.intro;
document.getElementById("origins-title").textContent=siteContent.origins.title;
addParagraphs("origins-body",siteContent.origins.paragraphs);
document.getElementById("engagement-logos").innerHTML=siteContent.origins.engagements.map(i=>`<div class="logo-card"><img src="${i.file}" alt="${i.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='block';"><span class="logo-fallback" style="display:none">${i.name}</span></div>`).join("");
document.getElementById("approach-title").textContent=siteContent.approach.title;
addParagraphs("approach-body",siteContent.approach.paragraphs);
document.getElementById("principle-title").textContent=siteContent.approach.principleTitle;
document.getElementById("principle-body").textContent=siteContent.approach.principleBody;
document.getElementById("work-title").textContent=siteContent.work.title;
document.getElementById("work-intro").textContent=siteContent.work.intro;
document.getElementById("services").innerHTML=siteContent.work.services.map(s=>`<article class="service"><h3 class="ripple-text">${s.title}</h3><p>${s.text}</p></article>`).join("");
document.getElementById("contact-link").href=`mailto:${siteContent.work.email}`;
document.getElementById("vision-title").textContent=siteContent.vision.title;
addParagraphs("vision-body",siteContent.vision.paragraphs);
document.getElementById("footer-line").textContent=siteContent.footer;
document.getElementById("year").textContent=new Date().getFullYear();

const navLinks=[...document.querySelectorAll(".nav-link")];
const sections=[...document.querySelectorAll("main section[id]")];
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;navLinks.forEach(link=>link.classList.toggle("active",link.getAttribute("href")===`#${entry.target.id}`))})},{rootMargin:"-42% 0px -42% 0px",threshold:0});
sections.forEach(s=>observer.observe(s));
window.addEventListener("load",()=>document.body.classList.add("loaded"));

// ==========================================================
// water ripple that is actually visible on laptop
// ==========================================================

let rippleCooldown = 0;

function spawnTextRipple(target) {
  const first = document.createElement("span");
  first.className = "ripple-ring";

  const second = document.createElement("span");
  second.className = "ripple-ring ring-two";

  target.appendChild(first);
  target.appendChild(second);

  setTimeout(() => {
    first.remove();
    second.remove();
  }, 1100);
}

document.querySelectorAll(".ripple-text").forEach(target => {
  target.addEventListener("mouseenter", () => {
    spawnTextRipple(target);
  });

  target.addEventListener("mousemove", () => {
    const now = Date.now();
    if (now - rippleCooldown > 550) {
      spawnTextRipple(target);
      rippleCooldown = now;
    }
  });
});

// ==========================================================
// decorative hero current follows pointer gently
// ==========================================================

const heroCurrent = document.querySelector(".current-mark");

if (heroCurrent && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  heroCurrent.addEventListener("mousemove", event => {
    const rect = heroCurrent.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width) - .5;
    const ny = ((event.clientY - rect.top) / rect.height) - .5;

    heroCurrent.style.setProperty("--water-x", `${nx * 28}px`);
    heroCurrent.style.setProperty("--water-y", `${ny * 20}px`);
    heroCurrent.classList.add("cursor-active");
  });

  heroCurrent.addEventListener("mouseleave", () => {
    heroCurrent.style.setProperty("--water-x", "0px");
    heroCurrent.style.setProperty("--water-y", "0px");
    heroCurrent.classList.remove("cursor-active");
  });
}

// ==========================================================
// long thin signature line reveals with scroll on desktop
// ==========================================================

const signaturePath = document.getElementById("signature-path");
const signatureLayer = document.querySelector(".signature-current");

if (signaturePath && signatureLayer && window.innerWidth > 820) {
  const length = signaturePath.getTotalLength();
  signaturePath.style.strokeDasharray = length;
  signaturePath.style.strokeDashoffset = length;

  function resizeSignature() {
    signatureLayer.style.height =
      `${Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)}px`;
  }

  function updateSignature() {
    const max = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    );
    const progress = Math.max(0, Math.min(1, window.scrollY / max));
    const visible = Math.min(1, progress * 1.06 + .035);

    signaturePath.style.strokeDashoffset = length * (1 - visible);
  }

  resizeSignature();
  updateSignature();

  window.addEventListener("resize", () => {
    resizeSignature();
    updateSignature();
  });

  window.addEventListener("scroll", updateSignature, { passive: true });
}

// ==========================================================
// gentle essay reveals
// ==========================================================

document.querySelectorAll(".section > *").forEach(el => {
  if (!el.closest(".nav-panel")) el.classList.add("reveal-soft");
});

const softObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      softObserver.unobserve(entry.target);
    }
  });
}, { threshold: .08 });

document.querySelectorAll(".reveal-soft").forEach(el => softObserver.observe(el));
