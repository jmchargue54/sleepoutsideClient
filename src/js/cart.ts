import { getLocalStorage } from './utils.mts';
import type { Product } from './types.mts';

function renderCartContents() {
  if (!localStorage.getItem('so-cart')) {
    localStorage.setItem('so-cart', '[]');
  }
  const cartItems = getLocalStorage('so-cart') || [];
  const listEl = document.querySelector('.product-list');
  if (cartItems.length === 0) {
    if (listEl) listEl.innerHTML = '<li>Your cart is empty.</li>';
    return;
  } else {
    // console.log(cartItems);
    const htmlItems = cartItems.map((item: Product) => cartItemTemplate(item));
    if (listEl) listEl.innerHTML = htmlItems.join('');
  }
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
  <p class="cart-card__price">$${item.finalPrice}</p>
</li>`;

  return newItem;
}

document.addEventListener('DOMContentLoaded', renderCartContents);
