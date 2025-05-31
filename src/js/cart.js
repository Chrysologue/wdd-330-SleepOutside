import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const parentElement = document.querySelector(".cart-footer");
  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.FinalPrice * item.quantity,
      0,
    );
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    parentElement.classList.remove("hide");
    document.querySelector(".cart-total").textContent =
      `Total: $${totalPrice.toFixed(2)}`;
  } else {
    parentElement.classList.add("hide");
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryLarge}"
      alt="${item.NameWithoutBrand}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.quantity || 1}</p>
  <p class="cart-card__price">$${item.FinalPrice * item.quantity}</p>
</li>`;

  return newItem;
}

renderCartContents();
loadHeaderFooter();
