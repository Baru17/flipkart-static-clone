/* ---------------- Home page ---------------- */

function dealCardHTML(p) {
  return `
    <a class="deal-card" href="product.html?id=${p._id}">
      <img src="${p.images[0].url}" alt="${p.name}" draggable="false"/>
      <div class="name">${p.name}</div>
      <div class="off">Up to ${getDiscount(p.price, p.cuttedPrice)}% off</div>
    </a>`;
}

function sliderCardHTML(p) {
  return `
    <a class="slider-card" href="product.html?id=${p._id}">
      <img src="${p.images[0].url}" alt="${p.name}" draggable="false"/>
      <div class="name">${p.name}</div>
      <div class="price-row">
        <span>${formatPrice(p.price)}</span>
        <span class="cut">${formatPrice(p.cuttedPrice)}</span>
        <span class="off">${getDiscount(p.price, p.cuttedPrice)}% off</span>
      </div>
    </a>`;
}

function shuffled(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

document.addEventListener("DOMContentLoaded", () => {
  // Banner slider
  const track = document.querySelector("[data-banner-track]");
  if (track) {
    track.innerHTML = BANNERS.map((src) => `<img src="${src}" alt="banner" draggable="false"/>`).join("");
    let idx = 0;
    const go = (i) => {
      idx = (i + BANNERS.length) % BANNERS.length;
      track.style.transform = `translateX(-${idx * 100}%)`;
    };
    document.querySelector("[data-banner-prev]").addEventListener("click", () => go(idx - 1));
    document.querySelector("[data-banner-next]").addEventListener("click", () => go(idx + 1));
    setInterval(() => go(idx + 1), 3000);
  }

  const pool = shuffled(PRODUCTS);
  const slice = (n) => pool.splice(0, n);

  document.querySelector("[data-deal-row-1]").innerHTML = slice(8).map(dealCardHTML).join("");
  document.querySelector("[data-slider-row-1]").innerHTML = slice(8).map(sliderCardHTML).join("");
  document.querySelector("[data-deal-row-2]").innerHTML = slice(8).map(dealCardHTML).join("");
  document.querySelector("[data-slider-row-2]").innerHTML = slice(8).map(sliderCardHTML).join("");
  document.querySelector("[data-deal-row-3]").innerHTML = slice(8).map(dealCardHTML).join("");
  document.querySelector("[data-slider-row-3]").innerHTML = shuffled(PRODUCTS).slice(0, 8).map(sliderCardHTML).join("");
});
