/* ==========================================================================
   Shared application logic (runs on every page)
   Replaces the Redux store + Express/Mongo API with localStorage.
   ========================================================================== */

const LS_KEYS = {
  user: "fk_user",
  cart: "fk_cart",
  wishlist: "fk_wishlist",
  saveForLater: "fk_save_for_later",
};

/* ---------- generic storage helpers ---------- */
function readLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}
function writeLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/* ---------- formatting ---------- */
function formatPrice(n) {
  return "₹" + Number(n).toLocaleString("en-IN");
}
function getDiscount(price, cuttedPrice) {
  if (!cuttedPrice) return 0;
  return Math.round(((cuttedPrice - price) / cuttedPrice) * 100);
}

/* ---------- auth ---------- */
function getUser() {
  return readLS(LS_KEYS.user, null);
}
function setUser(user) {
  writeLS(LS_KEYS.user, user);
}
function logoutUser() {
  localStorage.removeItem(LS_KEYS.user);
}

/* ---------- cart ---------- */
function getCart() {
  return readLS(LS_KEYS.cart, []);
}
function setCart(items) {
  writeLS(LS_KEYS.cart, items);
  updateCartBadge();
}
function addToCart(productId, qty) {
  qty = qty || 1;
  const product = getProductById(productId);
  if (!product) return;
  const cart = getCart();
  const existing = cart.find((i) => i.product === productId);
  if (existing) {
    existing.quantity = Math.min(existing.quantity + qty, product.stock);
  } else {
    cart.push({
      product: productId,
      name: product.name,
      price: product.price,
      cuttedPrice: product.cuttedPrice,
      image: product.images[0].url,
      stock: product.stock,
      quantity: Math.min(qty, product.stock),
    });
  }
  setCart(cart);
}
function removeFromCart(productId) {
  setCart(getCart().filter((i) => i.product !== productId));
}
function updateCartQty(productId, quantity) {
  const cart = getCart();
  const item = cart.find((i) => i.product === productId);
  if (!item) return;
  item.quantity = Math.max(1, Math.min(quantity, item.stock));
  setCart(cart);
}

/* ---------- save for later ---------- */
function getSaveForLater() {
  return readLS(LS_KEYS.saveForLater, []);
}
function setSaveForLater(items) {
  writeLS(LS_KEYS.saveForLater, items);
}
function moveToSaveForLater(productId) {
  const cart = getCart();
  const item = cart.find((i) => i.product === productId);
  if (!item) return;
  removeFromCart(productId);
  const sfl = getSaveForLater();
  if (!sfl.find((i) => i.product === productId)) sfl.push(item);
  setSaveForLater(sfl);
}
function moveToCartFromSaveForLater(productId) {
  const sfl = getSaveForLater();
  const item = sfl.find((i) => i.product === productId);
  if (!item) return;
  setSaveForLater(sfl.filter((i) => i.product !== productId));
  addToCart(productId, item.quantity);
}
function removeFromSaveForLater(productId) {
  setSaveForLater(getSaveForLater().filter((i) => i.product !== productId));
}

/* ---------- wishlist ---------- */
function getWishlist() {
  return readLS(LS_KEYS.wishlist, []);
}
function setWishlist(items) {
  writeLS(LS_KEYS.wishlist, items);
}
function isInWishlist(productId) {
  return getWishlist().some((i) => i.product === productId);
}
function toggleWishlist(productId) {
  const list = getWishlist();
  const idx = list.findIndex((i) => i.product === productId);
  if (idx > -1) {
    list.splice(idx, 1);
    setWishlist(list);
    showToast("Removed From Wishlist");
    return false;
  } else {
    list.push({ product: productId });
    setWishlist(list);
    showToast("Added To Wishlist");
    return true;
  }
}

/* ---------- toast ---------- */
function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* ---------- header wiring (runs on DOMContentLoaded on every page) ---------- */
function updateCartBadge() {
  const badge = document.querySelector("[data-cart-badge]");
  const count = getCart().reduce((sum, i) => sum + i.quantity, 0);
  if (badge) {
    if (count > 0) {
      badge.textContent = count;
      badge.style.display = "flex";
    } else {
      badge.style.display = "none";
    }
  }
}

function renderAuthArea() {
  const user = getUser();
  const authSlot = document.querySelector("[data-auth-slot]");
  if (!authSlot) return;

  if (!user) {
    authSlot.innerHTML = `<a href="login.html" class="login-btn">Login</a>`;
    return;
  }

  const firstName = (user.name || "").split(" ")[0];
  authSlot.innerHTML = `
    <span class="user-drop" data-user-drop>
      ${firstName}
      <svg class="icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
    </span>
    <div class="dropdown-menu" data-user-menu style="display:none;">
      <div class="menu-head">${user.email || ""}</div>
      <ul>
        <li><a href="account.html">My Profile</a></li>
        <li><a href="orders.html">Orders</a></li>
        <li><a href="wishlist.html">Wishlist</a></li>
        <li><button type="button" data-logout>Logout</button></li>
      </ul>
    </div>
  `;

  const dropTrigger = authSlot.querySelector("[data-user-drop]");
  const menu = authSlot.querySelector("[data-user-menu]");
  dropTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.style.display = menu.style.display === "none" ? "block" : "none";
  });
  document.addEventListener("click", () => (menu.style.display = "none"));

  authSlot.querySelector("[data-logout]").addEventListener("click", () => {
    logoutUser();
    showToast("Logged Out Successfully");
    setTimeout(() => (window.location.href = "index.html"), 600);
  });
}

function wireMoreDropdown() {
  const trigger = document.querySelector("[data-more-drop]");
  const menu = document.querySelector("[data-more-menu]");
  if (!trigger || !menu) return;
  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.style.display = menu.style.display === "none" ? "block" : "none";
  });
  document.addEventListener("click", () => (menu.style.display = "none"));
}

function wireSearchbar() {
  const form = document.querySelector("[data-search-form]");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = form.querySelector("input").value.trim();
    window.location.href = "products.html" + (q ? "?keyword=" + encodeURIComponent(q) : "");
  });
}

function requireAuth(redirectTarget) {
  const user = getUser();
  if (!user) {
    window.location.href = "login.html?redirect=" + encodeURIComponent(redirectTarget || "account.html");
    return null;
  }
  return user;
}

function renderCategoriesBar() {
  const el = document.querySelector("[data-categories-bar]");
  if (!el) return;
  el.innerHTML = CATEGORIES.map(
    (c) => `
      <a href="products.html?category=${encodeURIComponent(c.name)}">
        <img src="${c.icon}" alt="${c.name}" draggable="false"/>
        <span>${c.name}</span>
      </a>`
  ).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  renderAuthArea();
  wireMoreDropdown();
  wireSearchbar();
  renderCategoriesBar();
});
