/* ---------------- Product details page ---------------- */

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const product = getProductById(id) || PRODUCTS[0];

  document.title = product.name + " - Flipkart Clone";

  document.querySelector("[data-breadcrumb]").innerHTML = `
    <a href="index.html">Home</a> &gt;
    <a href="products.html?category=${encodeURIComponent(product.category)}">${product.category}</a> &gt;
    <span>${product.name.length > 60 ? product.name.slice(0, 60) + "..." : product.name}</span>
  `;

  const inCart = getCart().some((i) => i.product === product._id);
  const inWishlist = isInWishlist(product._id);
  const discount = getDiscount(product.price, product.cuttedPrice);

  document.querySelector("[data-product-root]").innerHTML = `
    <div class="pd-left">
      <div class="pd-image"><img src="${product.images[0].url}" alt="${product.name}"/></div>
      <div class="pd-actions">
        <button class="btn btn-cart" data-add-cart ${product.stock < 1 ? "disabled" : ""}>${inCart ? "GO TO CART" : "ADD TO CART"}</button>
        <button class="btn btn-buy" data-buy-now ${product.stock < 1 ? "disabled" : ""}>BUY NOW</button>
      </div>
      <button class="btn btn-outline" style="margin-top:10px;" data-wishlist-toggle="${product._id}">
        ${inWishlist ? "♥ REMOVE FROM WISHLIST" : "♡ ADD TO WISHLIST"}
      </button>
    </div>
    <div class="pd-right">
      <h1>${product.name}</h1>
      <div class="brand">Brand: ${product.brand || "Generic"}</div>
      <span class="rating-badge">${product.ratings.toFixed(1)} ★</span>
      <span class="reviews-count">${product.numOfReviews.toLocaleString("en-IN")} Ratings &amp; Reviews</span>

      <div class="pd-price">
        ${formatPrice(product.price)}
        <span class="cut">${formatPrice(product.cuttedPrice)}</span>
        <span class="off">${discount}% off</span>
      </div>
      <div class="stock-line ${product.stock > 0 ? "stock-in" : "stock-out"}">
        ${product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
      </div>

      <div class="pd-section">
        <h3>Highlights</h3>
        <ul>${(product.highlights || []).map((h) => `<li>${h}</li>`).join("")}</ul>
      </div>

      <div class="pd-section">
        <h3>Description</h3>
        <p style="font-size:14px;line-height:1.6;">${product.description}</p>
      </div>
    </div>
  `;

  const addCartBtn = document.querySelector("[data-add-cart]");
  addCartBtn.addEventListener("click", () => {
    if (addCartBtn.textContent.trim() === "GO TO CART") {
      window.location.href = "cart.html";
      return;
    }
    addToCart(product._id, 1);
    showToast("Added To Cart");
    addCartBtn.textContent = "GO TO CART";
  });

  document.querySelector("[data-buy-now]").addEventListener("click", () => {
    addToCart(product._id, 1);
    window.location.href = "cart.html";
  });

  const wishBtn = document.querySelector("[data-wishlist-toggle]");
  wishBtn.addEventListener("click", () => {
    const active = toggleWishlist(product._id);
    wishBtn.textContent = active ? "♥ REMOVE FROM WISHLIST" : "♡ ADD TO WISHLIST";
  });

  // related products (same category)
  const related = PRODUCTS.filter((p) => p.category === product.category && p._id !== product._id).slice(0, 8);
  document.querySelector("[data-related-row]").innerHTML = related
    .map(
      (p) => `
      <a class="slider-card" href="product.html?id=${p._id}">
        <img src="${p.images[0].url}" alt="${p.name}" draggable="false"/>
        <div class="name">${p.name}</div>
        <div class="price-row">
          <span>${formatPrice(p.price)}</span>
          <span class="cut">${formatPrice(p.cuttedPrice)}</span>
          <span class="off">${getDiscount(p.price, p.cuttedPrice)}% off</span>
        </div>
      </a>`
    )
    .join("");
});
