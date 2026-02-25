import { getLocalStorage } from './utils.mts';
import type { Product } from './types.mts';

function renderCartContents() {
  if (!localStorage.getItem('so-cart')) {
    localStorage.setItem('so-cart', '[]');
  }
  const cartItems = getLocalStorage("so-cart") || [];
  const listEl = document.querySelector(".product-list");

  if (cartItems.length === 0) {
    if (listEl) listEl.innerHTML = '<li>Your cart is empty.</li>';
    return;
  } else {
    console.log(cartItems);
    const htmlItems = cartItems.map((item: Product) => cartItemTemplate(item));
    if (listEl) listEl.innerHTML = htmlItems.join('');
  }

  calculateCartTotal(cartItems);

}

function cartItemTemplate(item: Product) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.images.primaryMedium}"
      alt="${item.name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.name}</h2>
  </a>
  <p class="cart-card__color">${item.colors[0].colorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <img src="/images/bin.png" alt="remove item" class="cart-card__remove" id="remove-${item.id}"/>
  <p class="cart-card__price">$${item.finalPrice}</p>
</li>`;


  return newItem;
}

function calculateCartTotal(cartItems: Product[]) {
  const total = cartItems.reduce((sum, item) => sum + item.finalPrice, 0);
  const totalEl = document.querySelector(".cart-total");
  if (totalEl) totalEl.textContent = `Total: $${total.toFixed(2)}`;
  const footerEl = document.querySelector(".cart-footer");
  if (footerEl) footerEl.classList.remove("hide");
}

function removeCartItem(itemId: string) {
  let cartItems = getLocalStorage("so-cart") || [];
  cartItems = cartItems.filter((item: Product) => item.id !== itemId);
  localStorage.setItem("so-cart", JSON.stringify(cartItems));
  renderCartContents();
}

document.addEventListener("DOMContentLoaded", () => {
  renderCartContents();
});

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains("cart-card__remove")) {
    const itemId = target.id.replace("remove-", "");
    removeCartItem(itemId);
  }
});