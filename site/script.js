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


// ==========================================================
// true cursor ripple on text
// ==========================================================

const rippleTargets = [...document.querySelectorAll(".ripple-text")];
let lastRippleTime = 0;

function createRipple(target, event) {
  const rect = target.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const ringA = document.createElement("span");
  ringA.className = "water-ripple";
  ringA.style.left = `${x}px`;
  ringA.style.top = `${y}px`;

  const ringB = document.createElement("span");
  ringB.className = "water-ripple secondary";
  ringB.style.left = `${x}px`;
  ringB.style.top = `${y}px`;

  target.appendChild(ringA);
  target.appendChild(ringB);

  setTimeout(() => {
    ringA.remove();
    ringB.remove();
  }, 1250);
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  rippleTargets.forEach(target => {
    target.addEventListener("pointerenter", event => {
      createRipple(target, event);
      lastRippleTime = performance.now();
    });

    target.addEventListener("pointermove", event => {
      const now = performance.now();
      if (now - lastRippleTime > 420) {
        createRipple(target, event);
        lastRippleTime = now;
      }
    });
  });
}

// ==========================================================
// continuous signature current that reveals with scroll
// ==========================================================

const signaturePath = document.getElementById("signature-path");
const signatureLayer = document.querySelector(".signature-current");

if (signaturePath && signatureLayer) {
  const pathLength = signaturePath.getTotalLength();

  signaturePath.style.strokeDasharray = pathLength;
  signaturePath.style.strokeDashoffset = pathLength;

  function sizeSignatureLayer() {
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );

    signatureLayer.style.height = `${docHeight}px`;
  }

  function drawSignatureFromScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    );

    const progress = Math.min(1, Math.max(0, scrollTop / maxScroll));

    // Draw slightly ahead of the exact scroll point so the line feels
    // like it is gently leading the reader rather than chasing them.
    const easedProgress = Math.min(1, progress * 1.08 + 0.03);
    signaturePath.style.strokeDashoffset =
      pathLength * (1 - easedProgress);
  }

  sizeSignatureLayer();
  drawSignatureFromScroll();

  window.addEventListener("resize", () => {
    sizeSignatureLayer();
    drawSignatureFromScroll();
  });

  window.addEventListener("scroll", drawSignatureFromScroll, {
    passive: true
  });

  window.addEventListener("load", () => {
    sizeSignatureLayer();
    drawSignatureFromScroll();
  });
}
