/* ---------------- Orders page ---------------- */

document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector("[data-orders-list]");
  if (!list) return;
  list.innerHTML = `
    <div class="empty-state" style="padding:40px 0;">
      <img src="assets/images/404-not-found.svg" alt="no orders" style="width:140px;"/>
      <h3 style="font-weight:500;">No orders yet</h3>
      <p style="color:var(--grey);font-size:14px;margin:6px 0 18px;">Orders you place will show up here.</p>
      <a href="products.html" class="btn btn-buy">Start Shopping</a>
    </div>`;
});
