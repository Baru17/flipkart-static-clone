/* ---------------- Account pages (shared) ---------------- */

document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop();
  const user = requireAuth(currentPage);
  if (!user) return;

  const nameEls = document.querySelectorAll("[data-account-name]");
  nameEls.forEach((el) => (el.textContent = user.name || "User"));
  const avatarEls = document.querySelectorAll("[data-avatar]");
  avatarEls.forEach((el) => (el.textContent = (user.name || "U").charAt(0).toUpperCase()));

  const logoutBtns = document.querySelectorAll("[data-logout-btn]");
  logoutBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      logoutUser();
      showToast("Logged Out Successfully");
      setTimeout(() => (window.location.href = "index.html"), 500);
    })
  );

  // profile view page
  const infoName = document.querySelector("[data-info-name]");
  if (infoName) {
    infoName.textContent = user.name || "-";
    document.querySelector("[data-info-email]").textContent = user.email || "-";
    const joined = user.joined ? new Date(user.joined) : new Date();
    document.querySelector("[data-info-joined]").textContent = joined.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // profile edit page
  const updateForm = document.querySelector("[data-update-form]");
  if (updateForm) {
    updateForm.querySelector('[data-field="name"]').value = user.name || "";
    updateForm.querySelector('[data-field="email"]').value = user.email || "";
    updateForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = updateForm.querySelector('[data-field="name"]').value.trim();
      const email = updateForm.querySelector('[data-field="email"]').value.trim();
      if (!name || !/^\S+@\S+\.\S+$/.test(email)) return;
      setUser({ ...user, name, email });
      showToast("Profile Updated Successfully");
      setTimeout(() => (window.location.href = "account.html"), 500);
    });
  }
});
