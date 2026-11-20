import {gsap} from "gsap";
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
