import type { Product } from './types.mts';
import { setLocalStorage } from './utils.mts';
import { findProductById } from './productData.mts';

function animateCartIcon() {
  const cartIcon = document.querySelector<HTMLOrSVGElement>('.cart svg');
  if (!cartIcon) return;

  // Restart the animation if it's already running
  cartIcon.classList.remove('cart-bounce');
  // Force a reflow so the animation can be re-triggered
  void cartIcon.getBoundingClientRect();

  cartIcon.classList.add('cart-bounce');
}

function addProductToCart(product: Product) {
  const cart = JSON.parse(localStorage.getItem('so-cart') || '[]');
  cart.push(product);
  setLocalStorage('so-cart', cart);
  animateCartIcon();
}

// add to cart button event handler
async function addToCartHandler(e: Event) {
  const target = e.target as HTMLButtonElement;
  if (target.dataset.id) {
    const product = await findProductById(target.dataset.id);
    addProductToCart(product);
  }
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  ?.addEventListener('click', addToCartHandler);
