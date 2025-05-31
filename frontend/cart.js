// cart.js
document.addEventListener("DOMContentLoaded", () => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cart-items");
  const totalSpan = document.getElementById("total");

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalSpan.textContent = "0";
    return;
  }

  let total = 0;
  cartItems.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <p>${item.name} x ${item.quantity} - $${item.price * item.quantity}</p>
    `;
    total += item.price * item.quantity;
    cartContainer.appendChild(div);
  });

  totalSpan.textContent = total.toFixed(2);
});
