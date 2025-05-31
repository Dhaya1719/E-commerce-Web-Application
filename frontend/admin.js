document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const res = await fetch("http://localhost:5000/api/admins/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminEmail", data.email);
        window.location.href = "admin-dashboard.html";
      } else {
        alert(data.message);
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const res = await fetch("http://localhost:5000/api/admins/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();
      if (res.ok) {
        alert("Registered successfully! Please login.");
        window.location.href = "admin-login.html";
      } else {
        alert(data.message);
      }
    });
  }
});
