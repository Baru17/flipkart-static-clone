/* ---------------- Products listing page ---------------- */

function productCardHTML(p) {
  const inWishlist = isInWishlist(p._id);
  return `
    <div class="product-card" data-id="${p._id}">
      <button class="wishlist-btn ${inWishlist ? "active" : ""}" data-wishlist-toggle="${p._id}" aria-label="Toggle wishlist">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="${inWishlist ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
      </button>
      <a href="product.html?id=${p._id}" class="thumb">
        <img src="${p.images[0].url}" alt="${p.name}" draggable="false"/>
      </a>
      <a href="product.html?id=${p._id}" class="p-name">${p.name.length > 80 ? p.name.slice(0, 80) + "..." : p.name}</a>
      <div>
        <span class="rating-badge">${p.ratings.toFixed(1)} ★</span>
        <span class="reviews-count">(${p.numOfReviews.toLocaleString("en-IN")})</span>
      </div>
      <div class="price-line">
        <span>${formatPrice(p.price)}</span>
        <span class="cut">${formatPrice(p.cuttedPrice)}</span>
        <span class="off">${getDiscount(p.price, p.cuttedPrice)}% off</span>
      </div>
    </div>`;
}

function getParams() {
  return new URLSearchParams(window.location.search);
}

function renderCategoryFilters(activeCategory) {
  const el = document.querySelector("[data-category-filters]");
  el.innerHTML = CATEGORIES.map(
    (c) => `
    <label>
      <input type="checkbox" data-category-filter value="${c.name}" ${activeCategory === c.name ? "checked" : ""}/>
      ${c.name}
    </label>`
  ).join("");
}

function applyFiltersAndRender() {
  const params = getParams();
  const keyword = (params.get("keyword") || "").toLowerCase();

  const checkedCats = Array.from(document.querySelectorAll("[data-category-filter]:checked")).map((el) => el.value);
  const maxPrice = Number(document.querySelector("[data-price-range]").value);
  const ratingFilter = Number(document.querySelector("[data-rating-filter]:checked").value);
  const sortMode = document.querySelector("[data-sort-select]").value;

  let list = PRODUCTS.filter((p) => {
    if (keyword && !p.name.toLowerCase().includes(keyword) && !p.category.toLowerCase().includes(keyword)) return false;
    if (checkedCats.length && !checkedCats.includes(p.category)) return false;
    if (p.price > maxPrice) return false;
    if (ratingFilter && p.ratings < ratingFilter) return false;
    return true;
  });

  if (sortMode === "price-asc") list.sort((a, b) => a.price - b.price);
  else if (sortMode === "price-desc") list.sort((a, b) => b.price - a.price);
  else if (sortMode === "rating") list.sort((a, b) => b.ratings - a.ratings);

  const grid = document.querySelector("[data-products-grid]");
  grid.innerHTML = list.length ? list.map(productCardHTML).join("") : `<div class="no-results">No products found. Try adjusting your filters.</div>`;

  const heading = document.querySelector("[data-results-heading]");
  if (keyword) heading.textContent = `Showing results for "${params.get("keyword")}" (${list.length})`;
  else if (checkedCats.length === 1) heading.textContent = `${checkedCats[0]} (${list.length})`;
  else heading.textContent = `All Products (${list.length})`;

  grid.querySelectorAll("[data-wishlist-toggle]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = btn.getAttribute("data-wishlist-toggle");
      const active = toggleWishlist(id);
      btn.classList.toggle("active", active);
      btn.querySelector("svg").setAttribute("fill", active ? "currentColor" : "none");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const params = getParams();
  const activeCategory = params.get("category");

  renderCategoryFilters(activeCategory);

  document.querySelectorAll("[data-category-filter]").forEach((el) => el.addEventListener("change", applyFiltersAndRender));
  document.querySelector("[data-price-range]").addEventListener("input", (e) => {
    document.querySelector("[data-price-range-value]").textContent = formatPrice(e.target.value);
    applyFiltersAndRender();
  });
  document.querySelectorAll("[data-rating-filter]").forEach((el) => el.addEventListener("change", applyFiltersAndRender));
  document.querySelector("[data-sort-select]").addEventListener("change", applyFiltersAndRender);
  document.querySelector("[data-clear-filters]").addEventListener("click", () => {
    document.querySelectorAll("[data-category-filter]").forEach((el) => (el.checked = false));
    document.querySelector("[data-price-range]").value = 130000;
    document.querySelector("[data-price-range-value]").textContent = formatPrice(130000);
    document.querySelector('[data-rating-filter][value="0"]').checked = true;
    applyFiltersAndRender();
  });

  applyFiltersAndRender();
});
