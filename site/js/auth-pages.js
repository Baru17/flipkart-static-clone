/* ---------------- Login / Register / Forgot password ---------------- */

function getRedirectTarget() {
  const params = new URLSearchParams(window.location.search);
  return params.get("redirect") || "account.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("[data-login-form]");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = loginForm.querySelector('[data-field="email"]').value.trim();
      const password = loginForm.querySelector('[data-field="password"]').value;
      const emailErr = loginForm.querySelector('[data-error="email"]');
      const passErr = loginForm.querySelector('[data-error="password"]');

      const emailValid = /^\S+@\S+\.\S+$/.test(email);
      const passValid = password.length >= 6;
      emailErr.style.display = emailValid ? "none" : "block";
      passErr.style.display = passValid ? "none" : "block";
      if (!emailValid || !passValid) return;

      // demo auth: log in as whoever registered with this email, or create one on the fly
      let user = getUser();
      if (!user || user.email !== email) {
        user = { name: email.split("@")[0], email, joined: new Date().toISOString() };
      }
      setUser(user);
      showToast("Logged In Successfully");
      setTimeout(() => (window.location.href = getRedirectTarget()), 500);
    });
  }

  const registerForm = document.querySelector("[data-register-form]");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = registerForm.querySelector('[data-field="name"]').value.trim();
      const email = registerForm.querySelector('[data-field="email"]').value.trim();
      const password = registerForm.querySelector('[data-field="password"]').value;

      const nameValid = name.length > 1;
      const emailValid = /^\S+@\S+\.\S+$/.test(email);
      const passValid = password.length >= 6;

      registerForm.querySelector('[data-error="name"]').style.display = nameValid ? "none" : "block";
      registerForm.querySelector('[data-error="email"]').style.display = emailValid ? "none" : "block";
      registerForm.querySelector('[data-error="password"]').style.display = passValid ? "none" : "block";
      if (!nameValid || !emailValid || !passValid) return;

      setUser({ name, email, joined: new Date().toISOString() });
      showToast("Account Created Successfully");
      setTimeout(() => (window.location.href = getRedirectTarget()), 500);
    });
  }

  const forgotForm = document.querySelector("[data-forgot-form]");
  if (forgotForm) {
    forgotForm.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Recovery link sent (demo)");
      setTimeout(() => (window.location.href = "login.html"), 900);
    });
  }
});
