/* ---------------- Wishlist page ---------------- */

function wishlistCardHTML(p) {
  return `
    <div class="product-card" data-id="${p._id}">
      <button class="wishlist-btn active" data-wishlist-remove="${p._id}" aria-label="Remove from wishlist">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
      </button>
      <a href="product.html?id=${p._id}" class="thumb">
        <img src="${p.images[0].url}" alt="${p.name}" draggable="false"/>
      </a>
      <a href="product.html?id=${p._id}" class="p-name">${p.name.length > 80 ? p.name.slice(0, 80) + "..." : p.name}</a>
      <div class="price-line">
        <span>${formatPrice(p.price)}</span>
        <span class="cut">${formatPrice(p.cuttedPrice)}</span>
        <span class="off">${getDiscount(p.price, p.cuttedPrice)}% off</span>
      </div>
      <button class="btn btn-cart" style="width:100%;padding:8px 0;font-size:13px;" data-add-to-cart="${p._id}">ADD TO CART</button>
    </div>`;
}

function renderWishlistPage() {
  const ids = getWishlist().map((i) => i.product);
  const products = ids.map((id) => getProductById(id)).filter(Boolean);

  document.querySelector("[data-wishlist-heading]").textContent = `My Wishlist (${products.length})`;

  const grid = document.querySelector("[data-wishlist-grid]");
  grid.innerHTML = products.length
    ? products.map(wishlistCardHTML).join("")
    : `<div class="no-results">Your wishlist is empty. <a href="products.html" style="color:var(--blue);">Browse products</a></div>`;

  grid.querySelectorAll("[data-wishlist-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      toggleWishlist(btn.getAttribute("data-wishlist-remove"));
      renderWishlistPage();
    });
  });
  grid.querySelectorAll("[data-add-to-cart]").forEach((btn) => {
    btn.addEventListener("click", () => {
      addToCart(btn.getAttribute("data-add-to-cart"), 1);
      showToast("Added To Cart");
    });
  });
}

document.addEventListener("DOMContentLoaded", renderWishlistPage);
