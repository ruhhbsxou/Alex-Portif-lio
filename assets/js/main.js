(() => {
  "use strict";

  const config = document.getElementById("profile-config");
  const byId = (id) => document.getElementById(id);
  const avatar = byId("avatar");
  let typingTimer;
  let tooltipTimer;
  let currentGalleryIndex = 0;
  const galleryButtons = [...document.querySelectorAll(".gallery-image-button")];
  const galleryDialog = byId("gallery-dialog");
  const expandedImage = byId("gallery-expanded-image");
  const galleryCaption = byId("gallery-caption");
  const galleryViewport = byId("gallery-viewport");
  const galleryPosition = byId("gallery-position");
  const galleryScrollPrevious = byId("gallery-scroll-previous");
  const galleryScrollNext = byId("gallery-scroll-next");

  function updateGalleryControls() {
    const maxScroll = galleryViewport.scrollWidth - galleryViewport.clientWidth;
    galleryScrollPrevious.disabled = galleryViewport.scrollLeft <= 2;
    galleryScrollNext.disabled = galleryViewport.scrollLeft >= maxScroll - 2;

    const viewportBounds = galleryViewport.getBoundingClientRect();
    const visibleIndices = galleryButtons.flatMap((button, index) => {
      const itemBounds = button.closest(".gallery-item").getBoundingClientRect();
      return itemBounds.right > viewportBounds.left + 1 && itemBounds.left < viewportBounds.right - 1
        ? [index]
        : [];
    });
    const firstVisible = visibleIndices[0] ?? 0;
    const lastVisible = visibleIndices.at(-1) ?? firstVisible;

    galleryPosition.textContent = `${firstVisible + 1}–${lastVisible + 1} de ${galleryButtons.length}`;
  }

  function scrollGallery(direction) {
    galleryViewport.scrollBy({
      left: direction * galleryViewport.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
  }

  galleryScrollPrevious.addEventListener("click", () => scrollGallery(-1));
  galleryScrollNext.addEventListener("click", () => scrollGallery(1));
  galleryViewport.addEventListener("scroll", updateGalleryControls, { passive: true });
  window.addEventListener("resize", updateGalleryControls);
  updateGalleryControls();

  function showGalleryImage(index) {
    currentGalleryIndex = (index + galleryButtons.length) % galleryButtons.length;
    const button = galleryButtons[currentGalleryIndex];
    const thumbnail = button.querySelector("img");
    expandedImage.src = thumbnail.src;
    expandedImage.alt = thumbnail.alt;
    galleryCaption.textContent = button.closest(".gallery-item").querySelector("figcaption").textContent;
  }

  galleryButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      showGalleryImage(index);
      galleryDialog.showModal();
      byId("gallery-close").focus();
    });
  });

  byId("gallery-close").addEventListener("click", () => galleryDialog.close());
  byId("gallery-previous").addEventListener("click", () => showGalleryImage(currentGalleryIndex - 1));
  byId("gallery-next").addEventListener("click", () => showGalleryImage(currentGalleryIndex + 1));

  galleryDialog.addEventListener("click", (event) => {
    if (event.target === galleryDialog) galleryDialog.close();
  });

  galleryDialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      galleryDialog.close();
    }
    if (event.key === "ArrowLeft") showGalleryImage(currentGalleryIndex - 1);
    if (event.key === "ArrowRight") showGalleryImage(currentGalleryIndex + 1);
  });

  function setSocialLink(id, url) {
    const link = byId(id);
    const value = (url || "").trim();

    if (!value) {
      link.hidden = true;
      return;
    }

    link.href = value;
    link.hidden = false;
  }

  function typeText(text) {
    const target = byId("tagline");
    window.clearInterval(typingTimer);
    target.setAttribute("aria-label", text);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      target.textContent = text;
      return;
    }

    target.textContent = "";
    let position = 0;
    typingTimer = window.setInterval(() => {
      target.textContent = text.slice(0, ++position);
      if (position >= text.length) {
        window.clearInterval(typingTimer);
      }
    }, 42);
  }

  avatar.addEventListener("error", () => {
    if (avatar.src.endsWith(avatar.dataset.fallback)) return;
    avatar.src = avatar.dataset.fallback;
  });

  const name = (config.dataset.name || "Meu nome").trim();
  const bio = (config.dataset.bio || "").trim();
  const tagline = (config.dataset.text || "").trim();
  const avatarPath = (config.dataset.avatar || "").trim() || avatar.dataset.fallback;
  const discordUser = (config.dataset.discord || "").trim();
  const email = (config.dataset.email || "").trim();

  byId("profile-name").textContent = name;
  byId("bio").textContent = bio;
  avatar.src = avatarPath;
  avatar.alt = `Avatar de ${name}`;
  if (email) {
    byId("email-link").href = `mailto:${email}`;
  } else {
    byId("email-link").removeAttribute("href");
  }
  byId("email-link").hidden = !email;
  setSocialLink("social-x", config.dataset.x);
  setSocialLink("social-youtube", config.dataset.youtube);
  setSocialLink("social-steam", config.dataset.steam);
  byId("discord-copy").hidden = !discordUser;
  byId("discord-copy").title = discordUser ? `Copiar ${discordUser}` : "Usuário do Discord não informado";
  byId("discord-username").textContent = discordUser || "Usuário não informado";
  document.title = `${name} — links e contato`;
  document.querySelector('meta[name="description"]').content = bio || tagline;
  document.querySelector('meta[property="og:title"]').content = name;
  document.querySelector('meta[property="og:description"]').content = bio || tagline;
  document.querySelector('meta[property="og:image"]').content = new URL(avatarPath, window.location.href).href;
  document.querySelector('meta[property="og:url"]').content = window.location.href;
  typeText(tagline);

  byId("discord-copy").addEventListener("click", async () => {
    const tooltip = byId("discord-tooltip");
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(discordUser);
      } else {
        const temporaryInput = document.createElement("textarea");
        temporaryInput.value = discordUser;
        temporaryInput.setAttribute("readonly", "");
        temporaryInput.style.position = "fixed";
        temporaryInput.style.opacity = "0";
        document.body.append(temporaryInput);
        temporaryInput.select();
        const copied = document.execCommand("copy");
        temporaryInput.remove();
        if (!copied) throw new Error("O navegador não permitiu copiar o texto.");
      }
      tooltip.textContent = "Copiado!";
      tooltip.classList.add("visible");
      window.clearTimeout(tooltipTimer);
      tooltipTimer = window.setTimeout(() => tooltip.classList.remove("visible"), 1500);
    } catch (error) {
      tooltip.textContent = "Não foi possível copiar";
      tooltip.classList.add("visible");
      window.clearTimeout(tooltipTimer);
      tooltipTimer = window.setTimeout(() => tooltip.classList.remove("visible"), 2000);
      console.error("Falha ao copiar o usuário do Discord:", error);
    }
  });
})();
