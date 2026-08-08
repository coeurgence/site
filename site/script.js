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
// v6: guaranteed visible cursor ripple
// ==========================================================

const rippleOverlay = document.getElementById("ripple-overlay");
let rippleTimer = 0;

function makeCursorRipple(x, y) {
  if (!rippleOverlay) return;

  const ring1 = document.createElement("span");
  ring1.className = "cursor-ripple";
  ring1.style.left = `${x}px`;
  ring1.style.top = `${y}px`;

  const ring2 = document.createElement("span");
  ring2.className = "cursor-ripple secondary";
  ring2.style.left = `${x}px`;
  ring2.style.top = `${y}px`;

  rippleOverlay.appendChild(ring1);
  rippleOverlay.appendChild(ring2);

  window.setTimeout(() => {
    ring1.remove();
    ring2.remove();
  }, 1100);
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll(".ripple-text").forEach(target => {
    target.addEventListener("mouseenter", event => {
      makeCursorRipple(event.clientX, event.clientY);
      rippleTimer = performance.now();
    });

    target.addEventListener("mousemove", event => {
      const now = performance.now();
      if (now - rippleTimer > 500) {
        makeCursorRipple(event.clientX, event.clientY);
        rippleTimer = now;
      }
    });
  });
}

// ==========================================================
// v6: hero current follows the cursor, gently
// ==========================================================

const decorativeCurrent = document.querySelector(".current-mark");

if (
  decorativeCurrent &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  decorativeCurrent.addEventListener("mousemove", event => {
    const rect = decorativeCurrent.getBoundingClientRect();

    const nx = ((event.clientX - rect.left) / rect.width) - .5;
    const ny = ((event.clientY - rect.top) / rect.height) - .5;

    decorativeCurrent.style.setProperty("--water-x", `${nx * 28}px`);
    decorativeCurrent.style.setProperty("--water-y", `${ny * 20}px`);
    decorativeCurrent.classList.add("cursor-active");
  });

  decorativeCurrent.addEventListener("mouseleave", () => {
    decorativeCurrent.style.setProperty("--water-x", "0px");
    decorativeCurrent.style.setProperty("--water-y", "0px");
    decorativeCurrent.classList.remove("cursor-active");
  });
}

// ==========================================================
// v6: reveal the fixed signature line with scroll
// ==========================================================

const bgPath = document.getElementById("background-current-path");

if (bgPath) {
  const len = bgPath.getTotalLength();
  bgPath.style.strokeDasharray = len;
  bgPath.style.strokeDashoffset = len;

  function updateBackgroundCurrent() {
    const maxScroll = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    );

    const p = Math.max(0, Math.min(1, window.scrollY / maxScroll));

    // A little is visible on arrival; it completes toward Vision.
    const reveal = Math.min(1, .10 + p * .90);

    bgPath.style.strokeDashoffset = len * (1 - reveal);
  }

  updateBackgroundCurrent();
  window.addEventListener("scroll", updateBackgroundCurrent, { passive: true });
}
