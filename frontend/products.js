// products.js
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:5000/api/products")
    .then(res => res.json())
    .then(products => {
      const productList = document.getElementById("product-list");
      productList.innerHTML = "";

      products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product-item");
        productDiv.innerHTML = `
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p><strong>Price:</strong> $${product.price}</p>
          <button data-id="${product._id}" data-name="${product.name}" data-price="${product.price}">
            Add to Cart
          </button>
        `;
        productList.appendChild(productDiv);
      });

      // Handle Add to Cart
      document.querySelectorAll("button[data-id]").forEach(button => {
        button.addEventListener("click", () => {
          const id = button.getAttribute("data-id");
          const name = button.getAttribute("data-name");
          const price = parseFloat(button.getAttribute("data-price"));
          addToCart(id, name, price);
        });
      });
    })
    .catch(err => {
      console.error("Error loading products:", err);
      document.getElementById("product-list").textContent = "Failed to load products.";
    });
});

function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(item => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
}
