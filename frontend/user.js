document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const contentType = res.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();  // debug
      alert("Server returned invalid JSON:\n" + text);
      return;
    }

    const data = await res.json();

    if (res.ok) {
      alert("Login successful!");
      window.location.href = "products.html";
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("Network error. Make sure backend is running on port 5000.");
  }
});
