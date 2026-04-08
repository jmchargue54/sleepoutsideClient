import { mount } from 'svelte';
import ShoppingCart from '../components/ShoppingCart.svelte';

let value = JSON.parse(localStorage.getItem('so-cart')!);
console.log("Cart quantity from localStorage in cart.ts:", value.length);

mount(ShoppingCart, {
  target: document.querySelector('#cart-container') as HTMLElement,
});

$effect(() => {
  value = JSON.parse(localStorage.getItem('so-cart')!);
  console.log("Cart quantity from localStorage in cart.ts (effect):", value.length);
});