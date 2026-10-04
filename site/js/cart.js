/* ---------------- Cart page ---------------- */

function cartItemHTML(item) {
  return `
    <div class="cart-item" data-cart-item="${item.product}">
      <img src="${item.image}" alt="${item.name}"/>
      <div class="cart-item-info">
        <div class="name">${item.name}</div>
        <div class="seller">Seller: Flipkart Clone</div>
        <div class="price-line">
          <span>${formatPrice(item.price)}</span>
          <span class="cut">${formatPrice(item.cuttedPrice)}</span>
          <span class="off">${getDiscount(item.price, item.cuttedPrice)}% off</span>
        </div>
        <div class="qty-control">
          <button data-qty-dec>-</button>
          <span>${item.quantity}</span>
          <button data-qty-inc>+</button>
        </div>
        <div class="cart-item-actions">
          <button data-remove-item>REMOVE</button>
          <button data-save-later>SAVE FOR LATER</button>
        </div>
      </div>
    </div>`;
}

function sflItemHTML(item) {
  return `
    <div class="cart-item" data-sfl-item="${item.product}">
      <img src="${item.image}" alt="${item.name}"/>
      <div class="cart-item-info">
        <div class="name">${item.name}</div>
        <div class="price-line">
          <span>${formatPrice(item.price)}</span>
          <span class="cut">${formatPrice(item.cuttedPrice)}</span>
        </div>
        <div class="cart-item-actions">
          <button data-move-to-cart>MOVE TO CART</button>
          <button data-remove-sfl>REMOVE</button>
        </div>
      </div>
    </div>`;
}

function renderCartPage() {
  const cart = getCart();
  const sfl = getSaveForLater();

  document.querySelector("[data-cart-heading]").textContent = `My Cart (${cart.length})`;
  document.querySelector("[data-sfl-heading]").textContent = `Saved For Later (${sfl.length})`;

  const itemsEl = document.querySelector("[data-cart-items]");
  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <div class="empty-state">
        <img src="assets/images/404-not-found.svg" alt="empty cart"/>
        <h3 style="font-weight:500;">Your cart is empty!</h3>
        <p style="color:var(--grey);font-size:14px;margin:6px 0 18px;">Add items to it now.</p>
        <a href="products.html" class="btn btn-buy">Shop Now</a>
      </div>`;
  } else {
    itemsEl.innerHTML = cart.map(cartItemHTML).join("");
  }

  document.querySelector("[data-sfl-items]").innerHTML = sfl.length
    ? sfl.map(sflItemHTML).join("")
    : `<div style="padding:20px;color:var(--grey);font-size:14px;">No items saved for later.</div>`;

  const placeOrderBtn = document.querySelector("[data-place-order]");
  placeOrderBtn.disabled = cart.length < 1;

  renderPriceSidebar(cart);
  wireCartEvents();
}

function renderPriceSidebar(cart) {
  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const totalCutPrice = cart.reduce((s, i) => s + (i.cuttedPrice || i.price) * i.quantity, 0);
  const discount = totalCutPrice - totalPrice;
  const deliveryFee = cart.length === 0 || totalPrice > 500 ? 0 : 40;

  document.querySelector("[data-price-sidebar]").innerHTML = `
    <h3>Price Details</h3>
    <div class="price-row"><span>Price (${totalItems} item${totalItems !== 1 ? "s" : ""})</span><span>${formatPrice(totalCutPrice)}</span></div>
    <div class="price-row"><span>Discount</span><span class="savings">- ${formatPrice(discount)}</span></div>
    <div class="price-row"><span>Delivery Charges</span><span>${deliveryFee === 0 ? '<span class="savings">Free</span>' : formatPrice(deliveryFee)}</span></div>
    <div class="price-row total"><span>Total Amount</span><span>${formatPrice(totalPrice + deliveryFee)}</span></div>
    ${discount > 0 ? `<div style="padding:10px 16px;color:var(--green);font-size:13px;font-weight:500;">You will save ${formatPrice(discount)} on this order</div>` : ""}
  `;
}

function wireCartEvents() {
  document.querySelectorAll("[data-cart-item]").forEach((row) => {
    const id = row.getAttribute("data-cart-item");
    const cartItem = getCart().find((i) => i.product === id);
    row.querySelector("[data-qty-inc]").addEventListener("click", () => {
      updateCartQty(id, cartItem.quantity + 1);
      renderCartPage();
    });
    row.querySelector("[data-qty-dec]").addEventListener("click", () => {
      if (cartItem.quantity <= 1) return;
      updateCartQty(id, cartItem.quantity - 1);
      renderCartPage();
    });
    row.querySelector("[data-remove-item]").addEventListener("click", () => {
      removeFromCart(id);
      showToast("Item Removed From Cart");
      renderCartPage();
    });
    row.querySelector("[data-save-later]").addEventListener("click", () => {
      moveToSaveForLater(id);
      showToast("Moved To Saved For Later");
      renderCartPage();
    });
  });

  document.querySelectorAll("[data-sfl-item]").forEach((row) => {
    const id = row.getAttribute("data-sfl-item");
    row.querySelector("[data-move-to-cart]").addEventListener("click", () => {
      moveToCartFromSaveForLater(id);
      showToast("Moved To Cart");
      renderCartPage();
    });
    row.querySelector("[data-remove-sfl]").addEventListener("click", () => {
      removeFromSaveForLater(id);
      renderCartPage();
    });
  });

  const placeOrderBtn = document.querySelector("[data-place-order]");
  placeOrderBtn.onclick = () => {
    if (!getUser()) {
      window.location.href = "login.html?redirect=cart.html";
      return;
    }
    showToast("Order Placed Successfully! (demo)");
  };
}

document.addEventListener("DOMContentLoaded", renderCartPage);
