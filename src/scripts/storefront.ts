import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const productPhotos = document.querySelectorAll<HTMLImageElement>(".product-photo");

productPhotos.forEach((image) => {
  const card = image.closest("article");
  const fallback = image.nextElementSibling;
  const status = card?.querySelector<HTMLElement>("[data-image-status]");
  const picker = card?.querySelector<HTMLInputElement>("[data-image-input]");
  const productId = image.dataset.productImage;

  if (!card || !(fallback instanceof HTMLElement) || !status || !picker || !productId) {
    throw new Error("A product photo is missing its fallback or image controls.");
  }

  const showPhoto = () => {
    image.classList.add("is-loaded");
    fallback.hidden = true;
  };

  const showFallback = () => {
    image.classList.remove("is-loaded");
    fallback.hidden = false;
  };

  image.addEventListener("load", showPhoto);
  image.addEventListener("error", () => {
    showFallback();
    status.textContent = "Photo unavailable. Showing the phone illustration.";
  });

  try {
    const savedImage = localStorage.getItem(`alphaPhone.productImage.${productId}`);
    if (savedImage) image.src = savedImage;
  } catch {
    status.textContent = "Saved photos are unavailable in this browser.";
  }

  if (image.complete && image.naturalWidth > 0) {
    showPhoto();
  } else if (image.complete) {
    showFallback();
  }

  picker.addEventListener("change", () => {
    const file = picker.files?.[0];
    picker.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      status.textContent = "Please choose an image file.";
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (typeof reader.result !== "string") {
        status.textContent = "Could not read that image. Please try another.";
        return;
      }

      image.src = reader.result;
      try {
        localStorage.setItem(`alphaPhone.productImage.${productId}`, reader.result);
        status.textContent = "Photo updated and saved in this browser.";
      } catch {
        status.textContent = "Photo updated, but could not be saved in this browser.";
      }
    });
    reader.addEventListener("error", () => {
      status.textContent = "Could not read that image. Please try another.";
    });
    reader.readAsDataURL(file);
  });
});

const heroPhones = document.getElementById("heroPhones");
const heroPhoto = heroPhones?.querySelector<HTMLImageElement>(".hero-photo");

if (!heroPhones || !heroPhoto) {
  throw new Error("The hero phone image and fallback are required.");
}

heroPhoto.addEventListener("load", () => {
  heroPhoto.classList.add("is-loaded");
  heroPhones.classList.add("has-custom-image");
});
heroPhoto.addEventListener("error", () => {
  heroPhoto.classList.remove("is-loaded");
  heroPhones.classList.remove("has-custom-image");
});

if (heroPhoto.complete && heroPhoto.naturalWidth > 0) {
  heroPhoto.classList.add("is-loaded");
  heroPhones.classList.add("has-custom-image");
}

gsap.registerPlugin(ScrollTrigger);

const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const html = document.documentElement;
const progressBar = document.getElementById("progressBar");

if (!(themeToggle instanceof HTMLButtonElement) || !progressBar) {
  throw new Error("The theme and scroll controls are required.");
}

function updateThemeButton() {
  const isDark = !body.classList.contains("light-mode");
  html.classList.toggle("dark", isDark);
  themeToggle.textContent = isDark ? "Light Mode" : "Dark Mode";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode",
  );
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    "content",
    isDark ? "#080808" : "#f5f5f5",
  );
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  updateThemeButton();
  gsap.fromTo(themeToggle, { rotation: 0 }, {
    rotation: 360,
    duration: 0.5,
    ease: "power2.inOut",
  });
});
updateThemeButton();

const intro = gsap.timeline({
  paused: true,
  defaults: { duration: 0.6, ease: "power2.out" },
});

intro
  .from("#heroText .text-fire", { opacity: 0, y: 15, duration: 0.4 })
  .from("#heroText h1", { opacity: 0, y: 35, duration: 0.7 }, "-=0.2")
  .from("#heroText > p.muted-text", { opacity: 0, y: 20 }, "-=0.3")
  .from("#heroText a, #replayIntro", { opacity: 0, y: 15, stagger: 0.12 }, "-=0.25")
  .from("#heroPhones", { opacity: 0, y: 35, duration: 0.6 }, "-=0.4");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if (reduceMotion.matches) {
  intro.progress(1).pause();
} else {
  intro.play();
}

document.getElementById("replayIntro")?.addEventListener("click", () => {
  if (!reduceMotion.matches) intro.restart();
});

const motionSettings = gsap.matchMedia();
motionSettings.add("(prefers-reduced-motion: no-preference)", () => {
  gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
    gsap.from(element, {
      opacity: 0,
      y: 25,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });

  gsap.to(progressBar, {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.2,
    },
  });
});

const contactForm = document.getElementById("contactForm");
if (!(contactForm instanceof HTMLFormElement)) {
  throw new Error("The contact form is required.");
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("customerName");
  const email = document.getElementById("customerEmail");
  const message = document.getElementById("customerMessage");

  if (
    !(name instanceof HTMLInputElement) ||
    !(email instanceof HTMLInputElement) ||
    !(message instanceof HTMLTextAreaElement)
  ) {
    throw new Error("The contact form fields are missing.");
  }

  const shopEmail = "alphaphone@example.com";
  const subject = encodeURIComponent("Alpha Phone customer inquiry");
  const bodyText = encodeURIComponent(
    `Name: ${name.value.trim()}\nEmail: ${email.value.trim()}\n\nMessage:\n${message.value.trim()}`,
  );
  window.location.href = `mailto:${shopEmail}?subject=${subject}&body=${bodyText}`;
});

const year = document.getElementById("year");
if (!year) throw new Error("The footer year element is required.");
year.textContent = String(new Date().getFullYear());
